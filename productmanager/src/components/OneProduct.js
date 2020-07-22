import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DeleteButton from '../components/DeleteButton'
import { navigate } from '@reach/router';

const OneProduct = (props) => {
    const [product, setProduct] = useState({
        _id: "",
        title: "",
        price: "",
        description: "",
        createdAt: "",
        updatedAt: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${props.id}`)
        .then(response => {
            if(response.data.message === "success"){
                setProduct(response.data.results);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [props.id]);

    return (
        <div>
            <h1>this is the page for {product.title}</h1>
            <ul>
                <li>Title: {product.title}</li>
                <li>ID No.: {product._id}</li>
                <li>Price: ${product.price}</li>
                <li>Description: {product.description}</li>
            </ul>
            <DeleteButton id={props.id} toDo={e => navigate("/")}/>
        </div>
    )
}

export default OneProduct
