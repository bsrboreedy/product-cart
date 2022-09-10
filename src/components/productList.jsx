import React, { useEffect, useMemo } from 'react';
import ProductItem from './productItem';
import SortIcon from './sortIcon';

const ProductList = ({
    products,
    loading
}) => {
    const [filterProductName, setFilterProductName] = React.useState('');
    const [filterProductValue, setFilterProductValue] = React.useState('');
    const [finalProducts, setFinalProducts] = React.useState([]);
    const [sortProducts, setSortProducts] = React.useState([]);
    const [sort, setSort] = React.useState({ name: '', direction: ''});

    const total = useMemo(() => finalProducts.reduce((current, item) => current + item.revenue, 0), [finalProducts]);

    useEffect(() => {
        const finalProducts = products.filter(item => {
            if(filterProductName && filterProductValue) {
                return item.name.toLowerCase().includes(filterProductName.toLowerCase()) && item.revenue === +filterProductValue;
            } else if(filterProductName) {
                return item.name.toLowerCase().includes(filterProductName.toLowerCase())
            } else if(filterProductValue) {
                return item.revenue === +filterProductValue
            }
            return true;
        });
        setFinalProducts(finalProducts);

    }, [products, filterProductName, filterProductValue]);

    useEffect(() => {
        let defaultProducts = [...finalProducts];
        if(sort.name) {
            defaultProducts.sort((a, b) => {
                if(sort.direction === 'asc') {
                    return a[sort.name] < b[sort.name] ? -1 : a[sort.name] > b[sort.name] ? 1 : 0;
                } else {
                    return a[sort.name] > b[sort.name] ? -1 : a[sort.name] < b[sort.name] ? 1 : 0;
                }
            })
        }
        setSortProducts(defaultProducts);
    }, [finalProducts, sort]);

    const handleChange = React.useCallback((e) => {
        const { name, value } = e.target;
        if(name === 'filterProductName') {
            setFilterProductName(value);
        } else {
            setFilterProductValue(value);
        }
    }, []);

    const handleSort = React.useCallback((type) => {
        let newSort = {...sort};
        if(type === sort.name) {
            newSort = {...sort, direction: sort.direction === 'asc'? 'desc' : '', name: sort.direction === 'asc' ? sort.name: '' }
        } else {
            newSort = { ...sort, name: type, direction: 'asc'}
        }
        setSort(newSort);
    }, [sort]);


    if(loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    return (
        <div className='products-list'>
            <div className='product-header'>
                <div className='product-header-item' onClick={() => handleSort('name')}>
                    Product Name
                    { sort.name === 'name' && sort.direction ? <SortIcon direction={sort.direction} />: '' }
                </div>
                <div className='product-header-item'  onClick={() => handleSort('revenue')}>
                    Revenue
                    { sort.name === 'revenue' && sort.direction ? <SortIcon direction={sort.direction} />: '' }
                </div>
            </div>
            <div className='product-filter'>
                <div className='product-filter-item'>
                    <input type="text" name="filterProductName" placeholder='Filter by Name' value={filterProductName} onChange={handleChange} />
                </div>
                <div className='product-filter-item'>
                    <input type="text" name="filterProductValue" placeholder='Filter by Revenue' value={filterProductValue} onChange={handleChange} />
                </div>
            </div>
            {
                sortProducts.map(product => <ProductItem key={product.id} name={product.name} revenue={product.revenue} />)
            }
             <div className='product-item'>
                <div className='product-item-value bold'>Total</div>
                <div className='product-item-value bold'>{total}</div>
            </div>
        </div>
    )
}

export default React.memo(ProductList);