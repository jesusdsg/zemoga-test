import React, { useState } from 'react';
import '../css/register.css';

const Register = () => {
    const API = process.env.REACT_APP_API;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [picture, setPicture] = useState('');
    const [lastUpdated, setLastUpdated] = useState('');
    const [result, setResult] = useState('');
    const clean =() =>{
        setName('');
        setDescription('');
        setCategory('');
        setPicture('');
        setLastUpdated('');
        setResult('Name has been added');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, description, picture, category, lastUpdated);
        const rest = await fetch(`${API}/people`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name: name,
                description: description,
                picture: picture,
                category: category,
                lastUpdated: lastUpdated,
                votes: {
                    positive: 0,
                    negative: 0
                }
            })
        })
        const data = rest.json();
        console.log(data);
        clean(); 
    }

    return(
        <div className="form-container">
            <form className="form-main" onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Name" onChange={ e => setName(e.target.value)} value={name} />
                <textarea type="text" className="form-control" placeholder="Description" onChange={ e => setDescription(e.target.value)} value={description} />
                <input type="text" className="form-control" placeholder="Category" onChange={ e => setCategory(e.target.value)} value={category} />
                <input type="text" className="form-control" placeholder="Picture link" onChange={ e => setPicture(e.target.value)} value={picture} />
                <input type="date" className="form-control" id="start" name="trip-start" onChange={ e => setLastUpdated(e.target.value)} value={lastUpdated} ></input>
                <button className="btn-primary">
                    Submit Name
                </button>
                <div className="label-result">{result}</div>
            </div>
        
        </form>
        </div>
        
    )

}

export default Register;
