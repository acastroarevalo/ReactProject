import Modal from "./UI/Modal";
import Button from './UI/Button';
import Input from "./UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { userProgressActions } from "../redux-store/userProgressSlice";
import { loginStateActions } from "../redux-store/loginStateSlice";
import { userActions } from "../redux-store/userSlice";
import useHttp from "../hooks/useHttp";

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

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = loginStateData.loginStatus === 'edit' ? 
    useHttp(`http://localhost:8080/shopcart/api/users/${userData.user.userId}`, requestConfigEdit) :
    useHttp('http://localhost:8080/shopcart/api/users', requestConfig);

    function handleClose(){
        loginStateData.loginStatus === 'edit' ?
        dispatch(loginStateActions.login()) : 
        dispatch(loginStateActions.logout());
        dispatch(userProgressActions.hide());
    }

    function handleFinish(){
        dispatch(loginStateActions.login());
        dispatch(userProgressActions.hide());
        clearData();
    }

    function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const signUpData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify(signUpData));

        //add loginStatus check to add userId when creating new user
        dispatch(userActions.updateUser({
            userId: userData.user.userId,
            name: signUpData.name,
            lastName: signUpData.lastName,
            email: signUpData.email,
            bio: signUpData.bio,
            interests: signUpData.areaOfInterest,
            pwd: signUpData.pwd
        }));
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
                <h2>SignUp Successful</h2>
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
                <h2>Sign Up</h2>
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
        </Modal>
    )
}