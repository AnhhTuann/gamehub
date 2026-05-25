"use client";

import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      price
      category
      image
      inventory
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "network-only" // Ensure we always fetch latest inventory
  });
  
  const [cartCount, setCartCount] = useState(0);

  // Sync cart count from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("omniwear_cart") || "[]");
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("omniwear_cart") || "[]");
    const existing = cart.find((item) => item.id === product.id);
    
    if (existing) {
      if (existing.quantity >= product.inventory) {
        alert("Cannot add more than available inventory!");
        return;
      }
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("omniwear_cart", JSON.stringify(cart));
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    alert(`${product.title} added to cart!`);
  };

  if (loading) return <div style={{textAlign: "center", padding: "5rem"}}><h2>Loading premium collection...</h2></div>;
  if (error) return <div style={{textAlign: "center", color: "red", padding: "5rem"}}><h2>Error loading products: {error.message}</h2></div>;

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h1>New Arrivals</h1>
        <a href="/cart" style={{textDecoration: 'none', background: 'var(--primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: '999px', fontWeight: 'bold'}}>
          Cart ({cartCount})
        </a>
      </div>
      
      <div className="grid">
        {data.products.map((product) => {
          const isOutOfStock = product.inventory === 0;
          return (
            <div key={product.id} className="card">
              <div className="card-img-container">
                <img src={product.image} alt={product.title} className="card-img" />
              </div>
              <div className="card-body">
                <div className="card-category">{product.category}</div>
                <h3 className="card-title">{product.title}</h3>
                <div className="card-footer">
                  <div className="price">${product.price.toFixed(2)}</div>
                  <div className={`inventory ${isOutOfStock ? "out" : ""}`}>
                    {isOutOfStock ? "Out of Stock" : `${product.inventory} in stock`}
                  </div>
                </div>
                <button 
                  className="btn" 
                  disabled={isOutOfStock}
                  onClick={() => addToCart(product)}
                >
                  {isOutOfStock ? "Sold Out" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
