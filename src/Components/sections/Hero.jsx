import { useEffect, useState } from "react";
import Button from "../common/Button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "../../styles/components/Hero.css";

const jobTitles = [
  "Frontend Developer",
  "React.js Developer",
  "Software Developer",
  "Web Developer",
  "MERN Stack Developer",
];

const Hero = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentTitleIndex((prev) => (prev + 1) % jobTitles.length);
        setIsChanging(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h3>Hi, my name is</h3>
            <h1 id="hero-heading">Umesh Kadam.</h1>

            <h2 className="role-title">
              <span className="static-text">I am a</span>
              <span
                className={`hero-title ${isChanging ? "changing" : ""}`}
                aria-live="polite"
              >
                {jobTitles[currentTitleIndex]}
              </span>
            </h2>

            <p>
              I’m a frontend developer who enjoys building clean, accessible,
              and user-friendly digital experiences. I focus on creating
              interfaces that feel smooth and effortless to use.
            </p>

            <div className="btns">
              <a
                href="https://drive.google.com/file/d/168YD0wMXc3SX555XehZmZ39YlJAUSpYh/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  Download CV
                  <span className="btns-right">
                    <FontAwesomeIcon icon={faDownload} />
                  </span>
                </Button>
              </a>

              <a
                href="#projects"
                title="Go to Projects"
                rel="noopener noreferrer"
              >
                <Button href="#projects">View My Work</Button>
              </a>
            </div>
          </div>

          {/* PROFILE IMAGE */}
          <div className="hero-image">
            <div className="image-wrapper">
              <img
                src="/myPhoto.webp"
                alt="Portrait of Umesh Kadam"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
