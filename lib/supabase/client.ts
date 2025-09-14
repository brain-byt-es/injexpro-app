// lib/supabase/client.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** HMR-safe singleton */
const store: {
  client: SupabaseClient | null;
  token: string | null;
  exp: number;
} = (globalThis as any).__injex_sb_store ?? { client: null, token: null, exp: 0 };
(globalThis as any).__injex_sb_store = store;

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

async function serverBaseUrl(): Promise<string> {
  if (typeof window !== "undefined") return "";
  try {
    const mod = await import("next/headers");
    const h = await mod.headers();
    const proto = h.get("x-forwarded-proto") ?? "http";
    const host = h.get("host");
    if (host) return `${proto}://${host}`;
  } catch {}
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

async function serverCookieHeader(): Promise<string | undefined> {
  if (typeof window !== "undefined") return undefined;
  try {
    const mod = await import("next/headers");
    const ck = await mod.cookies();
    const all = ck.getAll();
    if (!all.length) return undefined;
    return all.map((c) => `${c.name}=${c.value}`).join("; ");
  } catch {
    return undefined;
  }
}

async function fetchRlsToken(): Promise<void> {
  const base = await serverBaseUrl();

  const init: RequestInit = { method: "POST", cache: "no-store" };
  if (typeof window === "undefined") {
    const cookie = await serverCookieHeader();
    init.headers = { ...(init.headers || {}), ...(cookie ? { cookie } : {}) };
  } else {
    (init as any).credentials = "include";
  }

  const res = await fetch(`${base}${EXCHANGE_PATH}`, init);
  if (!res.ok) {
    let body = "";
    try { body = await res.text(); } catch {}
    throw new Error(`exchange failed: ${res.status}${body ? ` – ${body}` : ""}`);
  }
  const { token } = (await res.json()) as { token: string };
  store.token = token;
  store.exp = decodeExp(token);
}

async function ensureToken(): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  if (!store.token || store.exp - 30 <= now) {
    await fetchRlsToken();
  }
}

/* ---------- public API ---------- */

export async function supabaseClient(): Promise<SupabaseClient> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  if (!url || !anon) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");

  await ensureToken();

  if (!store.client) {
    store.client = createClient(url, anon, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
      global: {
        /**
         * Ensure BOTH headers are always present:
         *   - apikey: <anon>
         *   - Authorization: Bearer <short-lived RLS token>
         * and preserve anything Supabase sets internally.
         */
        fetch: async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
          await ensureToken();

          // Start from a clean slate to avoid losing headers
          const headers = new Headers();

          // Required by PostgREST
          headers.set("apikey", anon);
          headers.set("Authorization", `Bearer ${store.token!}`);

          // Merge any incoming headers from supabase-js
          if (init?.headers) {
            for (const [k, v] of new Headers(init.headers as any).entries()) {
              // Let our required headers win if there's a conflict
              if (k.toLowerCase() === "authorization" || k.toLowerCase() === "apikey") continue;
              headers.set(k, v);
            }
          }

          // (Dev only) quick visibility — you can remove once it works
          if (process.env.NODE_ENV === "development" && typeof window === "undefined") {
            const peek: Record<string, string> = {};
            headers.forEach((v, k) => {
              peek[k] = k.toLowerCase().includes("authorization") || k === "apikey" ? "[set]" : v;
            });
            console.log("Supabase fetch →", String(input), peek);
          }

          let res = await fetch(input, { ...(init || {}), headers });

          if (res.status === 401) {
            // refresh once and retry
            store.token = null;
            store.exp = 0;
            await ensureToken();

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
