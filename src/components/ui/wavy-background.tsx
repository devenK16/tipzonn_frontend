

"use client";
import { cn } from "../../utils/cn";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: any,
    canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const init = () => {
    canvas = canvasRef.current;
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    w = ctx.canvas.width = canvas.parentNode.offsetWidth; // Set the width to the parent node's width
    h = ctx.canvas.height = canvas.parentNode.offsetHeight; // Set the height to the parent node's height
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    console.log("Canvas initialized with width:", w, "and height:", h);
    window.onresize = function () {
      w = ctx.canvas.width = canvas.parentNode.offsetWidth; // Update the width on resize
      h = ctx.canvas.height = canvas.parentNode.offsetHeight; // Update the height on resize
      ctx.filter = `blur(${blur}px)`;
      console.log("Canvas resized to width:", w, "and height:", h);
    };
    render();
  };

  const waveColors = colors ?? [
  
    "#00bfff",
    "#5CE4E4",
    "#18C9F1",
    "#18C9F1",
    "#5CE4E4",
  ];
  const drawWave = (n: number) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 20;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 140;
        ctx.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId: number;
  const render = () => {
    // ctx.fillStyle = backgroundFill || "white";
    const bodyStyles = window.getComputedStyle(document.body);
ctx.fillStyle = backgroundFill || bodyStyles.backgroundColor;
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(4);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden w-full h-full", // Set the container as relative and hide overflow
        containerClassName
      )}
      style={{ position: "relative" }} // Add inline style for position relative
    >
      <canvas
        className={cn("absolute inset-0 z-0", className)}
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};


