// lib/supabase/client.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const isBrowser = typeof window !== "undefined";

/** HMR-safe singleton (BROWSER ONLY) */
const store: {
  client: SupabaseClient | null;
  token: string | null;
  exp: number;
} = (isBrowser
  ? ((globalThis as any).__injex_sb_store ?? { client: null, token: null, exp: 0 })
  : { client: null, token: null, exp: 0 });
if (isBrowser) (globalThis as any).__injex_sb_store = store;

const EXCHANGE_PATH = "/api/health/supabase/exchange";

/* ---------- helpers ---------- */

function b64urlDecode(s: string): string {
  const str = s.replace(/-/g, "+").replace(/_/g, "/");
  if (typeof atob === "function") {
    return decodeURIComponent(
      Array.prototype
        .map.call(atob(str), (c: string) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  }
  // eslint-disable-next-line n/no-deprecated-api
  return Buffer.from(str, "base64").toString("utf8");
}

function decodeExp(jwt: string): number {
  try {
    const [, payload] = jwt.split(".");
    const json = JSON.parse(b64urlDecode(payload));
    return typeof json?.exp === "number" ? json.exp : 0;
  } catch {
    return 0;
  }
}

async function serverCookieHeader(): Promise<string | undefined> {
  if (isBrowser) return undefined;
  try {
    const mod = await import("next/headers");
    const ck = await mod.cookies();
    const str = ck.toString();
    return str.length ? str : undefined;
  } catch {
    return undefined;
  }
}

/** Build absolute base URL from incoming request (SSR/Workers). */
async function serverBaseUrl(): Promise<string> {
  try {
    const mod = await import("next/headers");
    const h = await mod.headers();
    const proto = h.get("x-forwarded-proto") ?? "http";
    const host = h.get("host");
    if (host) return `${proto}://${host}`;
  } catch {}
  // Local/dev fallback
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

/** Server: call exchange with absolute URL + forwarded cookies. */
async function exchangeTokenSSR(): Promise<string> {
  const headers: Record<string, string> = {};
  const cookie = await serverCookieHeader();
  if (cookie) headers.cookie = cookie;

  const target = `${await serverBaseUrl()}${EXCHANGE_PATH}`;
  const res = await fetch(target, { method: "POST", cache: "no-store", headers });

  if (!res.ok) {
    let body = "";
    try {
      body = await res.text();
    } catch {}
    throw new Error(`exchange failed: ${res.status}${body ? ` – ${body}` : ""}`);
  }
  const { token } = (await res.json()) as { token: string };
  return token;
}

/** Browser: call exchange with relative URL (cookies auto-sent). */
async function exchangeTokenBrowser(): Promise<string> {
  const res = await fetch(EXCHANGE_PATH, {
    method: "POST",
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error(`exchange failed: ${res.status}`);
  const { token } = (await res.json()) as { token: string };
  return token;
}

/* ---------- BROWSER path (keeps your singleton) ---------- */

async function fetchRlsTokenBrowser(): Promise<void> {
  const token = await exchangeTokenBrowser();
  store.token = token;
  store.exp = decodeExp(token);
}

async function ensureTokenBrowser(): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  if (!store.token || store.exp - 30 <= now) {
    await fetchRlsTokenBrowser();
  }
}

async function browserClient(url: string, anon: string): Promise<SupabaseClient> {
  await ensureTokenBrowser();

  if (!store.client) {
    store.client = createClient(url, anon, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      global: {
        fetch: async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
          await ensureTokenBrowser();

          const headers = new Headers();
          headers.set("apikey", anon);
          headers.set("Authorization", `Bearer ${store.token!}`);
          if (init?.headers) {
            for (const [k, v] of new Headers(init.headers as any).entries()) {
              if (k.toLowerCase() === "authorization" || k.toLowerCase() === "apikey") continue;
              headers.set(k, v);
            }
          }

          let res = await fetch(input, { ...(init || {}), headers });

          if (res.status === 401) {
            store.token = null;
            store.exp = 0;
            await ensureTokenBrowser();

            const retryHeaders = new Headers();
            retryHeaders.set("apikey", anon);
            retryHeaders.set("Authorization", `Bearer ${store.token!}`);
            if (init?.headers) {
              for (const [k, v] of new Headers(init.headers as any).entries()) {
                if (k.toLowerCase() === "authorization" || k.toLowerCase() === "apikey") continue;
                retryHeaders.set(k, v);
              }
            }
            res = await fetch(input, { ...(init || {}), headers: retryHeaders });
          }

          return res;
        },
      },
    });
  }

  return store.client;
}

/* ---------- SERVER path (per-request ephemeral client) ---------- */

async function serverClient(url: string, anon: string): Promise<SupabaseClient> {
  // Get a fresh token tied to *this* request's Clerk session:
  let token = await exchangeTokenSSR();

  const client = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: {
      // Token lives in this closure, not in any module/global store.
      fetch: async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const headers = new Headers(init?.headers as any);
        headers.set("apikey", anon);
        headers.set("Authorization", `Bearer ${token}`);

        let res = await fetch(input, { ...(init || {}), headers });

        if (res.status === 401) {
          // Refresh once for this request and retry
          token = await exchangeTokenSSR();
          const retryHeaders = new Headers(init?.headers as any);
          retryHeaders.set("apikey", anon);
          retryHeaders.set("Authorization", `Bearer ${token}`);
          res = await fetch(input, { ...(init || {}), headers: retryHeaders });
        }

        return res;
      },
    },
  });

  return client;
}

/* ---------- public API ---------- */

export async function supabaseClient(): Promise<SupabaseClient> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  if (!url || !anon) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (isBrowser) return browserClient(url, anon);
  return serverClient(url, anon); // per-request, no cross-user state
}
