import React, { useState } from 'react'

const Form = props => {
    const { data, setData, error, submitData } = props;

    const changeHandler = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const submitHandler = e => {
        e.preventDefault();
        submitData();
    }

    return (
        <div>
            <form onSubmit={ submitHandler }>
                {
                    error.title ?
                    <p>{error.title}</p>
                    :
                    ""
                }
                <label htmlFor="title">Title: </label><br/>
                <input type="text" name="title" onChange={ changeHandler } value={ data.title }/><br/>
                {
                    error.price ?
                    <p>{error.price}</p>
                    :
                    ""
                }
                <label htmlFor="price">Price: </label><br/>
                <input type="number" name="price" onChange={ changeHandler } value={ data.price }/><br/>
                {
                    error.description ?
                    <p>{error.description}</p>
                    :
                    ""
                }
                <label htmlFor="description">Description: </label><br/>
                <input type="text" name="description" onChange={ changeHandler } value={ data.description }/><br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default Form
