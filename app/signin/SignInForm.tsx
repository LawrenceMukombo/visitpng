"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface SignInFormProps {
  returnTo: string;
}

export default function SignInForm({ returnTo }: SignInFormProps) {
  const [mode, setMode] = useState<"signin" | "signup">(
    returnTo.includes("admin") ? "signin" : "signin"
  );
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAdminDestination = returnTo.includes("/admin");

  // Password strength analysis
  const passwordCriteria = useMemo(() => {
    const pwd = form.password;
    const hasMinLength = pwd.length >= 10;
    const hasLongLength = pwd.length >= 14;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);

    let score = 0;
    if (hasMinLength) score += 1;
    if (hasLongLength) score += 1;
    if (hasUpper && hasLower) score += 1;
    if (hasNumber) score += 1;
    if (hasSpecial) score += 1;

    let label = "Enter a password";
    let colorClass = "strengthEmpty";

    if (pwd.length > 0) {
      if (score <= 2) {
        label = "Weak (10+ characters with mixed characters recommended)";
        colorClass = "strengthWeak";
      } else if (score <= 3) {
        label = "Fair (Add numbers or special symbols)";
        colorClass = "strengthFair";
      } else if (score <= 4) {
        label = "Strong password";
        colorClass = "strengthStrong";
      } else {
        label = "Very Strong & Secure";
        colorClass = "strengthVeryStrong";
      }
    }

    return {
      hasMinLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      score,
      percentage: Math.min(100, Math.round((score / 5) * 100)),
      label,
      colorClass
    };
  }, [form.password]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("Please wait…");

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          mode === "signup"
            ? "🎉 Account created successfully! Redirecting you now…"
            : "✓ Sign-in successful. Welcome back!"
        );
        setTimeout(() => {
          location.href = returnTo || "/";
        }, 800);
      } else {
        setMessage(data.error || "The email or password is not correct. If you haven't created your account yet, click 'Create an account' below.");
      }
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="nativeAuth">
      <section className="authContainer">
        <Link href="/" className="authBrand">
          <i>V</i>
          <span>VISIT PAPUA NEW GUINEA</span>
        </Link>

        {isAdminDestination && (
          <div className="adminPortalBanner">
            <span>👑 Portal Access</span>
            <small>Administrator authentication required for {returnTo}</small>
          </div>
        )}

        <p className="eyebrow">
          {mode === "signin"
            ? isAdminDestination
              ? "ADMINISTRATOR SIGN IN"
              : "WELCOME BACK"
            : "CREATE YOUR ACCOUNT"}
        </p>

        <h1>
          {mode === "signin"
            ? isAdminDestination
              ? "Sign in to Admin Dashboard"
              : "Sign in to Visit PNG"
            : "Start planning your PNG journey"}
        </h1>

        <p className="authSubtext">
          {mode === "signin"
            ? "Your trips, saved places, bookings and administrative rights stay together on your Visit PNG account."
            : "Create your secure account to manage bookings, offline maps, and custom itineraries."}
        </p>

        <form onSubmit={submit} className="authForm">
          {mode === "signup" && (
            <div className="formField">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                required
                autoComplete="name"
                placeholder="e.g. Lawrence Mukombo"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
            </div>
          )}

          <div className="formField">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              required
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="formField">
            <div className="passwordLabelRow">
              <label htmlFor="password">Password</label>
              <button
                type="button"
                className="showPwdToggleBtn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              id="password"
              required
              minLength={10}
              type={showPassword ? "text" : "password"}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              placeholder="At least 10 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Real-time Password Strength Meter (Shown on Signup) */}
          {mode === "signup" && form.password.length > 0 && (
            <div className="passwordStrengthBox">
              <div className="strengthHeader">
                <small className="strengthLabel">Password Strength:</small>
                <strong className={`strengthValue ${passwordCriteria.colorClass}`}>
                  {passwordCriteria.label}
                </strong>
              </div>

              {/* Visual Meter Bar */}
              <div className="meterTrack">
                <div
                  className={`meterFill ${passwordCriteria.colorClass}`}
                  style={{ width: `${passwordCriteria.percentage}%` }}
                />
              </div>

              {/* Requirement Checkpoints */}
              <ul className="strengthChecklist">
                <li className={passwordCriteria.hasMinLength ? "checked" : ""}>
                  <span>{passwordCriteria.hasMinLength ? "✓" : "○"}</span> At least 10 characters
                </li>
                <li className={passwordCriteria.hasUpper && passwordCriteria.hasLower ? "checked" : ""}>
                  <span>{passwordCriteria.hasUpper && passwordCriteria.hasLower ? "✓" : "○"}</span> Both uppercase & lowercase letters
                </li>
                <li className={passwordCriteria.hasNumber ? "checked" : ""}>
                  <span>{passwordCriteria.hasNumber ? "✓" : "○"}</span> At least one number (0-9)
                </li>
                <li className={passwordCriteria.hasSpecial ? "checked" : ""}>
                  <span>{passwordCriteria.hasSpecial ? "✓" : "○"}</span> Special character (!@#$%^&*...)
                </li>
              </ul>
            </div>
          )}

          <button type="submit" className="authSubmitBtn" disabled={isSubmitting}>
            {isSubmitting
              ? "Please wait…"
              : mode === "signin"
              ? "Sign in"
              : "Create account"}
          </button>
        </form>

        {message && (
          <p className={`formStatus ${message.startsWith("✓") || message.startsWith("🎉") ? "successStatus" : "errorStatus"}`} aria-live="polite">
            {message}
          </p>
        )}

        <button
          type="button"
          className="authSwitch"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setMessage("");
          }}
        >
          {mode === "signin"
            ? "New to Visit PNG? Create an account"
            : "Already have an account? Sign in"}
        </button>
      </section>
    </main>
  );
}
