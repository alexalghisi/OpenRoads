import { Button } from "@/components/ui/button";
import { CITIES } from "@/lib/cities";
import { msToKmh } from "@/lib/geo";
import { useDriveStore } from "@/store/driveStore";

export function DriveHud() {
  const cityId = useDriveStore((state) => state.cityId);
  const lat = useDriveStore((state) => state.lat);
  const lon = useDriveStore((state) => state.lon);
  const speed = useDriveStore((state) => state.speed);
  const zoom = useDriveStore((state) => state.zoom);
  const goToCity = useDriveStore((state) => state.goToCity);
  const bumpZoom = useDriveStore((state) => state.bumpZoom);
  const setPosition = useDriveStore((state) => state.setPosition);

  const locate = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition(position.coords.latitude, position.coords.longitude);
    });
  };

  return (
    <div className="flex shrink-0 flex-col gap-2 border-t border-black/5 bg-titlebar px-3 py-2">
      <div className="flex flex-wrap items-center gap-1">
        {CITIES.map((city) => (
          <Button
            key={city.id}
            variant={city.id === cityId ? "default" : "outline"}
            size="sm"
            className="h-7 rounded-md px-2 text-[12px]"
            data-testid={`city-${city.id}`}
            onClick={() => goToCity(city.id)}
          >
            {city.name}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-md px-2 text-[12px]"
          onClick={locate}
        >
          My streets
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-md px-2 text-[12px]"
          data-testid="zoom-out"
          onClick={() => bumpZoom(-1)}
        >
          −
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-md px-2 text-[12px]"
          data-testid="zoom-in"
          onClick={() => bumpZoom(1)}
        >
          +
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
        <span data-testid="drive-status">
          {msToKmh(speed).toFixed(0)} km/h · z{String(zoom)} · {lat.toFixed(4)}, {lon.toFixed(4)}
        </span>
        <span>
          Arrows or WASD ·{" "}
          <a
            className="underline-offset-2 hover:underline"
            href="https://www.openstreetmap.org/copyright"
          >
            © OpenStreetMap
          </a>
        </span>
      </div>
    </div>
  );
}
