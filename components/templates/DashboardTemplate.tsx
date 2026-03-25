'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import sin from '@stdlib/math-base-special-sin';
import nanmean from '@stdlib/stats-base-nanmean';
import normal from '@stdlib/random-base-normal';
import * as THREE from 'three';

type TerrainProps = {
    frequency: number;
    amplitude: number;
    noise: number;
    seed: number;
};

const GRID_POINTS = 50;
const TERRAIN_SIZE = 14;

function TerrainMesh({ frequency, amplitude, noise, seed }: TerrainProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    const { heights, averageHeight } = useMemo(() => {
        const values = new Float32Array(GRID_POINTS * GRID_POINTS);
        const gaussian = normal.factory(0, 1, { seed });

        let index = 0;
        for (let y = 0; y < GRID_POINTS; y += 1) {
            for (let x = 0; x < GRID_POINTS; x += 1) {
                const nx = x / (GRID_POINTS - 1) - 0.5;
                const ny = y / (GRID_POINTS - 1) - 0.5;

                const waveA = sin((nx * frequency * Math.PI * 4) + (ny * 1.7));
                const waveB = sin((ny * frequency * Math.PI * 4) - (nx * 1.3));
                const wave = 0.5 * (waveA + waveB);
                const jitter = gaussian() * noise;

                values[index] = amplitude * wave + jitter;
                index += 1;
            }
        }

        const avg = nanmean(values.length, values, 1);
        for (let i = 0; i < values.length; i += 1) {
            values[i] -= avg;
        }

        return {
            heights: values,
            averageHeight: avg,
        };
    }, [amplitude, frequency, noise, seed]);

    useEffect(() => {
        const mesh = meshRef.current;
        if (!mesh) {
            return;
        }

        const geometry = mesh.geometry as THREE.PlaneGeometry;
        const positions = geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < heights.length; i += 1) {
            positions[(i * 3) + 2] = heights[i];
        }

        geometry.attributes.position.needsUpdate = true;
        geometry.computeVertexNormals();
    }, [heights]);

    return (
        <group>
            <mesh ref={meshRef} rotation-x={-Math.PI / 2.3}>
                <planeGeometry args={[TERRAIN_SIZE, TERRAIN_SIZE, GRID_POINTS - 1, GRID_POINTS - 1]} />
                <meshStandardMaterial color="#2dd4bf" metalness={0.2} roughness={0.45} />
            </mesh>
            <mesh position={[0, -2.2 + averageHeight * 0.02, 0]} rotation-x={-Math.PI / 2}>
                <circleGeometry args={[12, 64]} />
                <meshStandardMaterial color="#071127" roughness={1} metalness={0} />
            </mesh>
        </group>
    );
}

function SliderControl({
    id,
    label,
    min,
    max,
    step,
    value,
    onChange,
}: {
    id: string;
    label: string;
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
}) {
    return (
        <label htmlFor={id} className="terrain-control">
            <span>{label}</span>
            <div>
                <input
                    id={id}
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(event) => onChange(Number(event.target.value))}
                />
                <strong>{value.toFixed(2)}</strong>
            </div>
        </label>
    );
}

export function DashboardTemplate() {
    const [frequency, setFrequency] = useState(2.2);
    const [amplitude, setAmplitude] = useState(1.3);
    const [noise, setNoise] = useState(0.18);
    const [seed, setSeed] = useState(131);

    return (
        <main className="stdlib-shell">
            <section className="hero-copy">
                <p className="eyebrow">Three.js + StdLib Terrain</p>
                <h1>The StdLib Landscape</h1>
                <p>
                    50x50 terrain vertices are recomputed from StdLib sine waves and Gaussian noise.
                    Move the controls and the mesh updates instantly.
                </p>
            </section>

            <section className="terrain-stage" aria-label="Interactive 3D terrain preview">
                <Canvas camera={{ position: [5.6, 5, 8], fov: 46 }}>
                    <color attach="background" args={['#020617']} />
                    <fog attach="fog" args={['#020617', 8, 18]} />
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[7, 9, 3]} intensity={1.6} color="#ecfeff" />
                    <directionalLight position={[-4, 2, -6]} intensity={0.55} color="#99f6e4" />

                    <TerrainMesh
                        frequency={frequency}
                        amplitude={amplitude}
                        noise={noise}
                        seed={Math.floor(seed)}
                    />

                    <OrbitControls
                        enablePan={false}
                        minDistance={5}
                        maxDistance={14}
                        minPolarAngle={Math.PI / 5}
                        maxPolarAngle={Math.PI / 2.1}
                    />
                </Canvas>
            </section>

            <section className="terrain-panel" aria-label="Terrain controls">
                <SliderControl
                    id="frequency"
                    label="Frequency"
                    min={0.5}
                    max={6}
                    step={0.1}
                    value={frequency}
                    onChange={setFrequency}
                />
                <SliderControl
                    id="amplitude"
                    label="Amplitude"
                    min={0.3}
                    max={2.8}
                    step={0.1}
                    value={amplitude}
                    onChange={setAmplitude}
                />
                <SliderControl
                    id="noise"
                    label="Noise"
                    min={0}
                    max={0.7}
                    step={0.01}
                    value={noise}
                    onChange={setNoise}
                />
                <SliderControl
                    id="seed"
                    label="Seed"
                    min={1}
                    max={1000}
                    step={1}
                    value={seed}
                    onChange={setSeed}
                />
            </section>
        </main>
    );
}

