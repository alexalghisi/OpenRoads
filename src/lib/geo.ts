export const METERS_PER_DEG_LAT = 111_320;
export const TILE_SIZE = 256;
export const MIN_ZOOM = 13;
export const MAX_ZOOM = 18;

export function wrapLon(lon: number): number {
  return ((((lon + 180) % 360) + 360) % 360) - 180;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Heading 0 is north, 90 is east. */
export function destination(
  lat: number,
  lon: number,
  headingDeg: number,
  meters: number,
): { lat: number; lon: number } {
  const rad = Math.PI / 180;
  const heading = headingDeg * rad;
  const north = meters * Math.cos(heading);
  const east = meters * Math.sin(heading);
  const dLat = north / METERS_PER_DEG_LAT;
  const dLon = east / (METERS_PER_DEG_LAT * Math.cos(lat * rad));
  return { lat: lat + dLat, lon: wrapLon(lon + dLon) };
}

export function lonToTile(lon: number, zoom: number): number {
  return ((lon + 180) / 360) * 2 ** zoom;
}

export function latToTile(lat: number, zoom: number): number {
  const rad = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * 2 ** zoom;
}

export interface MapTile {
  key: string;
  url: string;
  left: number;
  top: number;
}

export function visibleTiles(
  lat: number,
  lon: number,
  zoom: number,
  width: number,
  height: number,
): MapTile[] {
  const x = lonToTile(lon, zoom);
  const y = latToTile(lat, zoom);
  const n = 2 ** zoom;
  const halfW = width / (2 * TILE_SIZE);
  const halfH = height / (2 * TILE_SIZE);
  const x0 = Math.floor(x - halfW) - 1;
  const x1 = Math.ceil(x + halfW) + 1;
  const y0 = Math.floor(y - halfH) - 1;
  const y1 = Math.ceil(y + halfH) + 1;
  const tiles: MapTile[] = [];

  for (let ty = y0; ty <= y1; ty += 1) {
    if (ty < 0 || ty >= n) continue;
    for (let tx = x0; tx <= x1; tx += 1) {
      const wrappedX = ((tx % n) + n) % n;
      tiles.push({
        key: `${String(zoom)}/${String(wrappedX)}/${String(ty)}`,
        url: `https://tile.openstreetmap.org/${String(zoom)}/${String(wrappedX)}/${String(ty)}.png`,
        left: (tx - x) * TILE_SIZE + width / 2,
        top: (ty - y) * TILE_SIZE + height / 2,
      });
    }
  }

  return tiles;
}

export function msToKmh(metersPerSecond: number): number {
  return metersPerSecond * 3.6;
}
