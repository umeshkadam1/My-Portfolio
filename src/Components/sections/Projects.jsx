import { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { projectsData } from "../../utils/constants.js";
import SectionTitle from "../common/SectionTitle.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faExternalLinkAlt,
  faTimes,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/components/Projects.css";

const Projects = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const scrollRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activePage, setActivePage] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(2); // Start with desktop view

  // Calculate cards per view based on screen width
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1.5);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(1);
      } else {
        setCardsPerView(2);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const totalPages = Math.ceil(projectsData.length / cardsPerView);

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  const scrollToProject = (pageIndex) => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.children[0];
    if (!card) return;

    const gap = 32;
    const cardWidth = card.offsetWidth + gap;

    container.scrollTo({
      left: cardWidth * cardsPerView * pageIndex,
      behavior: "smooth",
    });

    setActivePage(pageIndex);
  };

  const goPrev = () => {
    if (activePage > 0) scrollToProject(activePage - 1);
  };

  const goNext = () => {
    if (activePage < totalPages - 1) scrollToProject(activePage + 1);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const card = container.children[0];
      if (!card) return;

      const gap = 32;
      const cardWidth = card.offsetWidth + gap;
      const scrollPosition = container.scrollLeft;
      const pageWidth = cardWidth * cardsPerView;

      // Calculate current page with rounding
      const currentPage = Math.min(
        Math.max(0, Math.round(scrollPosition / pageWidth)),
        totalPages - 1,
      );

      setActivePage(currentPage);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [cardsPerView, totalPages]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className="container">
        <SectionTitle
          title="Featured Projects"
          subtitle="Some of my recent work"
        />

        <div
          ref={scrollRef}
          className={`project-grid ${inView ? "fade-in appear" : "fade-in"}`}
        >
          {projectsData.map((project) => (
            <article
              key={project.id}
              className="project-card"
              onClick={() => openModal(project)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openModal(project);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${project.title}`}
            >
              <figure className="project-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                />
                <div className="project-overlay">
                  <button
                    className="preview-btn"
                    aria-label="View project details"
                  >
                    View Project
                  </button>
                </div>
              </figure>

              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="tech-stack">
                  {project.techs.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* NAVIGATION - Only show if there are multiple pages */}
        {totalPages > 1 && (
          <div className="project-nav-wrapper">
            <button
              className="nav-arrow"
              onClick={goPrev}
              disabled={activePage === 0}
              aria-label="Previous projects"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <div className="project-nav">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToProject(index)}
                  className={`nav-dot ${activePage === index ? "active" : ""}`}
                  aria-label={`Go to page ${index + 1}`}
                  aria-current={activePage === index ? "page" : undefined}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              className="nav-arrow"
              onClick={goNext}
              disabled={activePage === totalPages - 1}
              aria-label="Next projects"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}

        {/* MODAL */}
        {selectedProject && (
          <div className="project-modal">
            <div
              className="modal-overlay"
              onClick={closeModal}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  closeModal();
                }
              }}
              aria-label="Close modal"
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
              >
                <button
                  className="close-modal"
                  onClick={closeModal}
                  aria-label="Close modal"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>

                <div className="modal-image">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    loading="lazy"
                  />
                </div>

                <div className="modal-body">
                  <h2 id="modal-title">{selectedProject.title}</h2>
                  <p className="project-description">
                    {selectedProject.detailedDescription}
                  </p>

                  {selectedProject.features &&
                    selectedProject.features.length > 0 && (
                      <div className="project-features">
                        <h4>Key Features</h4>
                        <ul>
                          {selectedProject.features.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  <div className="tech-stack">
                    {selectedProject.techs.map((t, i) => (
                      <span key={i}>{t}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    {selectedProject.liveDemo && (
                      <a
                        href={selectedProject.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn primary"
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} /> Live Demo
                      </a>
                    )}
                    {selectedProject.viewCode && (
                      <a
                        href={selectedProject.viewCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn outline"
                      >
                        <FontAwesomeIcon icon={faCode} /> View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
