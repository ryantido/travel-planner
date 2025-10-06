export default function Loading() {
  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-2 animate-pulse">
      <div className="rounded-full animate-spin border-b-2 border-indigo-950 h-12 w-12"></div>
      <p className="text-sm font-medium text-neutral-950">Loading...</p>
    </div>
  );
}
