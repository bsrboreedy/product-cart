import React from 'react';

const ProductItem = ({
    name,
    revenue
}) => {
    return (
        <div className='product-item'>
            <div className='product-item-value'>{name}</div>
            <div className='product-item-value'>{revenue}</div>
        </div>
    )
}

export default React.memo(ProductItem);