import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

// 439. 애플리케이션이 로드될 때, 장바구니를 가져오는 앱 작업 크리에이터 빌드
export const fetchCartData = () => {
 return async dispatch => {
    const fetchData = async () => {
        const response = await fetch(
            'https://react-http-6b4e2-default-rtdb.firebaseio.com/cart.json'
        );

        if (!response.ok) {
            throw new Error('Could not fetch cart data!');
        }

        const data = await response.json();

        return data;
    };

    try {
        const cartData = await fetchData();
        dispatch(cartActions.replaceCart({
            // 변경된 데이터를 포함하지 않는 새로운 객체 생성
            items: cartData.items || [],
            totalQuantity: cartData.totalQuantity,
        }));
    } catch (error) {
        dispatch(
            uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed!'
            })
        );
    }
 };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "sending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-6b4e2-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({item: cart.items, totalQuantity: cart.totalQuantity}),
        },
      );

      // 응답 오류 발생
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
