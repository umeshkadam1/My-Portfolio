import { useInView } from "react-intersection-observer";
import SectionTitle from "../common/SectionTitle.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import "../../styles/components/Education.css";

const Education = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const education = [
    {
      id: 1,
      dateStart: "2021",
      dateEnd: "2024",
      degree: "Bachelor of Science in Information Technology",
      institution:
        "Sadguru Vamanbaba Commerce and Science College, Navi Mumbai",
      description:
        "Graduated with honors. Focused on frontend development, UI/UX design, and database management.",
      grade: "CGPI : 9.13 / 10",
    },
    {
      id: 2,
      dateStart: "2019",
      dateEnd: "2021",
      degree: "HSC",
      institution: "Vithoba Khandappa High School & Junior College, Panvel",
      grade: "67%"
    },
    {
      id: 3,
      dateStart: "2018",
      dateEnd: "2019",
      degree: "SSC",
      institution: "Kolhapur Divisional Board",
      grade: "84.20%"
    },
  ];

  return (
    <section id="education" className="education-section" ref={ref}>
      <div className="container">
        <div className="education-icon">
          <FontAwesomeIcon icon={faGraduationCap} aria-hidden="true" />
        </div>

        <SectionTitle title="Education" subtitle="My academic journey" />

        <div className={`timeline ${inView ? "fade-in appear" : "fade-in"}`}>
          {education.map((item, index) => (
            <article
              key={item.id}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            >
              <header className="timeline-content">
                <time
                  className="timeline-date"
                  dateTime={`${item.dateStart}${
                    item.dateEnd ? `/${item.dateEnd}` : ""
                  }`}
                >
                  {`${item.dateStart} - ${item.dateEnd}`}
                </time>

                <h3 className="timeline-degree">{item.degree}</h3>

                <h4 className="timeline-institution">{item.institution}</h4>

                {item.grade && <p className="timeline-grade">{item.grade}</p>}

                <p className="timeline-description">{item.description}</p>
              </header>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
