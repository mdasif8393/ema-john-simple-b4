
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';



function Login() {  

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    picture: '',
    error: '',
    success: false
  });


  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleResponse = (res, redirect) => {
    setUser(res);
      setLoggedInUser(res);
      redirect && history.replace(from);

  }

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false);
    })
  }

  
  initializeLoginFramework();

 
  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    //Firebase login with email and password
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    e.preventDefault();
  }

  const handleBlur = (e) => {

    let isFieldValid = true;
    
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }

    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }

    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value ; 
      setUser(newUserInfo);
    }

  }

  

  return (

    

    <div style={{textAlign: 'center'}}>
      <button onClick={fbSignIn}>Facebook Sign in</button>
      <br />
      {
        user.isSignedIn ? <button onClick = {signOut} >Sign out</button> :  <button onClick = {googleSignIn} >Sign in</button>
      }
      {
        user.isSignedIn && 
        <div> 
            <p>Welcome {user.name}</p>    
            <p>Email: {user.email}</p>
            <img src={user.picture} alt=""/>
        </div>
      }

      <h1>Our own Authentication</h1>

      <input type="checkbox" onChange={ ()=> setNewUser(!newUser) } name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up</label>

      <form onSubmit={handleSubmit}>
        {
          newUser && <input type="text" name="name" id="" placeholder="Your name" onBlur={handleBlur}/>
        }
        <br />
        <input type="text" name="email" onBlur={handleBlur}  id="" placeholder="Your email address"  required/> 
        <br />
        <input type="password" name="password" onBlur={handleBlur} id="" placeholder="Your password" required/> 
        <br />
        <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
      </form>

      <p style={{color:'red'}} >{user.error}</p>
      {
        user.success && <p style={{color:'green'}} >User { newUser ? "created" : "Logged in"} successfully</p>
      }
    </div>
  );
}

export default Login;
