import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaCode, FaMobileAlt, FaPalette, FaArrowRight, FaCloud, FaShieldAlt, FaRobot } from 'react-icons/fa';

// --- Expanded Service Data ---
const servicesData = [
  {
    icon: <FaCode />,
    title: "Web Development",
    description: "Creating responsive, high-performance websites that provide a seamless user experience.",
  },
  {
    icon: <FaMobileAlt />,
    title: "App Development",
    description: "Building intuitive and powerful mobile applications for both iOS and Android platforms.",
  },
  {
    icon: <FaPalette />,
    title: "UI/UX Design",
    description: "Designing beautiful, user-centric interfaces that are both functional and highly engaging.",
  },
  {
    icon: <FaCloud />,
    title: "Cloud Solutions",
    description: "Leveraging cloud infrastructure to build scalable, resilient, and cost-effective applications.",
  },
  {
    icon: <FaRobot />,
    title: "AI Integration",
    description: "Embedding intelligent AI and machine learning features to automate and enhance your systems.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Security",
    description: "Protecting your digital assets with robust security protocols and threat mitigation strategies.",
  },
];

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};


const ServiceCard = ({ icon, title, description }) => {
  const cardRef = useRef(null);

  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth the mouse values with a spring
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  
  // Transform mouse position into a 3D rotation
  const rotateX = useTransform(springY, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative flex h-full flex-col items-start rounded-2xl border border-white/10 bg-[var(--color-card-bg)] p-8"
    >
      {/* The main content, lifted in 3D space */}
      <div style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }}>
        <div className="absolute -left-2 -top-2 text-6xl text-[var(--color-primary)] opacity-20">
          {icon}
        </div>
        <div className="mb-6 text-5xl text-[var(--color-primary)]">{icon}</div>
        <h3 className="mb-4 text-2xl font-bold text-white">{title}</h3>
        <p className="mb-6 flex-grow text-[var(--color-subtle-text)]">{description}</p>
      </div>

      {/* Interactive Spotlight Effect */}
      <motion.div
        style={{
          background: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(circle at ${x * 100 + 50}% ${y * 100 + 50}%, rgba(0, 112, 243, 0.2), transparent 80%)`
          ),
        }}
        className="pointer-events-none absolute inset-0 rounded-2xl"
      />
    </motion.div>
  );
};

const Services = () => {
  return (
    <motion.section
      id="services"
      className="bg-transparent py-16 lg:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2 variants={cardVariants} className="mb-6 text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          Our <span className="text-[var(--color-primary)]">Services</span>
        </motion.h2>
        <motion.p variants={cardVariants} className="mx-auto mb-16 max-w-2xl text-center text-lg text-[var(--color-subtle-text)] md:text-xl">
          We offer a comprehensive suite of services to bring your digital vision to life, from concept to launch and beyond.
        </motion.p>
        
        {/* The grid container needs a perspective for the 3D effect to work */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: '1000px' }}>
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Services;