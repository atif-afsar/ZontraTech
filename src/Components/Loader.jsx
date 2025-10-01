import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

const letters = Array.from('ZONTRA');

export default function Loader({ onFinish }) {
  // total animation time: stagger * letters + hold
  useEffect(() => {
    const stagger = 0.12;
    const hold = 0.9; // keep visible before exit
    const total = letters.length * stagger * 1000 + hold * 1000 + 500;
    const t = setTimeout(() => {
      onFinish && onFinish();
    }, total);
    return () => clearTimeout(t);
  }, [onFinish]);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', damping: 12, stiffness: 300 },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="loader-root"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.45 } }}
      >
        <div className="loader-center">
          <motion.h1
            className="loader-title"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {letters.map((l, i) => (
              <motion.span className="loader-letter" key={l + i} variants={letter}>
                {l}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            className="loader-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: letters.length * 0.12 + 0.2, duration: 0.6 }}
          >
            Building experiences
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
