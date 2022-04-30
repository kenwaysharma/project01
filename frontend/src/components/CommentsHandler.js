import { Card, CardContent, Typography, Badge, Button, CardActions } from "@mui/material"
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useEffect, useState } from "react";


const CommentsHandler = (props)=>{
  
  const [allComments,setAllComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    
    setAllComments(props.comments)
  },[])


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
}):<Typography variant="body1" fontSize={15} color="text.secondary">
There no comments currently
</Typography>; 


    return(
      //Add new comment button

        <div>
          
        <Card align='left' sx={{ maxWidth: 800, marginTop: 5 , backgroundColor: '#dbefff'}} >
                <CardActions sx={{borderBottom: 5, borderColor: 'white'}}>
                <Button size="small" ><AddCommentOutlinedIcon /> Add new comment</Button>    
                </CardActions>
          
        
        
               {comments}
            </Card>
            </div>
            
    )
}

export default CommentsHandler