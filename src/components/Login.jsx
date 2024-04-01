import { useContext } from "react"
import UserProgressContext from "../store/UserProgressContext"
import Modal from "./UI/Modal";
import Button from './UI/Button';
import Input from "./UI/Input";
import LoginStateContext from "../store/LoginStateContext";
import UserContext from "../store/UserContext";

export default function Login(){
    const userProgressCtx =  useContext(UserProgressContext);
    const loginStateCtx = useContext(LoginStateContext);
    const userCtx = useContext(UserContext);

    function handleLogin(){
        loginStateCtx.login();
        userProgressCtx.hide();
    }

    function handleClose(){
        userProgressCtx.hide();
    }

    function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const userData = Object.fromEntries(fd.entries());
        userCtx.updateUser(userData);
        handleLogin();
        console.log(userCtx.user);
    }

    return(
        <Modal open={userProgressCtx.progress === 'login'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <Input label="Name" type="text" id="name" />
                <Input label="LastName" type="text" id="lastName" />
                <Input label="E-mail" type="email" id="email" />
                <p className="modal-actions">
                    <Button>{loginStateCtx.loginStatus === 'edit' ? 'Save' : 'Login'}</Button>
                    <Button type="button" textOnly onClick={handleClose}>Close</Button>
                </p>
            </form>
        </Modal>
    )
}