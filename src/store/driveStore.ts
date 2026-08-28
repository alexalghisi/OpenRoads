import { create } from "zustand";
import { CITIES, findCity } from "@/lib/cities";
import { clamp, destination, MAX_ZOOM, MIN_ZOOM } from "@/lib/geo";

export interface DriveKeys {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

const ACCEL = 10;
const BRAKE = 16;
const DRAG = 3.2;
const MAX_SPEED = 22;
const STEER = 78;

interface DriveState {
  cityId: string;
  lat: number;
  lon: number;
  headingDeg: number;
  speed: number;
  zoom: number;
  tick: (dt: number, keys: DriveKeys) => void;
  goToCity: (id: string) => void;
  bumpZoom: (delta: number) => void;
  setPosition: (lat: number, lon: number) => void;
}

export const useDriveStore = create<DriveState>((set, get) => ({
  cityId: CITIES[0]!.id,
  lat: CITIES[0]!.lat,
  lon: CITIES[0]!.lon,
  headingDeg: CITIES[0]!.headingDeg,
  speed: 0,
  zoom: 16,

  tick: (dt, keys) => {
    const state = get();
    let speed = state.speed;
    if (keys.up) speed += ACCEL * dt;
    if (keys.down) speed -= BRAKE * dt;
    if (!keys.up && !keys.down) {
      if (speed > 0) speed = Math.max(0, speed - DRAG * dt);
      if (speed < 0) speed = Math.min(0, speed + DRAG * dt);
    }
    speed = clamp(speed, 0, MAX_SPEED);

    const steerScale = 0.22 + speed / MAX_SPEED;
    let headingDeg = state.headingDeg;
    if (keys.left) headingDeg -= STEER * dt * steerScale;
    if (keys.right) headingDeg += STEER * dt * steerScale;
    headingDeg = ((headingDeg % 360) + 360) % 360;

    const moved = destination(state.lat, state.lon, headingDeg, speed * dt);
    set({ speed, headingDeg, lat: moved.lat, lon: moved.lon });
  },

  goToCity: (id) => {
    const city = findCity(id);
    set({
      cityId: city.id,
      lat: city.lat,
      lon: city.lon,
      headingDeg: city.headingDeg,
      speed: 0,
    });
  },

  bumpZoom: (delta) => {
    const zoom = clamp(get().zoom + delta, MIN_ZOOM, MAX_ZOOM);
    set({ zoom });
  },

  setPosition: (lat, lon) => set({ lat, lon, speed: 0, cityId: "here" }),
}));
