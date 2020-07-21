import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import Form from './Form';
import { navigate } from '@reach/router';

const CreateProduct = () => {
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

    const submitData = () => {
        axios.post("http://localhost:8000/api/products", product)
            .then(response => {
                if(response.data.message === "success"){
                    setProduct({
                        title: "",
                        price: "",
                        description: ""
                    })
                    navigate("/");
                }
                else {
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
            <h1>Create New Product</h1>
            <Form data={ product } setData={setProduct} submitData={submitData} error={error}/>
        </div>
    )
}

export default CreateProduct
