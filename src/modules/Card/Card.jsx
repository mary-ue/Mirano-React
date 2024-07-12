import cn from 'classnames';
import './Card.scss';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/cartSlice';
import { useState } from 'react';

export const Card = ({ className, id, img, title, dateDelivery, price }) => {
  const [buttonText, setButtonText] = useState(`${price}\u00A0₽`);
  const dispatch = useDispatch();

  const handlerAddToCart = () => {
    dispatch(addItemToCart({ id, img, title, dateDelivery, price }));
  };

  const handleMouseEnter = () => {
    setButtonText('В\u00A0корзину');
  };

  const handleMouseLeave = () => {
    setButtonText(`${price}\u00A0₽`);
  };

  return (
    <article className={cn(className, 'card')}>
      <img className="card__image" src={img} alt={title} />
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <div className="card__footer">
          <p className="card__date-delivery">{dateDelivery}</p>
          <button
            className="card__button"
            onClick={handlerAddToCart}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </article>
  );
};
