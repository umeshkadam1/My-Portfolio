import '../../styles/components/Button.css';

const Button = ({ children, variant = 'primary' }) => {
  return (
    <button className={`btn ${variant} btn-work`}>
      {children}
    </button>
  );
};

export default Button;


