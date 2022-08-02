import React from 'react';
import css from './Feedback.module.css';

function Feedback({ children, className }) {
  return (
    <div className={css.feedBox}>
      <div className={className}>
        <p className={css.feedText}>{children}</p>
      </div>
    </div>
  );
}

export default Feedback;
