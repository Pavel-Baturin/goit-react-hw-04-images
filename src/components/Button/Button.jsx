import PropTypes from 'prop-types';
import s from './Button.module.css';

function Button({ onClickMore }) {
  return (
    <button type="button" className={s.button} onClick={onClickMore}>
      Load more
    </button>
  );
}

Button.protoTypes = {
  onClickMore: PropTypes.func.isRequired,
};

export default Button;
