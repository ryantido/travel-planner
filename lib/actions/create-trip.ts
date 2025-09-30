"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

export default async function createTrip(formData: FormData) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const titleRaw = formData.get("title");
  const descriptionRaw = formData.get("description");
  const imageUrlRaw = formData.get("imageUrl");
  const startDateStr = formData.get("startDate") as string | null;
  const endDateStr = formData.get("endDate") as string | null;

  const title = typeof titleRaw === "string" ? titleRaw.trim() : "";
  const description = typeof descriptionRaw === "string" ? descriptionRaw.trim() : "";
  const imageUrl = typeof imageUrlRaw === "string" ? imageUrlRaw.trim() : "";

  if (!title) {
    throw new Error("Title is required");
  }
  if (!startDateStr || !endDateStr) {
    throw new Error("Start and end dates are required");
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error("Invalid date format");
  }
  if (endDate < startDate) {
    throw new Error("End date must be on or after start date");
  }

  await prisma.trip.create({
    data: {
      title,
      description: description || undefined,
      imageUrl: imageUrl || undefined,
      startDate,
      endDate,
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  redirect("/trips");
}
