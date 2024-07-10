import cn from 'classnames';
import s from './Choices.module.scss';

export const Choices = ({
  children,
  buttonLabel,
  className,
  isOpen,
  onToggle,
}) => {
  return (
    <div className={cn(s.choices, className)}>
      <button className={s.btn} type="button" onClick={onToggle}>
        {buttonLabel}
      </button>

      {isOpen && <div className={s.box}>{children}</div>}
    </div>
  );
};
