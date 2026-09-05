import { lazy, Suspense, useEffect, useState } from "react";
import { configImage } from "@/content/site";
import type { ScenePiece } from "./ConfigScene";

const ConfigScene = lazy(() => import("./ConfigScene"));

/**
 * Client-only mount for the hero configurator stage. Always starts as a fast
 * static photo of the selected piece — the live 3D scene only mounts once the
 * visitor explicitly opts in via `active` (see the "Explore in 3D" toggle in
 * Hero.tsx). Nothing 3D loads, on any device, until asked for.
 */
export function ConfigStage({
  piece,
  finish,
  tint,
  scale,
  label,
  active,
}: {
  piece: ScenePiece;
  finish: string;
  tint: string;
  scale: number;
  label: string;
  active: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const show3D = mounted && active;

  return (
    <div className="relative h-full w-full" role="img" aria-label={label}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brass) 24%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* Static image: the default state, and the only state until opted in.
          On first mount it eases from a slight zoom to rest — like a lens
          settling — then holds. */}
      <img
        src={configImage(piece, finish)}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        style={{
          transition: "opacity 500ms var(--ease-quiet), transform 1800ms var(--ease-quiet)",
        }}
        className={`absolute inset-0 h-full w-full object-cover ${
          show3D ? "opacity-0" : "opacity-100"
        } ${mounted ? "scale-100" : "scale-[1.06]"}`}
      />

      {show3D ? (
        <Suspense fallback={null}>
          <ConfigScene piece={piece} tint={tint} scale={scale} />
        </Suspense>
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(115% 85% at 50% 45%, transparent 55%, color-mix(in oklab, var(--background) 55%, transparent) 100%)",
        }}
      />
    </div>
  );
}
