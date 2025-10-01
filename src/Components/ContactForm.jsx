import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import sendEmail from '../utils/email';

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
    },
  },
};

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  return (
    <motion.section
      id="contact"
      className="overflow-hidden bg-transparent py-16 md:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={itemVariants}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Get in <span className="text-[var(--color-primary)]">Touch</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-subtle-text)]">
            Have a project in mind or just want to say hello? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-card-bg)]/60 backdrop-blur-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Side: Info Panel */}
            <motion.div 
              className="p-8 text-white md:p-12 bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent"
              variants={itemVariants}
            >
              <h3 className="mb-6 text-2xl font-semibold">Contact Information</h3>
              <p className="mb-8 text-[var(--color-subtle-text)]">
                Fill up the form and our team will get back to you within 24 hours. For urgent inquiries, feel free to reach out to us directly.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <FaPhone className="text-xl text-[var(--color-accent)]" />
                  <a href="tel:+919389030329" className="hover:text-[var(--color-accent)]">+91 9389030329</a>
                </div>
                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-xl text-[var(--color-accent)]" />
                  <a href="mailto:zontra01@gmail.com" className="hover:text-[var(--color-accent)]">zontra01@gmail.com</a>
                </div>
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-xl text-[var(--color-accent)]" />
                  <span>Aligarh, India</span>
                </div>
              </div>
            </motion.div>
            
            {/* Right Side: Form */}
            <motion.div 
              className="p-8 md:p-12"
              variants={sectionVariants} // Use sectionVariants here to stagger the form fields
            >
              <form onSubmit={async (e) => {
                  e.preventDefault();
                  setError(null);
                  setSuccess(null);
                  setLoading(true);

                  const templateParams = {
                    from_name: name,
                    from_email: email,
                    message,
                  };

                  try {
                    await sendEmail(templateParams);
                    setSuccess('✅ Message sent successfully!');
                    setName('');
                    setEmail('');
                    setMessage('');
                  } catch (err) {
                    console.error('Email send error:', err);
                    setError('❌ Something went wrong: ' + (err?.text || err?.message || String(err)));
                  } finally {
                    setLoading(false);
                  }
                }}>
                <motion.div variants={itemVariants} className="mb-6">
                  <label htmlFor="name" className="mb-2 block font-medium text-[var(--color-subtle-text)]">Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" className="w-full rounded-lg border-2 border-white/20 bg-transparent p-3 text-white transition-colors focus:border-[var(--color-primary)] focus:outline-none" placeholder="John Doe" required />
                </motion.div>
                <motion.div variants={itemVariants} className="mb-6">
                  <label htmlFor="email" className="mb-2 block font-medium text-[var(--color-subtle-text)]">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" className="w-full rounded-lg border-2 border-white/20 bg-transparent p-3 text-white transition-colors focus:border-[var(--color-primary)] focus:outline-none" placeholder="john.doe@example.com" required />
                </motion.div>
                <motion.div variants={itemVariants} className="mb-6">
                  <label htmlFor="message" className="mb-2 block font-medium text-[var(--color-subtle-text)]">Message</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} id="message" name="message" rows="4" className="w-full rounded-lg border-2 border-white/20 bg-transparent p-3 text-white transition-colors focus:border-[var(--color-primary)] focus:outline-none" placeholder="Your message..."></textarea>
                </motion.div>
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit" 
                  className="group flex w-full items-center justify-center gap-3 rounded-lg bg-[var(--color-primary)] py-3 px-8 font-bold text-white transition-all duration-300 hover:bg-[var(--color-primary-dark)] hover:shadow-lg hover:shadow-[var(--color-primary)]/40"
                  disabled={loading}
                >
                  <span>Send Message</span>
                  <FaPaperPlane className="transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
                {loading && <p className="mt-3 text-sm text-[var(--color-subtle-text)]">Sending…</p>}
                {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
                {success && <p className="mt-3 text-sm text-green-400">{success}</p>}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactForm;