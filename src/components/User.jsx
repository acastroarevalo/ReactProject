import { useContext, useEffect } from "react";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import LoginStateContext from "../store/LoginStateContext";
import UserContext from "../store/UserContext";

export default function User(){
    const userProgressCtx = useContext(UserProgressContext);
    const loginStateCtx = useContext(LoginStateContext);
    const userCtx = useContext(UserContext);

    function handleLogout(){
        userCtx.logoutUser();
        loginStateCtx.logout();
        userProgressCtx.hide();
        console.log(userCtx.user);
    }

    function handleEdit(){
        loginStateCtx.edit();
        userProgressCtx.showLogin();
    }

    function handleCloseUser(){
        userProgressCtx.hide();
    }

    return(
        <Modal className="user" 
        open={userProgressCtx.progress === 'user'} 
        onClose={userProgressCtx.progress === 'user' ? handleCloseUser : null}>
        <h2>User</h2>
        <p>Name: {loginStateCtx.loginStatus === '' ? undefined : userCtx.user.user.name}</p>
        <p>Last Name: {loginStateCtx.loginStatus === '' ? undefined : userCtx.user.user.lastName}</p>
        <p>Email: {loginStateCtx.loginStatus === '' ? undefined : userCtx.user.user.email}</p>
        <p className="modal-actions">
            <Button textOnly onClick={handleLogout}>Logout</Button>
            <Button textOnly onClick={handleEdit}>Edit</Button>
            <Button textOnly onClick={handleCloseUser}>Close</Button>
        </p>
            
        </Modal>
    )
}