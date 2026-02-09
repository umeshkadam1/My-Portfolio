import { useInView } from "react-intersection-observer";
import SectionTitle from "../common/SectionTitle.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCss3Alt,
  faFigma,
  faGitAlt,
  faHtml5,
  faJava,
  faJs,
  faNodeJs,
  faReact,
  faCss,
  faGithub
} from "@fortawesome/free-brands-svg-icons";
import { faCode, faDatabase } from "@fortawesome/free-solid-svg-icons";
import "../../styles/components/skills.css";

const Skilled = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const skillsCategories = [
    {
      title: "Frontend",
      skills: [
        { icon: faHtml5, name: "HTML5" },
        { icon: faCss, name: "CSS3" },
        { icon: faJs, name: "JavaScript" },
        { icon: faReact, name: "React JS" },
        { icon: faCss3Alt, name: "Tailwind CSS" },
      ],
    },
    {
      title: "Backend and Database",
      skills: [
        { icon: faNodeJs, name: "Node.js" },
        { icon: faJava, name: "Java" },
        { icon: faDatabase, name: "MySQL" },
      ],
    },
    {
      title: "Tools",
      skills: [
        { icon: faGitAlt, name: "Git" },
        { icon: faGithub, name: "Github" },
        { icon: faFigma, name: "Figma" },
        { icon: faCode, name: "VS Code" },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="skills-section"
      aria-labelledby="skills-heading"
    >
      <div className="container">
        <SectionTitle
          title="Technical Skills"
          subtitle="Technologies I work with"
        />

        <div
          className={`skills-container ${inView ? "fade-in appear" : "fade-in"}`}
          ref={ref}
        >
          {skillsCategories.map((category, index) => (
            <article key={index} className="skills-category">
              <h3 className="skills-category-title">{category.title}</h3>

              <ul className="skills-grid">
                {category.skills.map((skill, skillIndex) => (
                  <li
                    key={skillIndex}
                    className="skill-item"
                    style={{ "--i": skillIndex }}
                  >
                    <div className="skill-header">
                      <FontAwesomeIcon
                        icon={skill.icon}
                        className="skill-icon"
                        aria-hidden="true"
                      />
                      <h4 className="skill-name">{skill.name}</h4>
                    </div>

                    <div className="progress-bar">
                      <div className="progress-fill"></div>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skilled;
