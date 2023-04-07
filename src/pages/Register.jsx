import React, { useState } from 'react'
import Add from '../img/add.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage ,db } from "../firebase";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate,Link } from 'react-router-dom';



const Register = () => {

  const [err,setErr] = useState(false);
  const navigate = useNavigate();


  const handleSubmit =async (e) =>{
    console.log(e);
    e.preventDefault();

   const displayName = e.target[0].value;
   const email = e.target[1].value;
   const password = e.target[2].value;
   const file = e.target[3].files[0];



try{
  const res = await createUserWithEmailAndPassword(auth, email, password);



const storageRef = ref(storage, displayName );

const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on(
 
  (error) => {
    setErr(true);
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      await updateProfile(res.user,{
        displayName,
        photoURL:downloadURL,
      });

      //create user on firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
      });
      //create empty user chats on firestore
      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");
    });
  }
);

}catch(err){
  setErr(true);
}
     


  }
  return (
   <div className='formConatainer'>
    <div className='formWrapper'>
        <span className="logo">Namaste</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Your name' />
            <input type='email' placeholder='Your Email'/>
            <input type='password' placeholder='Your password' />
            <input style={{display:"none"}} type='file'  id='file'/>
            <label htmlFor="file">
             <img src={Add} alt="" />
             <span>Add an avatar</span>
            </label>
            <button>Sign Up</button>
            {err && <span>Something went wrong...</span> }
        </form>
        <p>You do have an account ?<Link to="/login">Login</Link> </p>

    </div>
   </div>
  )
}

export default Register