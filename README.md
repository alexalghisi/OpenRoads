# OpenRoads

Drive a car on **real streets, worldwide**. The map is
[OpenStreetMap](https://www.openstreetmap.org/copyright) — open data, no Google
key, no account.

This is not GTA photogrammetry. It is an honest top-down car on the same tiles
you already know from OSM, with arrow keys / WASD, city warps, and optional
geolocation. Built for a desktop, with large round buttons, because phone
twitch games are a different sport.

**React 19 · TypeScript (strict) · Vite 8 · Tailwind CSS 4 · Zustand · Vitest ·
Playwright**

---

## Why this exists

“Drive anywhere on Earth” is usually a $70 disc or a locked API. OpenRoads is
the forkable version: lat/lon math in [`src/lib/geo.ts`](src/lib/geo.ts), cities
in [`src/lib/cities.ts`](src/lib/cities.ts), tiles from
`tile.openstreetmap.org`.

Hold **↑** or **W**. Steer with ← →. Pick **Tokyo**, **Cape Town**, **Sydney**,
or **My streets**.

Please keep OSM attribution when you fork. Be kind to their tile servers.

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
| Email    | [alessandro@onlineparentingprograms.com](mailto:alessandro@onlineparentingprograms.com) |
| Location | Cluj-Napoca, Romania · open to remote / EU / US-friendly timezones                      |

**Hiring?** Open an issue, message me on LinkedIn, or email
[alessandro@onlineparentingprograms.com](mailto:alessandro@onlineparentingprograms.com).

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
