interface GeocodeResult {
  country: string;
  formatted_address: string;
}

export async function getCountryFromCoordonate(
  lat: number,
  long: number
): Promise<GeocodeResult> {
  const apikey = process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY!;

  const URL = `https://us1.locationiq.com/v1/reverse.php?key=${apikey}&lat=${lat}&lon=${long}&format=json&addressdetails=1`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log("Reverse Geocode Response:", data);


    if (!response.ok) {
      throw new Error(
        `Failed to reverse geocode: ${data.error} - ${response.status}`
      );
    }

    const country = data.address.country || "Unknown";
    const formatted_address = data.display_name;

    return {
      country,
      formatted_address,
    };
  } catch (error) {
    console.error("Failed to reverse geocode coordinates", error);
    throw new Error("Failed to reverse geocode coordinates");
  }
}
