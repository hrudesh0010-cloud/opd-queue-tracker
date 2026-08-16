import React, { useState, useEffect, useRef } from 'react';
import { Phone, ShieldCheck, ArrowRight, RefreshCw, MessageSquare, CheckCircle2, AlertCircle, Edit2 } from 'lucide-react';
import { useDevConfig } from '../../context/DevConfigContext';

export default function PhoneOtpView({ onSuccess }) {
  const { config } = useDevConfig();
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpDigits, setOtpDigits] = useState(Array(config.otpLength || 6).fill(''));
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSmsToast, setShowSmsToast] = useState(false);

  const inputRefs = useRef([]);

  const countryCodes = [
    { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
    { code: '+1', country: 'US', flag: '🇺🇸', name: 'USA/Canada' },
    { code: '+44', country: 'GB', flag: '🇬🇧', name: 'UK' },
    { code: '+971', country: 'AE', flag: '🇦🇪', name: 'UAE' },
    { code: '+65', country: 'SG', flag: '🇸🇬', name: 'Singapore' },
    { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Australia' },
  ];

  // Timer Countdown for OTP resend
  useEffect(() => {
    let interval = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Generate a random 6-digit or 4-digit OTP
  const triggerSendOtp = (phoneStr) => {
    setIsSending(true);
    setErrorMsg('');
    
    setTimeout(() => {
      const len = config.otpLength || 6;
      let newOtp = '';
      for (let i = 0; i < len; i++) {
        newOtp += Math.floor(Math.random() * 10).toString();
      }
      setGeneratedOtp(newOtp);
      setOtpDigits(Array(len).fill(''));
      setIsSending(false);
      setStep('otp');
      setTimer(30);
      setCanResend(false);
      setShowSmsToast(true);

      // Auto focus first OTP input box
      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 100);
    }, 800);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    const cleanNum = phoneNumber.replace(/\D/g, '');
    if (cleanNum.length < 8) {
      setErrorMsg('Please enter a valid phone number (at least 8-10 digits)');
      return;
    }
    triggerSendOtp(`${countryCode} ${phoneNumber}`);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1); // Take last char
    setOtpDigits(newDigits);
    setErrorMsg('');

    // Move to next input box if typed
    if (value && index < config.otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto verify if filled
    const fullOtp = newDigits.join('');
    if (fullOtp.length === config.otpLength) {
      verifyOtpCode(fullOtp);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().replace(/\D/g, '');
    if (!pastedData) return;

    const len = config.otpLength || 6;
    const digits = pastedData.slice(0, len).split('');
    const newDigits = [...otpDigits];

    for (let i = 0; i < len; i++) {
      if (digits[i]) newDigits[i] = digits[i];
    }
    setOtpDigits(newDigits);

    const fullOtp = newDigits.join('');
    if (fullOtp.length === len) {
      verifyOtpCode(fullOtp);
    }
  };

  const verifyOtpCode = (codeToVerify) => {
    const code = codeToVerify || otpDigits.join('');
    if (code.length < (config.otpLength || 6)) {
      setErrorMsg(`Please enter all ${config.otpLength || 6} digits`);
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      if (code === generatedOtp || code === '123456' || code === '1234') {
        setIsVerifying(false);
        setShowSmsToast(false);
        onSuccess({
          name: `Patient (${countryCode} ${phoneNumber})`,
          phone: `${countryCode} ${phoneNumber}`,
          authMethod: 'Mobile OTP',
          role: 'Patient',
          id: 'MOB-' + Math.floor(100000 + Math.random() * 900000)
        });
      } else {
        setIsVerifying(false);
        setErrorMsg('Invalid OTP. Use the code shown in the notification bar or try 123456');
      }
    }, 700);
  };

  return (
    <div className="space-y-5">
      {/* Simulated SMS Notification Toast */}
      {showSmsToast && (
        <div className="p-3.5 bg-teal-950/90 border border-teal-500/40 rounded-xl shadow-lg flex items-center justify-between animate-slide-up text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-sm">
              💬
            </div>
            <div>
              <div className="font-semibold text-teal-200">SMS Verification Code</div>
              <div className="text-teal-400">
                Your <span className="font-bold">{config.hospitalName}</span> OTP is <span className="font-extrabold text-white text-sm bg-teal-900/80 px-2 py-0.5 rounded tracking-widest border border-teal-500/40">{generatedOtp}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowSmsToast(false)}
            className="text-teal-400 hover:text-white text-[11px] underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-red-950/70 border border-red-500/40 rounded-xl text-red-200 text-xs flex items-center gap-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STEP 1: Phone Number Input */}
      {step === 'phone' ? (
        <form onSubmit={handlePhoneSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Mobile Phone Number
            </label>
            <div className="flex items-center gap-2">
              {/* Country Code Dropdown */}
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="px-3 py-3 rounded-xl glass-input text-xs font-semibold bg-slate-900 border border-slate-700 cursor-pointer focus:ring-2 focus:ring-teal-500/50"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>

              {/* Phone Input */}
              <div className="relative flex-1">
                <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="98765 43210"
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm font-medium focus:ring-2 focus:ring-teal-500/50 tracking-wide"
                  required
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              We will send a 6-digit OTP via SMS for instant verification.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSending || !phoneNumber}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold text-sm transition-all shadow-lg shadow-teal-600/25 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Sending SMS...
              </>
            ) : (
              <>
                Send OTP Code <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      ) : (
        /* STEP 2: OTP Verification Input */
        <div className="space-y-5 animate-fade-in">
          <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div>
              <div className="text-[11px] text-slate-400">OTP sent to</div>
              <div className="font-semibold text-slate-200 text-xs">{countryCode} {phoneNumber}</div>
            </div>
            <button
              onClick={() => setStep('phone')}
              className="text-xs text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700"
            >
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 text-center">
              Enter {config.otpLength || 6}-digit OTP Code
            </label>

            {/* OTP Boxes */}
            <div className="flex items-center justify-center gap-2" onPaste={handlePaste}>
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-12 text-center text-lg font-bold text-teal-300 bg-slate-900 border border-slate-700 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all shadow-inner"
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => verifyOtpCode()}
            disabled={isVerifying || otpDigits.join('').length < (config.otpLength || 6)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold text-sm transition-all shadow-lg shadow-teal-600/25 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isVerifying ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Verifying OTP...
              </>
            ) : (
              <>
                Verify & Continue <CheckCircle2 className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Resend OTP */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>Didn't receive SMS?</span>
            {canResend ? (
              <button
                onClick={() => triggerSendOtp(`${countryCode} ${phoneNumber}`)}
                className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Resend OTP
              </button>
            ) : (
              <span className="text-slate-500 font-mono">
                Resend in <strong className="text-slate-300">{timer}s</strong>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
