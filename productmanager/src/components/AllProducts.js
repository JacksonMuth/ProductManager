import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from '@reach/router';

const AllProducts = () => {
    const [ allProducts, setAllProducts ] = useState([]);

    const getAll = () => {
        axios.get("http://localhost:8000/api/products/all")
            .then(response => {
                setAllProducts(response.data.results);
            });
    }

    useEffect(() => {
        getAll();
    }, []);

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(response => {
                getAll();
            })
    }

    return (
        <div>
            <h1>All Products:</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allProducts.map((product, i) => 
                            <tr key = { i }>
                                <td><Link to={`/products/${product._id}`}>{ product.title }</Link></td>
                                <td>${ product.price }</td>
                                <td>{ product.description }</td>
                                <td>
                                    <Link to={`/products/${product._id}/edit`}><button>Edit</button></Link>
                                    <button onClick={ () => deleteHandler(product._id) }>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllProducts
