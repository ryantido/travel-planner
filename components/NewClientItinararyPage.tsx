"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { PrefetchTrips } from "./PrefetchTrips";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { SubmitButton } from "./SubmitButton";
import createLocation from "@/lib/actions/create-location";

export default function NewClientItinararyPage({ tripId }: { tripId: string }) {
  return (
    <div className="container h-[calc(100dvh-4rem)] mx-auto flex justify-center items-center px-4 py-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Add new location</CardTitle>
          <CardDescription>
            Order of locations will be based on the order of appearance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PrefetchTrips route={`/trips/${tripId}`} />
          <form action={(formData: FormData) => createLocation(formData, tripId)}>
            <div className="flex flex-col gap-4">
              <div className="grig space-y-3">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
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
              <SubmitButton idleText="Add Location" pendingText="Adding" />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
