import { Loader2 } from "lucide-react";

export default function ItineraryLoadingPage() {
  return (
    <div className="flex flex-col space-y-3 items-center justify-center h-full">
      <Loader2 className="animate-spin" size={24} />
      <p className="text-sm text-muted-foreground">
        Loading...
      </p>
    </div>
  )
}
