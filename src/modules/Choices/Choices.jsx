import cn from 'classnames';
import s from './Choices.module.scss';
import { useState } from 'react';

export const Choices = ({ children, buttonLabel, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(prevOpen => !prevOpen);
  }

  return (
    <div className={cn(s.choices, className)}>
      <button className={s.btn} type="button" onClick={handleToggle}>
        {buttonLabel}
      </button>

      {isOpen && <div className={s.box}>
        {children}
      </div>}
    </div>
  );
};
