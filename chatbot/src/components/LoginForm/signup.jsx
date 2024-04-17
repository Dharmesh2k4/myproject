import React, { useState } from "react";
import './Signup.css'
import { MdEmail } from "react-icons/md";
import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import validation from './SigupValidation';

function Signup() {
  const [values, setValues] = useState({
    fname: '',
    lname: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    if (errors.fname === "" && errors.lname === "" && errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/signup', values)
        .then(res => {
          navigate('/');
        })
        .catch(err => console.log(err))
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
        <h1>Healthcare Chatbot Register</h1>
      </header>
      <form action="" onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
        <div className="input-box">
          <input
            type="text"
            placeholder='Enter First Name'
            onChange={handleInput}
            name='fname'
            className='form-control rounded-0'
          />
          {errors.fname && <span className='text-danger'>{errors.fname}</span>}
          <FaUser className="icon" />
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder='Enter Last Name'
            onChange={handleInput}
            name='lname'
            className='form-control rounded-0'
          />
          {errors.lname && <span className='text-danger'>{errors.lname}</span>}
          <FaUser className="icon" />
        </div>

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
        </div>

        <button type="submit">Register</button>

        <div className="login-link">
          <Link to='/login' className="login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
