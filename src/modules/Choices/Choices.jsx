import cn from 'classnames';
import s from './Choices.module.scss';
import { useEffect, useRef } from 'react';
import { adjustElementPosition, debounce } from '../../utils';

export const Choices = ({
  children,
  buttonLabel,
  className,
  isOpen,
  onToggle,
}) => {
  const choiceRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      adjustElementPosition(choiceRef.current);
    }

    const debouncedAdjustElementPosition = debounce(() => {
      if (isOpen) {
        adjustElementPosition(choiceRef.current);
      }
    }, 100);

    window.addEventListener('resize', debouncedAdjustElementPosition);

    return () => {
      window.removeEventListener('resize', debouncedAdjustElementPosition);
    };
  }, [isOpen]);

  return (
    <div className={cn(s.choices, className)}>
      <button className={s.btn} type="button" onClick={onToggle}>
        {buttonLabel}
      </button>

      {isOpen && (
        <div className={s.box} ref={choiceRef}>
          {children}
        </div>
      )}
    </div>
  );
};
