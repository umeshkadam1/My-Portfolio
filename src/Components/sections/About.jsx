import { useInView } from 'react-intersection-observer';
import SectionTitle from '../common/SectionTitle.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import '../../styles/components/About.css';


const About = () => {

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const certifications = [
    {
      name: "Frontend Developer Certification",
      link: "https://www.coursera.org/account/accomplishments/certificate/XYZ123"
    },
    {
      name: "Java Certification",
      link: "http://verify.mygreatlearning.com/LKEWRGKJ"
    }
  ];

  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="container">

        <SectionTitle title="About Me" />

        <article
          className={`about-content ${inView ? 'fade-in appear' : 'fade-in'}`}
          ref={ref}
        >
          <div className="about-text">
            <p>
              Hello! I'm Umesh Rajaram Kadam, a frontend developer who enjoys building
              clean and intuitive user experiences. I work with modern JavaScript
              tools and focus on creating interfaces that feel smooth and simple
              for users.
            </p>

            <p>
              My interest in web development began during my university studies.
              Since then, I’ve been learning new technologies and improving my ability
              to turn ideas into dynamic, responsive websites.
            </p>

            <p>
              I aim to write code that’s consistent and easy to maintain. Creating interfaces that look good on any device and I'm always trying to get better at what I do. I enjoy improving my skills and exploring new ways to build better products and experiences.
            </p>

            <div className="certifications">
              <h3>Certifications</h3>

              <div className="cert-items">
                {certifications.map((cert, index) => (
                  <div className="cert-item" key={index}>
                    <FontAwesomeIcon icon={faCertificate} className="cert-icon" />

                    <a
                      href={cert.link}
                      target="_blank"
                      title={'View Certification'}
                      rel="noopener noreferrer"
                      className="cert-link"
                    >
                      {cert.name}
                    </a>

                  </div>
                ))}
              </div>
            </div>
          </div>

          <figure className="about-image">
            <div className="image-container">
              <img
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=700&q=80"
                alt="Frontend developer workstation setup"
                className="profile-img"
                loading="lazy"
              />
              <div className="image-border"></div>
            </div>
          </figure>

        </article>
      </div>
    </section>
  );
};

export default About;

