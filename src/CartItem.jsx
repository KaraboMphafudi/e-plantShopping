import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './redux/cartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return totalAmount.toFixed(2);
  };

  const calculateTotalCost = (item) => {
    const price = parseFloat(item.price);
    return (price * item.quantity).toFixed(2);
  };

  // THIS FUNCTION MUST EXIST AND CALL onContinueShopping
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();  // This goes back to products
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleCheckout = () => {
    alert('Coming Soon!');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2 className="cart-total-title">Total Cart Amount: $0</h2>
        <p className="empty-cart">Your cart is empty. Add some plants!</p>
        <button className="continue-shopping-btn" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-total-title">Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      <div className="cart-items-list">
        {cart.map(item => (
          <div className="cart-item" key={item.id}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-price">${item.price}</div>
              <div className="cart-item-quantity">
                <button className="quantity-btn quantity-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="quantity-value">{item.quantity}</span>
                <button className="quantity-btn quantity-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-subtotal">Subtotal: ${calculateTotalCost(item)}</div>
            </div>
            <button className="delete-btn" onClick={() => handleRemove(item)}>Delete</button>
          </div>
        ))}
      </div>
      
      <div className="cart-total-bottom">
        <strong>Total Amount: ${calculateTotalAmount()}</strong>
      </div>
      
      <div className="cart-actions">
        {/* THIS BUTTON MUST CALL handleContinueShopping */}
        <button className="continue-shopping-btn" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;