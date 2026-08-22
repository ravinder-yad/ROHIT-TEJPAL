import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AnimatedButton from '../components/ui/AnimatedButton';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    const result = await register(formData.name, formData.email, formData.password, formData.phone);
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

    const result = await verifyOtp(formData.email, otp);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-main-bg)] py-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[var(--color-alt-bg)] p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[var(--color-gold)] opacity-5 rounded-br-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[var(--color-gold)] opacity-5 rounded-tl-full pointer-events-none"></div>

        <div className="text-center mb-10 relative z-10">
          <h1 className="text-3xl md:text-4xl font-serif text-[var(--color-text-main)] mb-3">Create Account</h1>
          <p className="text-[var(--color-text-secondary)] text-sm md:text-base font-light tracking-wide">
            {showOtpInput ? "Check your email for the verification code." : "Join us to track orders and save your wishlist."}
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
          <form onSubmit={handleRegisterSubmit} className="space-y-5 relative z-10">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-[2px] text-[var(--color-text-secondary)] font-semibold ml-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[var(--color-main-bg)] border border-[var(--color-border)] focus:border-[var(--color-gold)] text-[var(--color-text-main)] px-5 py-3.5 outline-none transition-colors rounded-sm"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-[2px] text-[var(--color-text-secondary)] font-semibold ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[var(--color-main-bg)] border border-[var(--color-border)] focus:border-[var(--color-gold)] text-[var(--color-text-main)] px-5 py-3.5 outline-none transition-colors rounded-sm"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-[2px] text-[var(--color-text-secondary)] font-semibold ml-1">Mobile Number</label>
              <input
                type="tel"
                name="phone"
                required
                pattern="[0-9]{10}"
                maxLength="10"
                title="Please enter exactly 10 digits"
                value={formData.phone}
                onChange={(e) => {
                  // Only allow numbers to be typed
                  const value = e.target.value.replace(/\D/g, '');
                  setFormData({ ...formData, phone: value });
                }}
                className="w-full bg-[var(--color-main-bg)] border border-[var(--color-border)] focus:border-[var(--color-gold)] text-[var(--color-text-main)] px-5 py-3.5 outline-none transition-colors rounded-sm"
                placeholder="Enter your 10-digit mobile number"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-[2px] text-[var(--color-text-secondary)] font-semibold ml-1">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[var(--color-main-bg)] border border-[var(--color-border)] focus:border-[var(--color-gold)] text-[var(--color-text-main)] px-5 py-3.5 outline-none transition-colors rounded-sm"
                placeholder="Create a password"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-[2px] text-[var(--color-text-secondary)] font-semibold ml-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-[var(--color-main-bg)] border border-[var(--color-border)] focus:border-[var(--color-gold)] text-[var(--color-text-main)] px-5 py-3.5 outline-none transition-colors rounded-sm"
                placeholder="Confirm your password"
              />
            </div>

            <div className="pt-4">
              <AnimatedButton 
                type="submit" 
                className="w-full justify-center py-4 bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-text-main)] font-semibold tracking-wider text-sm shadow-[0_0_15px_rgba(182,154,97,0.3)] hover:shadow-[0_0_25px_rgba(182,154,97,0.5)] transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SENDING OTP...' : 'CREATE ACCOUNT'}
              </AnimatedButton>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6 relative z-10">
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

            <div className="pt-2">
              <AnimatedButton 
                type="submit" 
                className="w-full justify-center py-4 bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-text-main)] font-semibold tracking-wider text-sm shadow-[0_0_15px_rgba(182,154,97,0.3)] hover:shadow-[0_0_25px_rgba(182,154,97,0.5)] transition-all duration-300"
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
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors"
              >
                Go back
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 text-center text-[var(--color-text-secondary)] text-sm relative z-10">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-[var(--color-gold)] hover:text-[var(--color-text-main)] transition-colors font-medium ml-1">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
