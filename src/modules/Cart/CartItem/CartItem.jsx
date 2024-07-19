import { useDispatch } from 'react-redux';
import { API_URL } from '../../../const';
import s from './CartItem.module.scss';
import { useState } from 'react';
import { addItemToCart } from '../../../redux/cartSlice';
import { debounce } from '../../../utils';

export const CartItem = ({ id, photoUrl, name, price, quantity }) => {
  const dispatch = useDispatch();
  const [inputQuantity, setInputQuantity] = useState(quantity);

  const debounceInputChange = debounce((newQuantity) => {
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
  }, 500);

  const handleInputChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setInputQuantity(newQuantity);
    debounceInputChange(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = inputQuantity - 1;
    setInputQuantity(newQuantity);
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
  };

  const handleIncrement = () => {
    const newQuantity = inputQuantity + 1;
    setInputQuantity(newQuantity);
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
  };

  return (
    <li className={s.item}>
      <img className={s.img} src={`${API_URL}${photoUrl}`} alt={name} />
      <h4 className={s.itemTitle}>{name}</h4>
      <div className={s.counter}>
        <button className={s.counterBtn} onClick={handleDecrement}>
          -
        </button>
        <input
          className={s.counterInput}
          type="number"
          max="99"
          min="0"
          value={inputQuantity}
          onChange={handleInputChange}
        />
        <button className={s.counterBtn} onClick={handleIncrement}>
          +
        </button>
      </div>
      <p className={s.price}>{price * inputQuantity}&nbsp;₽</p>
    </li>
  );
};
