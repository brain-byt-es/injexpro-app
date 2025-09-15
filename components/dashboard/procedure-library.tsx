"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export type Proc = {
  id: string;
  slug: string;
  title: string;
  region: string | null;
  condition_type: string | null;
  guidance: "US" | "EMG" | "Landmark" | string | null;
  evidence_level: "A" | "B" | "C" | string | null;
  sites_min: number | null;
  sites_max: number | null;
  total_dose_min: number | null;
  total_dose_max: number | null;
  key_muscles: { name: string; slug: string }[] | null;
  total_muscle_count: number | null;
};

type View = "cards" | "table";

export function ProcedureLibrary({ initialItems }: { initialItems: Proc[] }) {
  // ----- URL & persisted view -----
  const params = React.useMemo(
    () => new URLSearchParams(typeof window !== "undefined" ? window.location.search : ""),
    []
  );
  const initialView =
    (params.get("view") as View) ||
    (typeof window !== "undefined" ? ((localStorage.getItem("proc_view") as View) || "cards") : "cards");

  const initialQ = params.get("q") ?? "";

  const [q, setQ] = React.useState(initialQ);
  const [view, setView] = React.useState<View>(initialView);
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  // primary filters
  const [cond, setCond]   = React.useState<Set<string>>(new Set(splitParam(params.get("type"))));
  const [region, setReg]  = React.useState<Set<string>>(new Set(splitParam(params.get("region"))));

  // secondary ("More")
  const [guide, setGuid]  = React.useState<Set<string>>(new Set(splitParam(params.get("guide"))));
  const [ev, setEv]       = React.useState<Set<string>>(new Set(splitParam(params.get("ev"))));

  // Default filter drawer: collapsed on mobile, expanded on desktop
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const setFromMQ = () => setFiltersOpen(mq.matches); // open on desktop
    setFromMQ();
    mq.addEventListener("change", setFromMQ);
    return () => mq.removeEventListener("change", setFromMQ);
  }, []);

  // sync URL + localStorage
  React.useEffect(() => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (cond.size)  sp.set("type",   [...cond].join(","));
    if (region.size)sp.set("region", [...region].join(","));
    if (guide.size) sp.set("guide",  [...guide].join(","));
    if (ev.size)    sp.set("ev",     [...ev].join(","));
    sp.set("view", view);
    if (typeof window !== "undefined") {
      const url = `${location.pathname}?${sp.toString()}`;
      window.history.replaceState(null, "", url);
      localStorage.setItem("proc_view", view);
    }
  }, [q, cond, region, guide, ev, view]);

  // facet options from data
  const facetOptions = React.useMemo(() => {
    const uniq = (arr: (string | null)[]) => [...new Set(arr.filter(Boolean) as string[])];
    return {
      types:   uniq(initialItems.map(i => i.condition_type)),
      regions: uniq(initialItems.map(i => i.region)),
      guides:  uniq(initialItems.map(i => i.guidance)),
      evs:     uniq(initialItems.map(i => i.evidence_level)),
    };
  }, [initialItems]);

  // filtering + search
  const filtered = React.useMemo(() => {
    const norm = (s: string) => s.toLowerCase().normalize("NFKD");
    const terms = norm(q).split(/\s+/).filter(Boolean);

    return initialItems.filter(p => {
      if (cond.size   && !cond.has(p.condition_type ?? "")) return false;
      if (region.size && !region.has(p.region ?? "")) return false;
      if (guide.size  && !guide.has(p.guidance ?? "")) return false;
      if (ev.size     && !ev.has(p.evidence_level ?? "")) return false;

      if (!terms.length) return true;
      const hay = norm(
        [
          p.title,
          p.region ?? "",
          p.condition_type ?? "",
          p.guidance ?? "",
          p.evidence_level ?? "",
          ...(((p.key_muscles ?? []) as { name: string; slug: string }[]).map(k => k.name) ?? []),
        ].join(" ")
      );
      return terms.every(t => hay.includes(t));
    });
  }, [initialItems, q, cond, region, guide, ev]);

  // relative counts (per UX spec)
  const counts = React.useMemo(() => {
    const base = filtered;
    const countBy = (arr: (string | null)[]) =>
      arr.reduce<Record<string, number>>((acc, v) => {
        if (!v) return acc; acc[v] = (acc[v] ?? 0) + 1; return acc;
      }, {});
    return {
      type:   countBy(base.map(i => i.condition_type)),
      region: countBy(base.map(i => i.region)),
      guide:  countBy(base.map(i => i.guidance)),
      ev:     countBy(base.map(i => i.evidence_level)),
    };
  }, [filtered]);

  function resetAll() {
    setQ("");
    setView("cards");
    setCond(new Set());
    setReg(new Set());
    setGuid(new Set());
    setEv(new Set());
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Procedure Library</h1>
        <p className="text-muted-foreground">Reference-only procedures. Toggle between views.</p>
      </header>

      {/* Toolbar: Search + Filter + View */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex w-full max-w-2xl items-center gap-2">
          <Input
            aria-label="Search procedures"
            placeholder="Search procedures, indications, or region…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Escape") setQ(""); }}
          />
          <Button type="button" variant="outline" onClick={() => setFiltersOpen((v) => !v)}>
            Filter ⚙
          </Button>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ViewToggle view={view} setView={setView} />
          <Button variant="outline" onClick={resetAll}>Reset</Button>
        </div>
      </div>

      {/* Filter drawer (visible per state; desktop default open) */}
      {filtersOpen && (
        <div className="rounded-2xl border p-3 lg:p-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* Primary filters */}
            <MultiSelectDropdown
              label="Condition"
              options={facetOptions.types}
              selected={cond}
              counts={counts.type}
              onApply={(s) => setCond(new Set(s))}
            />
            <MultiSelectDropdown
              label="Region"
              options={facetOptions.regions}
              selected={region}
              counts={counts.region}
              onApply={(s) => setReg(new Set(s))}
            />

            {/* Secondary in "More" */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-9">More ▼</Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3">
                <div className="space-y-3">
                  <div className="text-sm font-medium">Guidance</div>
                  <MultiSelectList
                    options={facetOptions.guides}
                    selected={guide}
                    counts={counts.guide}
                    onChange={(set) => setGuid(new Set(set))}
                  />
                  <div className="text-sm font-medium mt-2">Evidence</div>
                  <MultiSelectList
                    options={facetOptions.evs}
                    selected={ev}
                    counts={counts.ev}
                    onChange={(set) => setEv(new Set(set))}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}

      {/* Results */}
      {view === "cards" ? (
        <CardsGrid items={filtered} />
      ) : (
        <TableView items={filtered} />
      )}
    </div>
  );
}

