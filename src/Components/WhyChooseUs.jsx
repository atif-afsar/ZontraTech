import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaRocket, FaShieldAlt, FaHandsHelping, FaMagic, FaChartLine } from 'react-icons/fa';

// Data for your "Why Choose Us" features
const features = [
  {
    icon: <FaLightbulb />,
    title: "Innovative Solutions",
    description: "We bring fresh ideas and cutting-edge technology to every project, ensuring you stay ahead.",
  },
  {
    icon: <FaRocket />,
    title: "Rapid Development",
    description: "Our agile approach ensures quick iterations and faster delivery without compromising quality.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Robust Security",
    description: "Your data and applications are protected with industry-leading security measures.",
  },
  {
    icon: <FaHandsHelping />,
    title: "Dedicated Support",
    description: "We offer continuous support and maintenance, ensuring your systems run smoothly 24/7.",
  },
  {
    icon: <FaMagic />,
    title: "Customizable Designs",
    description: "Tailored designs that perfectly capture your brand's essence and user experience goals.",
  },
  {
    icon: <FaChartLine />,
    title: "Scalable Architecture",
    description: "Solutions built to grow with your business, adapting effortlessly to future demands.",
  },
];

// Animation variants for the section and its children
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren", // Animate parent before children
      staggerChildren: 0.1, // Stagger animation for individual cards
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const WhyChooseUs = () => {
  return (
    <motion.section
      id="why-choose-us"
      className="py-16 md:py-24 bg-transparent" // Ensure transparent background
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible" // Animates when it comes into view
      viewport={{ once: true, amount: 0.3 }} // Only animate once, when 30% visible
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.h2
          className="mb-6 text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl"
          variants={cardVariants} // Reusing cardVariants for the title
        >
          Why Choose <span className="text-[var(--color-primary)]">ZONTRA</span>?
        </motion.h2>
        <motion.p
          className="mx-auto mb-16 max-w-2xl text-center text-lg text-[var(--color-subtle-text)] md:text-xl"
          variants={cardVariants} // Reusing cardVariants for the subtitle
        >
          Discover the core principles that make us the ideal partner for your digital transformation.
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -10, // Lift effect on hover
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)", // Stronger shadow
                transition: { duration: 0.3 }
              }}
              className="group flex flex-col items-start rounded-xl border border-white/10 bg-[var(--color-card-bg)] p-6 text-white md:p-8"
            >
              <div className="mb-4 text-5xl text-[var(--color-primary)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold md:text-2xl">
                {feature.title}
              </h3>
              <p className="text-base text-[var(--color-subtle-text)]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;