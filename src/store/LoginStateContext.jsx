import { createContext, useEffect, useState } from "react";

const LoginStateContext = createContext({
    loginStatus: '',
    login: () => {},
    logout: () => {},
    edit: () => {}
});

const initialLoginState = JSON.parse(localStorage.getItem('loginState')) || '';

export function LoginStateContextProvider({children}){
    const [loginState, setLoginState] = useState(initialLoginState);

    useEffect(()=>{
        localStorage.setItem('loginState', JSON.stringify(loginState));
    }, [loginState])

    function login(){
        setLoginState('loggedIn');
    }

    function logout(){
        setLoginState('');
    }

    function edit(){
        setLoginState('edit');
    }

    const loginStateCtx = {
        loginStatus: loginState,
        login,
        logout,
        edit
    }

    return(
        <LoginStateContext.Provider value={loginStateCtx}>{children}</LoginStateContext.Provider>
    );
}

export default LoginStateContext;