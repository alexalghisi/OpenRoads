# OpenRoads

Geographic driving on public map data: a top-down vehicle on
[OpenStreetMap](https://www.openstreetmap.org/copyright) tiles, worldwide, with
no Google key and no account.

This is not photogrammetric GTA. It is honest motion on the same cartography
the rest of the web already uses, with WASD / arrows, city warps, and optional
geolocation. OSM attribution is required and shown.

**React 19 · TypeScript (strict) · Vite 8 · Tailwind CSS 4 · Zustand · Vitest ·
Playwright**

---

## Model

Lat/lon and tile math live in [`src/lib/geo.ts`](src/lib/geo.ts). City seeds
live in [`src/lib/cities.ts`](src/lib/cities.ts). Raster tiles come from
`tile.openstreetmap.org`.

Hold **↑** or **W**. Steer with ← →. Warp to Tokyo, Cape Town, Sydney, or the
browser's own coordinates.

---

## Author

### Alessandro Alghisi

Senior Software Engineer · Cluj-Napoca, Romania

**Twice a Google Software Engineering Intern** — Chrome (Kitchener / Waterloo)
and Logs (Mountain View).

|          |                                                                                         |
| -------- | --------------------------------------------------------------------------------------- |
| GitHub   | [github.com/alexalghisi](https://github.com/alexalghisi)                                |
| LinkedIn | [linkedin.com/in/alghisi](https://www.linkedin.com/in/alghisi)                          |
| Email    | [alexalghisi@gmail.com](mailto:alexalghisi@gmail.com)                                   |
| Location | Cluj-Napoca, Romania · open to remote / EU / US-friendly timezones                      |

**Hiring?** Open an issue, message me on LinkedIn, or email
[alexalghisi@gmail.com](mailto:alexalghisi@gmail.com).

---

## Getting started

Requires Node 22 or newer.

```bash
npm install
npm run dev          # http://localhost:5176
```

The window opens on **Cluj-Napoca**. Contact sits under the chrome.

```bash
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run e2e
npm run build
```

## License

MIT · © Alessandro Alghisi

Map data © OpenStreetMap contributors, ODbL.
