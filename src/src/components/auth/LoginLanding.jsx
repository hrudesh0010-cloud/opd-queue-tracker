import React, { useState } from "react";
import {
  ShieldCheck,
  Phone,
  Sparkles,
  Globe,
  AlertTriangle,
  Building2,
  Activity,
  Stethoscope,
  Clock,
  UserCheck,
} from "lucide-react";
import { useDevConfig } from "../../context/DevConfigContext";
import GoogleAuthModal from "./GoogleAuthModal";
import PhoneOtpView from "./PhoneOtpView";

export default function LoginLanding() {
  const { config, loginUser, language, setLanguage } = useDevConfig();
  const [activeAuthTab, setActiveAuthTab] = useState("google"); // 'google' | 'phone'
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  const renderLogoIcon = () => {
    switch (config.logoType) {
      case "heart-rate":
        return <Activity className="w-6 h-6 text-teal-400 animate-pulse" />;
      case "hospital":
        return <Building2 className="w-6 h-6 text-teal-400" />;
      case "caduceus":
        return <Stethoscope className="w-6 h-6 text-teal-400" />;
      case "shield-pulse":
      default:
        return <ShieldCheck className="w-6 h-6 text-teal-400" />;
    }
  };

  const handleLoginSuccess = (userPayload) => {
    loginUser(userPayload);
  };

  return (
    <div className="min-h-screen mesh-gradient-bg text-slate-100 flex flex-col justify-between relative overflow-x-hidden selection:bg-teal-500 selection:text-white">
      {/* Background Floating Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>

      {/* TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Hospital Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 p-0.5 shadow-lg shadow-teal-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              {renderLogoIcon()}
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-slate-100 text-base tracking-tight leading-none flex items-center gap-2">
              {config.hospitalName}
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
                OPD AI Triage
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
              {config.portalTitle}
            </p>
          </div>
        </div>

        {/* Top Right Tools */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
            <Globe className="w-3.5 h-3.5 text-teal-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-slate-300 font-semibold focus:outline-none cursor-pointer text-xs"
            >
              <option value="en" className="bg-slate-900 text-white">
                English (US)
              </option>
              <option value="hi" className="bg-slate-900 text-white">
                Hindi (हिंदी)
              </option>
              <option value="es" className="bg-slate-900 text-white">
                Spanish (Español)
              </option>
              <option value="fr" className="bg-slate-900 text-white">
                French (Français)
              </option>
            </select>
          </div>
        </div>
      </header>

      {/* Emergency Disclaimer Banner */}
      {config.customDisclaimer && (
        <div className="bg-amber-950/80 border-y border-amber-500/30 px-4 py-2 text-center text-xs text-amber-200 flex items-center justify-center gap-2 font-medium">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{config.customDisclaimer}</span>
        </div>
      )}

      {/* MAIN CENTER CONTENT */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 flex flex-col lg:flex-row items-center justify-center gap-12 z-10">
        {/* Left Side: Hero Info & Value Proposition */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
            <Sparkles
              className="w-3.5 h-3.5 text-teal-400 animate-spin"
              style={{ animationDuration: "8s" }}
            />
            <span>Emergency Severity Index (ESI 1–5) Automated Triage</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Streamline OPD Patient Flow with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              AI-Powered Pre-Triage
            </span>
          </h2>

          <p className="text-slate-300 text-sm lg:text-base leading-relaxed max-w-xl">
            {config.tagline} Sign in with your Gmail or Mobile Number to access
            AI symptom check, receive digital tokens, or manage clinic queue
            status.
          </p>

          {/* Quick Feature Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl glass-panel text-left space-y-1">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div className="font-bold text-slate-200 text-xs">
                AI Symptom Checker
              </div>
              <div className="text-[11px] text-slate-400">
                Multilingual voice & text intake
              </div>
            </div>

            <div className="p-3.5 rounded-2xl glass-panel text-left space-y-1">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div className="font-bold text-slate-200 text-xs">
                Dynamic Queue Tokens
              </div>
              <div className="text-[11px] text-slate-400">
                Smart wait-time estimation
              </div>
            </div>

            <div className="p-3.5 rounded-2xl glass-panel text-left space-y-1">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="font-bold text-slate-200 text-xs">
                Doctor SOAP Summaries
              </div>
              <div className="text-[11px] text-slate-400">
                Instant pre-consultation sheets
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: LOGIN CARD */}
        <div className="w-full max-w-md">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl relative border border-slate-700/60 glow-primary">
            {/* Login Card Header */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-extrabold text-white">
                Welcome to OPD Portal
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Please authenticate to continue to patient kiosk or dashboard
              </p>
            </div>

            {/* Auth Tab Buttons */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-slate-800 mb-6 text-xs font-bold">
              {config.authMethods.googleSso && (
                <button
                  onClick={() => setActiveAuthTab("google")}
                  className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    activeAuthTab === "google"
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Google SSO</span>
                </button>
              )}

              {config.authMethods.phoneOtp && (
                <button
                  onClick={() => setActiveAuthTab("phone")}
                  className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    activeAuthTab === "phone"
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Mobile OTP</span>
                </button>
              )}
            </div>

            {/* TAB CONTENT A: GOOGLE LOGIN */}
            {activeAuthTab === "google" && config.authMethods.googleSso && (
              <div className="space-y-4 animate-fade-in">
                <button
                  onClick={() => setIsGoogleModalOpen(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.3 7.31 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2.0 10.04.0 12s.46 3.8 1.27 5.42l4.01-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Continue with Gmail / Google</span>
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  Quick 1-click single sign-on with your Google account.
                </p>
              </div>
            )}

            {/* TAB CONTENT B: MOBILE OTP LOGIN */}
            {activeAuthTab === "phone" && config.authMethods.phoneOtp && (
              <PhoneOtpView onSuccess={handleLoginSuccess} />
            )}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-4 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 z-10">
        <div>
          © 2026{" "}
          <strong className="text-slate-400">{config.hospitalName}</strong>. All
          rights reserved.
        </div>
        <div className="flex items-center gap-4 text-slate-400 font-medium">
          <a href="#privacy" className="hover:text-teal-400 transition-colors">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="#hipaa" className="hover:text-teal-400 transition-colors">
            HIPAA Compliance
          </a>
        </div>
      </footer>

      {/* Google SSO Modal */}
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onSuccess={(usr) => {
          setIsGoogleModalOpen(false);
          handleLoginSuccess(usr);
        }}
      />
    </div>
  );
}
