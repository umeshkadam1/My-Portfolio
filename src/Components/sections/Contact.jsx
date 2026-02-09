import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer"
import { useForm } from "react-hook-form";
import emailJs from '@emailjs/browser';
import SectionTitle from "../common/SectionTitle.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import '../../styles/components/Contact.css'

const Contact = () => {

  const formData = useRef(null);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmits = async (data) => {
    setIsSubmitting(true);
    try {

      const response = await emailJs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      // console.log('Form submitted:', data);
      // console.log('sent successfully:', response);

      setSubmitStatus({
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      });

      reset();
    } catch (errors) {
      console.error("EmailJS error:", errors);

      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again.'
      });

    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="container">
        <SectionTitle title="Get In Touch" subtitle="Let's work together" />

        <div className={`contact-container ${inView ? 'fade-in appear' : 'fade-in'}`}>

          <div className="contact-info shadow-contact">
            <p>
              I'm currently available for freelance work and full-time positions.
              If you have a project that you want to get started or think you need
              my help with something, then get in touch.
            </p>

            <address className="address-block">
              <div className="info-item">
                <div className="info-icon">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>

                <div className="info-content">
                  <h3>Location</h3>
                  <p>KoparKhairane, Navi Mumbai</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>

                <div className="info-content">
                  <h4>Email</h4>
                  <p>
                    <a href="mailto:umeshkadam0101@gmail.com" title="Send Email" className="contact-hover">umeshkadam0101@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FontAwesomeIcon icon={faWhatsapp} />
                </div>
                <div className="info-content">
                  <h4>Phone</h4>
                  <a
                    href="https://api.whatsapp.com/send?phone=919892251928&text=Hello%20I%20found%20your%20profile"
                    target="_blank"
                    title="Send Message"
                    rel="noopener noreferrer"
                    className="contact-hover"
                  >
                    (+91) 9892251928
                  </a>
                </div>

              </div>

            </address>
          </div>

          <div className="contact-form shadow-contact">
            {submitStatus && (
              <div className={`form-status ${submitStatus.success ? 'success' : 'error'}`}
                aria-live="polite"
              >
                {submitStatus.message}
              </div>
            )}

            <form ref={formData} onSubmit={handleSubmit(onSubmits)} aria-label="Contact Form">

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" {...register("name", { required: "Name is required", minLength: { value: 2, message: "Name must be at least 2 characters" } })} className={errors.name ? 'error' : ''} />
                {errors.name && <span className="error-message">{errors.name.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" autoComplete="email" {...register("email", {
                  required: "Email is required", pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Enter a valid email address"
                  }
                })}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" name="subject" id="subject" {...register("subject", { required: "Subject is required", minLength: { value: 3, message: "Subject must be at least 3 characters" } })} />
                {errors.subject && <span className="error-message">{errors.subject.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  {...register("message", { required: "Message is required", minLength: { value: 10, message: "Message must be at least 10 characters" } })}
                  className={errors.message ? 'error' : ''}
                ></textarea>
                {errors.message && <span className="error-message">{errors.message.message}</span>}
              </div>

              <button type="submit" className="btn primary" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Contact;