/* ---------- Pieces ---------- */

function ViewToggle({ view, setView }: { view: "cards" | "table"; setView: (v: View)=>void }) {
  return (
    <div className="inline-flex rounded-lg border p-1">
      <Button variant={view === "cards" ? "default" : "ghost"} className="h-8" onClick={() => setView("cards")} aria-label="Cards view">Cards</Button>
      <Button variant={view === "table" ? "default" : "ghost"} className="h-8" onClick={() => setView("table")} aria-label="Table view">Table</Button>
    </div>
  );
}

function CardsGrid({ items }: { items: Proc[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {items.length ? items.map((p) => <ProcedureCard key={p.id} p={p} />) : <EmptyState />}
    </div>
  );
}

function TableView({ items }: { items: Proc[] }) {
  return (
    <div className="rounded-2xl border overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Procedure</TableHead>
            <TableHead>Key Muscles</TableHead>
            <TableHead>Sites</TableHead>
            <TableHead>Total dose</TableHead>
            <TableHead>Guidance</TableHead>
            <TableHead>Evidence</TableHead>
            <TableHead>Region</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length ? items.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">
                <Link href={`/dashboard/library/procedures/${p.slug}`} className="hover:underline">
                  {p.title}
                </Link>
              </TableCell>
              <TableCell className="max-w-[28ch] truncate">
                {(((p.key_muscles ?? []) as { name: string; slug: string }[])
                  .slice(0, 4)
                  .map((m: { name: string }) => m.name)
                  .join(", ")) || "—"}
                {p.total_muscle_count && p.total_muscle_count > 4 ? ` +${p.total_muscle_count - 4}…` : ""}
              </TableCell>
              <TableCell>{formatRange(p.sites_min, p.sites_max)}</TableCell>
              <TableCell>{formatRange(p.total_dose_min, p.total_dose_max, " U")}</TableCell>
              <TableCell>{p.guidance || "—"}</TableCell>
              <TableCell>{p.evidence_level || "—"}</TableCell>
              <TableCell>{p.region || "—"}</TableCell>
            </TableRow>
          )) : (
            <TableRow><TableCell colSpan={7}><EmptyState /></TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function ProcedureCard({ p }: { p: Proc }) {
  const router = useRouter();
  const href = `/dashboard/library/procedures/${p.slug}`;
  const muscles = ((p.key_muscles ?? []) as { name: string; slug: string }[]) || [];
  const extra = p.total_muscle_count && p.total_muscle_count > 4 ? p.total_muscle_count - 4 : 0;

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); router.push(href); }
  };

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={p.title}
      onClick={() => router.push(href)}
      onKeyDown={onKeyDown}
      className="group block cursor-pointer rounded-2xl border p-4 transition hover:border-primary/40 hover:shadow-md"
    >
      <div className="text-base font-semibold">{p.title}</div>
      <div className="mt-1 text-sm text-muted-foreground">
        {[p.region || "—", p.guidance || "—", p.evidence_level || "—"].join(" • ")}
      </div>
      <div className="mt-2 text-sm">
        <span className="text-muted-foreground">Key muscles: </span>
        {muscles.slice(0, 4).map((m, idx) => (
          <React.Fragment key={m.slug}>
            <Link
              href={`/dashboard/library/muscles/${m.slug}`}
              className="hover:underline"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              {m.name}
            </Link>
            {idx < Math.min(muscles.length, 4) - 1 ? ", " : ""}
          </React.Fragment>
        ))}
        {extra ? <span className="text-muted-foreground"> +{extra} more</span> : null}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">
        Sites: {formatRange(p.sites_min, p.sites_max)} • Total dose: {formatRange(p.total_dose_min, p.total_dose_max, " U")}
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {p.evidence_level ? <Badge className="rounded-full">Evidence {p.evidence_level}</Badge> : null}
        {p.region ? <Badge variant="secondary" className="rounded-full">{p.region}</Badge> : null}
      </div>
    </div>
  );
}

