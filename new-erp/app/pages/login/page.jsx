"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "@/app/styles/login/login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert("Login successful!");
      router.push("/dashboard");
    } else {
      alert("Invalid credentials. Try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Log In</h1>
      <form onSubmit={handleLogin} className={styles.formContainer}>
        
        {/* Email */}
        <div className="mb-4">
          <label className={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        {/* Password with Eye Icon */}
        <div className={`mb-4 ${styles.relative}`}>
          <label className={styles.label}>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" className={styles.button}>
          Log In
        </button>

        <p className={styles.textCenter}>
          Forgot password?{" "}
          <a href="/pages/forgotPassword" className={styles.link}>
            Reset here
          </a>
        </p>
        <p className={styles.textCenter}>
          I don't have an account?{" "}
          <a href="/pages/signup" className={styles.link}>
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
