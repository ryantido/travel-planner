import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function TripsPage() {
  const session = await auth();
  if (!session) {
    redirect("/?unauthorized=1")
  }
  return <div>page</div>;
}
