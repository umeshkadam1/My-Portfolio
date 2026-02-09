import { lazy, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Navbar from './Components/layout/Navbar.jsx';
import Footer from './Components/layout/Footer.jsx';
import LoadingSpinner from './Components/common/LoadingSpinner.jsx';
import './styles/themes.css';

// Lazy load sections for better performance
const Hero = lazy(() => import('./Components/sections/Hero.jsx'));
const About = lazy(() => import('./Components/sections/About.jsx'));
const Skills = lazy(() => import('./Components/sections/Skills.jsx'));
const Projects = lazy(() => import('./Components/sections/Projects.jsx'));
const Education = lazy(() => import('./Components/sections/Education.jsx'));
const Experience = lazy(() => import('./Components/sections/Experience.jsx'));
const Contact = lazy(() => import('./Components/sections/Contact.jsx'));

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Navbar />
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Education />
            <Experience />
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App;
 