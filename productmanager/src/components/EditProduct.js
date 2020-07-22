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
    });
    
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
                const {...currErrors} = error;
                    console.log(response.data.results)
                    if (response.data.results.errors.title){
                        
                       currErrors.title = response.data.results.errors.title.properties.message
                    }
                    else {
                        currErrors.title = "";
                    }
                    if (response.data.results.errors.price){
                       currErrors.price = response.data.results.errors.price.properties.message
                    }
                    else {
                        currErrors.price = "";
                    }
                    if (response.data.results.errors.description){
                       currErrors.description = response.data.results.errors.description.properties.message
                    }
                    else {
                        currErrors.description = "";
                    }
                    setError(currErrors);
                }
            })
            .catch(err => {
                console.log(err);
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
