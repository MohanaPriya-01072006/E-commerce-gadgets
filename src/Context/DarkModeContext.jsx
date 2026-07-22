import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();
export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('moprix-dark');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('moprix-dark', dark);
  }, [dark]);

  return (
    <DarkModeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </DarkModeContext.Provider>
  );
};
