import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items, separator = <ChevronRight size={14} /> }) {
  const location = useLocation();

  // If custom items are provided, use them
  if (items) {
    return (
      <nav className="flex items-center gap-2 text-xs text-secondary-400 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          if (isLast) {
            return (
              <span key={index} className="text-secondary-700 dark:text-secondary-300 font-medium truncate max-w-xs">
                {item.label}
              </span>
            );
          }
          return (
            <React.Fragment key={index}>
              <Link to={item.to} className="hover:text-primary transition-colors capitalize">
                {item.label}
              </Link>
              {separator}
            </React.Fragment>
          );
        })}
      </nav>
    );
  }

  // Auto-generate breadcrumbs from current path
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    ...pathSegments.map((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return { label, to: path };
    }),
  ];

  return (
    <nav className="flex items-center gap-2 text-xs text-secondary-400 flex-wrap">
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        if (isLast) {
          return (
            <span key={index} className="text-secondary-700 dark:text-secondary-300 font-medium truncate max-w-xs">
              {item.label}
            </span>
          );
        }
        return (
          <React.Fragment key={index}>
            <Link to={item.to} className="hover:text-primary transition-colors capitalize">
              {index === 0 ? <Home size={14} className="inline" /> : item.label}
            </Link>
            {separator}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
