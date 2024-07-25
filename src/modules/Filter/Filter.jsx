import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Choices } from '../Choices/Choices';
import './Filter.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from '../../redux/goodsSlice';
import { debounce, getValidFilters } from '../../utils';
import { FilterRadio } from './FilterRadio';
import {
  changeCategory,
  changePrice,
  changeType,
} from '../../redux/filtersSlice';

const filterTypes = [
  { title: 'Цветы', value: 'bouquets' },
  { title: 'Игрушки', value: 'toys' },
  { title: 'Открытки', value: 'postcards' },
];

export const Filter = ({ setTitleGoods }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const categories = useSelector((state) => state.goods.categories);
  const [openChoice, setOpenChoice] = useState(null);
  const prevFiltersRef = useRef(filters);
  const filtersRef = useRef(null);

  const debouncedFetchGoods = useRef(
    debounce((filters) => {
      dispatch(fetchGoods(filters));
    }, 300)
  ).current;

  useEffect(() => {
    if (filters !== prevFiltersRef.current) {
      filtersRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filters]);

  useEffect(() => {
    const prevMinPrice = prevFiltersRef.current.minPrice;
    const prevMaxPrice = prevFiltersRef.current.maxPrice;

    const validFilter = getValidFilters(filters);

    if (!validFilter.type && !validFilter.search) {
      return;
    }

    if (
      prevMinPrice !== validFilter.minPrice ||
      prevMaxPrice !== validFilter.maxPrice
    ) {
      debouncedFetchGoods(validFilter);
    } else {
      dispatch(fetchGoods(validFilter));
    }

    const type = filterTypes.find((item) => item.value === validFilter.type);

    if (type) {
      setTitleGoods(type.title);
    }

    if (validFilter.search) {
      setTitleGoods('Результат поиска');
    }

    prevFiltersRef.current = filters;
  }, [filters, debouncedFetchGoods, setTitleGoods, dispatch]);

  const handleChoicesToggle = (index) => {
    setOpenChoice(openChoice === index ? null : index);
  };

  const handleTypeChange = ({ target }) => {
    const { value } = target;
    dispatch(changeType(value));
    setOpenChoice(-1);
  };

  const handlePriceChange = ({ target }) => {
    const { name, value } = target;
    dispatch(changePrice({ name, value }));
  };

  const handleCategoryChange = (category) => {
    dispatch(changeCategory(category));
    setOpenChoice(-1);
  };

  return (
    <section className="filter" ref={filtersRef}>
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

            {categories.length ? (
              <Choices
                className="filter__choices_type"
                buttonLabel="Тип товара"
                isOpen={openChoice === 1}
                onToggle={() => handleChoicesToggle(1)}
              >
                <ul className="filter__type-list">
                  <li className="filter__type-item">
                    <button
                      className="filter__type-button"
                      type="button"
                      onClick={() => {
                        handleCategoryChange('');
                      }}
                    >
                      Все товары
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li className="filter__type-item" key={category}>
                      <button
                        className={cn(
                          'filter__type-button',
                          category === filters.category
                            ? 'filter__type-button_active'
                            : ''
                        )}
                        type="button"
                        onClick={() => {
                          handleCategoryChange(category);
                        }}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </Choices>
            ) : null}
          </fieldset>
        </form>
      </div>
    </section>
  );
};
