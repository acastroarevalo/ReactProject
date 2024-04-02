import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {user: {}},
    reducers: {
        updateUser(state, action) {
            /*const updatedUser = {...state.user};
            updatedUser.user = action.user;
            return {...state, user: updatedUser};*/
            state.user = action.payload;
        },
        logoutUser(state) {
            //return {...state, user: {}}
            state.user = {};
        }
    }
    
});

export const userActions = userSlice.actions;
export default userSlice;