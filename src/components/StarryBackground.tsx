import { motion } from "framer-motion";
import React, { useRef, useEffect } from "react";

import "../styles/StarryBackground.scss";
import { IStar } from "../interfaces/star";
import { createStar } from "../utils/createStar.util";

const StarryBackground: React.FC = () => {
  const starCount = 700;
  const stars = useRef<IStar[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | undefined>(undefined);

  const ripples = useRef<
    Array<{ x: number; y: number; radius: number; alpha: number }>
  >([]);

  const createRipple = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;

    ripples.current.push({
      x,
      y,
      radius: 1,
      alpha: 1,
    });
  };

  const nebulae = useRef<
    Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      hue: number;
      lifetime: number;
      fadeIn: boolean;
    }>
  >([]);

  const createNebula = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    nebulae.current.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 200,
      alpha: 0,
      hue: Math.random() * 60 + 200,
      lifetime: 0,
      fadeIn: true,
    });
  };

  const animate = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = nebulae.current.length - 1; i >= 0; i--) {
      const nebula = nebulae.current[i];

      nebula.lifetime += 0.016;

      if (nebula.fadeIn && nebula.lifetime < 4) {
        nebula.alpha = Math.min(0.1, nebula.lifetime * 0.025);
      } else if (nebula.lifetime > 9) {
        nebula.alpha *= 0.99;
      }

      nebula.hue = (nebula.hue + 0.2) % 360;

      const gradient = ctx.createRadialGradient(
        nebula.x,
        nebula.y,
        0,
        nebula.x,
        nebula.y,
        nebula.radius
      );
      gradient.addColorStop(
        0,
        `hsla(${nebula.hue}, 80%, 60%, ${nebula.alpha})`
      );
      gradient.addColorStop(
        0.6,
        `hsla(${nebula.hue}, 70%, 40%, ${nebula.alpha * 0.5})`
      );
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
      ctx.fill();

      if (nebula.lifetime > 5 && nebula.alpha < 0.01) {
        nebulae.current.splice(i, 1);
      }
    }

    ripples.current.forEach((ripple, index) => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.alpha})`;
      ctx.lineWidth = 1;
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, 2 * Math.PI);
      ctx.stroke();

      ripple.radius += 2;
      ripple.alpha *= 0.98;

      if (ripple.alpha < 0.01) {
        ripples.current.splice(index, 1);
      }
    });

    // Draw star connections
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 0.05;
    stars.current.forEach((star1) => {
      stars.current.forEach((star2) => {
        const distance = Math.hypot(star1.x - star2.x, star1.y - star2.y);
        if (distance < 50 && distance > 0) {
          ctx.moveTo(star1.x, star1.y);
          ctx.lineTo(star2.x, star2.y);
        }
      });
    });
    ctx.stroke();

    // Update and draw stars
    stars.current.forEach((star) => {
      const depthFactor = star.radius / 2; // Use radius to determine depth
      star.x += Math.sin(Date.now() * 0.001 + star.y) * 0.015 * depthFactor;
      star.y += Math.cos(Date.now() * 0.001 + star.x) * 0.015 * depthFactor;

      if (star.x < 0) star.x = canvasWidth;
      if (star.x > canvasWidth) star.x = 0;
      if (star.y < 0) star.y = canvasHeight;
      if (star.y > canvasHeight) star.y = 0;

      switch (star.type) {
        case "normal": {
          star.radius += star.radiusChange * 0.05;
          if (star.radius >= 2 || star.radius <= 0.5) {
            star.radiusChange = -star.radiusChange;
          }
          star.alpha = 0.6;
          break;
        }
        case "blink": {
          star.alpha += star.alphaChange * 0.025;
          if (star.alpha >= 1 || star.alpha <= 0.3) {
            star.alphaChange = -star.alphaChange;
          }
          star.radius += star.radiusChange * 0.05;
          if (star.radius >= 2 || star.radius <= 0.5) {
            star.radiusChange = -star.radiusChange;
          }
          break;
        }
        case "lifeCycle": {
          star.lifeCycleTime = (star.lifeCycleTime || 0) + 0.05;
          const cycleDuration = star.cycleDuration || 1000;
          const t = star.lifeCycleTime / cycleDuration;
          if (star.baseRadius === undefined) {
            star.baseRadius = star.radius;
          }
          if (t < 0.4) {
            star.alpha = (t / 0.4) * 0.6;
            star.radius = star.baseRadius;
          } else if (t < 0.6) {
            star.alpha = 1;
            star.radius = star.baseRadius * 1.02;
          } else if (t < 1) {
            star.alpha = 1 - (t - 0.6) / 0.4;
            star.radius = star.baseRadius;
          } else {
            star.lifeCycleTime = 0;
            star.alpha = 0;
            star.radius = star.baseRadius;
          }
          break;
        }
        default:
          break;
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      if (star.type === "blink") {
        ctx.shadowBlur = star.radius < 1 ? 2 : 0;
        ctx.shadowColor = "rgba(150, 170, 255, 0.5)";
        ctx.fillStyle = `rgba(150, 170, 255, ${
          star.alpha * 0.8 * depthFactor
        })`;
      } else if (star.type === "lifeCycle") {
        ctx.shadowBlur = star.radius < 1 ? 1 : 0;
        ctx.shadowColor = "rgba(255, 240, 255, 0.5)";
        ctx.fillStyle = `rgba(255, 240, 255, ${
          star.alpha * 0.8 * depthFactor
        })`;
      } else {
        ctx.shadowBlur = star.radius < 1 ? 1 : 0;
        ctx.shadowColor = "rgba(255, 250, 240, 0.5)";
        ctx.fillStyle = `rgba(255, 250, 240, ${
          star.alpha * 0.8 * depthFactor
        })`;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    animationFrameId.current = requestAnimationFrame(() => animate(ctx));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    stars.current = Array.from({ length: starCount }, () =>
      createStar(canvas.width, canvas.height)
    );

    animate(ctx);

    const rippleInterval = setInterval(createRipple, 5000);
    const nebulaInterval = setInterval(createNebula, 15000);

    const handleResize = () => {
      setCanvasSize();
      stars.current = Array.from({ length: starCount }, () =>
        createStar(canvas.width, canvas.height)
      );
      ripples.current = [];
      nebulae.current = [];
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      clearInterval(rippleInterval);
      clearInterval(nebulaInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0 }}
      className="starry-background-container"
    >
      <canvas ref={canvasRef} className="starry-canvas" />
    </motion.div>
  );
};

export default StarryBackground;
