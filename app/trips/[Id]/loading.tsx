import { Loader2 } from "lucide-react";

export default function TripIdLoadingPage() {
  return (
    <div className="flex flex-col space-y-3 items-center justify-center h-screen">
      <Loader2 className="animate-spin" size={24} />
      <p className="text-sm text-muted-foreground">
        Loading...
      </p>
    </div>
  )
}
