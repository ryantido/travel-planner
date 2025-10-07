"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, MapIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";

interface transformedLocation {
  country: string;
  formatted_address?: string;
  latitude: number;
  longitude: number;
  name: string;
}

export default function GlobePage() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [visitedLocations, setVisitedLocations] = useState<Set<string>>(
    new Set()
  );
  const [points, setPoints] = useState<transformedLocation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/trips/locations", { cache: "no-store" });
        if (!response.ok) {
          console.error("Failed to fetch locations:", response.status, response.statusText);
          throw new Error(`Failed to fetch locations: ${response.status}`);
        }
        const locations = await response.json();
        console.log("/api/trips/locations ->", locations);

        if (Array.isArray(locations)) {
          setPoints(locations);
          const countries = new Set<string>(
            locations
              .map((loc: transformedLocation) => loc.country)
              .filter((c: string | undefined) => Boolean(c)) as string[]
          );
          console.log("computed countries size:", countries.size);
          setVisitedLocations(countries);
        } else {
          console.error("Unexpected locations payload:", locations);
          setVisitedLocations(new Set());
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.4;
    }
  });
  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl text-center md:text-left font-bold mb-12">
            Your Travel Journey
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  See where you have been...
                </h2>
                <div className="flex justify-center items-center h-[60vh] md:h-[calc(100vh-10rem)] w-full relative">
                  {isLoading ? (
                    <div className="flex flex-col space-y-3 items-center justify-center h-full">
                      <Loader2 className="animate-spin" size={24} />
                      <p className="text-sm text-muted-foreground">
                        Loading your travel Journey...
                      </p>
                    </div>
                  ) : (
                    <Globe
                      ref={globeRef}
                      height={undefined}
                      width={undefined}
                      pointsData={points}
                      pointLat="latitude"
                      pointLng="longitude"
                      pointsMerge
                      pointAltitude={0.1}
                      pointRadius={0.5}
                      pointLabel="name"
                      pointColor={() => "#FF5733"}
                      backgroundColor="rgba(0,0,0,0)"
                      bumpImageUrl="https://unpkg.com/three@0.140.0/examples/textures/land_ocean_ice_cloud_2048.jpg"
                      globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Countries visited</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex flex-col space-y-3 items-center justify-center h-full">
                      <Loader2 className="animate-spin" size={24} />
                      <p className="text-sm text-muted-foreground">
                        Loading your travel Journey...
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="bg-blue-300 p-4 rounded-lg">
                        <p className="text-sm text-blue-600 font-medium">
                          You've visited {visitedLocations.size} Countries
                        </p>
                      </div>
                        <div className="space-y-2 overflow-y-auto pr-2 max-h-[500px]">
                          {Array.from(visitedLocations)
                            .sort()
                            .map((country, key) => (
                              <div
                                key={key}
                                className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors border 
                                border-blue-200"
                              >
                                <MapIcon className="w-6 h-6 text-blue-500 " />
                                <span className="text-blue-900 font-medium select-none">{country}</span>
                              </div>
                            ))}
                        </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
