import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css'
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    //creating credentials usinf useState
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })

    const { loading, error, dispatch } = useContext(AuthContext);

    // when login is successful we navigate  to our home page
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async (e) => { //here we using async function because here we are going to make api request
        e.preventDefault()
        dispatch({ type: "LOGIN_START" }) //we are not passing any payload here, it just update our loading state and after that we are doing try catch
        try {
            const res = await axios.post('http://localhost:8800/api/auth/login', credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
            navigate("/")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
        }
    }


    return (
        <div className='login'>
            <div className="lContainer">
                <input
                    type="text"
                    placeholder='username'
                    id='username'
                    onChange={handleChange}
                    className="lInput"
                />
                <input
                    type="password"
                    placeholder='password'
                    id='password'
                    onChange={handleChange}
                    className="lInput"
                />
                <button disabled={loading
                } onClick={handleClick} className="lButton">Login</button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    )
}

export default Login