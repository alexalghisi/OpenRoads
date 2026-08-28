import { useEffect, useRef, useState } from "react";
import { visibleTiles } from "@/lib/geo";
import { useDriveStore } from "@/store/driveStore";

const FALLBACK = { width: 960, height: 620 };

export function MapView() {
  const lat = useDriveStore((state) => state.lat);
  const lon = useDriveStore((state) => state.lon);
  const headingDeg = useDriveStore((state) => state.headingDeg);
  const zoom = useDriveStore((state) => state.zoom);
  const hostRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(FALLBACK);

  useEffect(() => {
    const node = hostRef.current;
    if (node === null) return;
    const measure = () => {
      setSize({ width: node.clientWidth, height: node.clientHeight });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const tiles = visibleTiles(lat, lon, zoom, size.width, size.height);

  return (
    <div
      ref={hostRef}
      data-testid="map-view"
      className="relative min-h-0 flex-1 overflow-hidden bg-[#d4e4d0]"
    >
      {tiles.map((tile) => (
        <img
          key={tile.key}
          alt=""
          src={tile.url}
          width={256}
          height={256}
          draggable={false}
          className="pointer-events-none absolute max-w-none"
          style={{ left: tile.left, top: tile.top }}
        />
      ))}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 -ml-3 -mt-5 h-10 w-6 origin-center"
        style={{ transform: `rotate(${String(headingDeg)}deg)` }}
      >
        <svg viewBox="0 0 24 40" className="drop-shadow">
          <path d="M12 2 22 38 H2 Z" fill="#0f172a" />
          <path d="M12 8 18 34 H6 Z" fill="#38bdf8" />
        </svg>
      </div>
    </div>
  );
}
