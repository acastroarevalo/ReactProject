import { createSlice } from '@reduxjs/toolkit';

const initialUser = JSON.parse(localStorage.getItem('user')) || {user:{}};
const setItemFunc = (item) => localStorage.setItem('user', JSON.stringify(item));

const userSlice = createSlice({
    name: 'user',
    initialState: initialUser,
    reducers: {
        updateUser(state, action) {
            state.user = action.payload;
            console.log(state.user);
            setItemFunc({user: state.user});
        },
        logoutUser(state) {
            state.user = {};
            setItemFunc({user: state.user});
        }
    }
    
});

export const userActions = userSlice.actions;
export default userSlice;