import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, isFirebaseConfigured } from "../utils/firebaseConfig";

const navLinks = [
  { title: "Home", href: "/#hero" },
  { title: "Services", href: "/#services" },
  { title: "About", href: "/#about" },
  { title: "FAQ", href: "/#faq" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isFirebaseConfigured() || !auth) return;
    let unsubscribe = null;
    try {
      unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    } catch (err) {
      console.error("Failed to attach auth listener", err);
    }
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleNavClick = (href) => {
    if (!href) return;
    const hashIndex = href.indexOf("#");
    if (hashIndex !== -1) {
      const id = href.substring(hashIndex + 1);

      const scrollToId = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      };

      if (location.pathname !== "/") {
        navigate("/");
        let attempts = 0;
        const maxAttempts = 20;
        const interval = 100;
        const timer = setInterval(() => {
          attempts += 1;
          if (scrollToId() || attempts >= maxAttempts) {
            clearInterval(timer);
          }
        }, interval);
      } else {
        if (!scrollToId()) {
          let attempts = 0;
          const maxAttempts = 20;
          const interval = 100;
          const timer = setInterval(() => {
            attempts += 1;
            if (scrollToId() || attempts >= maxAttempts) {
              clearInterval(timer);
            }
          }, interval);
        }
      }

      setIsOpen(false);
    } else {
      navigate(href);
      setIsOpen(false);
    }
  };

  const handleSignOut = async () => {
    if (!isFirebaseConfigured() || !auth) return;
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign out failed", err);
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-gradient-to-r from-black/70 via-[#071124]/70 to-black/70 shadow-2xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo - Always visible with animation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center"
            >
              <Link
                to="/"
                aria-label="Zontra home"
                className="flex items-center gap-2 md:gap-3 group"
                onClick={() => handleNavClick("#")}
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-10 w-10 md:h-14 md:w-14 overflow-hidden rounded-full ring-2 ring-white/20 group-hover:ring-[var(--color-accent)] transition-all duration-300 shadow-lg"
                >
                  <img
                    src="/assets/logo.jpg"
                    alt="Zontra logo"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                <div className="flex flex-col leading-tight">
                  <motion.span
                    className="text-xl md:text-2xl font-extrabold text-white tracking-tight"
                    whileHover={{ scale: 1.02 }}
                  >
                    ZONTRA
                  </motion.span>
                  <span className="text-xs md:text-sm text-[var(--color-subtle-text)] -mt-0.5">
                    Software Innovation
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:flex md:items-center md:gap-1 lg:gap-2"
            >
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.title}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavClick(link.href)}
                  className="relative rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-subtle-text)] hover:text-white transition-colors group"
                >
                  {link.title}
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-[var(--color-accent)] rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </motion.nav>

            {/* Desktop Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden md:flex md:items-center md:gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick("/#contact")}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg hover:shadow-[var(--color-accent)]/50 transition-all duration-300"
              >
                Contact
              </motion.button>
              {user ? (
                <div className="flex items-center gap-3">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-white/80"
                  >
                    Hi, {user.displayName || user.email}
                  </motion.span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSignOut}
                    className="rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
                  >
                    Sign Out
                  </motion.button>
                </div>
              ) : (
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-[var(--color-primary)]/50 transition-all duration-300"
                  >
                    Login
                  </motion.button>
                </Link>
              )}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen((s) => !s)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-gradient-to-b from-[#071124]/98 via-black/98 to-black/98 backdrop-blur-xl shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/20">
                      <img
                        src="/assets/logo.jpg"
                        alt="logo"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-xl font-extrabold text-white">
                        ZONTRA
                      </span>
                      <span className="text-xs text-[var(--color-subtle-text)] -mt-0.5">
                        Software Innovation
                      </span>
                    </div>
                  </motion.div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-white bg-white/5 hover:bg-white/10"
                  >
                    <FiX size={24} />
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto px-6 py-8">
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link, index) => (
                      <motion.button
                        key={link.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        whileHover={{ x: 8 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleNavClick(link.href)}
                        className="group flex items-center gap-3 rounded-xl px-4 py-4 text-left text-lg font-semibold text-[var(--color-subtle-text)] hover:text-white hover:bg-white/5 transition-all duration-300"
                      >
                        <motion.span
                          className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                        />
                        {link.title}
                      </motion.button>
                    ))}
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavClick("/#contact")}
                      className="group flex items-center gap-3 rounded-xl px-4 py-4 text-left text-lg font-semibold text-[var(--color-subtle-text)] hover:text-white hover:bg-white/5 transition-all duration-300"
                    >
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                      />
                      Contact
                    </motion.button>
                  </nav>
                </div>

                {/* Auth Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="border-t border-white/10 p-6"
                >
                  {user ? (
                    <div className="space-y-4">
                      <div className="rounded-xl bg-white/5 p-4">
                        <p className="text-xs text-[var(--color-subtle-text)] mb-1">
                          Signed in as
                        </p>
                        <p className="text-sm font-medium text-white truncate">
                          {user.displayName || user.email}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSignOut}
                        className="w-full rounded-xl bg-red-500 py-3.5 text-white font-semibold hover:bg-red-600 transition-colors shadow-lg"
                      >
                        Sign Out
                      </motion.button>
                    </div>
                  ) : (
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] py-3.5 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Login
                      </motion.button>
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;