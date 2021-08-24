import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCartPlus } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    const {name, price, img, seller, stock} = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>

            <div>
                <h3>{name}</h3>
                <p><small>by: {seller}</small></p>
                <br/>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                <button onClick = { () => props.handleAddProduct(props.product) } className="main-button"> <FontAwesomeIcon icon={faCartPlus} /> add to cart</button>
            </div>
        </div>
    );
};

export default Product;