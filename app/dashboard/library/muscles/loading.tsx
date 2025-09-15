// app/dashboard/atlas/muscles/loading.tsx
export default function Loading() {
  return (
    <div className="p-4 md:p-6">
      <div className="h-7 w-48 rounded bg-muted animate-pulse" />
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-2xl border p-4">
            <div className="h-5 w-3/5 rounded bg-muted animate-pulse" />
            <div className="mt-2 h-4 w-4/5 rounded bg-muted animate-pulse" />
            <div className="mt-4 h-6 w-full rounded bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
