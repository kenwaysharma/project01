
import React ,{useState, useContext}from 'react';
import {useHistory,Redirect} from 'react-router-dom'
import axios from 'axios'


const Login = () =>{
    const [log,setLog] = useState({email:'', password:''})


    const handleChange=(e)=>{
        const {name,value}=e.target
        setLog({ ...log, [name]: value });
        
            
    } 
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/users/login', {
              
            email:log.email,
            password:log.password,
            
          },{withCredentials:false},{
            headers: {
    
                  
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000/',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
                  
      }
          
          
        }).then(res=>{
            console.log(res);
        })
        .catch(e=>{console.log(e)})
    }
    return(
        <div>
            <h1>This is the Login page welcome sir!</h1>
            <div>
            
            <form onSubmit={handleSubmit}>
            
            <label name='email' >Email:</label>
            <input name='email' onChange={handleChange} value={log.email}></input>

            <label name='password' >password:</label>
            <input name='password' onChange={handleChange} value={log.password}></input>

            <button>submit</button>
            </form>
        </div>
        </div>
    )
}

export default Login