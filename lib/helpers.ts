export interface TripLike {
  startDate: Date | string;
  endDate: Date | string;
}

export function sortTrips(trips: TripLike[] | null | undefined) {
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
  const pastTrips = sorted.filter((t) => getTime(t.startDate) < now.getTime());
  const activeTrips = sorted.filter(
    (t) =>
      getTime(t.startDate) <= now.getTime() &&
      getTime(t.endDate) >= now.getTime()
  );

  return { upCommingTrips, pastTrips, activeTrips };
}
