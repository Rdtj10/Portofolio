/*eslint-disable*/
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const particles = useRef<{ x: number; y: number; baseX: number; baseY: number; size: number; color: string; shape: string; }[]>([]);
  const numParticles = 20;
  const maxDistance = 30;
  const shapes = ["triangle", "square", "circle", "cross"];
  const fixedSize = 60;

  useEffect(() => {
    const canvas = canvasRef.current || document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < numParticles; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseX: 0,
        baseY: 0,
        size: fixedSize, // Ukuran tetap
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      });
    }

    particles.current.forEach((p) => {
      p.baseX = p.x;
      p.baseY = p.y;
    });

    const drawParticles = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p) => {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2;
        ctx.beginPath();

        if (p.shape === "triangle") {
          ctx.moveTo(p.x, p.y - p.size / 2);
          ctx.lineTo(p.x - p.size / 2, p.y + p.size / 2);
          ctx.lineTo(p.x + p.size / 2, p.y + p.size / 2);
          ctx.closePath();
        } else if (p.shape === "square") {
          ctx.rect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        } else if (p.shape === "circle") {
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        } else if (p.shape === "cross") {
          ctx.moveTo(p.x - p.size / 2, p.y - p.size / 2);
          ctx.lineTo(p.x + p.size / 2, p.y + p.size / 2);
          ctx.moveTo(p.x + p.size / 2, p.y - p.size / 2);
          ctx.lineTo(p.x - p.size / 2, p.y + p.size / 2);
        }

        ctx.stroke();
      });
      requestAnimationFrame(drawParticles);
    };

    drawParticles();

    const moveParticles = (e: any) => {
      const { clientX, clientY } = e;

      particles.current.forEach((p) => {
        const dx = clientX - p.baseX;
        const dy = clientY - p.baseY;
        const angle = Math.atan2(dy, dx);

        const moveX = Math.cos(angle) * maxDistance;
        const moveY = Math.sin(angle) * maxDistance;

        gsap.to(p, {
          x: p.baseX + moveX,
          y: p.baseY + moveY,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    window.addEventListener("mousemove", moveParticles);

    return () => {
      window.removeEventListener("mousemove", moveParticles);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
};

export default ParticleCanvas;
