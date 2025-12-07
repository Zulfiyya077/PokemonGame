import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  square = false,
  circular = false,
  onClick, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const buttonClasses = [
    styles.btn,
    styles[`btn${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    styles[`btn${size.charAt(0).toUpperCase() + size.slice(1)}`],
    fullWidth && styles.btnFullWidth,
    square && styles.btnSquare,
    circular && styles.btnCircular,
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'success', 'danger', 'warning', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  square: PropTypes.bool,
  circular: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;

