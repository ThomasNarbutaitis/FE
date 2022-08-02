import css from './UI.module.css';

const Button = (props) => {
  return (
    <div>
      <button
        type={props.type}
        onClick={props.onClick}
        className={`${css.btn} ${css[props.className]}`}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
