import React, { useState } from "react";
import {
  X,
  Settings,
  Palette,
  Shield,
  Sliders,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Layout,
  KeyRound,
} from "lucide-react";
import { useDevConfig } from "./src/context/DevConfigContext";

export default function DevCustomizerDrawer({ isOpen, onClose }) {
  const { config, updateConfig, resetConfig } = useDevConfig();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("branding"); // 'branding' | 'auth' | 'theme' | 'code'

  if (!isOpen) return null;

  const colorPresets = [
    { name: "Ocean Emerald", primary: "#0d9488", accent: "#06b6d4" },
    { name: "Cyber Indigo", primary: "#4f46e5", accent: "#38bdf8" },
    { name: "Royal Crimson", primary: "#e11d48", accent: "#f43f5e" },
    { name: "Midnight Gold", primary: "#d97706", accent: "#fbbf24" },
    { name: "Clinical Navy", primary: "#0284c7", accent: "#10b981" },
  ];

  const logoPresets = [
    { id: "shield-pulse", name: "Shield & Pulse", icon: "🛡️" },
    { id: "heart-rate", name: "Heart & EKG", icon: "❤️" },
    { id: "hospital", name: "Hospital Building", icon: "🏥" },
    { id: "caduceus", name: "Caduceus Cross", icon: "⚕️" },
  ];

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Developer Customizer
              </h3>
              <p className="text-[11px] text-slate-400">
                Tweak UI, Auth providers & Hospital branding live
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-4 gap-1 p-2 bg-slate-950 border-b border-slate-800 text-xs font-semibold">
          {[
            { id: "branding", label: "Branding", icon: Layout },
            { id: "theme", label: "Theme", icon: Palette },
            { id: "auth", label: "Auth & OTP", icon: KeyRound },
            { id: "code", label: "JSON Config", icon: Copy },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === tab.id
                    ? "bg-teal-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs text-slate-300 no-scrollbar">
          {/* TAB 1: BRANDING */}
          {activeTab === "branding" && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-slate-200 font-semibold mb-1">
                  Hospital / System Name
                </label>
                <input
                  type="text"
                  value={config.hospitalName}
                  onChange={(e) =>
                    updateConfig({ hospitalName: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-1">
                  Portal Sub-Title
                </label>
                <input
                  type="text"
                  value={config.portalTitle}
                  onChange={(e) =>
                    updateConfig({ portalTitle: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-1">
                  Tagline
                </label>
                <textarea
                  value={config.tagline}
                  onChange={(e) => updateConfig({ tagline: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-2">
                  Hospital Logo Icon Preset
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {logoPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => updateConfig({ logoType: preset.id })}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
                        config.logoType === preset.id
                          ? "border-teal-500 bg-teal-950/40 text-teal-200 ring-1 ring-teal-500"
                          : "border-slate-800 bg-slate-950/40 hover:border-slate-700 text-slate-400"
                      }`}
                    >
                      <span className="text-xl">{preset.icon}</span>
                      <span className="font-medium text-xs">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-1">
                  Emergency Disclaimer Banner
                </label>
                <textarea
                  value={config.customDisclaimer}
                  onChange={(e) =>
                    updateConfig({ customDisclaimer: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 2: THEME */}
          {activeTab === "theme" && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-slate-200 font-semibold mb-2">
                  Color Scheme Presets
                </label>
                <div className="space-y-2">
                  {colorPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        updateConfig({
                          primaryColor: preset.primary,
                          accentColor: preset.accent,
                        })
                      }
                      className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                        config.primaryColor === preset.primary
                          ? "border-teal-500 bg-teal-950/40 ring-1 ring-teal-500"
                          : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                      }`}
                    >
                      <span className="font-semibold text-slate-200">
                        {preset.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-full border border-white/20"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div
                          className="w-5 h-5 rounded-full border border-white/20"
                          style={{ backgroundColor: preset.accent }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Primary Color (Hex)
                  </label>
                  <input
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) =>
                      updateConfig({ primaryColor: e.target.value })
                    }
                    className="w-full h-10 rounded-xl bg-slate-900 border border-slate-700 cursor-pointer p-1"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Accent Color (Hex)
                  </label>
                  <input
                    type="color"
                    value={config.accentColor}
                    onChange={(e) =>
                      updateConfig({ accentColor: e.target.value })
                    }
                    className="w-full h-10 rounded-xl bg-slate-900 border border-slate-700 cursor-pointer p-1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AUTH & OTP */}
          {activeTab === "auth" && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-slate-200 font-semibold mb-3">
                  Allowed Authentication Methods
                </label>
                <div className="space-y-2.5">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-950/40 cursor-pointer">
                    <span className="font-medium text-slate-200">
                      Google / Gmail Single Sign-On
                    </span>
                    <input
                      type="checkbox"
                      checked={config.authMethods.googleSso}
                      onChange={(e) =>
                        updateConfig({
                          authMethods: {
                            ...config.authMethods,
                            googleSso: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 accent-teal-500 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-950/40 cursor-pointer">
                    <span className="font-medium text-slate-200">
                      Mobile Phone Number + OTP
                    </span>
                    <input
                      type="checkbox"
                      checked={config.authMethods.phoneOtp}
                      onChange={(e) =>
                        updateConfig({
                          authMethods: {
                            ...config.authMethods,
                            phoneOtp: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 accent-teal-500 rounded"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-2">
                  OTP Verification Length
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[4, 6].map((len) => (
                    <button
                      key={len}
                      onClick={() => updateConfig({ otpLength: len })}
                      className={`py-2.5 rounded-xl border font-bold text-center transition-all ${
                        config.otpLength === len
                          ? "border-teal-500 bg-teal-950/40 text-teal-300 ring-1 ring-teal-500"
                          : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      {len}-Digit OTP Code
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: JSON CONFIG */}
          {activeTab === "code" && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">
                  Exportable Developer Config
                </span>
                <button
                  onClick={handleCopyJson}
                  className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium flex items-center gap-1.5 text-xs transition-colors shadow-md"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied ? "Copied!" : "Copy JSON"}
                </button>
              </div>

              <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-mono text-teal-300 overflow-x-auto max-h-80 no-scrollbar">
                {JSON.stringify(config, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            onClick={resetConfig}
            className="px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-lg shadow-teal-600/20"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}
