import React, { useState } from 'react';

const Register = () => {

    const handleSubmit = e => {
        e.preventDefault();
        console.log(e);
    }

    return(
        <form className="p-5" onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="name" name="name" />
                <input type="text" className="form-control" placeholder="description" name="name" />
                <input type="text" className="form-control" placeholder="category" name="name" />
                <input type="text" className="form-control" placeholder="picture" name="name" />
            </div>
        
        </form>
    )

}

export default Register;
