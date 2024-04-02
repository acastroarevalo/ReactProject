import {useDispatch, useSelector} from 'react-redux'
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { userActions } from "../redux-store/userSlice";
import { loginStateActions } from "../redux-store/loginStateSlice";
import { userProgressActions } from "../redux-store/userProgressSlice";

export default function User(){
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user);
    const loginStateData = useSelector(state => state.loginState);
    const userProgressData = useSelector(state => state.userProgress);

    function handleLogout(){
        dispatch(userActions.logoutUser());
        dispatch(loginStateActions.logout());
        dispatch(userProgressActions.hide());
    }

    function handleEdit(){
        dispatch(loginStateActions.edit());
        dispatch(userProgressActions.showLogin());
    }

    function handleCloseUser(){
        dispatch(userProgressActions.hide());
    }

    return(
        <Modal className="user" 
        open={userProgressData.progress === 'user'} 
        onClose={userProgressData.progress === 'user' ? handleCloseUser : null}>
        <h2>User</h2>
        <p>Name: {loginStateData.loginStatus === '' ? undefined : userData.user.name}</p>
        <p>Last Name: {loginStateData.loginStatus === '' ? undefined : userData.user.lastName}</p>
        <p>Email: {loginStateData.loginStatus === '' ? undefined : userData.user.email}</p>
        <p className="modal-actions">
            <Button textOnly onClick={handleLogout}>Logout</Button>
            <Button textOnly onClick={handleEdit}>Edit</Button>
            <Button textOnly onClick={handleCloseUser}>Close</Button>
        </p>
            
        </Modal>
    )
}