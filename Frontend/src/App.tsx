import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListPage from './pages/Products/ProductListPage';
import Navbar from './components/common/Navbar'; 
import Footer from './components/common/Footer'; 
import ShoppingCart from './components/cart/ShoppingCart';
import { DotLoader  } from 'react-spinners';

const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const HomePage = lazy(() => import('./pages/Home/HomePage'));
const ProductDetailPage = lazy(()=>import('./pages/Products/ProductDetailPage'))

function App() {
  return (
    <>
      <Router>
        <Navbar /> 
        <Suspense fallback={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <DotLoader color="#36d7b7" size={100} />
          </div>
        }>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/products' element={<ProductListPage />} />
            <Route path='/product/:id' element={<ProductDetailPage />} />
            <Route path='/cart' element={<ShoppingCart />} />
          </Routes>
        </Suspense>
        <Footer /> 
      </Router>
    </>
  );
}

export default App;
