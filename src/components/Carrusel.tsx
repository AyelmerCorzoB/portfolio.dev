"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const images = [
  "/images/image01.jpeg",
  "/images/image02.jpeg",
  "/images/image03.jpeg",
  "/images/image04.jpeg",
  "/images/image05.jpg",
  "/images/image06.jpg",
]

export default function Carrusel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 5000) // Reducido a 5 segundos para mejor ritmo

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl shadow-2xl w-60 max-w-xs sm:max-w-sm md:max-w-md overflow-hidden">
      {/* Efecto de resplandor sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl z-10 pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`Imagen ${index + 1}`}
          initial={{
            opacity: 0,
            scale: 1.1,
            rotateY: -15,
            filter: "blur(4px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateY: 0,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            rotateY: 15,
            filter: "blur(2px)",
          }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94], // Curva de animación más natural
            scale: {
              type: "spring",
              stiffness: 300,
              damping: 30,
            },
            rotateY: {
              type: "spring",
              stiffness: 200,
              damping: 25,
            },
          }}
          className="w-full h-auto object-cover rounded-3xl shadow-lg relative z-0"
          style={{
            objectPosition: "center",
            transformStyle: "preserve-3d",
          }}
        />
      </AnimatePresence>

      {/* Indicadores de progreso sutiles */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-20">
        {images.map((_, i) => (
          <motion.div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "bg-white shadow-lg" : "bg-white/40"
            }`}
            animate={{
              scale: i === index ? 1.2 : 1,
              opacity: i === index ? 1 : 0.6,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Efecto de brillo en el borde */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
    </div>
  )
}
