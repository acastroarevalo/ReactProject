import { createSlice } from '@reduxjs/toolkit';

const initialLoginState = JSON.parse(localStorage.getItem('loginState')) || {loginStatus: ''};
const setItemFunc = (item) => localStorage.setItem('loginState', JSON.stringify(item));

const loginStateSlice = createSlice({
    name: 'loginState',
    initialState: initialLoginState,
    reducers: {
        login: (state) => {
            state.loginStatus = 'loggedIn';
            setItemFunc({loginStatus: state.loginStatus});
        },
        logout: (state) => {
            state.loginStatus = '';
            setItemFunc({loginStatus: state.loginStatus});
        },
        edit: (state) => {
            state.loginStatus = 'edit';
            setItemFunc({loginStatus: state.loginStatus});
        }
    }
})

export const loginStateActions = loginStateSlice.actions;
export default loginStateSlice;