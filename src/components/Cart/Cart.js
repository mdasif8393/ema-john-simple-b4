import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cartItems = props.cart;
    console.log(cartItems);
    const total = cartItems.reduce( (total, item) => total + item.price, 0);

    let shipping = 0;
    if(total > 0 && total <=15){
        shipping = 11.99;
    }
    else if(total >= 15 && total <= 34){
        shipping = 4.99;
    }
    else if(total > 35){
        shipping = 0;
    }

    const tax = total / 10;

    const grandTotal = total + shipping + tax;
    return (
        <div>
            <h1>Order Summery</h1>
            <h3>Items Order: {cartItems.length}</h3>
            <h3>Items: {total}</h3>
            <h3>Shipping: {shipping}</h3>
            <h3>Tax: {tax}</h3>
            <h4>Total: {grandTotal}</h4>
        </div>
    );
};

export default Cart;