import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  X,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Settings,
  RefreshCw,
  LogOut
} from "lucide-react";

export default function AdminModal({
  isOpen,
  onClose,
  isAdmin,
  setIsAdmin,
  onShowToast
}) {
  const DEFAULT_PIN = "2027";
  const RECOVERY_KEYS = [
    "ajay.teli.23ece@bmu.edu.in",
    "ajayteli",
    "23ece",
    "+91 9116847163",
    "9116847163"
  ];

  const getStoredPin = () => {
    try {
      return localStorage.getItem("ajay_admin_pin") || DEFAULT_PIN;
    } catch {
      return DEFAULT_PIN;
    }
  };

  const [pinInput, setPinInput] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [isSettingsMode, setIsSettingsMode] = useState(false);

  // Forgot PIN state
  const [recoveryInput, setRecoveryInput] = useState("");
  const [newPinRecovery, setNewPinRecovery] = useState("");
  const [confirmPinRecovery, setConfirmPinRecovery] = useState("");

  // Change PIN state
  const [currentPinChange, setCurrentPinChange] = useState("");
  const [newPinChange, setNewPinChange] = useState("");
  const [confirmPinChange, setConfirmPinChange] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  // Handle standard unlock submit
  const handleUnlock = (e) => {
    e.preventDefault();
    const currentStoredPin = getStoredPin();
    if (pinInput.trim() === currentStoredPin) {
      setIsAdmin(true);
      setPinInput("");
      setErrorMessage("");
      if (onShowToast) onShowToast("🛡️ Admin Mode Unlocked!");
      onClose();
    } else {
      setErrorMessage("Invalid PIN. Please try again.");
      setPinInput("");
    }
  };

  // Handle Forgot PIN Recovery submit
  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    const cleanRecovery = recoveryInput.trim().toLowerCase();
    const isKeyValid = RECOVERY_KEYS.some((k) => k.toLowerCase() === cleanRecovery);

    if (!isKeyValid) {
      setErrorMessage("Recovery key does not match your registered credentials.");
      return;
    }

    if (!newPinRecovery || newPinRecovery.length < 4) {
      setErrorMessage("New PIN must be at least 4 characters.");
      return;
    }

    if (newPinRecovery !== confirmPinRecovery) {
      setErrorMessage("New PIN and Confirm PIN do not match.");
      return;
    }

    // Save new PIN
    try {
      localStorage.setItem("ajay_admin_pin", newPinRecovery.trim());
    } catch (err) {
      console.warn("localStorage error", err);
    }

    setIsAdmin(true);
    setIsForgotMode(false);
    setRecoveryInput("");
    setNewPinRecovery("");
    setConfirmPinRecovery("");
    setErrorMessage("");
    if (onShowToast) onShowToast("✅ PIN successfully reset & Admin Mode Unlocked!");
    onClose();
  };

  // Handle Change PIN inside settings
  const handleChangePin = (e) => {
    e.preventDefault();
    const currentStoredPin = getStoredPin();

    if (currentPinChange.trim() !== currentStoredPin) {
      setErrorMessage("Current PIN is incorrect.");
      return;
    }

    if (!newPinChange || newPinChange.length < 4) {
      setErrorMessage("New PIN must be at least 4 characters.");
      return;
    }

    if (newPinChange !== confirmPinChange) {
      setErrorMessage("New PIN and Confirm PIN do not match.");
      return;
    }

    try {
      localStorage.setItem("ajay_admin_pin", newPinChange.trim());
    } catch (err) {
      console.warn("localStorage error", err);
    }

    setSuccessMessage("PIN updated successfully!");
    setErrorMessage("");
    setCurrentPinChange("");
    setNewPinChange("");
    setConfirmPinChange("");
    if (onShowToast) onShowToast("🔒 Admin PIN updated successfully!");
    setTimeout(() => {
      setSuccessMessage("");
      setIsSettingsMode(false);
    }, 1500);
  };

  // Handle Logout / Lock
  const handleLogout = () => {
    setIsAdmin(false);
    setIsSettingsMode(false);
    setIsForgotMode(false);
    if (onShowToast) onShowToast("🔒 Admin Mode Locked.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {isAdmin
                  ? isSettingsMode
                    ? "Admin PIN Settings"
                    : "Admin Controls"
                  : isForgotMode
                  ? "Admin PIN Recovery"
                  : "Console Authentication"}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isAdmin
                  ? "Manage project customization & security"
                  : "Protected developer configuration"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* State 1: When ALREADY Unlocked (Admin Dashboard / Change PIN) */}
        {isAdmin ? (
          <div className="space-y-4 text-xs">
            {!isSettingsMode ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Admin Mode Active</span>
                  </div>
                  <p className="text-slate-300 text-xs">
                    You have full permission to add, edit, delete projects and customize live deployments.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsSettingsMode(true);
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Change PIN ⚙️</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 font-semibold transition cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    <span>Lock / Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Change PIN Form */
              <form onSubmit={handleChangePin} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Current PIN</label>
                  <input
                    type="password"
                    required
                    value={currentPinChange}
                    onChange={(e) => setCurrentPinChange(e.target.value)}
                    placeholder="Enter current PIN"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">New PIN (min 4 chars)</label>
                  <input
                    type="password"
                    required
                    value={newPinChange}
                    onChange={(e) => setNewPinChange(e.target.value)}
                    placeholder="Enter new private PIN"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Confirm New PIN</label>
                  <input
                    type="password"
                    required
                    value={confirmPinChange}
                    onChange={(e) => setConfirmPinChange(e.target.value)}
                    placeholder="Re-enter new private PIN"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                {errorMessage && (
                  <p className="text-[11px] text-rose-400 font-medium">{errorMessage}</p>
                )}

                {successMessage && (
                  <p className="text-[11px] text-emerald-400 font-medium">{successMessage}</p>
                )}

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSettingsMode(false);
                      setErrorMessage("");
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
                  >
                    Save New PIN
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : isForgotMode ? (
          /* State 2: Forgot PIN Recovery Form */
          <form onSubmit={handleRecoverySubmit} className="space-y-3.5 text-xs">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] leading-relaxed">
              Verify your identity by entering your registered college email (e.g. <span className="font-mono text-white">ajay.teli.23ece@bmu.edu.in</span>) or roll code.
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Recovery Email / Passphrase</label>
              <input
                type="text"
                required
                value={recoveryInput}
                onChange={(e) => setRecoveryInput(e.target.value)}
                placeholder="ajay.teli.23ece@bmu.edu.in"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">New PIN</label>
                <input
                  type="password"
                  required
                  value={newPinRecovery}
                  onChange={(e) => setNewPinRecovery(e.target.value)}
                  placeholder="Min 4 chars"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Confirm New PIN</label>
                <input
                  type="password"
                  required
                  value={confirmPinRecovery}
                  onChange={(e) => setConfirmPinRecovery(e.target.value)}
                  placeholder="Re-enter PIN"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-[11px] text-rose-400 font-medium">{errorMessage}</p>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsForgotMode(false);
                  setErrorMessage("");
                }}
                className="text-slate-400 hover:text-slate-200 text-xs transition"
              >
                ← Back to Login
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition"
              >
                Reset & Unlock
              </button>
            </div>
          </form>
        ) : (
          /* State 3: Standard PIN Entry (Zero Hints, 100% Private) */
          <form onSubmit={handleUnlock} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium flex items-center justify-between">
                <span>Passcode / Security PIN</span>
                <button
                  type="button"
                  onClick={() => setIsForgotMode(true)}
                  className="text-indigo-400 hover:text-indigo-300 text-[11px] transition cursor-pointer"
                >
                  Forgot PIN?
                </button>
              </label>

              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  required
                  autoFocus
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder="Enter private admin PIN..."
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-mono tracking-widest text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {errorMessage && (
                <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errorMessage}</span>
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition cursor-pointer"
              >
                Unlock Console
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

