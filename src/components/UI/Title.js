import css from './UI.module.css';

const Title = (props) => {
  return (
    <div className={css.titleBox}>
      <h1 className={css.title}>{props.children}</h1>
    </div>
  );
};

export default Title;
