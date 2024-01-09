// import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  
  // 435. 리덕스와 함께 사용하는 useEffect
  // 컴포넌트에 부수 효과(side effect) 논리를 넣어 모든 데이터 변환 논리를 유지하기 좋은 방법 중 하나
  //  But, useEffect()의 문제점은 초기(즉, 비어 있는) 카트를 백엔드로 보내고 거기에 저장된 모든 데이터를 덮어쓰는 문제 발생!
  // const cart = useSelector((state) => state.cart);

  // useEffect(() => {
  //   fetch('https://react-http-6b4e2-default-rtdb.firebaseio.com/cart.json', {
  //     method: 'PUT',
  //     body: JSON.stringify(cart),
  //   });
  // }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;