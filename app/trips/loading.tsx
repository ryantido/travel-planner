export default function TripsLoading() {
  return (
    <div className="container px-4 py-8 animate-pulse">
      <div className="h-10 w-32 bg-muted rounded mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="h-40 bg-muted rounded" />
        <div className="h-40 bg-muted rounded" />
        <div className="h-40 bg-muted rounded" />
      </div>
    </div>
  );
}
