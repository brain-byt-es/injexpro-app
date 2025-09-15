// app/dashboard/atlas/procedures/loading.tsx
export default function Loading() {
  return (
    <div className="p-4 md:p-6">
      <div className="h-7 w-56 rounded bg-muted animate-pulse" />
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-2xl border p-4">
            <div className="h-5 w-2/3 rounded bg-muted animate-pulse" />
            <div className="mt-2 h-4 w-1/2 rounded bg-muted animate-pulse" />
            <div className="mt-4 h-6 w-full rounded bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
