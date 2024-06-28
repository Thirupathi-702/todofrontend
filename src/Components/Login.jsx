import React,{useState} from "react";
import {Link} from 'react-router-dom'

const Login=()=>{
    const[username,setUsername]=useState('');
    const [password,setPassword]=useState('');

    const handleLogin=async()=>{
        const response=await fetch(`${import.meta.env.VITE_API_URL}/auth/login`,{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({username,password})
        })
        const data=await response.json();
        if(data.token){
            localStorage.setItem("token",data.token)
            window.location="/todos";
        }
        else{
            alert("invalid credentials");
        }
    }
    return (
        <div style={{justifyContent:"center",display:"flex",width:"100%"}}>
            <div>
                <h2>Login</h2>
                <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                New here? <Link to="/signup">Signup</Link>
                <button onClick={handleLogin}>Login</button>
            </div>

        </div>
    )
}
export default Login