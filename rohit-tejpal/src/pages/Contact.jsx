import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiClock, FiInstagram, FiFacebook } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';
import AnimatedButton from '../components/ui/AnimatedButton';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, formData);
      setIsSubmitted(true);
      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting message:', err);
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = "Hello Rohit Tejpal,\nI would like to know more about your collection.";
  const whatsappUrl = `https://wa.me/919873737512?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-[var(--color-main-bg)] min-h-screen text-[var(--color-text-main)] font-sans selection:bg-[var(--color-gold)] selection:text-[var(--color-main-bg)]">
      
      {/* 1. Contact Hero - Typographic (No Image) */}
      <section className="relative w-full h-[300px] flex flex-col items-center justify-center text-center border-b border-[var(--color-border)]/50 mb-12 md:mb-16">
        <div className="relative z-10 px-4 max-w-4xl mx-auto mt-16 md:mt-20">
          <div className="flex items-center justify-center gap-4 mb-6 md:mb-8">
            <div className="w-12 h-[1px] bg-[var(--color-gold)]/50"></div>
            <span className="text-[var(--color-gold)] text-[10px] uppercase tracking-[0.4em] font-bold">
              CONTACT
            </span>
            <div className="w-12 h-[1px] bg-[var(--color-gold)]/50"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[var(--color-text-main)] mb-6 tracking-wide leading-tight">
            We'd Love To <br className="hidden sm:block" />
            <span className="italic text-[var(--color-gold)]">Hear From You</span>
          </h1>
          
          <p className="text-[var(--color-text-secondary)] font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed tracking-wider">
            For enquiries, assistance, or collaborations. Reach out to our team directly.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        
        {/* 2. Get In Touch Info */}
        <div className="mb-24 md:mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">Get In <span className="italic text-[var(--color-gold)]">Touch</span></h2>
            <p className="text-[var(--color-text-secondary)] font-light max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Whether you have a question about our collections, an order enquiry or simply want to connect, we're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Phone */}
            <div className="group bg-white/[0.02] hover:bg-white/[0.06] p-10 border border-[var(--color-border)]/50 hover:border-[var(--color-gold)]/50 transition-all duration-500 flex flex-col items-center text-center cursor-default transform hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
              <div className="w-14 h-14 mb-6 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--color-gold)]/20 transition-all duration-500">
                <FiPhone className="w-6 h-6 text-[var(--color-gold)]" />
              </div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-4 text-[var(--color-text-main)]">Phone</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-1 group-hover:text-[var(--color-text-secondary)] transition-colors">+91 98737 37512</p>
              <p className="text-[var(--color-text-secondary)] text-sm group-hover:text-[var(--color-text-secondary)] transition-colors">+91 92112 46228</p>
            </div>

            {/* WhatsApp */}
            <div className="group bg-white/[0.02] hover:bg-white/[0.06] p-10 border border-[var(--color-border)]/50 hover:border-[var(--color-gold)]/50 transition-all duration-500 flex flex-col items-center text-center transform hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
              <div className="w-14 h-14 mb-6 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--color-gold)]/20 transition-all duration-500">
                <FaWhatsapp className="w-6 h-6 text-[var(--color-gold)]" />
              </div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-4 text-[var(--color-text-main)]">WhatsApp</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4 group-hover:text-[var(--color-text-secondary)] transition-colors">Chat directly with us</p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--color-gold)] text-xs font-bold uppercase tracking-[0.1em] hover:text-[var(--color-text-main)] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300">
                Start Chat →
              </a>
            </div>

            {/* Email */}
            <div className="group bg-white/[0.02] hover:bg-white/[0.06] p-10 border border-[var(--color-border)]/50 hover:border-[var(--color-gold)]/50 transition-all duration-500 flex flex-col items-center text-center break-all transform hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
              <div className="w-14 h-14 mb-6 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--color-gold)]/20 transition-all duration-500">
                <FiMail className="w-6 h-6 text-[var(--color-gold)]" />
              </div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-4 text-[var(--color-text-main)]">Email</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4 group-hover:text-[var(--color-text-secondary)] transition-colors">Write to us at</p>
              <a href="mailto:tejpalrohit4@gmail.com" className="text-[var(--color-text-secondary)] text-sm hover:text-[var(--color-gold)] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-[var(--color-gold)] hover:after:w-full after:transition-all after:duration-300 pb-1">
                tejpalrohit4@gmail.com
              </a>
            </div>

            {/* Location */}
            <div className="group bg-white/[0.02] hover:bg-white/[0.06] p-10 border border-[var(--color-border)]/50 hover:border-[var(--color-gold)]/50 transition-all duration-500 flex flex-col items-center text-center cursor-default transform hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
              <div className="w-14 h-14 mb-6 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--color-gold)]/20 transition-all duration-500">
                <FiMapPin className="w-6 h-6 text-[var(--color-gold)]" />
              </div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-4 text-[var(--color-text-main)]">Location</h3>
              <p className="text-[var(--color-text-secondary)] text-sm group-hover:text-[var(--color-text-secondary)] transition-colors">Factory / Office</p>
              <p className="text-[var(--color-text-secondary)] text-sm mt-1 group-hover:text-[var(--color-text-secondary)] transition-colors">Noida (U.P)</p>
            </div>
          </div>
        </div>

        {/* 3. Enquiry Form & WhatsApp CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-32 items-start">
          <div className="lg:col-span-5 flex flex-col justify-center lg:sticky lg:top-32">
            <span className="text-[var(--color-gold)] text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">
              ENQUIRY
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-8 leading-tight">
              Send Us <br />
              <span className="text-[var(--color-gold)] italic">A Message</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] font-light mb-12 text-sm md:text-base leading-relaxed max-w-md">
              Have a question about a specific design or need assistance with an order? Send us a message and our styling team will get back to you shortly.
            </p>

            {/* 4. WhatsApp CTA */}
            <div className="group bg-gradient-to-br from-white/[0.05] to-transparent p-10 border border-[var(--color-border)]/50 hover:border-[var(--color-gold)]/50 transition-all duration-500 relative overflow-hidden rounded-sm transform hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-gold)] group-hover:w-full group-hover:bg-[var(--color-gold)]/5 transition-all duration-700 ease-in-out"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 mb-6 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center">
                  <FaWhatsapp className="w-5 h-5 text-[var(--color-gold)]" />
                </div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-3 text-[var(--color-text-main)]">Need A Quick Response?</h3>
                <p className="text-[var(--color-text-secondary)] text-sm mb-8 leading-relaxed">Connect with us directly on WhatsApp for immediate assistance.</p>
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-gold)] text-[var(--color-main-bg)] text-xs font-bold uppercase tracking-[0.15em] hover:bg-white transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  Chat On WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white/[0.02] p-8 md:p-14 border border-[var(--color-border)]/50 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative">
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group">
                    <label htmlFor="fullName" className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-3 text-[var(--color-text-main)]/50 group-focus-within:text-[var(--color-gold)] transition-colors">Full Name</label>
                    <input 
                      type="text" 
                      id="fullName" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 bg-transparent border-b border-[var(--color-border)]/50 focus:border-[var(--color-gold)] text-[var(--color-text-main)] outline-none transition-all duration-300 text-sm placeholder:text-transparent focus:placeholder:text-[var(--color-text-main)]/20"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-3 text-[var(--color-text-main)]/50 group-focus-within:text-[var(--color-gold)] transition-colors">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 bg-transparent border-b border-[var(--color-border)]/50 focus:border-[var(--color-gold)] text-[var(--color-text-main)] outline-none transition-all duration-300 text-sm placeholder:text-transparent focus:placeholder:text-[var(--color-text-main)]/20"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group">
                    <label htmlFor="phone" className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-3 text-[var(--color-text-main)]/50 group-focus-within:text-[var(--color-gold)] transition-colors">Phone</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-b border-[var(--color-border)]/50 focus:border-[var(--color-gold)] text-[var(--color-text-main)] outline-none transition-all duration-300 text-sm placeholder:text-transparent focus:placeholder:text-[var(--color-text-main)]/20"
                      placeholder="XXXXXXXXXX"
                      maxLength="10"
                      pattern="[0-9]{10}"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="subject" className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-3 text-[var(--color-text-main)]/50 group-focus-within:text-[var(--color-gold)] transition-colors">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-b border-[var(--color-border)]/50 focus:border-[var(--color-gold)] text-[var(--color-text-main)] outline-none transition-all duration-300 text-sm placeholder:text-transparent focus:placeholder:text-[var(--color-text-main)]/20"
                      placeholder="Enquiry"
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-3 text-[var(--color-text-main)]/50 group-focus-within:text-[var(--color-gold)] transition-colors">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-3 bg-transparent border-b border-[var(--color-border)]/50 focus:border-[var(--color-gold)] text-[var(--color-text-main)] outline-none transition-all duration-300 text-sm resize-none placeholder:text-transparent focus:placeholder:text-[var(--color-text-main)]/20"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <AnimatedButton 
                    type="submit" 
                    theme="gold" 
                    fullWidth 
                    className="md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                  </AnimatedButton>
                </div>

                {isSubmitted && (
                  <div className="mt-4 p-4 bg-[var(--color-gold)]/10 border border-[var(--color-gold)] text-[var(--color-gold)] text-sm">
                    ✨ Thank you for your enquiry. Our team will get back to you shortly.
                  </div>
                )}
                {error && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500 text-red-400 text-sm">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* 5 & 6. Location Map & Business Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
          <div className="lg:pr-12">
            <span className="text-[var(--color-gold)] text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">
              HEADQUARTERS
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-12 leading-tight">
              Our <br />
              <span className="text-[var(--color-gold)] italic">Location</span>
            </h2>
            
            <div className="space-y-10 relative before:content-[''] before:absolute before:left-[11px] before:top-4 before:bottom-4 before:w-[1px] before:bg-[var(--color-alt-bg)]">
              
              {/* Address Block */}
              <div className="relative pl-12 group">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[var(--color-alt-bg)] border border-[var(--color-border)]/50 flex items-center justify-center group-hover:border-[var(--color-gold)] group-hover:bg-[var(--color-gold)]/10 transition-all duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] group-hover:scale-150 transition-transform duration-300"></div>
                </div>
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3 text-[var(--color-text-main)]/50 group-hover:text-[var(--color-gold)] transition-colors">Factory / Office Address</h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-sm mb-5 font-light">
                  B-77, Sec 69<br />
                  Noida (U.P)<br />
                  India
                </p>
                <a 
                  href="https://maps.google.com/maps?q=B-77%20sec%2069%20Noida" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-[var(--color-gold)] text-[10px] font-bold uppercase tracking-[0.2em] hover:text-[var(--color-text-main)] transition-colors group/link"
                >
                  <span className="relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white group-hover/link:after:w-full after:transition-all after:duration-300">
                    Get Directions
                  </span>
                  <svg className="w-3 h-3 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>

              {/* Hours Block */}
              <div className="relative pl-12 group">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[var(--color-alt-bg)] border border-[var(--color-border)]/50 flex items-center justify-center group-hover:border-[var(--color-gold)] group-hover:bg-[var(--color-gold)]/10 transition-all duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] group-hover:scale-150 transition-transform duration-300"></div>
                </div>
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4 text-[var(--color-text-main)]/50 group-hover:text-[var(--color-gold)] transition-colors">Business Hours</h3>
                <div className="text-[var(--color-text-secondary)] text-sm space-y-3 font-light">
                  <div className="flex justify-between max-w-xs border-b border-[var(--color-border)]/30 pb-2">
                    <span className="text-[var(--color-text-secondary)]">Mon – Sat</span> 
                    <span className="font-medium text-[var(--color-text-main)] tracking-wide">10:00 AM – 7:00 PM</span>
                  </div>
                  <div className="flex justify-between max-w-xs">
                    <span className="text-[var(--color-text-secondary)]">Sunday</span> 
                    <span className="font-medium text-[var(--color-gold)] tracking-wide">Closed</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="group relative h-[450px] w-full bg-white/[0.02] border border-[var(--color-border)]/50 p-2 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 bg-[var(--color-gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
            <iframe 
              src="https://maps.google.com/maps?q=B-77%20sec%2069%20Noida&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(20%)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Rohit Tejpal Location"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            ></iframe>
          </div>
        </div>

        {/* 7. Social Media (Instagram Only) */}
        <div className="relative py-24 border-t border-b border-[var(--color-border)]/50 mb-32 flex flex-col items-center justify-center text-center overflow-hidden group">
          {/* Subtle Background Glow on Hover */}
          <div className="absolute inset-0 bg-[var(--color-gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          <span className="text-[var(--color-gold)] text-[10px] uppercase tracking-[0.4em] font-bold mb-8 block relative z-10">
            Follow The Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-12 relative z-10">@rohittejpal</h2>
          
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative z-10 flex items-center justify-center gap-4 px-10 py-4 bg-transparent border border-[var(--color-border)]/50 text-[var(--color-text-main)] hover:bg-[var(--color-text-main)] hover:text-[var(--color-main-bg)] hover:border-[var(--color-text-main)] hover:border-[var(--color-border)] transition-all duration-500 rounded-full group/btn"
          >
            <FiInstagram className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Join Us On Instagram</span>
          </a>
        </div>

        {/* 8. FAQ Section */}
        <div className="max-w-4xl mx-auto mb-32">
          <div className="text-center mb-16">
            <span className="text-[var(--color-gold)] text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">
              Support
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-light">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { q: 'Do you offer custom sizing or bespoke tailoring?', a: 'Yes, we specialize in bespoke tailoring. For customized sizing or custom designs, please reach out to our styling team directly via WhatsApp or the contact form.' },
              { q: 'What is the standard production and delivery time?', a: 'As each garment is crafted with intention and care, our standard production time is 7-14 business days. International shipping may take an additional 3-5 days depending on the destination.' },
              { q: 'Do you ship internationally?', a: 'Yes, we ship globally. International shipping costs and delivery times are calculated at checkout based on your exact location.' },
              { q: 'How do I care for my Rohit Tejpal garments?', a: 'To maintain the integrity of the fabrics and intricate embroidery, we strongly recommend professional dry cleaning only. Detailed care instructions are included with every piece.' }
            ].map((faq, i) => (
              <details key={i} className="group bg-transparent border-b border-[var(--color-border)]/50 [&_summary::-webkit-details-marker]:hidden transition-colors hover:border-[var(--color-gold)]/50">
                <summary className="flex items-center justify-between py-6 cursor-pointer text-[var(--color-text-main)] font-medium text-sm md:text-base tracking-wide select-none group-open:text-[var(--color-gold)] transition-colors">
                  {faq.q}
                  <div className="relative w-4 h-4 flex items-center justify-center">
                    <span className="absolute w-full h-[1px] bg-white group-hover:bg-[var(--color-gold)] transition-all duration-300"></span>
                    <span className="absolute h-full w-[1px] bg-white group-open:rotate-90 group-open:opacity-0 group-hover:bg-[var(--color-gold)] transition-all duration-300"></span>
                  </div>
                </summary>
                <div className="pb-8 pt-2 text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-3xl animate-[fadeIn_0.3s_ease-out]">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

      </div>

      {/* 9. Final CTA */}
      <section className="relative w-full h-[300px] flex items-center justify-center border-t border-[var(--color-border)]/50 bg-[var(--color-main-bg)] overflow-hidden group">
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <span className="text-[var(--color-gold)] text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">
            Continue Your Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[var(--color-text-main)] mb-6">
            Discover The <span className="italic font-light text-[var(--color-gold)]">Collection</span>
          </h2>
          <AnimatedButton to="/collections" theme="dark">
            Shop Now
          </AnimatedButton>
        </div>
      </section>

    </div>
  );
};

export default Contact;
