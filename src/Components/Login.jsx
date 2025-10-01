import React, { useState, useEffect } from "react";
// Some ESLint configs incorrectly flag `motion` as unused while it's used in JSX below.
// Disable the unused-vars rule for this import line only.
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

// --- Import Firebase Auth ---
import { auth, isFirebaseConfigured } from "../utils/firebaseConfig";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleIsLoading, setGoogleIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    if (!isFirebaseConfigured()) {
      setError("Firebase is not configured. Check your .env.local file.");
      setIsLoading(false);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleSignIn = async () => {
    setGoogleIsLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setGoogleIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent p-4">
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[var(--color-card-bg)]/60 p-6 backdrop-blur-lg md:p-10"
      >
        <motion.h2
          variants={itemVariants}
          className="mb-6 text-center text-3xl font-bold text-white"
        >
          Welcome Back
        </motion.h2>

        {/* Google Sign-In Button */}
        <motion.button
          variants={itemVariants}
          onClick={handleGoogleSignIn}
          disabled={googleIsLoading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-white/20 bg-transparent py-3 font-semibold text-white transition-colors hover:bg-white/10 disabled:opacity-50"
        >
          {googleIsLoading ? (
            <CgSpinner className="animate-spin text-2xl" />
          ) : (
            <>
              <FcGoogle className="text-2xl" /> Sign in with Google
            </>
          )}
        </motion.button>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="my-6 flex items-center gap-4"
        >
          <hr className="w-full border-t border-white/10" />
          <span className="text-xs font-semibold uppercase text-[var(--color-subtle-text)]">
            OR
          </span>
          <hr className="w-full border-t border-white/10" />
        </motion.div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <motion.div variants={itemVariants} className="relative mb-6">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-subtle-text)]" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border-2 border-white/20 bg-transparent py-3 pl-12 pr-4 text-white transition-colors focus:border-[var(--color-primary)] focus:outline-none"
              required
            />
          </motion.div>
          <motion.div variants={itemVariants} className="relative mb-6">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-subtle-text)]" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border-2 border-white/20 bg-transparent py-3 pl-12 pr-4 text-white transition-colors focus:border-[var(--color-primary)] focus:outline-none"
              required
            />
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 rounded-md bg-red-500/20 p-3 text-center text-sm text-red-400"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-lg bg-[var(--color-primary)] py-3 font-bold text-white transition-all hover:bg-[var(--color-primary-dark)] disabled:opacity-50"
          >
            {isLoading ? (
              <CgSpinner className="animate-spin text-2xl" />
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-center text-[var(--color-subtle-text)]"
        >
          Need an account?{" "}
          <Link
            to="/register"
            className="ml-2 font-semibold text-[var(--color-accent)] hover:underline"
          >
            Sign Up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
