import { Fragment ,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  // 435. 리덕스와 함께 사용하는 useEffect
  // 컴포넌트에 부수 효과(side effect) 논리를 넣어 모든 데이터 변환 논리를 유지하기 좋은 방법 중 하나
  //  But, useEffect()의 문제점은 초기(즉, 비어 있는) 카트를 백엔드로 보내고 거기에 저장된 모든 데이터를 덮어쓰는 문제 발생!
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    // 437. 알림 Component와 현재 접근 방식과 함께 사용하기 위해 fetch, await(비동기) 방식 이용!
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "sending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
      
      const response = await fetch("https://react-http-6b4e2-default-rtdb.firebaseio.com/cart.json", {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      // 응답 오류 발생
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }

      // 응답 성공
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    };

    // 437. 효과가 처음 실행될 때, 데이터를 보내지 않도록 하기 위해 isInitial 전역 변수 사용
    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && 
        <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;