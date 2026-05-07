"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import { PlaneGeometry, RawShaderMaterial, Timer, Vector2, Vector3 } from "three";

import { solidFillFragmentShader, solidFillVertexShader } from "./three-fixed-background.shaders";

type UniformPack = {
  uTime: { value: number };
  uAspect: { value: number };
  uParallax: { value: Vector2 };
  uIntro: { value: number };
  uBaseRgb: { value: Vector3 };
  uBlobScale: { value: number };
  uScrollProgress: { value: number };
};

function cssVarToRgb01(varName: string): [number, number, number] {
  const probe = document.createElement("div");
  probe.style.cssText =
    "position:absolute;visibility:hidden;pointer-events:none";
  probe.style.color = `var(${varName})`;
  document.body.appendChild(probe);
  const rgb = getComputedStyle(probe).color;
  document.body.removeChild(probe);
  const m = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(rgb);
  if (!m) return [1, 1, 1];
  return [Number(m[1]) / 255, Number(m[2]) / 255, Number(m[3]) / 255];
}

function syncBackgroundUniformToCss(pack: UniformPack) {
  const [r, g, b] = cssVarToRgb01("--background");
  pack.uBaseRgb.value.set(r, g, b);
}

function createUniformPack(): UniformPack {
  return {
    uTime: { value: 0 },
    uAspect: { value: 1 },
    uParallax: { value: new Vector2(0, 0) },
    uIntro: { value: 0 },
    uBaseRgb: { value: new Vector3(1, 1, 1) },
    uBlobScale: { value: 1 },
    uScrollProgress: { value: 0 },
  };
}

function createFullscreenBridge() {
  let material: RawShaderMaterial | null = null;
  let pack: UniformPack | null = null;
  const listeners = new Set<() => void>();

  function emit() {
    for (const l of listeners) l();
  }

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getMaterial: () => material,
    uniformPack(): UniformPack | null {
      return pack;
    },
    mount() {
      pack = createUniformPack();
      syncBackgroundUniformToCss(pack);
      material = new RawShaderMaterial({
        uniforms: {
          uBaseRgb: pack.uBaseRgb,
          uTime: pack.uTime,
          uAspect: pack.uAspect,
          uParallax: pack.uParallax,
          uIntro: pack.uIntro,
          uBlobScale: pack.uBlobScale,
          uScrollProgress: pack.uScrollProgress,
        },
        vertexShader: solidFillVertexShader,
        fragmentShader: solidFillFragmentShader,
        depthTest: false,
        depthWrite: false,
      });
      emit();
    },
    dispose() {
      material?.dispose();
      material = null;
      pack = null;
      emit();
    },
  };
}

const fullscreenPlaneGeometry = new PlaneGeometry(2, 2);

const INTRO_SECONDS = 1.15;

function FullscreenShaderPass() {
  const reduceMotionRef = useRef(false);
  const timerRef = useRef<Timer | null>(null);
  const bridge = useMemo(() => createFullscreenBridge(), []);

  useLayoutEffect(() => {
    const timer = new Timer();
    timer.connect(document);
    timerRef.current = timer;
    return () => {
      timer.dispose();
      timerRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    bridge.mount();
    return () => bridge.dispose();
  }, [bridge]);

  useEffect(() => {
    const sync = () => {
      const pack = bridge.uniformPack();
      if (pack) syncBackgroundUniformToCss(pack);
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, [bridge]);

  const material = useSyncExternalStore(
    bridge.subscribe,
    bridge.getMaterial,
    bridge.getMaterial,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = mq.matches;
    const onChange = () => {
      reduceMotionRef.current = mq.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const hoverNone = window.matchMedia("(hover: none)");
    const sync = () => {
      const pack = bridge.uniformPack();
      if (!pack) return;
      const hasTouch = navigator.maxTouchPoints > 0;
      pack.uBlobScale.value =
        hasTouch || coarsePointer.matches || hoverNone.matches ? 2.45 : 1;
    };

    sync();
    coarsePointer.addEventListener("change", sync);
    hoverNone.addEventListener("change", sync);
    return () => {
      coarsePointer.removeEventListener("change", sync);
      hoverNone.removeEventListener("change", sync);
    };
  }, [bridge]);

  const parallaxStrength = 0.00022;

  useFrame((state) => {
    const timer = timerRef.current;
    if (!timer) return;
    timer.update();

    const pack = bridge.uniformPack();
    if (!pack) return;
    pack.uAspect.value =
      state.size.width / Math.max(state.size.height, 1e-6);
    const elapsed = timer.getElapsed();
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1,
    );
    pack.uScrollProgress.value = Math.min(
      1,
      Math.max(0, window.scrollY / maxScroll),
    );

    if (reduceMotionRef.current) {
      pack.uParallax.value.set(0, 0);
      pack.uIntro.value = 1;
      return;
    }
    pack.uParallax.value.set(
      -window.scrollX * parallaxStrength,
      -window.scrollY * parallaxStrength,
    );
    pack.uIntro.value = Math.min(1, elapsed / INTRO_SECONDS);
    if (document.visibilityState === "hidden") return;
    pack.uTime.value = elapsed;
  });

  if (!material) return null;

  return (
    <mesh
      geometry={fullscreenPlaneGeometry}
      material={material}
      frustumCulled={false}
    />
  );
}

export function ThreeFixedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-background"
    >
      <Canvas
        className="absolute inset-0 size-full bg-transparent"
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <FullscreenShaderPass />
      </Canvas>
    </div>
  );
}
