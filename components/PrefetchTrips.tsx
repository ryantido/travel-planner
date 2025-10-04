"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function PrefetchTrips({ route = "/trips" }: {route?: string}) {
  const router = useRouter();
  useEffect(() => {
    router.prefetch(route);
  }, [router]);
  return null;
}
