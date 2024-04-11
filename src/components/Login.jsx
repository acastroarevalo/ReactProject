import Modal from "./UI/Modal";
import Button from './UI/Button';
import Input from "./UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux-store/userSlice";
import { loginStateActions } from "../redux-store/loginStateSlice";
import { userProgressActions } from "../redux-store/userProgressSlice";
import useHttp from "../hooks/useHttp";

const requestConfig = {};

export default function Login(){
    const dispatch = useDispatch();
    const userProgressData = useSelector(state => state.userProgress);

    const {
        data: loadedData,
        isLoading: loading,
        error: error} = useHttp('http://localhost:8080/shopcart/api/users', requestConfig, []);

    function handleLogin(){
        dispatch(loginStateActions.login());
        dispatch(userProgressActions.hide());
    }

    function handleSignUp(){
        dispatch(userProgressActions.showSignUp());
    }

    function handleClose(){
        dispatch(userProgressActions.hide());
    }

    function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const userData = Object.fromEntries(fd.entries());
        const loginUser = loadedData.find((item) => item.email === userData.email);

        if(userData.password === loginUser.pwd){
            dispatch(userActions.updateUser({
                userId: loginUser.userId,
                name: loginUser.name,
                lastName: loginUser.lastName,
                email: loginUser.email,
                bio: loginUser.bio,
                interests: loginUser.areaOfInterest,
                pwd: loginUser.pwd
            }));
            handleLogin();
        } else{
            alert("Incorrect Password");
        }
    }

    return(
        <Modal 
        open={userProgressData.progress === 'login'} 
        onClose={userProgressData.progress === 'login' ? handleClose : null}>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <Input label="E-mail" type="email" id="email" />
                <Input label="Password" type="text" id="password" />
                <p className="modal-actions">
                    <Button>Login</Button>
                    <Button type="button" onClick={handleSignUp}>Sign Up</Button>
                    <Button type="button" textOnly onClick={handleClose}>Close</Button>
                </p>
            </form>
        </Modal>
    )
}