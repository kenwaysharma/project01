import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Grid,Typography, Button, TextField,Container  } from '@mui/material';
const Register = () =>{
    const navigate = useNavigate();
const [log,setLog] = useState({username:'',email:'', password:'',passwordConfirm:''})
const [errors, setErrors] = useState('')
const handleChange=(e)=>{
    const {name,value}=e.target
    setLog({ ...log, [name]: value });
} 
const handleSubmit = (e)=>{
    e.preventDefault();
    if(log.username<6){
        setErrors("Username requires minimum 6 characters")
    }else if(log.email<3){
        setErrors("Enter valid email")
    }else if(log.password<6){
        setErrors('Password requires minimum 6 characters')
    }else{
        axios.post('http://localhost:5000/users/register', {
            email:log.email,
            username: log.username,
            password:log.password,
            passwordConfirm:log.passwordConfirm
          },{withCredentials:true},{
            headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000/',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      }
        }).then(res=>{
            console.log(res)
            if(res.data==="Registered"){
                navigate('/login')
            }else{
                setErrors(res.data)
            }
        })
        .catch(e=>{console.log(e)})
    }
}
return(
    <div>
        <Container maxWidth="lg" >
            <Grid container direction="column" justifyContent="center" alignItems="center" alignContent="center" wrap="wrap">
                <Typography variant="body1" color="red" marginTop={5}>{errors}</Typography>
              <Typography variant="h2" color="initial" marginTop={5}>Register</Typography>
              <Grid item marginTop={5}>
              <TextField id="outlined-basic" label="username" name='username' variant="outlined" onChange={handleChange}/>
              </Grid>
              <Grid item marginTop={2}>
              <TextField id="outlined-basic" label="email" name='email' variant="outlined" type="email" onChange={handleChange}/>
              </Grid>
              <Grid item marginTop={2}>
              <TextField id="outlined-password-input" label="Password" name='password' type="password" onChange={handleChange} autoComplete="current-password"/>
              </Grid>
              <Grid item marginTop={2}>
              <TextField id="outlined-password-input" label="Password" name='passwordConfirm' type="password" onChange={handleChange} autoComplete="current-password"/>
              </Grid>
                <Button variant="text" color="primary" onClick={handleSubmit}>
                        Submit
                 </Button>
            </Grid>
        </Container>
    </div>
)
}
export default Register