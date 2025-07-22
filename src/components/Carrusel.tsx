import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/images/image01.jpeg',
  '/images/image02.jpeg',
  '/images/image03.jpeg',
  '/images/image04.jpeg',
  '/images/image05.jpg',
];

export default function Carrusel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-yellow-500 rounded-2xl shadow-xl w-60 max-w-xs sm:max-w-sm md:max-w-md overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`Imagen ${index + 1}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="w-full h-auto object-cover rounded-2xl shadow-lg"
          style={{ objectPosition: 'center' }}
        />
      </AnimatePresence>
    </div>
  );
}
