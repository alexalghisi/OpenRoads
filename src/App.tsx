import { useEffect, useRef } from "react";
import { Toaster } from "sonner";
import { AuthorCredit } from "@/components/AuthorCredit";
import { DriveHud } from "@/components/DriveHud";
import { MapView } from "@/components/MapView";
import { WindowToolbar } from "@/components/WindowToolbar";
import { useDriveStore, type DriveKeys } from "@/store/driveStore";

const emptyKeys = (): DriveKeys => ({ up: false, down: false, left: false, right: false });

function applyKey(keys: DriveKeys, code: string, down: boolean): DriveKeys {
  if (code === "ArrowUp" || code === "KeyW") return { ...keys, up: down };
  if (code === "ArrowDown" || code === "KeyS") return { ...keys, down: down };
  if (code === "ArrowLeft" || code === "KeyA") return { ...keys, left: down };
  if (code === "ArrowRight" || code === "KeyD") return { ...keys, right: down };
  return keys;
}

export default function App() {
  const keysRef = useRef<DriveKeys>(emptyKeys());

  useEffect(() => {
    const onDown = (event: KeyboardEvent) => {
      keysRef.current = applyKey(keysRef.current, event.code, true);
    };
    const onUp = (event: KeyboardEvent) => {
      keysRef.current = applyKey(keysRef.current, event.code, false);
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      useDriveStore.getState().tick(dt, keysRef.current);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-desktop p-4 md:p-10">
      <Toaster richColors position="bottom-right" />
      <div
        data-testid="finder-window"
        className="flex h-[min(780px,85vh)] w-full max-w-6xl flex-col overflow-hidden rounded-[12px] border border-black/10 bg-card shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_24px_80px_rgba(0,0,0,0.28)]"
      >
        <WindowToolbar />
        <MapView />
        <DriveHud />
      </div>
      <AuthorCredit />
    </div>
  );
}
