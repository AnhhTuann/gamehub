"use client";

import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

const CREATE_ORDER = gql`
  mutation CreateOrder($customerName: String!, $customerPhone: String!, $items: [OrderItemInput!]!) {
    createOrder(customerName: $customerName, customerPhone: $customerPhone, items: $items) {
      id
      status
      totalAmount
    }
  }
`;

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [createOrder, { loading, error }] = useMutation(CREATE_ORDER);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("omniwear_cart") || "[]"));
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your cart is empty!");

    const items = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    try {
      await createOrder({
        variables: {
          customerName: name,
          customerPhone: phone,
          items
        }
      });
      setSuccess(true);
      setCart([]);
      localStorage.removeItem("omniwear_cart");
    } catch (err) {
      console.error(err);
    }
  };

  if (success) {
    return (
      <div style={{textAlign: "center", padding: "5rem"}}>
        <h1 style={{color: "var(--primary)"}}>Order Placed Successfully!</h1>
        <p>Thank you for shopping with OmniWear.</p>
        <a href="/" className="btn" style={{display: 'inline-block', width: 'auto', textDecoration: 'none'}}>Continue Shopping</a>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Cart</h1>
      
      {cart.length === 0 ? (
        <p>Your cart is currently empty. <a href="/">Go shopping</a>.</p>
      ) : (
        <div style={{display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem'}}>
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-img" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <div style={{color: 'var(--primary)', fontWeight: 'bold'}}>${item.price.toFixed(2)} x {item.quantity}</div>
                </div>
                <div style={{fontWeight: 'bold', fontSize: '1.2rem'}}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 style={{marginTop: 0}}>Order Summary</h2>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 'bold'}}>
              <span>Total:</span>
              <span style={{color: 'var(--primary)'}}>${total.toFixed(2)}</span>
            </div>

            <form onSubmit={handleCheckout}>
              <div className="form-group">
                <label>Full Name</label>
                <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Nguyen Van A" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 0987654321" />
              </div>
              
              {error && <p style={{color: 'red', fontSize: '0.9rem'}}>{error.message}</p>}
              
              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
