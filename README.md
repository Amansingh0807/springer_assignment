# The StdLib Landscape

An interactive 3D terrain showcase built with Next.js, React Three Fiber, and targeted StdLib packages.

## Features

- 50x50 vertex terrain generated in real time.
- Elevation computed from StdLib sine waves plus Gaussian noise.
- Average height normalization using StdLib nanmean.
- Live controls for frequency, amplitude, noise, and random seed.
- Responsive, production-ready Next.js app with App Router.

## Tech Stack

- Next.js 16
- React 19
- three
- @react-three/fiber
- @react-three/drei
- @stdlib/math-base-special-sin
- @stdlib/random-base-normal
- @stdlib/stats-base-nanmean

## Project Structure

```text
assignment/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── components/
    └── templates/
        └── DashboardTemplate.tsx
```

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run lint
npm run build
```

