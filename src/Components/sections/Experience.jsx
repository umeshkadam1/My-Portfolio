import { useInView } from "react-intersection-observer";
import SectionTitle from "../common/SectionTitle.jsx";
import "../../styles/components/Experience.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

const experiences = [
  {
    title: "Team Leader",
    designation: "Document Scanning",
    company: "SoftAge Information Technology Ltd",
    duration: "July 2024 - December 2025",
    responsibilities: [
      "Managed daily, weekly, and monthly reports and submitted them to management.",
      "Performed data cleaning and processing in Microsoft Excel to maintain accuracy.",
      "Handled reporting and communication to ensure timely delivery to stakeholders.",
      "Handled document scanning and data entry with high accuracy.",
      "Ensured precise conversion of physical documents into digital format.",
    ],
  },
];

const Experience = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="experience"
      className="experience-section"
      ref={ref}
      aria-labelledby="experience-title"
    >
      <div className="container">
        <SectionTitle
          title="Work Experience"
          subtitle="My professional journey"
        />

        <div
          className={`work-experience-container ${inView ? "fade-in appear" : "fade-in"}`}
        >
          <div className="timeline">
            {experiences.map((exp, index) => (
              <article
                key={index}
                className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
              >
                <div className="timeline-icon" aria-hidden="true">
                  <FontAwesomeIcon icon={faBriefcase} className="bag-icon" />
                </div>

                <div className="timeline-content">
                  <h3 className="job-title">{exp.title}</h3>
                  <p className="designation">{exp?.designation}</p>
                  <h4 className="company-name">{exp.company}</h4>
                  <p className="duration">{exp.duration}</p>

                  <ul className="dot-list">
                    {exp.responsibilities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
