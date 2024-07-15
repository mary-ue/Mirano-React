import { useEffect, useRef, useState } from 'react';
import { Choices } from '../Choices/Choices';
import './Filter.scss';
import { useDispatch } from 'react-redux';
import { fetchGoods } from '../../redux/goodsSlice';
import { debounce, getValidFilters } from '../../utils';
import { FilterRadio } from './FilterRadio';

const filterTypes = [
  { title: 'Цветы', value: 'bouquets' },
  { title: 'Игрушки', value: 'toys' },
  { title: 'Открытки', value: 'postcards' },
];

export const Filter = ({ setTitleGoods }) => {
  const dispatch = useDispatch();
  const [openChoice, setOpenChoice] = useState(null);

  const [filters, setFilters] = useState({
    type: 'bouquets',
    minPrice: '',
    maxPrice: '',
    category: '',
  });

  const prevFiltersRef = useRef({});

  const debouncedFetchGoods = useRef(
    debounce((filters) => {
      dispatch(fetchGoods(filters));
    }, 300)
  ).current;

  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const validFilter = getValidFilters(filters);

    if (prevFilters.type !== filters.type) {
      dispatch(fetchGoods(validFilter));
      setTitleGoods(
        filterTypes.find((item) => item.value === filters.type).title
      );
    } else {
      debouncedFetchGoods(validFilter);
    }

    prevFiltersRef.current = filters;
  }, [filters, debouncedFetchGoods, dispatch]);

  const handleChoicesToggle = (index) => {
    setOpenChoice(openChoice === index ? null : index);
  };

  const handleTypeChange = ({ target }) => {
    const { value } = target;
    const newFilters = { ...filters, type: value, minPrice: '', maxPrice: '' };
    setFilters(newFilters);
    setOpenChoice(-1);
  };

  const handlePriceChange = ({ target }) => {
    const { name, value } = target;
    const newFilters = {
      ...filters,
      [name]: !isNaN(parseInt(value, 10)) ? value : '',
    };
    setFilters(newFilters);
  };

  return (
    <section className="filter">
      <h2 className="visually-hidden"></h2>
      <div className="container">
        <form className="filter__form">
          <fieldset className="filter__group">
            {filterTypes.map((item) => (
              <FilterRadio
                key={item.value}
                handleTypeChange={handleTypeChange}
                data={item}
                type={filters.type}
              />
            ))}
          </fieldset>

          <fieldset className="filter__group filter__group_choices">
            <Choices
              buttonLabel="Цена"
              isOpen={openChoice === 0}
              onToggle={() => handleChoicesToggle(0)}
            >
              <fieldset className="filter__price">
                <input
                  className="filter__input-price"
                  type="text"
                  name="minPrice"
                  placeholder="от"
                  value={filters.minPrice}
                  onChange={handlePriceChange}
                />
                <input
                  className="filter__input-price"
                  type="text"
                  name="maxPrice"
                  placeholder="до"
                  value={filters.maxPrice}
                  onChange={handlePriceChange}
                />
              </fieldset>
            </Choices>

            <Choices
              className="filter__choices_type"
              buttonLabel="Тип товара"
              isOpen={openChoice === 1}
              onToggle={() => handleChoicesToggle(1)}
            >
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
