import React from 'react'
import axios from 'axios'
import { navigate } from '@reach/router';

const DeleteButton = (props) => {
    const { id, toDo } = props;

    const deleteHandler = id => {
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(response => {
                toDo();
                // navigate("/");
            })
    }

    return (
        <div>
            <button onClick={ () => deleteHandler(id) }>Delete</button>
        </div>
    )
}

export default DeleteButton
