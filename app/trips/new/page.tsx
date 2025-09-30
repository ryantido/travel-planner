import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function NewTripPage() {
  return (
    <div className="container h-screen mx-auto flex justify-center items-center px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>New Trip</CardTitle>
          <CardDescription>Plan your next trip with ease</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
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
                <Label htmlFor="image">Upload Image</Label>
                <Input id="image" name="imageUrl" type="file" />
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
              <Button type="submit">Create Trip</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
