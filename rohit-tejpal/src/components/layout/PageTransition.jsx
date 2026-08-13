import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../ui/Loader';

const PageTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loader when route changes
    setIsLoading(true);
    
    // Smooth scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Hide loader after a short delay to simulate transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]); // Trigger on path change

  return (
    <>
      {isLoading && <Loader fullScreen={true} />}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
};

export default PageTransition;
