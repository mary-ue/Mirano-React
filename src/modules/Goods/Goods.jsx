import { Cart } from '../Cart/Cart';
import { goodsArray } from '../../goodsArray';
import { Card } from '../Card/Card';
import './Goods.scss';

export const Goods = () => {
  return (
    <section className="goods">
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title">Цветы</h2>

          <ul className="goods__list">
            {goodsArray.map((item) => (
              <li className="goods__item" key={item.id}>
                <Card className="goods__card" {...item} />
              </li>
            ))}
          </ul>
        </div>

        <Cart />
      </div>
    </section>
  );
};
