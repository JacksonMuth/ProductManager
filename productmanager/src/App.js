import React from 'react';
import { Router, Link } from '@reach/router';
import './App.css';
import AllProducts from './components/AllProducts';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import OneProduct from './components/OneProduct';

function App() {
  return (
    <div>
      <nav>
        <Link to = "/">All Products</Link> | &nbsp;
        <Link to = "/create">Create Product</Link>
      </nav>
      <Router>
        <AllProducts path="/"/>
        <CreateProduct path="/create"/>
        <EditProduct path="/products/:id/edit"/>
        <OneProduct path="/products/:id"/>
      </Router>
    </div>
  );
}

export default App;
