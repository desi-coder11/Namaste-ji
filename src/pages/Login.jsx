import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
const Login = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };

  return (
   <div className='formConatainer'>
    <div className='formWrapper'>
        <span className="logo">Web Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
            <input type='email' placeholder='Your Email'/>
            <input type='password' placeholder='Your password' />
           
            <button>Sign in</button>
        </form>
        <p>You don't have an account ? <Link to="/Register">Register</Link> </p>

    </div>
   </div>
  )
}

export default Login