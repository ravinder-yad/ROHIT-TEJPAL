import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AnimatedButton from '../components/ui/AnimatedButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    const result = await login(email, password);
    if (result.success) {
      setSuccessMsg(result.message || "OTP sent to your email.");
      setShowOtpInput(true);
    } else {
      setError(result.error);
    }
    setIsSubmitting(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await verifyOtp(email, otp);
    if (result.success) {
      navigate('/'); 
    } else {
      setError(result.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-primary-dark)] py-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#353f56] p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-gold)] opacity-5 rounded-bl-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-gold)] opacity-5 rounded-tr-full pointer-events-none"></div>

        <div className="text-center mb-10 relative z-10">
          <h1 className="text-3xl md:text-4xl font-serif text-white mb-3">Welcome Back</h1>
          <p className="text-[#aeb5c7] text-sm md:text-base font-light tracking-wide">
            {showOtpInput ? "Check your email for the verification code." : "Sign in to access your account and orders."}
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

        {!showOtpInput ? (
          <form onSubmit={handleLoginSubmit} className="space-y-6 relative z-10">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-[2px] text-[#aeb5c7] font-semibold ml-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#2a3245] border border-[#4a5568] focus:border-[var(--color-gold)] text-white px-5 py-4 outline-none transition-colors rounded-sm"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] uppercase tracking-[2px] text-[#aeb5c7] font-semibold">Password</label>
                <Link to="/forgot-password" className="text-[11px] text-[var(--color-gold)] hover:text-white transition-colors">
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#2a3245] border border-[#4a5568] focus:border-[var(--color-gold)] text-white px-5 py-4 outline-none transition-colors rounded-sm"
                placeholder="Enter your password"
              />
            </div>

            <div className="pt-2">
              <AnimatedButton 
                type="submit" 
                className="w-full justify-center py-4 bg-[var(--color-gold)] hover:bg-[#a38855] text-white font-semibold tracking-wider text-sm shadow-[0_0_15px_rgba(182,154,97,0.3)] hover:shadow-[0_0_25px_rgba(182,154,97,0.5)] transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SENDING OTP...' : 'SIGN IN'}
              </AnimatedButton>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6 relative z-10">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-[2px] text-[#aeb5c7] font-semibold ml-1">Enter OTP</label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-[#2a3245] border border-[#4a5568] focus:border-[var(--color-gold)] text-white px-5 py-4 outline-none transition-colors rounded-sm text-center tracking-widest text-lg"
                placeholder="XXXXXX"
                maxLength={6}
              />
            </div>

            <div className="pt-2">
              <AnimatedButton 
                type="submit" 
                className="w-full justify-center py-4 bg-[var(--color-gold)] hover:bg-[#a38855] text-white font-semibold tracking-wider text-sm shadow-[0_0_15px_rgba(182,154,97,0.3)] hover:shadow-[0_0_25px_rgba(182,154,97,0.5)] transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'VERIFYING...' : 'VERIFY OTP'}
              </AnimatedButton>
            </div>
            
            <div className="text-center">
              <button 
                type="button"
                onClick={() => {
                  setShowOtpInput(false);
                  setSuccessMsg(null);
                  setError(null);
                }}
                className="text-sm text-[#aeb5c7] hover:text-[var(--color-gold)] transition-colors"
              >
                Go back
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 text-center text-[#aeb5c7] text-sm relative z-10">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-[var(--color-gold)] hover:text-white transition-colors font-medium ml-1">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
