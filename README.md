# The StdLib Landscape

A visually rich, interactive 3D terrain demo built with Next.js and React Three Fiber, powered by real StdLib numerical functions.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![Three.js](https://img.shields.io/badge/three.js-0.183-111111?logo=threedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![StdLib](https://img.shields.io/badge/StdLib-Numerical%20Building%20Blocks-0A7C86)

---

## What This Project Does

- Generates a $50 \times 50$ terrain grid in real time.
- Combines two sine-wave fields for landscape-like elevation.
- Adds Gaussian random noise for natural variation.
- Normalizes average height so the terrain remains centered.
- Exposes live controls for Frequency, Amplitude, Noise, and Seed.

---

## Why StdLib Here?

This project intentionally uses focused StdLib modules instead of one large math utility package.

| Package | Purpose in this app |
| --- | --- |
| `@stdlib/math-base-special-sin` | Computes smooth wave patterns for terrain shape. |
| `@stdlib/random-base-normal` | Creates seeded Gaussian noise for repeatable randomness. |
| `@stdlib/stats-base-nanmean` | Calculates mean terrain height and recenters vertices. |

<details>
<summary><strong>Flow of terrain generation</strong> (click to expand)</summary>

1. Build normalized coordinate grid.
2. Compute two wave layers with `sin(...)`.
3. Add seeded Gaussian noise to each vertex.
4. Compute average with `nanmean(...)`.
5. Subtract average from all vertices.
6. Push updated heights into the Three.js geometry.

</details>

---

## Controls

| Control | Range | Effect |
| --- | --- | --- |
| Frequency | `0.5 - 6` | Increases/decreases terrain wave density. |
| Amplitude | `0.3 - 2.8` | Controls peak and valley height. |
| Noise | `0 - 0.7` | Adds random roughness. |
| Seed | `1 - 1000` | Changes the deterministic random pattern. |

---

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- three
- @react-three/fiber
- @react-three/drei
- StdLib targeted numerical modules

---

## Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 3. Lint and build

```bash
npm run lint
npm run build
```

### 4. Run production server

```bash
npm run start
```

---

## Project Structure

```text
assignment/
|-- app/
|   |-- globals.css
|   |-- layout.tsx
|   `-- page.tsx
|-- components/
|   `-- templates/
|       `-- DashboardTemplate.tsx
|-- package.json
`-- README.md
```

---

## Main Logic Reference

- Terrain math + StdLib integration: `components/templates/DashboardTemplate.tsx`
- Page entry point: `app/page.tsx`

---

## Notes

- Randomness is seed-based, so terrain can be reproduced by reusing the same seed.
- Vertex normals are recomputed after each update for clean lighting.
- OrbitControls are constrained for a stable viewing experience on desktop and mobile.



