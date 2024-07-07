import s from './CartItem.module.scss';

export const CartItem = ({ img, title, price }) => {
  return (
    <li className={s.item}>
      <img className={s.img} src={img} alt={title} />
      <h4 className={s.itemTitle}>{title}</h4>
      <div className={s.counter}>
        <button className={s.counterBtn}>-</button>
        <input
          className={s.counterInput}
          type="number"
          max="99"
          min="0"
          defaultValue="1"
        />
        <button className={s.counterBtn}>+</button>
      </div>
      <p className={s.price}>{price}&nbsp;₽</p>
    </li>
  );
};
