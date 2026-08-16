import React, { useState } from 'react';
import { X, Check, ShieldCheck, Mail, ArrowRight, Chrome } from 'lucide-react';
import { useDevConfig } from '../../context/DevConfigContext';

export default function GoogleAuthModal({ isOpen, onClose, onSuccess }) {
  const { config } = useDevConfig();
  const [customEmail, setCustomEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const mockGoogleAccounts = [
    {
      name: "Aarav Sharma",
      email: "aarav.sharma@gmail.com",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      role: "Patient"
    },
    {
      name: "Dr. Ananya Roy",
      email: "dr.ananya@gmail.com",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80",
      role: "Triage Nurse"
    },
    {
      name: "Dr. Rajesh Verma",
      email: "rajesh.verma.md@gmail.com",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80",
      role: "OPD Doctor"
    }
  ];

  const handleSelectAccount = (account) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess({
        name: account.name,
        email: account.email,
        authMethod: 'Google SSO',
        avatar: account.avatar,
        role: account.role || 'Patient',
        id: 'G-' + Math.floor(100000 + Math.random() * 900000)
      });
    }, 600);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail || !customEmail.includes('@')) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const namePart = customEmail.split('@')[0];
      const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      onSuccess({
        name: formattedName,
        email: customEmail,
        authMethod: 'Google SSO',
        avatar: '👤',
        role: 'Patient',
        id: 'G-' + Math.floor(100000 + Math.random() * 900000)
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top Google Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.3 7.31 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2.0 10.04.0 12s.46 3.8 1.27 5.42l4.01-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <span className="font-semibold text-slate-200 text-sm">Sign in with Google</span>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-1">Choose an account</h3>
            <p className="text-xs text-slate-400">
              to continue to <span className="text-teal-400 font-medium">{config.hospitalName}</span>
            </p>
          </div>

          {/* Accounts List */}
          <div className="space-y-2.5">
            {mockGoogleAccounts.map((acc, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectAccount(acc)}
                disabled={isSubmitting}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-800/60 hover:border-teal-500/50 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  {typeof acc.avatar === 'string' && acc.avatar.startsWith('http') ? (
                    <img src={acc.avatar} alt={acc.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-800 group-hover:ring-teal-500/50 transition-all" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-lg">
                      {acc.avatar}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-slate-200 text-sm group-hover:text-white flex items-center gap-2">
                      {acc.name}
                      <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-slate-800 text-teal-400 border border-slate-700">
                        {acc.role}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">{acc.email}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full"></div>
            <span className="bg-slate-900 px-3 text-[11px] text-slate-500 uppercase font-semibold">Or use another Gmail</span>
          </div>

          {/* Custom Email Form */}
          <form onSubmit={handleCustomSubmit} className="space-y-3">
            <div>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="Enter your Gmail address"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm focus:ring-2 focus:ring-teal-500/50"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !customEmail}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Continue with Email <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Secure 256-bit encrypted authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
