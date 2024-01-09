import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: { cartIsVisible: false, notification: null },
    reducers: {
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible;
        },

        // 437. 알림 Component와 현재 접근 방식과 함께 사용하기 위해 fetch, await(비동기) 방식 이용!
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            };
        }
    }
});

export const uiAction = uiSlice.actions;

export default uiSlice;