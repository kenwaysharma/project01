
import React ,{useState, useContext, useReducer}from 'react';
import {useHistory,Redirect, Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userReducer';
import Cookies from 'js-cookie'
const Login = () =>{
    const navigate = useNavigate();
    const [log,setLog] = useState({msg:''})
    const user = useSelector(state=>state.user);
    
    
    const dispatch = useDispatch();
    
    const handleChange=(e)=>{
        const {name,value}=e.target
        setLog({ ...log, [name]: value });
        
            
    } 
    
    
  
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/users/login', {
              
            email:log.email,
            password:log.password,
            
          },{withCredentials:true},{
            headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000/',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      }
        }).then(res=>{
            if(res.data.username){
                
                dispatch(setUser(res.data))
                Cookies.set('username',res.data.username, {expires:5})
                Cookies.set('userID',res.data.user_id, {expires:5})
                navigate('/')
                setLog({msg: "You are now Logged In!"})
            }else{
                setLog({msg: res.data.msg})
            }
        })
        .catch(e=>{console.log(e)})
    }

    return(
        <div>
            {log.msg?log.msg:''}
            <h1>This is the Login page welcome sir!</h1>
            <div>
            
            <form onSubmit={handleSubmit}>
            
            <label name='email' >Email:</label>
            <input name='email' onChange={handleChange}></input>

            <label name='password' >password:</label>
            <input name='password' onChange={handleChange} ></input>

            <button>submit</button>
            </form>
        </div>
        </div>
    )
}

export default Login