import css from './Cards.module.css';

const Cards = (props) => {
  return (
    <div>
      <div className={css.cardsBox}>{props.children}</div>
    </div>
  );
};

export default Cards;
