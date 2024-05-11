import React, { useState } from 'react';
import './App.css'; 
import loginImage from "./logo.png";  



function LoginForm() {
    <img src={loginImage} alt="Login" />
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Validation function for email
    const validateEmail = (email) => {
        return email.endsWith('@medtech.tn');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            setError('Email must end with @medtech.tn');
            return;
        }
        // Proceed with submitting the form
        console.log('Email:', email, 'Password:', password);
        // Add your logic to handle login here
        setError(''); // Clear any existing errors
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit">Login</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
}

export default LoginForm;
