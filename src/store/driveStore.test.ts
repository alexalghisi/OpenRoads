import { beforeEach, describe, expect, it } from "vitest";
import { useDriveStore } from "./driveStore";

const idle = { up: false, down: false, left: false, right: false };

beforeEach(() => {
  useDriveStore.getState().goToCity("cluj");
});

describe("tick", () => {
  it("moves east from Cluj when facing east and accelerating", () => {
    const before = useDriveStore.getState().lon;
    useDriveStore.setState({ headingDeg: 90, speed: 20 });
    useDriveStore.getState().tick(1, idle);
    expect(useDriveStore.getState().lon).toBeGreaterThan(before);
  });
});

describe("goToCity", () => {
  it("warps to Tokyo and stops", () => {
    useDriveStore.setState({ speed: 10 });
    useDriveStore.getState().goToCity("tokyo");
    expect(useDriveStore.getState().cityId).toBe("tokyo");
    expect(useDriveStore.getState().speed).toBe(0);
    expect(useDriveStore.getState().lat).toBeCloseTo(35.6595);
  });
});
