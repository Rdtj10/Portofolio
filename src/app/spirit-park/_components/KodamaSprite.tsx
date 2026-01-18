"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface KodamaSpriteProps {
  id: string;
  index: number;
}

/* ==== REAL SPRITESHEET CONFIG ==== */
const COLS = 5;
const ROWS = 3;
const NATIVE_SIZE = 128;
const DISPLAY_TARGET = 48;

const SPRITE_ROW = {
  IDLE: 0,
  WALK_A: 1,
  WALK_B: 2,
};

export const KodamaSprite = ({ index }: KodamaSpriteProps) => {
  const npcRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!npcRef.current || !spriteRef.current) return;

    const npc = npcRef.current;
    const sprite = spriteRef.current;

    /* ==== FRAME ENGINE ==== */
    let frame = 0;
    let elapsed = 0;
    let fps = 10;
    let playing = false;
    let row = SPRITE_ROW.IDLE;

    const update = () => {
      sprite.style.backgroundPosition = `-${frame * NATIVE_SIZE}px -${row * NATIVE_SIZE}px`;
    };

    const tick = () => {
      if (!playing) return;
      elapsed++;
      if (elapsed >= 60 / fps) {
        frame = (frame + 1) % COLS;
        update();
        elapsed = 0;
      }
    };

    const play = (r: number, speed = 10) => {
      row = r;
      fps = speed;
      frame = 0;
      elapsed = 0;
      playing = true;
      update();
    };

    const stop = (r: number) => {
      row = r;
      frame = 0;
      playing = false;
      update();
    };

    gsap.ticker.add(tick);

    /* ==== POSITION ==== */
    const pos = {
      x: gsap.utils.random(5, 95),
      y: gsap.utils.random(30, 80),
    };

    gsap.set(npc, {
      left: `${pos.x}%`,
      top: `${pos.y}%`,
      scale: gsap.utils.random(0.6, 0.9),
      opacity: 0,
      transformOrigin: "center bottom",
    });

    gsap.to(npc, {
      opacity: 1,
      duration: 1.2,
      delay: index * 0.05,
    });

    stop(SPRITE_ROW.IDLE);

    /* ==== BEHAVIOR ==== */
    let walkToggle = false;

    const loop = () => {
      if (Math.random() < 0.4) {
        stop(SPRITE_ROW.IDLE);
        gsap.delayedCall(gsap.utils.random(2, 4), loop);
        return;
      }

      const tx = gsap.utils.random(5, 95);
      const ty = gsap.utils.random(30, 80);

      play(
        walkToggle ? SPRITE_ROW.WALK_A : SPRITE_ROW.WALK_B,
        12
      );
      walkToggle = !walkToggle;

      pos.x = tx;
      pos.y = ty;

      gsap.to(npc, {
        left: `${tx}%`,
        top: `${ty}%`,
        duration: gsap.utils.random(6, 10),
        ease: "none",
        onComplete: loop,
      });
    };

    loop();

    return () => {
      gsap.ticker.remove(tick);
      gsap.killTweensOf(npc);
    };
  }, [index]);

  const scale = DISPLAY_TARGET / NATIVE_SIZE;

  return (
    <div
      ref={npcRef}
      onClick={() => setIsFocused(!isFocused)}
      className={`absolute w-[128px] h-[128px] ${
        isFocused ? "z-50" : "z-20"
      }`}
    >
      <div
        ref={spriteRef}
        className="w-full h-full bg-no-repeat"
        style={{
          backgroundImage: "url('/spirit-park/kodama-spritesheet.png')",
          backgroundSize: `${COLS * NATIVE_SIZE}px ${ROWS * NATIVE_SIZE}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center bottom",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
};
