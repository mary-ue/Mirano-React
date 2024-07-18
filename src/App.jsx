import { useEffect, useRef, useState } from 'react';
import { Filter } from './modules/Filter/Filter';
import { Footer } from './modules/Footer/Footer';
import { Goods } from './modules/Goods/Goods';
import { Header } from './modules/Header/Header';
import { Hero } from './modules/Hero/Hero';
import { Order } from './modules/Order/Order';
import { Subscribe } from './modules/Subscribe/Subscribe';
import { useDispatch } from 'react-redux';
import { fetchCart, registerCart } from './redux/cartSlice';

export const App = () => {
  const dispatch = useDispatch();
  const [titleGoods, setTitleGoods] = useState('');
  const filtersRef = useRef(null);

  useEffect(() => {
    const initializeCart = async () => {
      await dispatch(registerCart());
      await dispatch(fetchCart());
    };

    initializeCart();
  }, [dispatch]);

  const scrollToFilters = () => {
    if (filtersRef.current) {
      filtersRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header setTitleGoods={setTitleGoods} scrollToFilters={scrollToFilters} />
      <main>
        <Hero />
        <Filter setTitleGoods={setTitleGoods} filtersRef={filtersRef} />
        <Goods title={titleGoods} />
        <Subscribe />
      </main>
      <Footer />
      <Order />
    </>
  );
};
