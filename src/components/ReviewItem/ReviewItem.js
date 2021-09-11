import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px',
    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <h6 className="product-name">{name}</h6>
            <p>Quantity: {quantity}</p>
            <p><small>${price}</small></p>
            <br />
            <button 
            onClick = { () => props.removeProduct(key) }
            className="main-button">Remove Item</button>
        </div>
    );
};

export default ReviewItem;