import { describe, expect, it } from "vitest";
import { destination, lonToTile, msToKmh, wrapLon } from "./geo";

describe("wrapLon", () => {
  it("wraps past 180", () => {
    expect(wrapLon(190)).toBeCloseTo(-170);
  });
});

describe("destination", () => {
  it("moves north by about one degree of latitude per 111.32 km", () => {
    const next = destination(46.7712, 23.6236, 0, 111_320);
    expect(next.lat).toBeCloseTo(47.7712, 3);
    expect(next.lon).toBeCloseTo(23.6236, 3);
  });
});

describe("lonToTile", () => {
  it("puts the prime meridian on tile 0 at zoom 0", () => {
    expect(lonToTile(0, 0)).toBeCloseTo(0.5);
  });
});

describe("msToKmh", () => {
  it("converts", () => {
    expect(msToKmh(10)).toBeCloseTo(36);
  });
});
