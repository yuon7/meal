import * as Nominatim from "nominatim-browser";

interface GeocodeResults {
  lat: string;
  lon: string;
}

const geoConverter = (
  location: string
): Promise<{ latitude: string; longitude: string } | null> => {
  return Nominatim.geocode({
    q: location,
    addressdetails: true,
  }).then((results: GeocodeResults[]) => {
    if (results.length > 0) {
      const { lat, lon } = results[0];
      return {
        latitude: lat,
        longitude: lon,
      };
    }
    return null;
  });
};

export default geoConverter;
