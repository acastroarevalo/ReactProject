import { createContext, useEffect, useReducer } from "react";

const UserContext = createContext({
    user: {},
    updateUser: (user) => {},
    logoutUser: () => {}
});

function userReducer(state, action){
    if(action.type === 'UPDATE_USER'){
        const updatedUser = {...state.user};
        updatedUser.user = action.user;
        return {...state, user: updatedUser};
    }

    if(action.type === 'LOGOUT'){
        return {...state, user: {}}
    }

    return state;
}

const initialUser = JSON.parse(localStorage.getItem('user')) || {user:{}};

export function UserContextProvider({children}){
    const[user, dispatchUserAction] = useReducer(userReducer, initialUser);

    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(user));
    }, [user])

    function updateUser(user){
        dispatchUserAction({type: 'UPDATE_USER', user})
    }

    function logoutUser(){
        dispatchUserAction({type: 'LOGOUT'})
    }

    const userContext = {
        user: user.user,
        updateUser,
        logoutUser
    }
    console.log(userContext);
    return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
}

export default UserContext;