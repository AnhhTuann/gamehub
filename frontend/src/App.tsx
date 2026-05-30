import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { Auth } from './pages/Auth';
import { Admin } from './pages/Admin';
import { CustomerPortal } from './pages/CustomerPortal';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="cart" element={<Cart />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="portal" element={<CustomerPortal />} />
              </Route>
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}
