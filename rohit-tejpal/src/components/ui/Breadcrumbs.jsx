import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="flex items-center text-[10px] md:text-xs text-[var(--color-text-secondary)] font-medium tracking-widest uppercase mb-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-[var(--color-text-secondary)]">/</span>
            )}
            {item.path && index !== items.length - 1 ? (
              <Link 
                to={item.path} 
                className="hover:text-[var(--color-gold)] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[var(--color-gold)] font-bold">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
