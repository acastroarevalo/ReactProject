import Modal from "./UI/Modal";
import Button from './UI/Button';
import Input from "./UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { userProgressActions } from "../redux-store/userProgressSlice";
import { loginStateActions } from "../redux-store/loginStateSlice";
import { userActions } from "../redux-store/userSlice";
import useHttp from "../hooks/useHttp";
import useNotification from "../hooks/useNotification";
import NotificationBox from "./UI/NotificationBox";

const requestConfigGet = {}

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    }
};

const requestConfigEdit = {
    method: 'PATCH',
    headers: {
        'Content-type': 'application/json'
    }
};

export default function SignUp(){
    const dispatch = useDispatch();
    const loginStateData = useSelector(state => state.loginState);
    const userProgressData = useSelector(state => state.userProgress);
    const userData = useSelector(state => state.user);

    const {visible, text, showNotification} = useNotification();

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = loginStateData.loginStatus === 'edit' ? 
        useHttp(`http://localhost:8080/shopcart/api/users/${userData.user.userId}`, requestConfigEdit) :
        useHttp('http://localhost:8080/shopcart/api/users', requestConfig);

    const {
        data: loadedUsers } = useHttp('http://localhost:8080/shopcart/api/users', requestConfigGet, []);

    function handleClose(){
        loginStateData.loginStatus === 'edit' ?
        dispatch(loginStateActions.login()) : 
        dispatch(loginStateActions.logout());
        dispatch(userProgressActions.hide());
    }

    function handleFinish(){
        loginStateData.loginStatus === 'edit' ?
        dispatch(loginStateActions.login()) : 
        dispatch(loginStateActions.logout());
        dispatch(userProgressActions.hide());
        clearData();
        window.location.reload(false);
    }

    function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const signUpData = Object.fromEntries(fd.entries());
        let duplicate = false;
        var i;

        if(loginStateData.loginStatus === 'edit'){
            sendRequest(JSON.stringify(signUpData));
            dispatch(userActions.updateUser({
                userId: userData.user.userId,
                name: signUpData.name,
                lastName: signUpData.lastName,
                email: signUpData.email,
                bio: signUpData.bio,
                interests: signUpData.areaOfInterest,
                pwd: signUpData.pwd
            }));
        } else{
            //Duplicate Check
            for(i = 0; i < loadedUsers.length; i++){
                if(loadedUsers[i].email === signUpData.email){
                    duplicate = !duplicate;
                }
            }
            if(duplicate){
                showNotification('E-Mail already taken', 1500)
            } else{
                sendRequest(JSON.stringify(signUpData)); 
            }
            //End of Duplicate Check
        }
    }

    let actions = (
        <>
            <Button>Confirm</Button>
            <Button type="button" textOnly onClick={handleClose}>Close</Button>
        </>);

    if (isSending){
        actions = <span>Sending Data...</span>
    }

    if(data && !error){
        return(
            <Modal open={userProgressData.progress === 'signUp'} onClose={handleFinish}>
                <h2>{loginStateData.loginStatus === 'edit' ? 'Edit Successful' : 'SignUp Successful'}</h2>
                {loginStateData.loginStatus === '' && 'You may login with your email & password now'}
                <p className="modal-actions">
                <Button type="button" textOnly onClick={handleFinish}>Ok</Button>
                </p>
            </Modal>
        )
    }

    return(
        <Modal open={userProgressData.progress === 'signUp'} 
        onClose={userProgressData.progress === 'signUp' ? handleClose : null}>
            <form onSubmit={handleSubmit}>
                <h2>{loginStateData.loginStatus === 'edit' ? 'Edit User' : 'Sign Up'}</h2>
                <Input label="Name" type="text" id="name" />
                <Input label="LastName" type="text" id="lastName" />
                <Input label="E-mail" type="email" id="email" />
                <Input label="Interests" type="text" id="areaOfInterest" />
                <Input label="Bio" type="text" id="bio" />
                <Input label="Password" type="text" id="pwd" />
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
            <NotificationBox visible={visible} text={text}/>
        </Modal>
    )
}