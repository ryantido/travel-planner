import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import createTrip from "@/lib/actions/create-trip";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/SubmitButton";
import { PrefetchTrips } from "@/components/PrefetchTrips";

export default async function NewTripPage() {
  const session = await auth();
  if (!session) {
    redirect("/?unauthorized=1");
  }
  return (
    <div className="container h-screen mx-auto flex justify-center items-center px-4 py-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>New Trip</CardTitle>
          <CardDescription>Plan your next trip with ease</CardDescription>
        </CardHeader>
        <CardContent>
          <PrefetchTrips />
          <form action={createTrip}>
            <div className="flex flex-col gap-4">
              <div className="grig space-y-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Let's go to Bahamas!"
                  required
                />
              </div>
              <div className="grig space-y-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Type your description here!"
                />
              </div>
              <div className="grig space-y-3">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" name="imageUrl" type="url" placeholder="https://example.com/image.jpg" />
              </div>
              <div className="grid space-y-3 grid-cols-1 md:grid-cols-2 md:space-x-3 md:space-y-0">
                <div className="grig space-y-3">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    defaultValue={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div className="grig space-y-3">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>
              <SubmitButton idleText="Create Trip" pendingText="Creating" />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

