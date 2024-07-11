import { Cart } from '../Cart/Cart';
import { Card } from '../Card/Card';
import './Goods.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from '../../redux/goodsSlice';
import { useEffect } from 'react';
import { API_URL } from '../../const';

export const Goods = () => {
  const dispatch = useDispatch();
  const {
    items: goods,
    status: goodsStatus,
    error,
  } = useSelector((state) => state.goods);

  useEffect(() => {
    if (goodsStatus === 'idle') {
      dispatch(fetchGoods());
    }
  }, [goodsStatus, dispatch]);

  let content = null;

  if (goodsStatus === 'loading') {
    content = <p>Loading...</p>;
  }

  if (goodsStatus === 'success') {
    content =
    (
      <ul className="goods__list">
        {goods.map((item) => (
          <li className="goods__item" key={item.id}>
            <Card
              className="goods__card"
              id={item.id}
              img={`${API_URL}${item.photoUrl}`}
              title={item.name}
              dateDelivery="сегодня в 14:00"
              price={item.price}
            />
          </li>
        ))}
      </ul>
    );
  }

  if (goodsStatus === 'failed') {
    content = <p>{error}</p>
  }

  return (
    <section className="goods">
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title">Цветы</h2>
          {content}
        </div>

        <Cart />
      </div>
    </section>
  );
};
