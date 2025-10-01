import React, { useEffect, useRef } from "react";
import "./PointerAnimation.css";

export default function PointerAnimation() {
  const dotRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const mouse = useRef({ x: -100, y: -100, lastX: -100, lastY: -100 });

  useEffect(() => {
    const dot = dotRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      const x = e.clientX ?? (e.touches?.[0]?.clientX || 0);
      const y = e.clientY ?? (e.touches?.[0]?.clientY || 0);

      mouse.current.lastX = mouse.current.x;
      mouse.current.lastY = mouse.current.y;
      mouse.current.x = x;
      mouse.current.y = y;

      dot.style.transform = `translate3d(${x - 6}px, ${y - 6}px, 0)`;
    };

    // Trails and particles
    let trail = [];
    const maxTrail = 25;
    let particles = [];

    const animate = () => {
      const { x, y, lastX, lastY } = mouse.current;

      // --- Trail (blue gradient line) ---
      trail.push({ x, y, alpha: 1 });
      if (trail.length > maxTrail) trail.shift();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradient line
      if (trail.length > 1) {
        const gradient = ctx.createLinearGradient(
          trail[0].x,
          trail[0].y,
          trail[trail.length - 1].x,
          trail[trail.length - 1].y
        );
        gradient.addColorStop(0, "rgba(0, 200, 255, 0.6)");
        gradient.addColorStop(1, "rgba(0, 100, 255, 0.9)");

        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        trail.forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#00aaff";
        ctx.lineCap = "round";
        ctx.stroke();
        
      }

      // --- Particles (blue sparks when moving fast) ---
      const dx = x - lastX;
      const dy = y - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 8) {
        // Spawn particles proportional to speed
        for (let i = 0; i < 2; i++) {
          particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            alpha: 1,
            size: Math.random() * 4 + 2,
          });
        }
      }

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          return;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,150,255,${p.alpha})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00ccff";
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="pa-canvas" />
      <div className="pa-dot" ref={dotRef} aria-hidden />
    </>
  );
}
