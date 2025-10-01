import React, { useState } from "react";
// Some ESLint configs incorrectly flag `motion` as unused while it's used in JSX below.
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaLock, FaUser, FaIdCard } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// ✅ Correct import
import { auth, isFirebaseConfigured } from "../utils/firebaseConfig";
const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to redirect user

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    setError("");

    if (!isFirebaseConfigured()) {
      setError("Firebase is not configured. Check your .env.local file.");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // After creating the user, update their profile with the full name
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });
      // Redirect to home page after successful registration
      navigate("/");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setIsLoading(false);
    }
  };

  // Re-using animation variants from our other components
  const formVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1 } },
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
          Join ZONTRA
        </motion.h2>
        <form onSubmit={handleRegister}>
          <motion.div variants={itemVariants} className="relative mb-6">
            <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-subtle-text)]" />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border-2 border-white/20 bg-transparent py-3 pl-12 pr-4 text-white transition-colors focus:border-[var(--color-primary)] focus:outline-none"
              required
            />
          </motion.div>
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
          <motion.div variants={itemVariants} className="relative mb-6">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-subtle-text)]" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border-2 border-white/20 bg-transparent py-3 pl-12 pr-4 text-white transition-colors focus:border-[var(--color-primary)] focus:outline-none"
              required
            />
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
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
            className="flex w-full items-center justify-center rounded-lg bg-[var(--color-primary)] py-3 font-bold text-white transition-all duration-300 hover:bg-[var(--color-primary-dark)] disabled:opacity-50"
          >
            {isLoading ? (
              <CgSpinner className="animate-spin text-2xl" />
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>
        <motion.p
          variants={itemVariants}
          className="mt-6 text-center text-[var(--color-subtle-text)]"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="ml-2 font-semibold text-[var(--color-accent)] hover:underline"
          >
            Sign In
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
