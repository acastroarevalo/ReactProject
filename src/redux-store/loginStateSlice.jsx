import { createSlice } from '@reduxjs/toolkit';

const loginStateSlice = createSlice({
    name: 'loginState',
    initialState: {loginStatus: ''},
    reducers: {
        login: (state) => {
            state.loginStatus = 'loggedIn';
        },
        logout: (state) => {
            state.loginStatus = '';
        },
        edit: (state) => {
            state.loginStatus = 'edit';
        }
    }
})

export const loginStateActions = loginStateSlice.actions;
export default loginStateSlice;