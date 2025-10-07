import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sortTrips } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { ExternalLink, Plane, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function TripsPage() {
  const session = await auth();
  const trips = await prisma.trip.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  const { upCommingTrips, pastTrips, activeTrips } = sortTrips(trips);

  if (!session) {
    redirect("/?unauthorized=1");
  }
  return (
    <div className="container mx-auto space-y-4 px-3 py-8">
      <Tabs defaultValue="recent">
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 justify-between mb-4">
          <h1 className="text-2xl font-bold">My Trips — Velora</h1>
          <TabsList>
            <TabsTrigger value="recent">Recent & All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="recent">

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl border-b flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:justify-between">
            <p>
              Welcome back,{" "}
              <span className="capitalize">{session?.user?.name}</span>
            </p>
            <p className="text-base font-medium max-lg:text-right max-sm:text-left whitespace-pre-wrap">
              You have {trips.length ? trips.length : "no"} trip
              {trips.length === 1 ? "" : "s"} planned{!trips.length && " yet"}
              {activeTrips.length > 0 && `, ${activeTrips.length} active`}
              {upCommingTrips.length > 0 &&
                `, ${upCommingTrips.length} upcomming`}
              {pastTrips.length > 0 && ` and ${pastTrips.length} past`}
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {trips.length === 0 ? (
            <div className="text-center space-y-4 py-4">
              <p>Plan your first trip now!</p>
              <Link href="/trips/new">
                <Button>Create Trip</Button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-medium flex justify-between mb-4">
                Your recent trips
                {trips.length > 0 && (
                  <Link href="/trips/new">
                    <Button>Plan a Trip</Button>
                  </Link>
                )}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {trips
                  .reverse()
                  .slice(0, 4)
                  .map((trip) => (
                    <Card key={trip.id} className="flex flex-col">
                      <CardHeader>
                        <CardTitle className="line-clamp-1">
                          {trip.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-1">
                        {trip.imageUrl ? (
                          <Image
                            src={trip.imageUrl as string}
                            alt={trip.title}
                            objectFit="contain"
                            className="w-full h-52 max-h-52 rounded-md"
                            width={300}
                            height={300}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="/file.svg"
                          />
                        ) : (
                          <div className="w-full h-52 max-h-52 bg-gray-200 flex flex-col items-center justify-center space-y-3 rounded-md">
                            <Plane size={24} />
                            <p className="text-sm font-medium">
                              No image uploaded
                            </p>
                          </div>
                        )}
                        <CardDescription className="my-4 line-clamp-3">
                          {trip.description || "No description provided"}
                        </CardDescription>
                        <Link
                          href={`/trips/${trip.id}`}
                          className="grid grow items-end"
                        >
                          <Button>
                            View details
                            <ExternalLink size={16} />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
      {trips.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl border-b flex items-center justify-between">
              <p>Take a look at all your planned trips</p>
              <p className="text-base font-medium max-lg:text-right whitespace-pre-wrap">
                You have {trips.length} trip
                {trips.length === 1 ? "" : "s"} planned
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-xl font-medium flex justify-between mb-4">
              Your planned trips
              <Link href="/trips/new">
                <Button>Plan a Trip</Button>
              </Link>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {trips.map((trip) => (
                <Card key={trip.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{trip.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    {trip.imageUrl ? (
                      <Image
                        src={trip.imageUrl as string}
                        alt={trip.title}
                        objectFit="contain"
                        className="w-full h-52 max-h-52 rounded-md"
                        width={300}
                        height={300}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-52 max-h-52 bg-gray-200 flex flex-col items-center justify-center space-y-3 rounded-md">
                        <Plane size={24} />
                        <p className="text-sm font-medium">No image uploaded</p>
                      </div>
                    )}
                    <CardDescription className="my-4 line-clamp-3">
                      {trip.description || "No description provided"}
                    </CardDescription>
                    <Link
                      href={`/trips/${trip.id}`}
                      className="grid grow items-end"
                    >
                      <Button>
                        View details
                        <ExternalLink size={16} />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      {/* {!trips.} */}
        </TabsContent>
        <TabsContent value="active">

      {activeTrips.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl border-b flex items-center justify-between">
              <p>Take a look at your active trips</p>
              <p className="text-base font-medium max-lg:text-right whitespace-pre-wrap">
                You have {activeTrips.length} active trip
                {activeTrips.length === 1 ? "" : "s"}
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-xl font-medium flex justify-between mb-4">
              Your active trips
              <Link href="/trips/new">
                <Button>Plan a Trip</Button>
              </Link>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {activeTrips.map((trip) => (
                <Card key={trip.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{trip.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    {trip.imageUrl ? (
                      <Image
                        src={trip.imageUrl as string}
                        alt={trip.title}
                        objectFit="contain"
                        className="w-full h-52 max-h-52 rounded-md"
                        width={300}
                        height={300}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-52 max-h-52 bg-gray-200 flex flex-col items-center justify-center space-y-3 rounded-md">
                        <Plane size={24} />
                        <p className="text-sm font-medium">No image uploaded</p>
                      </div>
                    )}
                    <CardDescription className="my-4 line-clamp-3">
                      {trip.description || "No description provided"}
                    </CardDescription>
                    <Link
                      href={`/trips/${trip.id}`}
                      className="grid grow items-end"
                    >
                      <Button>
                        View details
                        <ExternalLink size={16} />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
        </TabsContent>
        <TabsContent value="upcoming">

      {upCommingTrips.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl border-b flex items-center justify-between">
              <p>Take a look at your upcomming trips</p>
              <p className="text-base font-medium max-lg:text-right whitespace-pre-wrap">
                You have {upCommingTrips.length} upcomming trip
                {upCommingTrips.length === 1 ? "" : "s"}
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-xl font-medium flex justify-between mb-4">
              Your upcomming trips
              <Link href="/trips/new">
                <Button>Plan a Trip</Button>
              </Link>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {upCommingTrips.map((trip) => (
                <Card key={trip.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{trip.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    {trip.imageUrl ? (
                      <Image
                        src={trip.imageUrl as string}
                        alt={trip.title}
                        objectFit="contain"
                        className="w-full h-52 max-h-52 rounded-md"
                        width={300}
                        height={300}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-52 max-h-52 bg-gray-200 flex flex-col items-center justify-center space-y-3 rounded-md">
                        <Plane size={24} />
                        <p className="text-sm font-medium">No image uploaded</p>
                      </div>
                    )}
                    <CardDescription className="my-4 line-clamp-3">
                      {trip.description || "No description provided"}
                    </CardDescription>
                    <Link
                      href={`/trips/${trip.id}`}
                      className="grid grow items-end"
                    >
                      <Button>
                        View details
                        <ExternalLink size={16} />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
        </TabsContent>
        <TabsContent value="past">

      {pastTrips.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl border-b flex items-center justify-between">
              <p>Take a look at your past trips</p>
              <p className="text-base font-medium max-lg:text-right whitespace-pre-wrap">
                You have {pastTrips.length} past trip
                {pastTrips.length === 1 ? "" : "s"}
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-xl font-medium flex justify-between mb-4">
              Your past trips
              <Link href="/trips/new">
                <Button>Plan a Trip</Button>
              </Link>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {pastTrips.map((trip) => (
                <Card key={trip.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{trip.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    {trip.imageUrl ? (
                      <Image
                        src={trip.imageUrl as string}
                        alt={trip.title}
                        objectFit="contain"
                        className="w-full h-52 max-h-52 rounded-md"
                        width={300}
                        height={300}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-52 max-h-52 bg-gray-200 flex flex-col items-center justify-center space-y-3 rounded-md">
                        <Plane size={24} />
                        <p className="text-sm font-medium">No image uploaded</p>
                      </div>
                    )}
                    <CardDescription className="my-4 line-clamp-3">
                      {trip.description || "No description provided"}
                    </CardDescription>
                    <Link
                      href={`/trips/${trip.id}`}
                      className="grid grow items-end"
                    >
                      <Button>
                        View details
                        <ExternalLink size={16} />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
        </TabsContent>
      </Tabs>
    </div>
  );
}