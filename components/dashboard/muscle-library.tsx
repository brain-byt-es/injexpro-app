"use client";

import * as React from "react";
import Link from "next/link";
//import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export type Muscle = {
  id: string;
  slug: string;
  name: string;
  abbr?: string | null;
  anatomical_region: string | null;          // Region
  function_short?: string | null;            // Function (1-liner)
  innervation_nerve?: string | null;         // searchable
  innervation_root?: string | null;          // searchable
  indications: string[] | null;              // Indication tags
  has_ultrasound_window: boolean;
  safety_flags: string[] | null;
};

type View = "cards" | "table";

export function MuscleLibrary({ initialItems }: { initialItems: Muscle[] }) {
  // URL + view
  const params = React.useMemo(
    () => new URLSearchParams(typeof window !== "undefined" ? window.location.search : ""),
    []
  );
  const initialView =
    (params.get("view") as View) ||
    (typeof window !== "undefined" ? ((localStorage.getItem("muscle_view") as View) || "cards") : "cards");
  const initialQ = params.get("q") ?? "";

  const [q, setQ] = React.useState(initialQ);
  const [view, setView] = React.useState<View>(initialView);
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  // Primary filters
  const [region, setRegion] = React.useState<Set<string>>(new Set(splitParam(params.get("region"))));
  const [func, setFunc]     = React.useState<Set<string>>(new Set(splitParam(params.get("function"))));
  const [ind, setInd]       = React.useState<Set<string>>(new Set(splitParam(params.get("ind"))));

  // Secondary ("More")
  const [usOnly, setUsOnly] = React.useState<boolean>(params.get("us") === "true");

  // open default on desktop
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const setFromMQ = () => setFiltersOpen(mq.matches);
    setFromMQ();
    mq.addEventListener("change", setFromMQ);
    return () => mq.removeEventListener("change", setFromMQ);
  }, []);

  // sync URL
  React.useEffect(() => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (region.size) sp.set("region", [...region].join(","));
    if (func.size)   sp.set("function", [...func].join(","));
    if (ind.size)    sp.set("ind", [...ind].join(","));
    if (usOnly)      sp.set("us", "true");
    sp.set("view", view);
    if (typeof window !== "undefined") {
      const url = `${location.pathname}?${sp.toString()}`;
      window.history.replaceState(null, "", url);
      localStorage.setItem("muscle_view", view);
    }
  }, [q, region, func, ind, usOnly, view]);

  // facet options
  const facetOptions = React.useMemo(() => {
    const uniq = <T extends string | null | undefined>(arr: T[]) =>
      [...new Set(arr.filter(Boolean) as string[])];
    return {
      regions: uniq(initialItems.map(i => i.anatomical_region || "")),
      functions: uniq(initialItems.map(i => i.function_short || "").filter(Boolean)),
      indications: uniq(initialItems.flatMap(i => i.indications ?? [])),
    };
  }, [initialItems]);

  // filter + search (nerve/root only in search text)
  const filtered = React.useMemo(() => {
    const norm = (s: string) => s.toLowerCase().normalize("NFKD");
    const terms = norm(q).split(/\s+/).filter(Boolean);

    return initialItems.filter(m => {
      if (region.size && !region.has(m.anatomical_region ?? "")) return false;
      if (func.size   && !func.has((m.function_short || "").trim())) return false;
      if (ind.size) {
        const tags = new Set(m.indications ?? []);
        if (![...ind].some(x => tags.has(x))) return false;
      }
      if (usOnly && !m.has_ultrasound_window) return false;

      if (!terms.length) return true;
      const hay = norm(
        [
          m.name, m.abbr ?? "",
          m.anatomical_region ?? "",
          m.function_short ?? "",
          m.innervation_nerve ?? "",
          m.innervation_root ?? "",
          ...(m.indications ?? []),
        ].join(" ")
      );
      return terms.every(t => hay.includes(t));
    });
  }, [initialItems, q, region, func, ind, usOnly]);

  // counts (relative)
  const counts = React.useMemo(() => {
    const base = filtered;
    const countBy = (arr: (string | null | undefined)[]) =>
      arr.reduce<Record<string, number>>((acc, v) => {
        if (!v) return acc; const k = String(v); acc[k] = (acc[k] ?? 0) + 1; return acc;
      }, {});
    return {
      regions: countBy(base.map(i => i.anatomical_region)),
      functions: countBy(base.map(i => i.function_short)),
      indications: countBy(base.flatMap(i => i.indications ?? [])),
      us: base.filter(i => i.has_ultrasound_window).length,
    };
  }, [filtered]);

  function resetAll() {
    setQ("");
    setView("cards");
    setRegion(new Set());
    setFunc(new Set());
    setInd(new Set());
    setUsOnly(false);
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Muscle Library</h1>
        <p className="text-muted-foreground">Search and filter muscles. Toggle between cards and table.</p>
      </header>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex w-full max-w-2xl items-center gap-2">
          <Input
            aria-label="Search muscles"
            placeholder="Search muscles or indications…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Escape") setQ(""); }}
          />
          <Button type="button" variant="outline" onClick={() => setFiltersOpen(v => !v)}>
            Filter ⚙
          </Button>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ViewToggle view={view} setView={setView} />
          <Button variant="outline" onClick={resetAll}>Reset</Button>
        </div>
      </div>

      {/* Filter Drawer */}
      {filtersOpen && (
        <div className="rounded-2xl border p-3 lg:p-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* Primary */}
            <MultiSelectDropdown
              label="Region"
              options={facetOptions.regions}
              selected={region}
              counts={counts.regions}
              onApply={(s) => setRegion(new Set(s))}
            />
            <MultiSelectDropdown
              label="Function"
              options={facetOptions.functions}
              selected={func}
              counts={counts.functions}
              onApply={(s) => setFunc(new Set(s))}
            />
            <MultiSelectDropdown
              label="Indication"
              options={facetOptions.indications}
              selected={ind}
              counts={counts.indications}
              onApply={(s) => setInd(new Set(s))}
            />

            {/* More (US) */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-9">More ▼</Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-3">
                <label className="flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted/60">
                  <Checkbox checked={usOnly} onCheckedChange={() => setUsOnly(v => !v)} aria-label="US window available" />
                  <span className="text-sm">US window available</span>
                  <span className="ml-auto text-xs text-muted-foreground">{counts.us}</span>
                </label>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}

      {/* Results */}
      {view === "cards" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.length ? filtered.map((m) => <MuscleCard key={m.id} m={m} />) : <EmptyState />}
        </div>
      ) : (
        <div className="rounded-2xl border overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Function</TableHead>
                <TableHead>Innervation</TableHead>
                <TableHead>Indications</TableHead>
                <TableHead>US</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length ? filtered.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">
                    <Link href={`/dashboard/library/muscles/${m.slug}`} className="hover:underline">
                      {m.name}
                    </Link>
                    {m.abbr ? <span className="text-muted-foreground"> ({m.abbr})</span> : null}
                  </TableCell>
                  <TableCell>{m.anatomical_region || "—"}</TableCell>
                  <TableCell className="max-w-[22ch] truncate">{m.function_short || "—"}</TableCell>
                  <TableCell className="max-w-[22ch] truncate">
                    {[m.innervation_nerve, m.innervation_root].filter(Boolean).join(" ") || "—"}
                  </TableCell>
                  <TableCell className="max-w-[24ch] truncate">
                    {(m.indications ?? []).slice(0, 3).join(", ") || "—"}
                  </TableCell>
                  <TableCell>{m.has_ultrasound_window ? "Yes" : ""}</TableCell>
                </TableRow>
              )) : (
                <TableRow><TableCell colSpan={6}><EmptyState /></TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

/* ---------- Shared UI ---------- */

function ViewToggle({ view, setView }: { view: "cards" | "table"; setView: (v: View)=>void }) {
  return (
    <div className="inline-flex rounded-lg border p-1">
      <Button variant={view === "cards" ? "default" : "ghost"} className="h-8" onClick={() => setView("cards")} aria-label="Cards view">Cards</Button>
      <Button variant={view === "table" ? "default" : "ghost"} className="h-8" onClick={() => setView("table")} aria-label="Table view">Table</Button>
    </div>
  );
}

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

  React.useEffect(() => { if (open) setTemp(new Set(selected)); }, [open, selected]);

  const toggle = (val: string) => {
    const next = new Set(temp);
    next.has(val) ? next.delete(val) : next.add(val);
    setTemp(next);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-9">{label} ▼</Button>
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
          <Button size="sm" className="h-8" onClick={() => { onApply(new Set(temp)); setOpen(false); }}>Apply</Button>
          <Button size="sm" variant="outline" className="h-8" onClick={() => { setTemp(new Set()); onApply(new Set()); setOpen(false); }}>Clear</Button>
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
          <Checkbox checked={selected.has(opt)} onCheckedChange={() => handleToggle(opt)} aria-label={opt} />
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

function MuscleCard({ m }: { m: Muscle }) {
  return (
    <Link href={`/dashboard/library/muscles/${m.slug}`} className="group block rounded-2xl border p-4 transition hover:border-primary/40 hover:shadow-md">
      <div className="text-base font-semibold">
        {m.name} {m.abbr ? <span className="font-normal text-muted-foreground">({m.abbr})</span> : null}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">
        {[m.anatomical_region || "—", m.function_short || "—"].join(" • ")}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">
        {[m.innervation_nerve, m.innervation_root].filter(Boolean).join(" ") || "—"}
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {(m.indications ?? []).slice(0, 2).map((tag: string) => (
          <Badge key={tag} variant="outline" className="rounded-full">{tag}</Badge>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {m.has_ultrasound_window ? <Badge className="rounded-full">US window</Badge> : null}
        {(m.safety_flags ?? []).slice(0, 2).map((flag: string) => (
          <Badge key={flag} variant="secondary" className="rounded-full">{flag}</Badge>
        ))}
      </div>
    </Link>
  );
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

function splitParam(v: string | null): string[] {
  return v ? v.split(",").map((s) => s.trim()).filter(Boolean) : [];
}
