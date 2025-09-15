// app/dashboard/complications/loading.tsx
export default function Loading() {
  return (
    <div className="p-4 md:p-6">
      <div className="h-7 w-52 rounded bg-muted animate-pulse" />
      <div className="mt-4 rounded-2xl border p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3">
            <div className="h-4 w-48 rounded bg-muted animate-pulse" />
            <div className="h-6 w-full max-w-[420px] rounded bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
