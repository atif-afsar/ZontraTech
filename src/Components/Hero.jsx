import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCode, FaPalette, FaMobileAlt } from "react-icons/fa";

// --- Background Component with Aurora and Floating Icons ---
const HeroBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
      {/* Background image from public/assets */}
      <div
        style={{
          backgroundImage: "url('/assets/bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -20,
          opacity: 0.65,
        }}
      />
      {/* Animated Aurora Gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "400% 400%",
          backgroundImage: `radial-gradient(at 20% 20%, var(--color-primary) 0px, transparent 50%),
                           radial-gradient(at 80% 20%, var(--color-accent) 0px, transparent 50%),
                           radial-gradient(at 50% 80%, var(--color-secondary) 0px, transparent 50%),
                           radial-gradient(at 90% 90%, var(--color-primary) 0px, transparent 50%)`,
        }}
      />

      {/* Floating Tech Icons */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 20 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute left-[10%] top-[20%] text-5xl text-white/10 md:text-7xl"
      >
        <FaCode />
      </motion.div>
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: -20 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute bottom-[20%] right-[10%] text-6xl text-white/10 md:text-8xl"
      >
        <FaPalette />
      </motion.div>
      <motion.div
        initial={{ x: -10 }}
        animate={{ x: 10 }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute bottom-[45%] left-[20%] text-4xl text-white/10 md:text-6xl"
      >
        <FaMobileAlt />
      </motion.div>
    </div>
  );
};

// --- Main Hero Component ---
const Hero = () => {
  // Variants for staggering animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-dark-bg)] px-4 py-20">
      <HeroBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-black uppercase tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Shaping the future <br /> of{" "}
          <span className="text-[var(--color-primary)]">Tech</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-xl text-lg text-[var(--color-subtle-text)] md:text-xl"
        >
          Software solutions crafted with elegance & innovation. We build the
          future, one line of code at a time.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group flex w-full items-center justify-center gap-3 rounded-lg bg-[var(--color-primary)] py-3 px-8 font-bold text-white shadow-lg shadow-[var(--color-primary)]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-primary)]/40 sm:w-auto"
          >
            Start a Project{" "}
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
          <motion.a
            href="#services"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full rounded-lg border-2 border-[var(--color-subtle-text)] py-3 px-8 font-bold text-white transition-all duration-300 hover:border-white hover:bg-white/10 sm:w-auto"
          >
            Explore Services
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
