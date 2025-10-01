import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sendEmail from '../utils/email';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaPaperPlane, FaChevronDown, FaInstagram } from 'react-icons/fa';

// --- Reusable Logo Component ---
const ZontraLogo = () => (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0L40 20L20 40L0 20L20 0Z" fill="url(#logo-gradient-footer-mobile)"/>
      <path d="M20 5L35 20L20 35L5 20L20 5Z" fill="#0a0a1a"/>
      <path d="M12 14H28L20 26L12 14Z" fill="url(#logo-gradient-footer-mobile)"/>
      <defs>
        <linearGradient id="logo-gradient-footer-mobile" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-primary)"/>
          <stop offset="1" stopColor="var(--color-accent)"/>
        </linearGradient>
      </defs>
    </svg>
);

// --- Accordion Component for Mobile View ---
const AccordionItem = ({ title, children, isOpen, onClick }) => {
    return (
        <div className="border-b border-white/10 py-4">
            <button onClick={onClick} className="flex w-full items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <FaChevronDown />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden pt-4"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


const Footer = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  // Newsletter subscription state
  const [email, setEmail] = useState('');
  const [subLoading, setSubLoading] = useState(false);
  const [subError, setSubError] = useState(null);
  const [subSuccess, setSubSuccess] = useState(null);

  const handleAccordionClick = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <motion.footer
      className="bg-[var(--color-card-bg)]/50 border-t border-white/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        
        {/* === CALL TO ACTION === */}
        <div 
          className="relative z-10 -mt-8 mb-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-6 text-center md:-mt-12 md:flex-row md:p-12 md:text-left"
        >
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">Ready to build your digital future?</h2>
            <p className="mt-2 text-white/80">Let's turn your idea into a reality. Get in touch today!</p>
          </div>
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex-shrink-0 rounded-lg bg-white px-8 py-3 font-semibold text-black transition-transform duration-300 sm:w-auto"
          >
            Start a Project
          </motion.a>
        </div>

        {/* === MAIN FOOTER CONTENT === */}
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Brand & Socials (Always visible) */}
          <div className="text-left">
            <a href="#" className="mb-4 flex items-center gap-3">
              <img className='w-12 h-12 rounded-full' src="./assets/logo.jpg" alt="ZontraLogo" />
              <span className="text-2xl font-bold text-white">ZONTRA</span>
            </a>
            <p className="mb-6 max-w-xs text-[var(--color-subtle-text)]">
              Crafting innovative software solutions for the modern world.
            </p>
            <div className="flex gap-4 text-2xl">
              <motion.a whileHover={{ y: -3, color: '#fff' }} href="https://www.instagram.com/zontratech/?igsh=MXZhYnJpMjk0eGxvNA%3D%3D#" aria-label="Instagram" className="text-[var(--color-subtle-text)]"><FaInstagram /></motion.a>
              <motion.a whileHover={{ y: -3, color: '#fff' }} href="https://www.linkedin.com/in/zontra-tech-solutions-46b04b388/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" aria-label="LinkedIn" className="text-[var(--color-subtle-text)]"><FaLinkedin /></motion.a>
              <motion.a whileHover={{ y: -3, color: '#fff' }} href="https://x.com/ZontraTech?t=DlvdgZe313YnVMgRiOJDMA&s=08" aria-label="Twitter" className="text-[var(--color-subtle-text)]"><FaTwitter /></motion.a>
            </div>
          </div>

          {/* Links & Contact - Combined for Mobile Accordion */}
          <div className='lg:col-span-2'>
            {/* Mobile Accordion View */}
            <div className="md:hidden">
              <AccordionItem title="Quick Links" isOpen={openAccordion === 0} onClick={() => handleAccordionClick(0)}>
                <ul className="space-y-3 pt-2">
                  <li><a href="#" className="text-[var(--color-subtle-text)] hover:text-white">Home</a></li>
                  <li><a href="#services" className="text-[var(--color-subtle-text)] hover:text-white">Services</a></li>
                  <li><a href="#about" className="text-[var(--color-subtle-text)] hover:text-white">About Us</a></li>
                  <li><a href="#faq" className="text-[var(--color-subtle-text)] hover:text-white">FAQ</a></li>
                </ul>
              </AccordionItem>
              <AccordionItem title="Contact Us" isOpen={openAccordion === 1} onClick={() => handleAccordionClick(1)}>
                <ul className="space-y-3 pt-2 text-[var(--color-subtle-text)]">
                  <li className="flex items-center gap-3"><FaPhone /><a href="tel:+919389030329" className="hover:text-white">+91 9389030329</a></li>
                  <li className="flex items-center gap-3"><FaEnvelope /><a href="mailto:zontra01@gmail.com" className="hover:text-white">zontra01@gmail.com</a></li>
                  <li className="flex items-center gap-3"><FaMapMarkerAlt /><span>Aligarh, India</span></li>
                </ul>
              </AccordionItem>
            </div>

            {/* Desktop Grid View */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-[var(--color-subtle-text)] hover:text-white">Home</a></li>
                  <li><a href="#services" className="text-[var(--color-subtle-text)] hover:text-white">Services</a></li>
                  <li><a href="#about" className="text-[var(--color-subtle-text)] hover:text-white">About Us</a></li>
                  <li><a href="#faq" className="text-[var(--color-subtle-text)] hover:text-white">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-semibold text-white">Contact Us</h3>
                <ul className="space-y-3 text-[var(--color-subtle-text)]">
                  <li className="flex items-center gap-3"><FaPhone /><a href="tel:+919389030329" className="hover:text-white">+91 9389030329</a></li>
                  <li className="flex items-center gap-3"><FaEnvelope /><a href="mailto:zontra01@gmail.com" className="hover:text-white">zontra01@gmail.com</a></li>
                  <li className="flex items-center gap-3"><FaMapMarkerAlt /><span>Aligarh, India</span></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Column 4: Newsletter (Always visible) */}
          <div className="text-left">
            <h3 className="mb-4 text-lg font-semibold text-white">Join Our Newsletter</h3>
            <p className="mb-4 text-[var(--color-subtle-text)]">Get the latest updates on tech, innovation, and our projects.</p>
            <form className="flex w-full max-w-sm" onSubmit={async (e) => {
              e.preventDefault();
              setSubError(null);
              setSubSuccess(null);
              if (!email.trim()) {
                setSubError('Please enter your email address');
                return;
              }
              const emailRe = /^\S+@\S+\.\S+$/;
              if (!emailRe.test(email)) {
                setSubError('Please enter a valid email address');
                return;
              }

              setSubLoading(true);
              try {
                // Save subscriber locally (replace with API call if available)
                const subs = JSON.parse(localStorage.getItem('zontra_subscribers') || '[]');
                if (!subs.includes(email)) {
                  subs.push(email);
                  localStorage.setItem('zontra_subscribers', JSON.stringify(subs));
                }

                // Optionally notify via EmailJS if configured
                try {
                  await sendEmail({ from_name: 'Newsletter Signup', from_email: email, message: `New subscriber: ${email}` });
                } catch (notifyErr) {
                  // Non-fatal: continue but show a warning
                  console.warn('Newsletter notification failed:', notifyErr);
                }

                setSubSuccess('Thanks for subscribing!');
                setEmail('');
              } catch (err) {
                console.error('Subscribe error:', err);
                setSubError('Failed to subscribe. Please try again.');
              } finally {
                setSubLoading(false);
              }
            }}>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" className="w-full rounded-l-lg border-2 border-r-0 border-white/20 bg-transparent p-3 text-white transition-colors focus:border-[var(--color-primary)] focus:outline-none" />
              <button type="submit" aria-label="Subscribe" className="rounded-r-lg bg-[var(--color-primary)] px-4 text-white transition-colors hover:bg-[var(--color-primary-dark)]" disabled={subLoading}>
                <FaPaperPlane />
              </button>
            </form>
            {subLoading && <p className="mt-2 text-sm text-[var(--color-subtle-text)]">Subscribing…</p>}
            {subError && <p className="mt-2 text-sm text-red-400">{subError}</p>}
            {subSuccess && <p className="mt-2 text-sm text-green-400">{subSuccess}</p>}
          </div>
        </div>

        {/* === COPYRIGHT NOTICE === */}
        <div className="border-t border-white/10 py-8 text-center text-sm text-[var(--color-subtle-text)]">
          &copy; {new Date().getFullYear()} Zontra. All Rights Reserved. Designed in India.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;