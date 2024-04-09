import Modal from "./UI/Modal";
import Button from "./UI/Button";
import Input from "./UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { userProgressActions } from "../redux-store/userProgressSlice";
import useHttp from "../hooks/useHttp";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    }
};

export default function AddProduct(){
    const dispatch = useDispatch();
    const userProgressData = useSelector(state => state.userProgress);

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp('http://localhost:8080/shopcart/api/products', requestConfig);

    function handleClose(){
        dispatch(userProgressActions.hide());
    }

    function handleFinish(){
        dispatch(userProgressActions.hide());
        clearData();
        window.location.reload(false);
    }

    function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const productData = Object.fromEntries(fd.entries());
        productData.price = parseFloat(productData.price);

        sendRequest(JSON.stringify(productData));

        console.log(productData);
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>Close</Button>
            <Button>Add Product</Button>
        </>);

    if (isSending){
        actions = <span>Sending Data...</span>
    }

    if(data && !error){
        return(
            <Modal open={userProgressData.progress === 'addProduct'} onClose={handleFinish}>
                <h2>Product Added Successfully</h2>
                <p className="modal-actions">
                <Button type="button" textOnly onClick={handleFinish}>Ok</Button>
                </p>
            </Modal>
        )
    }

    return(
        <Modal open={userProgressData.progress === 'addProduct'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Add Product</h2>
                <Input label="Product Name" type="text" id="name" />
                <Input label="Price" type="number" step="any" min="1" id="price" />
                <Input label="Image (URL)" type="text" id="image" />
                <Input label="Description" type="text" id="description" />
                {error && <Error title="Submission failed" message={error}/>}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}