import React,{useState} from 'react';
import {Link,useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import { authState } from '../store/authState';

const Signup =()=>{
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');

    const handleSignup=async()=>{
        const response=await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password})
        })
        const data=await response.json();
        if(data.token){
            localStorage.setItem("token",data.token)
            window.location="/todos";
        }
        else{
            alert("error while signinig up")
        }
    }
    return(
        <div style={{justifyContent:"center",display:"flex",width:"100%"}}>
            <div>
                <h2>Signup</h2>
                <input type='username' placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <input type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                Already signed up? <Link to="/login">Login</Link>
                <button onClick={handleSignup}>Signup</button>
            </div>
        </div>
    )
}

export default Signup