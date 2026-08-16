import React, { createContext, useContext, useState, useEffect } from "react";

const defaultDevConfig = {
  SiteName: "Swasth Setu AI Symptom Checker & Smart Triage Portal",
  portalTitle: "OPD AI Symptom Checker & Smart Triage Portal",
  tagline:
    "Intelligent Pre-Triage, instant specialist routing, and real-time OPD queue management.",
  logoType: "shield-pulse", // 'shield-pulse', 'heart-rate', 'caduceus', 'hospital', 'custom'
  customLogoUrl: "",
  primaryColor: "#580e9996", // Teal 600
  accentColor: "#a532c2", // Cyan 500
  themeMode: "dark", // 'dark', 'light', 'glass-navy'
  authMethods: {
    googleSso: true,
    phoneOtp: true,
    emailPassword: true,
    S,
  },
  otpLength: 6, // 4 or 6
  customDisclaimer:
    "⚠️ Emergency Notice: For acute chest pain, severe breathlessness, stroke symptoms, or sudden trauma, please proceed directly to ER Counter 1.",
  demoAccounts: [
    {
      role: "Patient",
      name: "Uzair",
      id: "PT-9042",
      avatar: "👨‍💼",
      phone: "+91 98765 43210",
      email: "aarav.s@gmail.com",
    },
    {
      role: "Triage Nurse",
      name: "Nurse Ananya Roy, RN",
      id: "NRS-104",
      avatar: "👩‍⚕️",
      phone: "+91 98123 45678",
      email: "ananya.nurse@aegishealth.org",
    },
    {
      role: "OPD Doctor",
      name: "Dr. Rajesh Verma, MD",
      id: "DOC-501",
      avatar: "👨‍⚕️",
      department: "Cardiology",
      email: "dr.verma@aegishealth.org",
    },
    {
      role: "OPD Admin",
      name: "Vikram Mehta (Admin)",
      id: "ADM-001",
      avatar: "👔",
      email: "admin@aegishealth.org",
    },
  ],
};

const DevConfigContext = createContext();

export const DevConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem("opd_dev_config");
    return saved ? JSON.parse(saved) : defaultDevConfig;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("opd_current_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [language, setLanguage] = useState("en"); // 'en', 'hi', 'es', 'fr'

  useEffect(() => {
    localStorage.setItem("opd_dev_config", JSON.stringify(config));
    // Apply primary CSS variables dynamically
    document.documentElement.style.setProperty(
      "--primary-color",
      config.primaryColor,
    );
    document.documentElement.style.setProperty(
      "--accent-color",
      config.accentColor,
    );
  }, [config]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("opd_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("opd_current_user");
    }
  }, [currentUser]);

  const updateConfig = (newSettings) => {
    setConfig((prev) => ({ ...prev, ...newSettings }));
  };

  const resetConfig = () => {
    setConfig(defaultDevConfig);
  };

  const loginUser = (user) => {
    setCurrentUser(user);
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  return (
    <DevConfigContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        currentUser,
        loginUser,
        logoutUser,
        language,
        setLanguage,
      }}
    >
      {children}
    </DevConfigContext.Provider>
  );
};

export const useDevConfig = () => useContext(DevConfigContext);
