import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function TripsPage() {
  const session = await auth();
  if (!session) {
    redirect("/?unauthorized=1");
  }
  return (
    <div className="container space-y-4 px-3 py-8">
      <Link href="/trips/new">
        <Button>New Trip</Button>
      </Link>
    </div>
  );
}
