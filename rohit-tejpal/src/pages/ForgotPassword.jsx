import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedButton from '../components/ui/AnimatedButton';
import { useAuth } from '../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  
  const { forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    const result = await forgotPassword(email);
    if (result.success) {
      setIsSubmitted(true);
      setSuccessMsg(result.message || "OTP sent to your email.");
    } else {
      setError(result.error);
    }
    setIsSubmitting(false);
  };
  
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsSubmitting(false);
      return;
    }

    const result = await resetPassword(email, otp, newPassword);
    if (result.success) {
      setSuccessMsg("Password reset successfully. Redirecting to login...");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(result.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-main-bg)] py-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[var(--color-alt-bg)] p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-gold)] opacity-5 rounded-bl-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-gold)] opacity-5 rounded-tr-full pointer-events-none"></div>

        <div className="text-center mb-10 relative z-10">
          <h1 className="text-3xl md:text-4xl font-serif text-[var(--color-text-main)] mb-3">Reset Password</h1>
          <p className="text-[var(--color-text-secondary)] text-sm md:text-base font-light tracking-wide">
            {isSubmitted 
              ? "Enter the OTP sent to your email and a new password." 
              : "Enter your email to receive a verification OTP."}
          </p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-sm mb-6 text-sm text-center">
            {error}
          </div>
        )}
        
        {successMsg && (
          <div className="bg-green-900/30 border border-green-500/50 text-green-200 px-4 py-3 rounded-sm mb-6 text-sm text-center">
            {successMsg}
          </div>
        )}

        {!isSubmitted ? (
          <form onSubmit={handleEmailSubmit} className="space-y-6 relative z-10">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-[2px] text-[var(--color-text-secondary)] font-semibold ml-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[var(--color-main-bg)] border border-[var(--color-border)] focus:border-[var(--color-gold)] text-[var(--color-text-main)] px-5 py-4 outline-none transition-colors rounded-sm"
                placeholder="Enter your email"
              />
            </div>

            <div className="pt-2">
              <AnimatedButton 
                type="submit" 
                className="w-full justify-center py-4 bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-text-main)] font-semibold tracking-wider text-sm shadow-[0_0_15px_rgba(182,154,97,0.3)] hover:shadow-[0_0_25px_rgba(182,154,97,0.5)] transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SENDING OTP...' : 'SEND OTP'}
              </AnimatedButton>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-6 relative z-10">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-[2px] text-[var(--color-text-secondary)] font-semibold ml-1">Enter OTP</label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-[var(--color-main-bg)] border border-[var(--color-border)] focus:border-[var(--color-gold)] text-[var(--color-text-main)] px-5 py-4 outline-none transition-colors rounded-sm text-center tracking-widest text-lg"
                placeholder="XXXXXX"
                maxLength={6}
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-[2px] text-[var(--color-text-secondary)] font-semibold ml-1">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[var(--color-main-bg)] border border-[var(--color-border)] focus:border-[var(--color-gold)] text-[var(--color-text-main)] px-5 py-4 outline-none transition-colors rounded-sm"
                placeholder="Enter new password"
              />
            </div>

            <div className="pt-2">
              <AnimatedButton 
                type="submit" 
                className="w-full justify-center py-4 bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-text-main)] font-semibold tracking-wider text-sm shadow-[0_0_15px_rgba(182,154,97,0.3)] hover:shadow-[0_0_25px_rgba(182,154,97,0.5)] transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'RESETTING...' : 'RESET PASSWORD'}
              </AnimatedButton>
            </div>
            
            <div className="text-center">
              <button 
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setSuccessMsg(null);
                  setError(null);
                }}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors"
              >
                Go back
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 text-center text-[var(--color-text-secondary)] text-sm relative z-10">
          <p>
            Remember your password?{' '}
            <Link to="/login" className="text-[var(--color-gold)] hover:text-[var(--color-text-main)] transition-colors font-medium ml-1">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
