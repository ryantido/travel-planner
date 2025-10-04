"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";

export default async function updateItinerary(
  tripId: string,
  newOrder: string[]
) {
  const session = await auth();
  if (!session) {
    redirect("/?unauthorized=1");
  }

  await prisma.$transaction(
    newOrder.map((locationId: string, key: number) =>
      prisma.location.update({
        where: {
          id: locationId,
        },
        data: {
          order: key,
        },
      })
    )
  );
}
