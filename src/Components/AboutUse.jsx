import React from "react";
// Some ESLint configs incorrectly flag `motion` as unused while it's used in JSX below.
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaRocket,
  FaBullseye,
  FaLightbulb,
  FaUsers,
  FaLaptopCode,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

// --- Animated SVG Background Element ---
const AnimatedNetwork = () => (
  // ... (This component remains the same)
  <motion.svg
    className="absolute left-1/2 top-1/2 -z-10 h-auto w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 opacity-10"
    viewBox="0 0 800 800"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    >
      <path
        d="M400 0C179.086 0 0 179.086 0 400s179.086 400 400 400 400-179.086 400-400S620.914 0 400 0z"
        stroke="url(#gradient)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="10 10"
      />
      <circle
        cx="400"
        cy="400"
        r="200"
        stroke="url(#gradient)"
        strokeWidth="1"
        fill="none"
      />
      <circle
        cx="200"
        cy="200"
        r="50"
        stroke="url(#gradient)"
        strokeWidth="0.5"
        fill="none"
      />
      <circle
        cx="600"
        cy="600"
        r="30"
        stroke="url(#gradient)"
        strokeWidth="0.5"
        fill="none"
      />
    </motion.g>
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-primary)" />
        <stop offset="100%" stopColor="var(--color-accent)" />
      </linearGradient>
    </defs>
  </motion.svg>
);

// --- Data for the component ---
/* eslint-disable no-unused-vars */
const teamMembers = [
  // ... (This data remains the same)
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    image: "https://placehold.co/400x400/0a0a1a/FFF?text=AJ",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    name: "Maria Garcia",
    role: "Co-Founder & CTO",
    image: "https://placehold.co/400x400/0070f3/FFF?text=MG",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    name: "David Chen",
    role: "Head of Design",
    image: "https://placehold.co/400x400/7928ca/FFF?text=DC",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    name: "Priya Sharma",
    role: "Lead Engineer",
    image: "https://placehold.co/400x400/00dfd8/FFF?text=PS",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
];
const corePrinciples = [
  // ... (This data remains the same)
  {
    icon: <FaLightbulb />,
    title: "Innovation First",
    description:
      "Every project is an opportunity to push boundaries and set new standards.",
  },
  {
    icon: <FaUsers />,
    title: "User-Centered Design",
    description:
      "Technology should feel natural, intuitive, and human-friendly.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Scalable Solutions",
    description:
      "We build with the future in mind—adaptable, robust, and reliable.",
  },
];

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 12 },
  },
};

const AboutUs = () => {
  // Combined the intro text for the new story card
  const storyContent =
    "At ZONTRA, we believe innovation is the heartbeat of progress. We are a forward-thinking tech agency dedicated to building digital solutions that empower businesses, enhance user experiences, and redefine possibilities. Founded with a vision to bridge creativity with technology, we thrive on transforming ideas into impactful products that inspire trust, growth, and excellence.";

  return (
    <motion.section
      id="about"
      className="relative overflow-hidden bg-transparent py-20 md:py-28"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4">
        {/* === PART 1: INTRO & CORE STORY (REVISED) === */}
        <div className="relative grid grid-cols-1 items-start gap-12 lg:grid-cols-5 lg:gap-16">
          <AnimatedNetwork />
          {/* Left Column: Heading and the new Story Card */}
          <motion.div className="lg:col-span-3" variants={sectionVariants}>
            <motion.h2
              variants={itemVariants}
              className="mb-8 text-3xl font-bold text-white sm:text-4xl md:text-5xl"
            >
              The <span className="text-[var(--color-primary)]">Heartbeat</span>{" "}
              of Progress
            </motion.h2>

            {/* === NEW STORY CARD === */}
            <motion.div
              variants={itemVariants}
              className="rounded-xl border border-white/10 bg-[var(--color-card-bg)]/60 p-8 backdrop-blur-sm"
            >
              <p className="text-md text-[var(--color-subtle-text)] md:text-lg">
                {storyContent}
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Mission & Vision Cards */}
          <motion.div
            className="space-y-8 lg:col-span-2"
            variants={sectionVariants}
          >
            <motion.div
              variants={itemVariants}
              className="rounded-xl border border-white/10 bg-[var(--color-card-bg)]/80 p-6 backdrop-blur-sm"
            >
              <div className="mb-3 flex items-center gap-4">
                <FaBullseye className="text-3xl text-[var(--color-accent)]" />
                <h3 className="text-2xl font-semibold">Our Mission</h3>
              </div>
              <p className="text-[var(--color-subtle-text)]">
                To digitally empower businesses across the globe by creating
                technology that is smart, efficient, and future-ready.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="rounded-xl border border-white/10 bg-[var(--color-card-bg)]/80 p-6 backdrop-blur-sm"
            >
              <div className="mb-3 flex items-center gap-4">
                <FaRocket className="text-3xl text-[var(--color-secondary)]" />
                <h3 className="text-2xl font-semibold">Our Vision</h3>
              </div>
              <p className="text-[var(--color-subtle-text)]">
                To be a leading name in tech innovation—where creativity, code,
                and impact come together to transform industries.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* === PART 2: WHAT DRIVES US (REVAMPED) === */}
        <motion.div className="relative my-24" variants={sectionVariants}>
          <h3 className="mb-16 text-center text-3xl font-bold text-white md:text-4xl">
            What Drives Us
          </h3>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Animated Connecting Lines (Desktop Only) */}
            <div className="absolute left-0 top-1/2 hidden h-1 w-full -translate-y-1/2 md:block">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M20 50 H80"
                  stroke="url(#line-gradient)"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient
                    id="line-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--color-primary)"
                      stopOpacity="0"
                    />
                    <stop
                      offset="50%"
                      stopColor="var(--color-primary)"
                      stopOpacity="1"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--color-primary)"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {corePrinciples.map((principle, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-card-bg)] p-8 text-center transition-all duration-300 hover:!border-[var(--color-primary)]/50 hover:shadow-2xl hover:shadow-[var(--color-primary)]/20 md:hover:-translate-y-2"
              >
                {/* Large Background Number */}
                <span className="absolute -right-4 -top-4 text-8xl font-black text-white/5 transition-colors duration-300 group-hover:text-[var(--color-primary)]/10">
                  0{index + 1}
                </span>

                <div className="relative">
                  <div className="mb-6 inline-block rounded-full bg-[var(--color-primary)]/10 p-5 text-4xl text-[var(--color-primary)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--color-accent)]/10 group-hover:text-[var(--color-accent)]">
                    {principle.icon}
                  </div>
                  <h4 className="mb-3 text-xl font-semibold text-white">
                    {principle.title}
                  </h4>
                  <p className="text-[var(--color-subtle-text)]">
                    {principle.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
       
      </div>
    </motion.section>
  );
};

export default AboutUs;
