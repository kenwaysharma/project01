import React ,{useState, useContext}from 'react';
import {useHistory,Redirect} from 'react-router-dom'
import axios from 'axios'


const Register = () =>{
const [log,setLog] = useState({username:'',email:'', password:'',passwordConfirm:''})


const handleChange=(e)=>{
    const {name,value}=e.target
    setLog({ ...log, [name]: value });
    
        
} 

const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:5000/users/register', {
        username:log.username,    
        email:log.email,
        password:log.password,
        passwordConfirm: log.passwordConfirm
      },{withCredentials:false},{
        headers: {
              'Content-Type': 'application/json'
  }
      
      
    }).then(res=>{
        console.log(res);
    })
    .catch(e=>{console.log(e)})
}
    return(
        <div>
            <h1>This is the Register page welcome sir!</h1>
            <form onSubmit={handleSubmit}>
            <label name='username' >username:</label>
            <input name='username' onChange={handleChange} value={log.username}></input>

            <label name='email' >Email:</label>
            <input name='email' onChange={handleChange} value={log.email}></input>

            <label name='password' >password:</label>
            <input name='password' onChange={handleChange} value={log.password}></input>

            <label name='passwordConfirm' >Confirm Password:</label>
            <input name='passwordConfirm' onChange={handleChange} value={log.passwordConfirm}></input>
            <button>submit</button>
            </form>
        </div>
    )
}

export default Register