
import React ,{useState, useContext, useReducer}from 'react';
import {useHistory,Redirect, Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userReducer';
import Cookies from 'js-cookie'
import Typography from '@mui/material/Typography'
import { Card, Grid, Container, TextField,Button } from '@mui/material';
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
            
            
            
            <Container maxWidth="lg" >
            
                <Grid container direction="column" justifyContent="center" alignItems="center" alignContent="center" wrap="wrap">
                    <Typography variant="body1" color="red" marginTop={5}>{log.msg?log.msg:''}</Typography>
                  <Typography variant="h2" color="initial" marginTop={5}>Login</Typography>
                  <Grid item marginTop={5}>
                  <TextField id="outlined-basic" label="email" name='email' variant="outlined" onChange={handleChange}/>
                  </Grid>
                  <Grid item marginTop={2}>
                  <TextField id="outlined-password-input" label="Password" name='password' type="password" onChange={handleChange} autoComplete="current-password"/>

                  </Grid>
                    <Button variant="text" color="primary" onClick={handleSubmit}>
                            Submit
                     </Button>
                </Grid>
              
            </Container>
        </div>
    )
}

export default Login