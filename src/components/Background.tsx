"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingPathsProps {
  position: number;
  color?: string;
  darkColor?: string;
  pathCount?: number;
}

function FloatingPaths({
  position,
  color = "",
  darkColor = "",
  pathCount = 24,
}: FloatingPathsProps) {
  const paths = Array.from({ length: pathCount }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.04,
    delay: i * 0.01,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className={`w-full h-full ${color} dark:${darkColor}`}
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.05}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              delay: path.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function BackgroundPaths({
  pathCount = 24,
}: {
  pathCount?: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-[1] min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-[1px]" />
      {/* Renderizar las animaciones inmediatamente */}
      <FloatingPaths
        position={1}
        color="text-yellow-500/80"
        darkColor="text-yellow-500/50"
        pathCount={pathCount}
      />
      <FloatingPaths
        position={-1}
        color="text-gray-950/50"
        darkColor="text-gray-400"
        pathCount={pathCount}
      />
    </div>
  );
}