import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

// --- Expanded FAQ Data ---
const faqData = [
  {
    question: "What services does Zontra provide?",
    answer: "Zontra specializes in custom web development, mobile app development (iOS & Android), UI/UX design, and AI integration services. We build high-quality digital products tailored to your needs.",
  },
  {
    question: "What is your development process?",
    answer: "We follow an agile development process that includes five key phases: Discovery, Design, Development, Testing, and Deployment. This iterative approach allows for flexibility and ensures we deliver a product that perfectly aligns with your vision.",
  },
  {
    question: "How much does a project typically cost?",
    answer: "Project costs vary based on scope, complexity, and required features. After an initial consultation to understand your needs, we provide a detailed, transparent proposal with a full cost breakdown. We offer solutions for various budgets, from startups to enterprise-level projects.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Timelines depend on the project's scale. A standard marketing website might take 4-6 weeks, while a complex web application could take 3-6 months. We establish a clear timeline and milestones before starting any work.",
  },
  {
    question: "What technologies do you specialize in?",
    answer: "Our team is proficient in a modern tech stack, including React, Next.js, and Node.js for web applications, Swift and Kotlin for mobile, and Python for AI/ML solutions. We always choose the best technology for the job.",
  },
  {
    question: "Do you offer support after the project is launched?",
    answer: "Absolutely. We offer a range of ongoing support and maintenance packages to ensure your digital product remains secure, up-to-date, and performs optimally. We believe in building long-term partnerships.",
  },
];

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};


const FAQItem = ({ item, isOpen, onClick }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="relative mb-4 overflow-hidden rounded-xl border border-white/10"
    >
      <motion.div
        // Animate the border highlight when the card is open
        animate={{
          borderColor: isOpen ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.1)',
          boxShadow: isOpen ? '0 0 15px rgba(0, 112, 243, 0.3)' : 'none'
        }}
        transition={{ duration: 0.4 }}
        className="relative border-l-4"
      >
        <button
          onClick={onClick}
          className="w-full flex justify-between items-center p-6 text-left"
        >
          <h3 className="text-lg font-semibold text-white md:text-xl">
            {item.question}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiPlus className={`text-2xl transition-colors ${isOpen ? 'text-[var(--color-primary)]' : 'text-white'}`} />
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <p className="px-6 pb-6 pt-0 text-[var(--color-subtle-text)]">
                {item.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // First item is open by default

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      id="faq"
      className="relative overflow-hidden bg-transparent py-16 md:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Background glowing orb for visual appeal */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-secondary)]/20 blur-3xl" />

      <div className="container mx-auto px-4">
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Frequently Asked <span className="text-[var(--color-primary)]">Questions</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-subtle-text)]">
            Have questions? We have answers. If you can't find what you're looking for, feel free to contact us directly.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FAQ;