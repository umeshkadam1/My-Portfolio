import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext.jsx";
import navLinks from "../../utils/navbarLinks.js";
import "../../styles/components/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/My_Logo.webp";

const RETRY_DELAY_MS = 100; // time between checks for sections
const MAX_RETRIES = 50; // stop after ~5 seconds (50 * 100ms)

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  // Refs to hold persistent values without causing rerenders
  const sectionRefs = useRef([]);
  const observerRef = useRef(null);
  const retriesRef = useRef(0);
  const mountedRef = useRef(true);

  // scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keep track of mount state for safe cleanup
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      // restore scroll if unmounted while menu open
      document.body.style.overflow = "auto";
    };
  }, []);

  // toggle menu and lock body scroll
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "auto";
      return next;
    });
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  // Helper:- find section elements by id and store them in sectionRefs
  const tryCollectSections = useCallback(() => {
    const nodes = navLinks
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (nodes.length === navLinks.length) {
      sectionRefs.current = nodes;
      return true;
    }
    // partial matches:- still store any found (so observer can attach to those)
    if (nodes.length > 0) sectionRefs.current = nodes;
    return false;
  }, []);

  // Initialize IntersectionObserver once sections available, with bounded retries
  useEffect(() => {
    // If observer already exists, do nothing
    if (observerRef.current) return;

    const createObserverAndObserve = () => {
      if (!sectionRefs.current || sectionRefs.current.length === 0) return;

      // Create observer
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // When section intersects set it as active
              setActiveTab(entry.target.id);
            }
          });
        },
        {
          root: null,
          rootMargin: "-30% 0px -50% 0px",
          threshold: 0,
        }
      );

      // Observe available sections
      sectionRefs.current.forEach((el) => {
        if (el) observerRef.current.observe(el);
      });
    };

    // Try to collect immediately
    if (tryCollectSections()) {
      createObserverAndObserve();
      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      };
    }

    // If not all sections present yet, retry until MAX_RETRIES
    const attempt = () => {
      if (!mountedRef.current) return;
      retriesRef.current += 1;

      tryCollectSections();
      if (sectionRefs.current.length > 0 && !observerRef.current) {
        createObserverAndObserve();
        return;
      }

      if (retriesRef.current >= MAX_RETRIES) {
        // give up gracefully (maybe your sections take too long or ids mismatch)
        return;
      }

      // schedule next try
      setTimeout(attempt, RETRY_DELAY_MS);
    };

    // start retry loop
    setTimeout(attempt, RETRY_DELAY_MS);

    // cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
    // tryCollectSections is stable (useCallback) and navLinks won't change
  }, [tryCollectSections]);

  // When user clicks a link we close menu and update activeTab
  const onLinkClick = useCallback(
    (link, e) => {
      // allow default anchor behavior so the page scrolls; just close menu & set tab
      setActiveTab(link);
      closeMenu();
    },
    [closeMenu]
  );

  return (
    <nav
      className={`navbar ${isScrolled ? "scrolled" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-container">
        {/* Logo */}
        <div className="logo-container" onClick={closeMenu}>
          <div className="logo-img" aria-hidden="true">
            <img src={logo} alt="Umesh Kadam Logo" />
          </div>
          <a href="#home" className="logo-text">
            UmeshK
          </a>
        </div>

        {/* Links */}
        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className={activeTab === link ? "activeTabs" : ""}
              onClick={(e) => onLinkClick(link, e)}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
        </div>

        {/* Right Controls */}
        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
          </button>

          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// Working Code

// import { useState, useEffect } from "react";
// import { useTheme } from "../../context/ThemeContext.jsx";
// import navLinks from '../../utils/navbarLinks.js';
// import "../../styles/components/Navbar.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMoon, faSun, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// import logo from "../../assets/Vaibhav Kadam.jpg";

// const Navbar = () => {

//   const { theme, toggleTheme } = useTheme();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeTab, setActiveTab] = useState("home");

//   // Sticky navbar background change
//   useEffect(() => {
//     const onScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // Intersection Observer with auto-wait until sections load
//   useEffect(() => {
//     let observer;

//     const initObserver = () => {
//       const elements = navLinks.map((id) => document.getElementById(id));

//       const allLoaded = elements.every((el) => el !== null);

//       if (!allLoaded) {
//         requestAnimationFrame(initObserver);
//         return;
//       }

//       const options = {
//         root: null,
//         rootMargin: "-30% 0px -50% 0px",
//         threshold: 0,
//       };

//       observer = new IntersectionObserver((entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveTab(entry.target.id);
//           }
//         });
//       }, options);

//       elements.forEach((el) => observer.observe(el));
//     };

//     initObserver();

//     return () => observer && observer.disconnect();
//   }, []);

//   // Mobile menu toggle
//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//     document.body.style.overflow = !isMenuOpen ? "hidden" : "auto";
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//     document.body.style.overflow = "auto";
//   };

//   return (
//     <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
//       <div className="nav-container">

//         {/* Logo Section */}
//         <div className="logo-container">
//           <div className="logo-img">
//             <img src={logo} alt="Umesh Kadam" />
//           </div>
//           <a href="#home" className="logo-text" onClick={closeMenu}>
//             UmeshK
//           </a>
//         </div>

//         {/* Navigation Links */}
//         <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
//           {navLinks.map((link) => (
//             <a
//               key={link}
//               href={`#${link}`}
//               className={activeTab === link ? "activeTabs" : ""}
//               onClick={() => setActiveTab(link)}
//             >
//               {link.charAt(0).toUpperCase() + link.slice(1)}
//             </a>
//           ))}
//         </div>

//         {/* Right Buttons */}
//         <div className="nav-right">
//           <button className="theme-toggle" onClick={toggleTheme}>
//             <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
//           </button>

//           <button className="hamburger" onClick={toggleMenu}>
//             <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
//           </button>
//         </div>

//       </div>
//     </nav>
//   );
// };

// export default Navbar;
