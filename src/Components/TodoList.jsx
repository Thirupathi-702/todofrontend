import React,{useContext,useState,useEffect} from "react";
import { authState } from "../store/authState";
import {useRecoilValue} from 'recoil';

const TodoList=()=>{
    const [todos,setTodos]=useState([]);
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const authStateValue=useRecoilValue(authState);

    useEffect(()=>{
        const getTodos=async()=>{
            const response=await fetch(`${import.meta.env.VITE_API_URL}/todo/todos`,{
                method:"GET",
                headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
            })
            const data=await response.json();
            setTodos(data);
        }
        getTodos();
    },[authState.token]);

    const addTodo= async ()=>{
        const response=await fetch(`${import.meta.env.VITE_API_URL}/todo/todos`,{
            method:"POST",
            headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},
            body:JSON.stringify({title,description})
        })
        const data= await response.json()
        setTodos([...setTodos,data])

    }
    const markDone=async(id)=>{
        const response=await fetch(`${import.meta.env.VITE_API_URL}/${id}/done`,{
            method:"PATCH",
            headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}

        })
        const updatedTodo=await response.json();
        setTodos(todos.map((todo)=>(todo._id===updatedTodo._id? updatedTodo:todo)))

    }
    return(
        <div>
            <div style={{display:"flex"}}>
                <h2>Welcome {authStateValue.username}</h2>
                <div style={{marginTop:25,marginLeft:20}}>
                    <button onClick={()=>{
                        localStorage.removeItem("token");
                        window.location='/login';
                    
                    }}>Logout</button>
                </div>
            </div>
            <h2>Todo List</h2>
            <input type="text" placeholder=" title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <button onClick={addTodo}>Add Todo</button>
            {todos.map((todo)=>(
                <div key={todo._id}>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <button onClick={()=>markDone(todo._id)}>{todo.done? 'Done': 'Mark as Done'}</button>
           </div>
            )

            )}
            </div>
        
    )

}
export default TodoList;