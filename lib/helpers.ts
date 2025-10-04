import { Trip } from "./generated/prisma";

// export interface TripLike extends Trip {
//   // endDate: Date | string;
//   // startDate: Date | string;
// }

export function sortTrips(trips: Trip[] | null | undefined) {
  if (!Array.isArray(trips) || trips.length === 0) {
    return { upCommingTrips: [], pastTrips: [], activeTrips: [] };
  }

  const copy = [...trips];
  const now = new Date();

  const getTime = (d: Date | string) => new Date(d).getTime();

  const sorted = copy.sort(
    (a, b) => getTime(a.startDate) - getTime(b.startDate)
  );
  const upCommingTrips = sorted.filter(
    (t) => getTime(t.startDate) >= now.getTime()
  );
  const pastTrips = sorted.filter((t) => getTime(t.endDate) < now.getTime());
  const activeTrips = sorted.filter(
    (t) =>
      getTime(t.startDate) <= now.getTime() &&
      getTime(t.endDate) >= now.getTime()
  );

  return { upCommingTrips, pastTrips, activeTrips };
}
