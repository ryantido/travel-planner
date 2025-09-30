"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function PrefetchTrips() {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/trips");
  }, [router]);
  return null;
}
