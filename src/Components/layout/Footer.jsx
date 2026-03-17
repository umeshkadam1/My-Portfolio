import navLinks from "../../utils/navbarLinks.js";
import "../../styles/components/Footer.css";
import {
  faCodepen,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          {/* About section */}
          <aside className="footer-side info-one">
            <h2>Umesh Kadam</h2>
            <p className="footer-col footer-label">
              Web Developer based in Navi Mumbai, India. I build high quality,
              responsive and user focused digital experiences.
            </p>
          </aside>

          {/* Quick Links */}
          <div className="footer-side info-two" aria-label="Footer Navigation">
            <h2 className="footer-heading">Quick Links</h2>
            <div className="footer-col navbar-link">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  title={`Go to ${link} section`}
                  className="navbarlink"
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </a>
              ))}
            </div>
          </div>

          {/* Social + Contact */}
          <div className="footer-side info-three">
            <h2 className="footer-heading">Connect</h2>

            <div className="footer-col social-links">
              <a
                href="https://github.com/umeshkadam1"
                aria-label="Visit Umesh Kadam GitHub Profile"
                title="GitHub"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>

              <a
                href="https://linkedin.com/in/umesh-kadam"
                aria-label="Visit Umesh Kadam LinkedIn Profile"
                title="LinkedIn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>

              <a
                href="https://codepen.io/umesh1010"
                aria-label="Visit Umesh Kadam CodePen Profile"
                title="CodePen"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faCodepen} />
              </a>

              <a
                href="https://www.naukri.com/code360/profile/b527beb1-fd44-4232-9db4-3c189d940e44"
                aria-label="View Umesh Kadam Code360 Profile"
                title="Code360 Profile"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faCode} />
              </a>
            </div>

            <p>
              <strong className="contact-line">Email:</strong>
              <a href="mailto:umeshkadam0101@gmail.com" title="Send Email">
                umeshkadam0101@gmail.com
              </a>
            </p>

            <p>
              <strong className="contact-line">Phone:</strong>
              <a href="tel:9322348144" title="Send Message">
                9322348144
              </a>
            </p>
          </div>
        </div>

        <div className="footer-copyright">
          <p className="copyright">
            &copy; {year} Umesh Kadam. All rights reserved. Designed and
            Developed by 
            <a
              href="https://github.com/umeshkadam1"
              rel="noopener noreferrer"
              target="_blank"
              title="Visit Developer GitHub"
              className="my-name"
            >
              Umesh Kadam
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
