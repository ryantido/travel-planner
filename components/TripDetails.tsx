"use client";

import { Location, Trip } from "@/lib/generated/prisma";
import {
  Calendar,
  MapIcon,
  NotebookText,
  Plane,
  Plus,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Maps from "./Maps";
import SortableItinerary from "./SortableItinerary";
import { useRouter } from "next/navigation";

type TripWithLocationProps = Trip & {
  locations: Location[];
};

interface TripDetails {
  trip: TripWithLocationProps;
}

export default function TripDetails({ trip }: TripDetails) {
  const router = useRouter();
  const handleTripDeletion = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/trips/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("An error occurred while trying to delete the trip");
        throw new Error("Deletion failed");
      }

      console.log("Trip deleted successfully!");
      router.push("/trips");
    } catch (error) {
      console.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : `An error occurred when fetching API: ${error}`
      );
    }
  };
  return (
    <div className="container min-h-[calc(100dvh-4rem)] mx-auto px-4 py-6 space-y-6">
      <section className="h-72 max-h-72 md:h-96 md:max-h-96 w-full overflow-hidden relative rounded-md">
        {trip?.imageUrl ? (
          // TODO: Remove the dev mode test
          <Image
            src={
              process.env.NODE_ENV === "production"
                ? trip.imageUrl
                : "/placeholder.jpg"
            }
            alt={trip.title}
            fill
            priority
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-72 max-h-72 md:h-96 md:max-h-96 bg-gray-200 flex flex-col items-center justify-center space-y-3 rounded-md">
            <Plane size={24} />
            <p className="text-sm font-medium">No image uploaded</p>
          </div>
        )}
      </section>
      <section className="space-y-6">
        <Card>
          <CardHeader className="flex flex-col gap-y-2 md:flex-row md:justify-between">
            <CardTitle className="text-xl lg:text-2xl font-extrabold">
              <h1 className="line-clamp-3 max-w-5xl">{trip?.title}</h1>
              <p className="font-medium text-base inline-flex w-full items-center space-x-2">
                <Calendar size={18} />
                <span className="self-baseline">
                  {trip?.startDate.toDateString()} —{" "}
                  {trip?.endDate.toDateString()}
                </span>
              </p>
            </CardTitle>
            <CardAction>
              <Link href={`/trips/${trip?.id}/itinarary/new`}>
                <Button>
                  <Plus />
                  Add Location
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="translate-x-2 hover:bg-red-200 hover:text-red-600"
                title="delete trip"
                onClick={() => handleTripDeletion(trip.id)}
              >
                <Trash2 size={18} />
              </Button>
            </CardAction>
            <CardAction></CardAction>
          </CardHeader>
        </Card>
        <Card>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinarary">Itinarary</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <CardTitle className="text-xl lg:text-2xl font-extrabold">
                  Trip Summary
                </CardTitle>
                <CardDescription className="flex items-start space-x-2 mt-3">
                  <Calendar size={18} className="inline-block shrink-0" />
                  <div>
                    <p>Dates</p>
                    <p>
                      {trip?.startDate.toLocaleDateString()} -{" "}
                      {trip?.endDate.toLocaleDateString()}
                    </p>
                    <p>
                      {Math.round(
                        (trip?.endDate.getTime()! -
                          trip?.startDate.getTime()!) /
                          (60 * 60 * 24 * 1000)
                      )}{" "}
                      days
                    </p>
                  </div>
                </CardDescription>
                <CardDescription className="flex items-start space-x-2 mt-3 pt-1">
                  <NotebookText size={18} className="inline-block shrink-0" />
                  <div>
                    <p>Description</p>
                    <p>{trip.description}</p>
                  </div>
                </CardDescription>
                <CardDescription className="flex items-start space-x-2 mt-3">
                  <MapIcon size={18} className="inline-block shrink-0" />
                  <div className="flex flex-col space-y-2 w-full">
                    <p>Destinations</p>
                    <p>
                      {trip?.locations?.length} Location
                      {trip?.locations?.length && trip?.locations.length > 1
                        ? "s."
                        : "."}
                      {trip.locations.length === 0 &&
                        "You can add a new location by using the `Add Itinarary` button above."}
                    </p>
                    <div className="h-72 max-h-72 md:h-96 md:max-h-96">
                      <Maps locations={trip.locations} />
                    </div>
                  </div>
                </CardDescription>
              </TabsContent>
              <TabsContent value="itinarary">
                <CardHeader className="p-0">
                  <CardTitle className="text-xl lg:text-2xl font-extrabold">
                    <h1>Full Itinerary</h1>
                    <CardDescription className="font-medium mb-2">
                      Here you can view and edit your itinerary
                    </CardDescription>
                  </CardTitle>
                  {trip.locations.length === 0 && (
                    <CardAction>
                      <Link href={`/trips/${trip?.id}/itinarary/new`}>
                        <Button>Add new location</Button>
                      </Link>
                    </CardAction>
                  )}
                </CardHeader>
                <CardContent>
                  <SortableItinerary
                    locations={trip.locations}
                    tripId={trip.id}
                  />
                </CardContent>
              </TabsContent>
              <TabsContent value="map">
                <CardDescription className="flex items-start space-x-2 mt-3">
                  <MapIcon size={18} className="inline-block" />
                  <div className="flex flex-col space-y-2 w-full">
                    <p>Destinations</p>
                    <p>
                      {trip?.locations?.length} Location
                      {trip?.locations?.length && trip?.locations.length > 1
                        ? "s."
                        : "."}
                      {trip.locations.length === 0 &&
                        "You can add a new location by using the `Add Itinarary` button above."}
                    </p>
                    <div className="h-72 max-h-72 md:h-[calc(100dvh-40rem)] md:max-h-[calc(100dvh-40rem)] lg:h-[calc(100dvh-25rem)] lg:max-h-[calc(100dvh-25rem)]">
                      <Maps locations={trip.locations} />
                    </div>
                  </div>
                </CardDescription>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
