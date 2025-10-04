export default function TripsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-10 w-32 bg-muted rounded mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          Array.from({ length: 9 }).map((_, i) => <div key={i} className="h-40 bg-muted rounded-xl" />)
        }
        
        {/* <div className="h-40 bg-muted rounded" />
        <div className="h-40 bg-muted rounded" /> */}
      </div>
    </div>
  );
}
