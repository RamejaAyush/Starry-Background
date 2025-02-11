import { motion } from "framer-motion";
import React, { useRef, useEffect } from "react";

import "../styles/StarryBackground.scss";
import { IStar } from "../interfaces/star";
import { createStar } from "../utils/createStar.util";
import { CosmicConstants } from "../constants/cosmic.constants";

const StarryBackground: React.FC = () => {
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
      radius: CosmicConstants.RIPPLE_INITIAL_RADIUS,
      alpha: CosmicConstants.RIPPLE_INITIAL_ALPHA,
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

    // Update and draw nebulae in a reverse loop
    for (let i = nebulae.current.length - 1; i >= 0; i--) {
      const nebula = nebulae.current[i];
      nebula.lifetime += CosmicConstants.NEBULA_LIFETIME_INCREMENT;

      if (
        nebula.fadeIn &&
        nebula.lifetime < CosmicConstants.NEBULA_FADEIN_DURATION
      ) {
        nebula.alpha = Math.min(
          CosmicConstants.NEBULA_MAX_ALPHA,
          nebula.lifetime * CosmicConstants.NEBULA_FADEIN_ALPHA_MULTIPLIER
        );
      } else if (nebula.lifetime > CosmicConstants.NEBULA_FADEOUT_THRESHOLD) {
        nebula.alpha *= CosmicConstants.NEBULA_FADEOUT_MULTIPLIER;
      }

      nebula.hue = (nebula.hue + CosmicConstants.NEBULA_HUE_INCREMENT) % 360;

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

    // Draw ripples
    ripples.current.forEach((ripple, index) => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.alpha})`;
      ctx.lineWidth = 1;
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, 2 * Math.PI);
      ctx.stroke();

      ripple.radius += CosmicConstants.RIPPLE_RADIUS_INCREMENT;
      ripple.alpha *= CosmicConstants.RIPPLE_ALPHA_MULTIPLIER;

      if (ripple.alpha < CosmicConstants.RIPPLE_MIN_ALPHA) {
        ripples.current.splice(index, 1);
      }
    });

    // Draw star connections using a double loop for unique pairs
    ctx.beginPath();
    ctx.strokeStyle = CosmicConstants.STAR_CONNECTION_STROKE_STYLE;
    ctx.lineWidth = CosmicConstants.STAR_CONNECTION_LINEWIDTH;
    for (let i = 0; i < stars.current.length; i++) {
      const star1 = stars.current[i];
      for (let j = i + 1; j < stars.current.length; j++) {
        const star2 = stars.current[j];
        const distance = Math.hypot(star1.x - star2.x, star1.y - star2.y);
        if (
          distance < CosmicConstants.STAR_CONNECTION_DISTANCE &&
          distance > 0
        ) {
          ctx.moveTo(star1.x, star1.y);
          ctx.lineTo(star2.x, star2.y);
        }
      }
    }
    ctx.stroke();

    stars.current.forEach((star) => {
      const depthFactor =
        star.radius / CosmicConstants.STAR_DEPTH_FACTOR_DIVISOR;
      star.x +=
        Math.sin(Date.now() * CosmicConstants.STAR_TIME_FACTOR + star.y) *
        CosmicConstants.STAR_POSITION_UPDATE_FACTOR *
        depthFactor;
      star.y +=
        Math.cos(Date.now() * CosmicConstants.STAR_TIME_FACTOR + star.x) *
        CosmicConstants.STAR_POSITION_UPDATE_FACTOR *
        depthFactor;

      if (star.x < 0) star.x = canvasWidth;
      if (star.x > canvasWidth) star.x = 0;
      if (star.y < 0) star.y = canvasHeight;
      if (star.y > canvasHeight) star.y = 0;

      switch (star.type) {
        case "normal": {
          star.radius +=
            star.radiusChange *
            CosmicConstants.STAR_NORMAL_RADIUS_CHANGE_MULTIPLIER;
          if (
            star.radius >= CosmicConstants.STAR_MAX_RADIUS ||
            star.radius <= CosmicConstants.STAR_MIN_RADIUS
          ) {
            star.radiusChange = -star.radiusChange;
          }
          star.alpha = CosmicConstants.STAR_NORMAL_ALPHA;
          break;
        }
        case "blink": {
          star.alpha +=
            star.alphaChange *
            CosmicConstants.STAR_BLINK_ALPHA_CHANGE_MULTIPLIER;
          if (star.alpha >= 1 || star.alpha <= 0.3) {
            star.alphaChange = -star.alphaChange;
          }
          star.radius +=
            star.radiusChange *
            CosmicConstants.STAR_NORMAL_RADIUS_CHANGE_MULTIPLIER;
          if (
            star.radius >= CosmicConstants.STAR_MAX_RADIUS ||
            star.radius <= CosmicConstants.STAR_MIN_RADIUS
          ) {
            star.radiusChange = -star.radiusChange;
          }
          break;
        }
        case "lifeCycle": {
          star.lifeCycleTime =
            (star.lifeCycleTime ?? 0) +
            CosmicConstants.STARCYCLE_LIFETIME_INCREMENT;
          const cycleDuration =
            star.cycleDuration || CosmicConstants.STARCYCLE_DEFAULT_DURATION;
          const t = star.lifeCycleTime! / cycleDuration;
          if (star.baseRadius === undefined) {
            star.baseRadius = star.radius;
          }
          if (t < CosmicConstants.STARCYCLE_FADEIN_PERCENT) {
            star.alpha =
              (t / CosmicConstants.STARCYCLE_FADEIN_PERCENT) *
              CosmicConstants.STAR_NORMAL_ALPHA;
            star.radius = star.baseRadius;
          } else if (t < 0.6) {
            star.alpha = 1;
            star.radius =
              star.baseRadius * CosmicConstants.STARCYCLE_BURST_MULTIPLIER;
          } else if (t < 1) {
            star.alpha = 1 - (t - 0.6) / (1 - 0.6);
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

    stars.current = Array.from({ length: CosmicConstants.STAR_COUNT }, () =>
      createStar(canvas.width, canvas.height)
    );

    animate(ctx);

    const rippleInterval = setInterval(createRipple, 5000);
    const nebulaInterval = setInterval(createNebula, 15000);

    const handleResize = () => {
      setCanvasSize();
      stars.current = Array.from({ length: CosmicConstants.STAR_COUNT }, () =>
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
