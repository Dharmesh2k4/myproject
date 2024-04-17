import React, { useState } from "react";
import './LoginForm.css'
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import validation from './LoginValidation';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isNotRegistered, setIsNotRegistered] = useState(false);

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await setErrors(validation(values)); // Wait for the state to update

    if (errors.email === "" && errors.password === "") {
      try {
        const res = await axios.post('http://localhost:8081/login', values);
        
        if (res.data === "Success") {
          navigate('/chatbot');
        } else {
          setIsNotRegistered(true);
          alert('Please Register');
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  return (
    <div className="wrapper">
      <header>
        <h1>Healthcare Chatbot Login</h1>
      </header>
      <form action="" onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
        <div className="input-box">
          <input
            type="email"
            placeholder='Enter Email'
            onChange={handleInput}
            name='email'
            className='form-control rounded-0'
          />
          {errors.email && <span className='text-danger'>{errors.email}</span>}
          <MdEmail className="icon" />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder='Enter Password'
            onChange={handleInput}
            name='password'
            className='form-control rounded-0'
          />
          {errors.password && <span className='text-danger'>{errors.password}</span>}
          <FaLock className="icon" />
        </div>

        <div className="remember-forgot">
          <label ><input type="checkbox" />Remember me</label>
          <Link to='/forgotpassword' className="forgot">Forgot Password</Link>
        </div>

        <button type="submit">Login</button>

        {isNotRegistered && (
          <div className="warning-message">
            You're not registered yet.
          </div>
        )}
        <div className="register-link">
          <Link to='/signup' className="register">Create Account</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
