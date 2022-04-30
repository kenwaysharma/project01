import { useState } from "react"
import { useNavigate } from "react-router-dom";
import {TextField, TextareaAutosize, Paper, FormControlLabel, Radio, Container, Typography, Button} from '@mui/material'
import Grid from '@mui/material/Grid'
import { Box, grid } from "@mui/system"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addone } from "../redux/postReducer";
const CreatePost =()=>{
const [post,setPost] = useState({
    title:'',
    body:''
})
const [errors,setErorrs] = useState('')
const navigate = useNavigate();
//Check if logged in
const user = useSelector(state=>state.user);
const allPosts = useSelector(state=>state.posts)
const dispatch = useDispatch()

    const handleSubmit=(e)=>{
        e.preventDefault()

       
        if(user.isLogged){
            if(post.title.length<6){
                setErorrs("Title should be minimum 6 characters")
            }else if(post.body.length<20){
                setErorrs("Body should be minimum 20 characters")
            }else{
                axios.post('http://localhost:5000/post/create', {
              
                    title: post.title,
                    body: post.body,
                    by: user.userID
                    
                  },{withCredentials:true},{
                    headers: { 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': 'http://localhost:3000/',
                            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
                            }
                }).then( post=>{
                        if(post.data.title){       
                            dispatch(addone(post.data))               
                            navigate('/')
                        }
                        
                })
            }
            
        }else{
            //Push Errors
            setErorrs("You must be logged in before creating a new post")

            console.log(errors)
        }

    }
    const handleChange=(e)=>{
        const {name,value}=e.target
        setPost({ ...post, [name]: value });
        
            
    } 
    return(
            
            <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center" alignContent="center" wrap="wrap" >  
            <Typography variant="h5" color="red" marginTop={5}>{errors}</Typography>              
                <Grid item>
                    <Typography variant="h4" color="primary">Create Post</Typography>
                </Grid>
                <Grid item>

                <TextField name="title" id="standard-basic" label="Title" variant="standard" onChange={handleChange} />
                </Grid>
              <Grid item>
              <TextField name="body" id="standard-multiline-static" label="Body" multiline rows={9} variant="standard" onChange={handleChange}/>

              </Grid>
              <Button variant="text" color="primary" onClick={handleSubmit}>
                Post
              </Button>
              
                
            </Grid>
 
        
    )
}

export default CreatePost