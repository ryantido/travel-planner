"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

const geocodeAddress = async (address: string) => {
  const apikey = process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY!;

  const URL = `https://us1.locationiq.com/v1/search.php?key=${apikey}&q=${encodeURIComponent(
    address
  )}&format=json`;

  try {
    const response = await fetch(URL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Failed to geocode address: ${data.error} - ${response.status}`
      );
    }

    if (data.length === 0) {
      throw new Error("Address not found!");
    }

    const { lat, lon, display_name } = data[0];

    return {
      lat,
      lon,
      name: display_name,
    };
  } catch (error) {
    console.error("Failed to geocode the address", error);
    throw new Error("Failed to geocode the address");
  }
};

export default async function createLocation(
  formData: FormData,
  tripId: string
) {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const addressRaw = formData.get("address")?.toString();
  const descriptionRaw = formData.get("description");

  const address = typeof addressRaw === "string" ? addressRaw.trim() : "";
  const description =
    typeof descriptionRaw === "string" ? descriptionRaw.trim() : "";

  if (!address) {
    throw new Error("Address is required");
  }

  const { lat, lon, name } = await geocodeAddress(address);

  const count = await prisma.location.count({ where: { tripId } });

  await prisma.location.create({
    data: {
      name,
      description,
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      order: count,
      trip: {
        connect: {
          id: tripId,
        },
      },
    },
  });

  redirect(`/trips/${tripId}`);
}
