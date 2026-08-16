# 🏥 Opd Queue Tracker - AI Symptom Checker & Triage Login Portal

> **Folder Location:** `C:\Users\Hrudesh\.gemini\antigravity\scratch\Opd Queue Tracker`

All files used to build the **Google SSO / Mobile OTP Customizable Login Page and OPD Triage System** have been embedded inside this single folder `Opd Queue Tracker`.

---

## 📁 Directory & File Map for Developers

```text
Opd Queue Tracker/
├── README.md                    # Navigation guide & setup instructions
├── package.json                 # Project configuration & dependencies
├── vite.config.js               # Vite build settings
├── tailwind.config.js           # Theme colors, tokens, & glassmorphism animations
├── postcss.config.js            # PostCSS configuration
├── index.html                   # Entry HTML (Google Fonts: Plus Jakarta Sans & Inter)
│
└── src/
    ├── main.jsx                 # React entry point
    ├── App.jsx                  # Main view switcher (Login Landing vs Post-Login Dashboard)
    ├── index.css                # Glassmorphism utilities & CSS variables for developer themes
    │
    ├── context/
    │   └── DevConfigContext.jsx # Global Context holding developer customization, theme tokens, & auth state
    │
    └── components/
        ├── auth/
        │   ├── LoginLanding.jsx         # Hero landing section, branding header, & auth tab switcher
        │   ├── GoogleAuthModal.jsx      # Google / Gmail SSO interactive popup simulation
        │   ├── PhoneOtpView.jsx         # Mobile Number + OTP verification flow & SMS simulation toast
        │   └── DevCustomizerDrawer.jsx  # Live side-drawer for customizing branding, colors, & JSON export
        │
        └── dashboard/
            └── PostLoginDashboard.jsx   # Post-login hub (AI Chatbot, Doctor Console, SOAP Sheet, Queue Board)
```

---

## ⚡ How Developers Can Edit & Run

### Option 1: Open in VS Code / IDE
Open your terminal and run:
```bash
cd "C:\Users\Hrudesh\.gemini\antigravity\scratch\Opd Queue Tracker"
```

### Option 2: Run Development Server
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

---

## 🎨 Developer Customization Features Built-in

- **Google SSO Modal**: Edit [`src/components/auth/GoogleAuthModal.jsx`](file:///C:/Users/xyz\\.gemini/antigravity/scratch/Opd%20Queue%20Tracker/src/components/auth/GoogleAuthModal.jsx) to modify Google OAuth flow.
- **Mobile OTP Flow**: Edit [`src/components/auth/PhoneOtpView.jsx`](file:///C:/Users/Hrudesh/.gemini/antigravity/scratch/Opd%20Queue%20Tracker/src/components/auth/PhoneOtpView.jsx) to tweak country codes or OTP digit validation.
- **Dev Live Drawer**: Click **"⚡ Dev Customizer"** in the live web app to change hospital names, theme colors, or export JSON configs live.