/* ---------- Filter controls ---------- */

function MultiSelectDropdown(props: {
  label: string;
  options: string[];
  selected: Set<string>;
  counts?: Record<string, number>;
  onApply: (values: Set<string>) => void;
}) {
  const { label, options, selected, counts, onApply } = props;
  const [open, setOpen] = React.useState(false);
  const [temp, setTemp] = React.useState<Set<string>>(new Set(selected));

  React.useEffect(() => {
    if (open) setTemp(new Set(selected));
  }, [open, selected]);

  const toggle = (val: string) => {
    const next = new Set(temp);
    next.has(val) ? next.delete(val) : next.add(val);
    setTemp(next);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-9">
          {label} ▼
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <MultiSelectList
          options={options}
          selected={temp}
          counts={counts}
          onChange={setTemp}
          onItemToggle={toggle}
        />
        <div className="mt-3 flex gap-2">
          <Button size="sm" className="h-8" onClick={() => { onApply(new Set(temp)); setOpen(false); }}>
            Apply
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8"
            onClick={() => { setTemp(new Set()); onApply(new Set()); setOpen(false); }}
          >
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MultiSelectList(props: {
  options: string[];
  selected: Set<string>;
  counts?: Record<string, number>;
  onChange: (set: Set<string>) => void;
  onItemToggle?: (val: string) => void;
}) {
  const { options, selected, counts, onChange, onItemToggle } = props;

  const handleToggle = (val: string) => {
    const next = new Set(selected);
    next.has(val) ? next.delete(val) : next.add(val);
    onChange(next);
    onItemToggle?.(val);
  };

  return (
    <div className="max-h-60 overflow-auto pr-1">
      {options.length ? options.map((opt) => (
        <label key={opt} className="flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted/60">
          <Checkbox
            checked={selected.has(opt)}
            onCheckedChange={() => handleToggle(opt)}
            aria-label={opt}
          />
          <span className="text-sm flex-1">{opt}</span>
          {counts && typeof counts[opt] === "number" ? (
            <span className="text-xs text-muted-foreground">{counts[opt]}</span>
          ) : null}
        </label>
      )) : (
        <div className="px-2 py-1 text-sm text-muted-foreground">No options</div>
      )}
    </div>
  );
}

/* ---------- Shared bits ---------- */

function formatRange(a: number | null, b: number | null, suffix = "") {
  if (a == null && b == null) return "—";
  if (a != null && b != null) return `${a}–${b}${suffix}`;
  return `${a ?? b}${suffix}`;
}
function splitParam(v: string | null): string[] {
  return v ? v.split(",").map((s) => s.trim()).filter(Boolean) : [];
}

function EmptyState() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 py-10 text-center">
      <div className="text-sm text-muted-foreground">
        No matches. Try clearing filters or broadening your search.
      </div>
    </div>
  );
}
