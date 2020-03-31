import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCartItems,
  selectCartTotal
} from '../../redux/cart/cart.selector';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import './checkout.styles.scss';

const CheckoutPage = ({ cartItems, totalVal }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product Image</span>
      </div>
      <div className="header-block">
        <span>Name</span>
      </div>
      <div className="header-block">
        <span>Quantity</span>
      </div>
      <div className="header-block">
        <span>Price</span>
      </div>
      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map(cartItem => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className="total">
      <span>Total: ${totalVal}</span>
    </div>
    <div className="test-warning">
      *Please use the following credit card for testing*
      <br />
      4242 4242 4242 4242 - Exp: 01/21 - CVV: 123
    </div>
    <StripeCheckoutButton price={totalVal} />
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  totalVal: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
