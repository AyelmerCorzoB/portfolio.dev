"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface FloatingPathsProps {
  position: number;
  color?: string;
  darkColor?: string;
  pathCount?: number;
}

/**
 * Genera el path SVG dinámico basado en el índice y la posición.
 */
const generatePath = (i: number, position: number): string => {
  const xOffset = i * 5 * position;
  const yOffset = i * 6;

  return `M-${380 - xOffset} -${189 + yOffset}
          C-${380 - xOffset} -${189 + yOffset} 
          -${312 - xOffset} ${216 - yOffset} 
           ${152 - xOffset} ${343 - yOffset}
          C${616 - xOffset} ${470 - yOffset} 
           ${684 - xOffset} ${875 - yOffset} 
           ${684 - xOffset} ${875 - yOffset}`;
};

function FloatingPaths({
  position,
  color = "text-yellow-500/80",
  darkColor = "text-yellow-500/50",
  pathCount = 24,
}: FloatingPathsProps) {
  // Usamos useMemo para evitar recalcular los paths en cada render
  const paths = useMemo(() => {
    return Array.from({ length: pathCount }, (_, i) => ({
      id: i,
      d: generatePath(i, position),
      width: 0.5 + i * 0.04,
      delay: i * 0.01,
      opacity: 0.1 + i * 0.05,
    }));
  }, [pathCount, position]);

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
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              delay: path.delay,
              repeat: Infinity,
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

  // Solo montamos en el cliente para evitar errores de SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-[1] min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-[1px]" />
      {/* Capa frontal animada */}
      <FloatingPaths
        position={1}
        color="text-yellow-500/80"
        darkColor="text-yellow-500/50"
        pathCount={pathCount}
      />
      {/* Capa de fondo animada */}
      <FloatingPaths
        position={-1}
        color="text-gray-950/50"
        darkColor="text-gray-400"
        pathCount={pathCount}
      />
    </div>
  );
}
