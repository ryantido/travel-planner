import { auth } from "@/auth";
import { getCountryFromCoordonate } from "@/lib/actions/geocode";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const locations = await prisma.location.findMany({
      where: {
        trip: {
          userId: session.user?.id,
        },
      },
      select: {
        name: true,
        latitude: true,
        longitude: true,
        trip: {
          select: {
            title: true,
          },
        },
      },
    });

    // Geocode sequentially to avoid hitting provider rate limits.
    const transformedLocations: Array<{
      name: string;
      latitude: number;
      longitude: number;
      country: string;
    }> = [];

    for (const loc of locations) {
      try {
        const geocodeResult = await getCountryFromCoordonate(
          loc.latitude,
          loc.longitude
        );
        transformedLocations.push({
          name: `${loc.trip.title} - ${geocodeResult.formatted_address}`,
          latitude: loc.latitude,
          longitude: loc.longitude,
          country: geocodeResult.country,
        });
      } catch (e) {
        console.error("Reverse geocode failed for location, falling back to Unknown country", {
          latitude: loc.latitude,
          longitude: loc.longitude,
          error: e,
        });
        // Fall back to Unknown so the endpoint still returns useful data
        transformedLocations.push({
          name: `${loc.trip.title} - (${loc.latitude}, ${loc.longitude})`,
          latitude: loc.latitude,
          longitude: loc.longitude,
          country: "Unknown",
        });
      }
    }

    return NextResponse.json(transformedLocations);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
