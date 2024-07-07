import { Choices } from '../Choices/Choices';
import './Filter.scss';

export const Filter = () => {
  return (
    <section className="filter">
      <h2 className="visually-hidden"></h2>
      <div className="container">
        <form className="filter__form">
          <fieldset className="filter__group">
            <input
              className="filter__radio"
              type="radio"
              name="type"
              defaultValue="bouquets"
              id="flower"
              defaultChecked
            />
            <label
              className="filter__label filter__label_flower"
              htmlFor="flower"
            >
              Цветы
            </label>

            <input
              className="filter__radio"
              type="radio"
              name="type"
              defaultValue="toys"
              id="toys"
            />
            <label className="filter__label filter__label_toys" htmlFor="toys">
              Игрушки
            </label>

            <input
              className="filter__radio"
              type="radio"
              name="type"
              defaultValue="postcards"
              id="postcard"
            />
            <label
              className="filter__label filter__label_postcard"
              htmlFor="postcard"
            >
              Открытки
            </label>
          </fieldset>

          <fieldset className="filter__group filter__group_choices">
            <Choices buttonLabel="Цена">
              <fieldset className="filter__price">
                <input
                  className="filter__input-price"
                  type="text"
                  name="minPrice"
                  placeholder="от"
                />
                <input
                  className="filter__input-price"
                  type="text"
                  name="maxPrice"
                  placeholder="до"
                />
              </fieldset>
            </Choices>

            <Choices className="filter__choices_type" buttonLabel="Тип товара">
              <ul className="filter__type-list">
                <li className="filter__type-item">
                  <button className="filter__type-button" type="button">
                    Монобукеты
                  </button>
                </li>
                <li className="filter__type-item">
                  <button className="filter__type-button" type="button">
                    Авторские букеты
                  </button>
                </li>
                <li className="filter__type-item">
                  <button className="filter__type-button" type="button">
                    Цветы в коробке
                  </button>
                </li>
                <li className="filter__type-item">
                  <button className="filter__type-button" type="button">
                    Цветы в корзине
                  </button>
                </li>
                <li className="filter__type-item">
                  <button className="filter__type-button" type="button">
                    Букеты из сухоцветов
                  </button>
                </li>
              </ul>
            </Choices>
          </fieldset>
        </form>
      </div>
    </section>
  );
};
