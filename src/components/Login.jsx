import Modal from "./UI/Modal";
import Button from './UI/Button';
import Input from "./UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux-store/userSlice";
import { loginStateActions } from "../redux-store/loginStateSlice";
import { userProgressActions } from "../redux-store/userProgressSlice";

export default function Login(){
    const dispatch = useDispatch();
    const loginStateData = useSelector(state => state.loginState);
    const userProgressData = useSelector(state => state.userProgress);

    function handleLogin(){
        dispatch(loginStateActions.login());
        dispatch(userProgressActions.hide());
    }

    function handleClose(){
        dispatch(userProgressActions.hide());
    }

    function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const userData = Object.fromEntries(fd.entries());
        console.log(userData.name);
        dispatch(userActions.updateUser({
            name: userData.name,
            lastName: userData.lastName,
            email: userData.email
        }));
        handleLogin();
    }

    return(
        <Modal open={userProgressData.progress === 'login'} onClose={handleLogin}>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <Input label="Name" type="text" id="name" />
                <Input label="LastName" type="text" id="lastName" />
                <Input label="E-mail" type="email" id="email" />
                <p className="modal-actions">
                    <Button>{loginStateData.loginStatus === 'edit' ? 'Save' : 'Login'}</Button>
                    <Button type="button" textOnly onClick={handleLogin}>Close</Button>
                </p>
            </form>
        </Modal>
    )
}