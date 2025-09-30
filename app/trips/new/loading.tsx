export default function NewTripLoading() {
  return (
    <div className="container h-screen mx-auto flex justify-center items-center px-4">
      <div className="w-full max-w-lg animate-pulse">
        <div className="h-8 w-40 bg-muted rounded mb-2" />
        <div className="h-5 w-64 bg-muted rounded mb-6" />
        <div className="space-y-4">
          <div className="h-10 bg-muted rounded" />
          <div className="h-24 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
          </div>
          <div className="h-10 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
