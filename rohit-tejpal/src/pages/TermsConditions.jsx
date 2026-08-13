import React from 'react';
import { Link } from 'react-router-dom';

const TermsConditions = () => {
  return (
    <div className="bg-[var(--color-primary-dark)] min-h-screen pt-32 pb-24 text-white">
      <div className="max-w-4xl mx-auto px-4 md:px-8 border border-white/10 p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-serif text-[var(--color-gold)] mb-8 text-center tracking-widest uppercase">Terms & Conditions</h1>
        
        <div className="prose prose-lg max-w-none text-gray-300 space-y-6 font-light">
          <p className="text-center italic mb-12">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-serif text-[var(--color-gold)] mt-12 mb-6">1. Agreement to Terms</h2>
          <p>
            By accessing or using the Rohit Tejpal website, you agree to be bound by these Terms and Conditions and our Privacy Policy. 
            If you do not agree with any part of these terms, please do not use our website or services.
          </p>

          <h2 className="text-2xl font-serif text-[var(--color-gold)] mt-12 mb-6">2. Products and Pricing</h2>
          <p>
            We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. 
            However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors.
          </p>
          <p>
            All prices are subject to change without notice. We reserve the right at any time to modify or discontinue products.
          </p>

          <h2 className="text-2xl font-serif text-[var(--color-gold)] mt-12 mb-6">3. Custom Orders</h2>
          <p>
            For custom tailored outfits and bespoke services, a non-refundable deposit is required before work begins. 
            Measurements provided by the customer are their sole responsibility. We offer alterations within 14 days of delivery for sizing adjustments.
          </p>

          <h2 className="text-2xl font-serif text-[var(--color-gold)] mt-12 mb-6">4. Shipping and Returns</h2>
          <p>
            Shipping costs and delivery estimates are provided at checkout. We are not responsible for delays caused by customs or shipping carriers.
            Returns are accepted for standard size items within 7 days of delivery, provided they are unworn, with all tags attached. 
            Custom-made items are non-returnable.
          </p>

          <h2 className="text-2xl font-serif text-[var(--color-gold)] mt-12 mb-6">5. Intellectual Property</h2>
          <p>
            All content on this website, including but not limited to text, graphics, logos, images, audio clips, and software, 
            is the property of Rohit Tejpal and is protected by applicable intellectual property laws.
          </p>

          <h2 className="text-2xl font-serif text-[var(--color-gold)] mt-12 mb-6">6. Contact Information</h2>
          <p>
            Questions about the Terms and Conditions should be sent to us at: <br/>
            Email: <a href="mailto:tejpalrohit4@gmail.com" className="text-[var(--color-gold)] hover:text-white transition-colors">tejpalrohit4@gmail.com</a>
          </p>
          
          <div className="mt-16 text-center pt-8 border-t border-white/10">
            <Link to="/" className="inline-block px-8 py-3 bg-white/5 border border-white/20 text-white text-[11px] tracking-[0.2em] uppercase hover:bg-white hover:text-[var(--color-primary-dark)] transition-colors duration-300">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
