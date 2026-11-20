"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  scale,
  mode = "scroll",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  mode?: "scroll" | "load";
  once?: boolean;
}) {
  // Al cargar la página: animación CSS (visible sin esperar al JavaScript)
  if (mode === "load") {
    const style = {
      "--reveal-y": `${y}px`,
      "--reveal-scale": scale ?? 1,
      animationDelay: delay ? `${delay}s` : undefined,
    } as CSSProperties;
    return (
      <div className={`reveal-load ${className ?? ""}`} style={style}>
        {children}
      </div>
    );
  }

  const initial = { opacity: 0, y, ...(scale !== undefined ? { scale } : {}) };
  const target = { opacity: 1, y: 0, ...(scale !== undefined ? { scale: 1 } : {}) };

  const motionProps = { initial, whileInView: target, viewport: { once, amount: 0.25 } };

  return (
    <motion.div
      className={className}
      {...motionProps}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
