import React, { useEffect } from 'react';
import ProductList from '../components/productList';
import { BASE_URL } from '../utils/constants';
import "./products.css";

const Products = () => {

    const [products, setProducts] = React.useState([[]]);
    const [loading, setLoading] = React.useState(false);
    
    const getProducts = () => {
        setLoading(true);
        fetch(`${BASE_URL}api/products.json`)
        .then(response => response.json())    
        .then((response) => {
            setProducts(response.products);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
        });
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className='products-wrapper'>
            <ProductList products={products} loading={loading} />
        </div>
    )
}

export default Products;