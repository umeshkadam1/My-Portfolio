import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  // Apply theme to document
  const applyTheme = useCallback((newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }, []);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }, [theme, applyTheme]);

  useEffect(() => {
    // Get initial theme
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
    
    const initialTheme = savedTheme || systemTheme;
    applyTheme(initialTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      // Only change if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};



// import { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState("dark");

//   const toggleTheme = () => {
//     const newTheme = theme === "dark" ? "light" : "dark";

//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   useEffect(() => {
//     const savedTheme =
//       localStorage.getItem("theme") ||
//       (window.matchMedia("(prefers-color-scheme: dark)").matches
//         ? "dark"
//         : "light");

//     setTheme(savedTheme);
//   }, []);

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       <div data-theme={theme}>{children}</div>
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);



// context/ThemeContext.jsx
// import { createContext, useContext, useEffect, useState } from 'react';

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('dark');

//   const toggleTheme = () => {
//     const newTheme = theme === 'dark' ? 'light' : 'dark';
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     document.documentElement.setAttribute('data-theme', newTheme);
//   };

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

//     setTheme(savedTheme);
    
//     document.documentElement.setAttribute('data-theme', savedTheme);
//   }, []);

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
