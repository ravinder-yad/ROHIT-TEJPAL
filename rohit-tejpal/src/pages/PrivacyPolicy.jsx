import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[var(--color-main-bg)] min-h-screen pt-32 pb-24 text-[var(--color-text-main)]">
      <div className="max-w-4xl mx-auto px-4 md:px-8 border border-[var(--color-border)]/50 p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-serif text-[var(--color-gold)] mb-8 text-center tracking-widest uppercase">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none text-[var(--color-text-secondary)] space-y-6 font-light">
          <p className="text-center italic mb-12">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-serif text-[var(--color-gold)] mt-12 mb-6">1. Introduction</h2>
          <p>
            Welcome to Rohit Tejpal. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website 
            and tell you about your privacy rights and how the law protects you.
          </p>

          <h2 className="text-2xl font-serif text-[var(--color-gold)] mt-12 mb-6">2. Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-[var(--color-text-secondary)]">
            <li><strong className="text-gray-200 font-medium">Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong className="text-gray-200 font-medium">Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
            <li><strong className="text-gray-200 font-medium">Financial Data:</strong> includes payment card details (processed securely by our payment providers).</li>
            <li><strong className="text-gray-200 font-medium">Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
          </ul>

          <h2 className="text-2xl font-serif text-[var(--color-gold)] mt-12 mb-6">3. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-[var(--color-text-secondary)]">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal or regulatory obligation.</li>
          </ul>

          <h2 className="text-2xl font-serif text-[var(--color-gold)] mt-12 mb-6">4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
            used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data 
            to those employees, agents, contractors and other third parties who have a business need to know.
          </p>

          <h2 className="text-2xl font-serif text-[var(--color-gold)] mt-12 mb-6">5. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact us at: <br/>
            Email: <a href="mailto:tejpalrohit4@gmail.com" className="text-[var(--color-gold)] hover:text-[var(--color-text-main)] transition-colors">tejpalrohit4@gmail.com</a>
          </p>
          
          <div className="mt-16 text-center pt-8 border-t border-[var(--color-border)]/50">
            <Link to="/" className="inline-block px-8 py-3 bg-[var(--color-alt-bg)] border border-[var(--color-border)]/50 text-[var(--color-text-main)] text-[11px] tracking-[0.2em] uppercase hover:bg-[var(--color-text-main)] hover:text-[var(--color-main-bg)] hover:border-[var(--color-text-main)] transition-colors duration-300">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
