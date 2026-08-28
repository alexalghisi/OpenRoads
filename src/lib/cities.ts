export interface City {
  id: string;
  name: string;
  lat: number;
  lon: number;
  headingDeg: number;
}

export const CITIES: City[] = [
  { id: "cluj", name: "Cluj-Napoca", lat: 46.7712, lon: 23.6236, headingDeg: 90 },
  { id: "paris", name: "Paris", lat: 48.8566, lon: 2.3522, headingDeg: 0 },
  { id: "nyc", name: "New York", lat: 40.758, lon: -73.9855, headingDeg: 180 },
  { id: "tokyo", name: "Tokyo", lat: 35.6595, lon: 139.7004, headingDeg: 45 },
  { id: "cape-town", name: "Cape Town", lat: -33.9249, lon: 18.4241, headingDeg: 270 },
  { id: "sydney", name: "Sydney", lat: -33.8688, lon: 151.2093, headingDeg: 0 },
];

export function findCity(id: string): City {
  return CITIES.find((city) => city.id === id) ?? CITIES[0]!;
}
