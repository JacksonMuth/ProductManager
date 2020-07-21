import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './Form'
import { navigate } from '@reach/router';

const EditProduct = props => {
    const [product, setProduct] = useState({
        title: "",
        price: "",
        description: ""
    });
    const [error, setError] = useState({
        title: "",
        price: "",
        description: ""
    })
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${props.id}`)
            .then(response => {
                setProduct(response.data.results);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const submitData = () => {
        axios.put(`http://localhost:8000/api/products/${props.id}`, product)
            .then(response => {
                console.log(response);
                if(response.data.message == "success"){
                    setProduct({
                        title: "",
                        price: "",
                        description: ""
                    })
                    navigate("/");
                } else {
                    setError({
                        title: "Something wrong",
                        price: "u mess up",
                        description: "no"
                    });
                }
            })
    }

    return (
        <div>
            <h2>Edit Product</h2>
            <Form data={ product } error={ error } setData={ setProduct} submitData={ submitData } />
        </div>
    )
}

export default EditProduct
