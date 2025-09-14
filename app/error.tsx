"use client";
export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <div className="mx-auto max-w-md py-12 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
      <button className="mt-6 rounded-md border px-4 py-2" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
