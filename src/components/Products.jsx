import { useState } from "react";
import ProductItem from "./ProductItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import Pagination from '@mui/material/Pagination';

const requestConfig = {};

export default function Products(){
    const [page, setPage] = useState(1);

    const {
        data: loadedProducts,
        isLoading: loading,
        error: error} = useHttp('http://localhost:8080/shopcart/api/products', requestConfig, []);

    if(loading){
        return <p className="center">Loading data...</p>
    }
    
    if(error){
        return <Error title="Failed to load data" message={error}/>
    }

    const postsPerPage = 3;
    const lastPostIndex = page * postsPerPage;
    const firstIndex = lastPostIndex - postsPerPage;
    const currentPosts = loadedProducts.slice(firstIndex, lastPostIndex);
    const totalPages = Math.ceil(loadedProducts.length / postsPerPage);
    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <>
        <Pagination count={totalPages} color="primary" onChange={handleChange} className="pagination"/>
        <ul id="meals">
            {currentPosts.map((product) => (
                <ProductItem key={product.productId} product={product} />
                ))}
        </ul>
        </>
    )
}