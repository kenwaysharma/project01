import { Card, CardContent, Typography, Badge, Button, CardActions, Grid, TextField } from "@mui/material"
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const CommentsHandler = (props)=>{
  
  const [allComments,setAllComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState(false);
  const user = useSelector(state=>state.user);
  const [comment, setComment] = useState({body:''})
  const [msg,setMsg] = useState('')
  
  useEffect(()=>{
    
    setAllComments(props.comments)
  },[])
  const toggle =()=>{
      setDisplay(!display)
  }


  

  const handleChange=(e)=>{
    const {name,value}=e.target
    setComment({ ...comment, [name]: value });
    
        console.log(comment)
  } 

  const handleClick=(e)=>{
        e.preventDefault();
        if(comment.body==''){
            setMsg("Cannot post empty comment")
        }
        else if(user.isLogged){
          
            axios.post(`http://localhost:5000/post/create/comment/${props.post_id}`, {
                body: comment.body,
              },{withCredentials:true},{
                headers: { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000/',
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
                        }
            }).then(data=>{
              console.log("Received",data)
              const json = {body: data.data.body, _id: data.data._id ,by:{username: Cookies.get('username')}} 
              console.log(json)
              setAllComments(allComments=>[...allComments, json])
                setMsg("")
            }).catch(e=>{
                console.log(e)
            })

        }else{
            setMsg("You must be logged")
        }
        

}
console.log(allComments)
  


const comments = allComments.length?allComments.map(comment=>{
  return(
    
      
    <div key={comment._id}>
        
          <CardContent >
                  
                  <Typography variant="h6" fontSize={20} color="text.secondary">
                    {comment.body}
                  </Typography>
                  <Typography variant="body1" fontSize={15} color="text.secondary">
                    @{comment.by.username}
                  </Typography>
                </CardContent>
                <CardActions sx={{borderBottom: 5, borderColor: 'white'}}>
                <Button size="small" >Replies</Button>    
                </CardActions>
        </div>  
            
  )
  }):<Typography variant="body1" margin={3} fontSize={15} color="text.secondary">There are no comments currently</Typography>; 


    return(
        <div>
        <Card align='left' sx={{ maxWidth: 800, marginTop: 5 , backgroundColor: '#dbefff'}} >
                
              <CardContent sx={{borderBottom: 5, borderColor: 'white'}}>
        <Grid container direction="column"  >  
            <Typography variant="h6" color="red" >{msg?msg:''}</Typography>              
                
              <Grid item>
              <TextField id="standard-multiline-flexible" name='body' onChange={handleChange} label="Comment" multiline maxRows={4} fullWidth variant="standard"/>
              </Grid>
              <Button variant="text" color="primary" onClick={handleClick} >
                Post
              </Button>
              
                
            </Grid>          
                  
                </CardContent>
          
        
        
               {comments}
            </Card>
            </div>
            
    )
}

export default CommentsHandler