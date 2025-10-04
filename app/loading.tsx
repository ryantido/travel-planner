export default function Loading() {
  return (
    <div className="grid place-items-center h-screen space-y-4 animate-pulse">
      <div className="rounded-full animate-spin border-b-2 border-indigo-950 h-12 w-12"></div>
      <p className="text-sm font-medium text-neutral-950">Loading...</p>
    </div>
  );
}
