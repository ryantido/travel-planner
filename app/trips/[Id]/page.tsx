import { auth } from "@/auth";
import TripDetails from "@/components/TripDetails";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: { params: { Id: string } }) {
  const { Id } = await params;
  const session = await auth();

  if (!session) {
    redirect("/?unauthorized=1");
  }

  const trip = await prisma.trip.findFirst({
    where: {
      id: Id,
      userId: session.user!.id,
    },
    include: {
      locations: true,
    },
  });

  if (!trip) {
    notFound();
  }

  return <TripDetails trip={trip} />;
}
