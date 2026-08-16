import React, { useState } from "react";
import {
  LogOut,
  User,
  ShieldCheck,
  Activity,
  Stethoscope,
  Clock,
  FileText,
  Sliders,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Send,
  QrCode,
  Users,
  Building,
  RotateCcw,
} from "lucide-react";
import { useDevConfig } from "../../context/DevConfigContext";

export default function PostLoginDashboard() {
  const { currentUser, logoutUser, config } = useDevConfig();
  const [activeWorkstation, setActiveWorkstation] = useState("triage"); // 'triage' | 'doctor' | 'queue' | 'soap'

  // Interactive Chatbot Simulation State
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "ai",
      text: `Hello ${currentUser?.name || "Patient"}! I am the ${config.hospitalName} AI Pre-Triage Assistant. What brings you to the OPD today?`,
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [triageResult, setTriageResult] = useState(null);

  // Simulated OPD Token
  const [activeToken, setActiveToken] = useState({
    tokenId: "CARD-104",
    department: "Cardiology OPD Room 3",
    esiLevel: 2,
    esiCategory: "Urgent / High Priority",
    estWaitMinutes: 12,
    queuePosition: 2,
    doctor: "Dr. Rajesh Verma, MD",
  });

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg = userInput.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setUserInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      // Analyze for red flags
      const lower = userMsg.toLowerCase();
      if (
        lower.includes("chest pain") ||
        lower.includes("breath") ||
        lower.includes("heart")
      ) {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: `⚠️ CRITICAL RISK DETECTED: Symptoms match high-risk cardiovascular / respiratory criteria. Triage score escalated to ESI Level 1 (Emergency). You have been assigned Priority Token ER-911 and auto-routed to Emergency Bay 1.`,
          },
        ]);
        setTriageResult({
          esiLevel: 1,
          category: "Emergency / Resuscitation",
          color: "bg-red-600",
          borderColor: "border-red-500",
          department: "Emergency Resuscitation Bay 1",
          recommendation:
            "Immediate medical evaluation required. Direct ER bypass assigned.",
        });
        setActiveToken({
          tokenId: "ER-911",
          department: "Emergency Resuscitation Bay 1",
          esiLevel: 1,
          esiCategory: "ESI Level 1 (Immediate Bypass)",
          estWaitMinutes: 0,
          queuePosition: 1,
          doctor: "Dr. Emergency Team Leader",
        });
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: `Thank you. I have recorded your symptoms. Your profile has been classified as ESI Level 3 (Urgent Consultation). Digital Token CARD-104 issued for Cardiology OPD.`,
          },
        ]);
        setTriageResult({
          esiLevel: 3,
          category: "Urgent OPD Consultation",
          color: "bg-amber-600",
          borderColor: "border-amber-500",
          department: "Cardiology OPD Room 3",
          recommendation: "Scheduled for physician review in ~12 minutes.",
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0010] text-slate-100 flex flex-col">
      {/* Dashboard Top Header */}
      <header className="bg-purple-950/80 border-b border-purple-800/50  px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center font-bold text-lg">
            {currentUser?.avatar || "👤"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-white text-lg">
                {currentUser?.name}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-500/30 text-[11px] font-semibold">
                {currentUser?.role || "Patient"}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <span>
                ID:{" "}
                <strong className="text-slate-200">{currentUser?.id}</strong>
              </span>
              <span>•</span>
              <span>
                Auth via:{" "}
                <strong className="text-teal-400">
                  {currentUser?.authMethod}
                </strong>
              </span>
            </p>
          </div>
        </div>

        {/* Workstation Selector & Logout */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            {[
              {
                id: "triage",
                label: "AI Pre-Triage Chatbot",
                icon: Stethoscope,
              },
              { id: "doctor", label: "Doctor Console", icon: Activity },
              { id: "soap", label: "SOAP Pre-Consult", icon: FileText },
              { id: "queue", label: "Public Queue Board", icon: Clock },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveWorkstation(tab.id)}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    activeWorkstation === tab.id
                      ? "bg-teal-600 text-white shadow-md"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={logoutUser}
            className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Banner Alert */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-teal-500/30 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
              ⚡
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">
                Successfully Authenticated to {config.hospitalName}
              </h3>
              <p className="text-xs text-slate-300">
                You are currently viewing the{" "}
                <span className="text-teal-400 font-semibold">
                  {activeWorkstation.toUpperCase()}
                </span>{" "}
                workstation mode. You can test the AI symptom checker, generate
                digital tokens, and view doctor pre-consult sheets below.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveWorkstation("triage")}
            className="hidden sm:flex px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold items-center gap-2 transition-all shadow-md"
          >
            Launch Chatbot <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* WORKSTATION 1: AI PRE-TRIAGE CHATBOT */}
        {activeWorkstation === "triage" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Interactive Chatbot Window */}
            <div className="lg:col-span-2 glass-panel rounded-3xl p-5 border border-slate-800 flex flex-col h-[520px]">
              <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">
                    🤖
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      AI Clinical Triage Assistant
                    </h4>
                    <p className="text-[11px] text-teal-400">
                      Emergency Severity Index (ESI 1-5) Protocol Active
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-teal-950 text-teal-300 border border-teal-500/40 text-[10px] font-mono">
                  Online • Voice/Text Intake
                </span>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-teal-600 text-white rounded-br-none shadow-md"
                          : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-400 flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-teal-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-teal-400 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                      <span className="ml-1 text-[11px]">
                        Evaluating symptoms against ESI guidelines...
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form
                onSubmit={handleSendChatMessage}
                className="p-2 border-t border-slate-800 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Describe symptoms e.g., 'Severe chest pressure for 30 minutes with sweating'"
                  className="flex-1 px-4 py-2.5 rounded-xl glass-input text-xs"
                />
                <button
                  type="submit"
                  disabled={!userInput.trim()}
                  className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white transition-all disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Right Col: Digital Token & Triage Summary */}
            <div className="space-y-4">
              {/* Digital Token Card */}
              <div className="glass-panel p-5 rounded-3xl border border-teal-500/40 relative overflow-hidden glow-primary">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-400">
                    Digital OPD Token
                  </span>
                  <QrCode className="w-5 h-5 text-slate-400" />
                </div>

                <div className="text-center py-3 bg-slate-900/80 rounded-2xl border border-slate-800 mb-4">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">
                    Token Number
                  </div>
                  <div className="text-3xl font-extrabold text-teal-300 tracking-wider font-mono">
                    {activeToken.tokenId}
                  </div>
                  <div className="text-xs text-slate-300 font-medium mt-1">
                    {activeToken.department}
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/40 border border-slate-800">
                    <span className="text-slate-400">
                      Triage Classification:
                    </span>
                    <span className="font-bold text-amber-400">
                      {activeToken.esiCategory}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/40 border border-slate-800">
                    <span className="text-slate-400">Est. Wait Time:</span>
                    <span className="font-bold text-teal-300 font-mono">
                      ~{activeToken.estWaitMinutes} min
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/40 border border-slate-800">
                    <span className="text-slate-400">Assigned Specialist:</span>
                    <span className="font-semibold text-slate-200">
                      {activeToken.doctor}
                    </span>
                  </div>
                </div>
              </div>

              {/* Triage Protocol Info */}
              <div className="glass-panel p-4 rounded-3xl border border-slate-800 space-y-2 text-xs">
                <h5 className="font-bold text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-400" /> ESI Triage
                  Categories
                </h5>
                <ul className="space-y-1.5 text-[11px] text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>{" "}
                    ESI Level 1: Immediate ER Resuscitation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>{" "}
                    ESI Level 2: High Risk Emergency
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>{" "}
                    ESI Level 3: Urgent OPD Consultation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
                    ESI Level 4/5: Routine OPD Consultation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* WORKSTATION 2: DOCTOR CONSOLE */}
        {activeWorkstation === "doctor" && (
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-white text-lg">
                  Doctor OPD Queue Workstation
                </h3>
                <p className="text-xs text-slate-400">
                  Review incoming triage summaries, call next patient, and
                  update consultation status
                </p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-600/20">
                <Users className="w-4 h-4" /> Call Next Patient (CARD-104)
              </button>
            </div>

            {/* Queue Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 uppercase font-semibold text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Token</th>
                    <th className="p-3">Patient Name</th>
                    <th className="p-3">ESI Urgency</th>
                    <th className="p-3">Chief Complaint</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  <tr className="bg-teal-950/20">
                    <td className="p-3 font-mono font-bold text-teal-300">
                      ER-911
                    </td>
                    <td className="p-3 font-semibold">Vikram Roy (54M)</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-500/40 font-bold">
                        ESI Level 1
                      </span>
                    </td>
                    <td className="p-3">
                      Acute retrosternal chest pressure + diaphoresis
                    </td>
                    <td className="p-3 text-red-400 font-semibold animate-pulse">
                      Bypassed to ER Bay 1
                    </td>
                    <td className="p-3">
                      <button className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs">
                        View SOAP
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-teal-300">
                      CARD-104
                    </td>
                    <td className="p-3 font-semibold">{currentUser?.name}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 font-bold">
                        ESI Level 3
                      </span>
                    </td>
                    <td className="p-3">
                      Exertional dyspnea & mild palpitations (3 days)
                    </td>
                    <td className="p-3 text-amber-300 font-semibold">
                      Now Serving
                    </td>
                    <td className="p-3">
                      <button className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold">
                        In-Consultation
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-slate-400">
                      CARD-105
                    </td>
                    <td className="p-3 font-semibold">Meera Patel (29F)</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">
                        ESI Level 4
                      </span>
                    </td>
                    <td className="p-3">Routine hypertension checkup</td>
                    <td className="p-3 text-slate-400">Waiting (~25 min)</td>
                    <td className="p-3">
                      <button className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs">
                        View Notes
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* WORKSTATION 3: SOAP PRE-CONSULT SHEET */}
        {activeWorkstation === "soap" && (
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-white text-lg">
                  Doctor Pre-Consultation Summary (SOAP Format)
                </h3>
                <p className="text-xs text-slate-400">
                  Automatically synthesized by AI Clinical Model prior to
                  patient consultation
                </p>
              </div>
              <button className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200">
                🖨️ Print Clinical Sheet
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-teal-400 text-sm">
                  Subjective (Patient Reported)
                </h4>
                <p className="text-slate-300">
                  <strong>Chief Complaint:</strong> Patient reports exertional
                  dyspnea and intermittent chest tightness over past 72 hours.
                </p>
                <p className="text-slate-300">
                  <strong>Pain Scale:</strong> 6/10 (Substernal location,
                  non-radiation).
                </p>
                <p className="text-slate-300">
                  <strong>Associated Symptoms:</strong> Mild fatigue, no nausea,
                  no syncopal episodes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-cyan-400 text-sm">
                  Objective (Recorded Vitals)
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">Blood Pressure</span>
                    <strong className="text-slate-100 text-xs">
                      134/86 mmHg
                    </strong>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">Heart Rate</span>
                    <strong className="text-slate-100 text-xs">
                      92 bpm (Regular)
                    </strong>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">
                      Oxygen Saturation
                    </span>
                    <strong className="text-slate-100 text-xs">
                      98% on Room Air
                    </strong>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">Temperature</span>
                    <strong className="text-slate-100 text-xs">98.6 °F</strong>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400 text-sm">
                  Assessment & ICD-10 Differential
                </h4>
                <p className="text-slate-300">
                  <strong>Primary Triage ESI:</strong> Level 3 (Urgent
                  Specialist Evaluation).
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 text-[10px] font-mono">
                    ICD-10 I20.9 (Angina Pectoris, unspecified)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                    ICD-10 R06.02 (Shortness of breath)
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-emerald-400 text-sm">
                  Plan & Diagnostic Recommendations
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                  <li>Stat 12-lead Electrocardiogram (ECG).</li>
                  <li>Troponin-I & Cardiac Enzymes Panel.</li>
                  <li>Cardiology consultation (Dr. Rajesh Verma).</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* WORKSTATION 4: PUBLIC QUEUE BOARD */}
        {activeWorkstation === "queue" && (
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-extrabold text-white text-lg">
                  Hospital OPD Public Waiting Room Display
                </h3>
                <p className="text-xs text-slate-400">
                  Live synchronization for patient kiosk monitors
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Current Time</div>
                <div className="text-sm font-mono font-bold text-teal-300">
                  01:45 PM
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Now Serving */}
              <div className="p-5 rounded-2xl bg-teal-950/40 border border-teal-500/50 text-center space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Now Serving
                </div>
                <div className="text-5xl font-extrabold text-white font-mono">
                  CARD-104
                </div>
                <div className="text-xs text-teal-200">
                  Cardiology OPD • Room 3
                </div>
              </div>

              {/* Next in Line */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Next in Line
                </div>
                <div className="text-4xl font-bold text-slate-200 font-mono">
                  CARD-105
                </div>
                <div className="text-xs text-slate-400">Est Wait: ~10 mins</div>
              </div>

              {/* Emergency Alert */}
              <div className="p-5 rounded-2xl bg-red-950/40 border border-red-500/50 text-center space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center justify-center gap-1">
                  <AlertTriangle className="w-4 h-4" /> Emergency Priority
                </div>
                <div className="text-4xl font-bold text-red-200 font-mono">
                  ER-911
                </div>
                <div className="text-xs text-red-300">Bypassed to ER Bay 1</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
