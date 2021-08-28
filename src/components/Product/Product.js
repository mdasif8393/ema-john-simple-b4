import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, price, img, seller, stock, key} = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>

            <div>
                <h3> <Link to={'/product/'+key}>{name}</Link> </h3>
                <p><small>by: {seller}</small></p>
                <br/>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                {props.showAddToCart &&  <button onClick = { () => props.handleAddProduct(props.product) } className="main-button"> <FontAwesomeIcon icon={faCartPlus} /> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;