import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import s from './Order.module.scss';
import { closeModal, sendOrder, updateOrderData } from '../../redux/orderSlice';
import { useCallback, useEffect } from 'react';

export const Order = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.order.isOpen);
  const orderId = useSelector((state) => state.order.orderId);
  const orderData = useSelector((state) => state.order.data);
  const itemsCart = useSelector((state) => state.cart.items);

  const handlerClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      updateOrderData({
        [name]: value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendOrder());
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        handlerClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, handlerClose]);

  if (!isOpen) return null;

  return (
    <div className={s.order} onClick={handlerClose}>
      <div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
        {orderId ? (
          <>
            <h2 className={s.title}>Заказ оформлен!</h2>
            <p className={s.id}>Ваш номер заказа: {orderId}</p>
          </>
        ) : (
          <>
            <h2 className={s.title}>Оформить заказ</h2>
            <form className={s.form} id="order" onSubmit={handleSubmit}>
              <fieldset className={s.fieldset}>
                <legend className={s.legend}>Данные заказчика</legend>
                <div className={s.inputGroup}>
                  <input
                    className={s.input}
                    type="text"
                    name="buyerName"
                    placeholder="Имя"
                    value={orderData.buyerName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className={s.input}
                    type="text"
                    name="buyerPhone"
                    placeholder="Телефон"
                    value={orderData.buyerPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </fieldset>
              <fieldset className={s.fieldset}>
                <legend className={s.legend}>Данные получателя</legend>
                <div className={s.inputGroup}>
                  <input
                    className={s.input}
                    type="text"
                    name="recipientName"
                    placeholder="Имя"
                    value={orderData.recipientName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className={s.input}
                    type="text"
                    name="recipientPhone"
                    placeholder="Телефон"
                    value={orderData.recipientPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </fieldset>
              <fieldset className={s.fieldset}>
                <legend className={s.legend}>Адрес</legend>
                <div className={s.inputGroup}>
                  <input
                    className={s.input}
                    type="text"
                    name="street"
                    placeholder="Улица"
                    value={orderData.street}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className={cn(s.input, s.inputMin)}
                    type="text"
                    name="house"
                    placeholder="Дом"
                    value={orderData.house}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className={cn(s.input, s.inputMin)}
                    type="text"
                    name="apartment"
                    placeholder="Квартира"
                    value={orderData.apartment}
                    onChange={handleChange}
                    required
                  />
                </div>
              </fieldset>
              <fieldset className={s.fieldset}>
                <div className={s.payment}>
                  <label className={s.labelRadio}>
                    <input
                      className={s.radio}
                      type="radio"
                      name="paymentOnline"
                      value={orderData.paymentOnline === 'true'}
                      defaultChecked
                      onChange={handleChange}
                    />
                    Оплата онлайн
                  </label>
                </div>
                <div className={s.delivery}>
                  <label htmlFor="delivery">Дата доставки</label>
                  <input
                    className={s.input}
                    type="date"
                    name="deliveryDate"
                    value={orderData.deliveryDate}
                    onChange={handleChange}
                    required
                  />
                  <div className={s.selectWrapper}>
                    <select
                      className={s.select}
                      name="deliveryTime"
                      id="delivery"
                      value={orderData.deliveryTime}
                      onChange={handleChange}
                      required
                    >
                      <option value="9-12">с 9:00 до 12:00</option>
                      <option value="12-15">с 12:00 до 15:00</option>
                      <option value="15-18">с 15:00 до 18:00</option>
                      <option value="18-21">с 18:00 до 21:00</option>
                    </select>
                  </div>
                </div>
              </fieldset>
            </form>
            <div className={s.footer}>
              <p className={s.total}>
                {itemsCart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
                &nbsp;₽
              </p>
              <button className={s.button} type="submit" form="order">
                Заказать
              </button>
            </div>
          </>
        )}
      </div>
      <button className={s.close} type="button">
        ×
      </button>
    </div>
  );
};
