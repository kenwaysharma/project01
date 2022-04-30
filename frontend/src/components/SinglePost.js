import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Container from '@mui/material/Container'
import { CardActions, CardContent, Button, Card, Badge} from "@mui/material";
import CommentsHandler from "./CommentsHandler";
const SinglePost = ()=>{
const {id} = useParams();
const [post, setPost] = useState({});
const [display, setDisplay] = useState(false);
const toggle =()=>{
    setDisplay(!display)
}
useEffect(()=>{
    axios.get(`http://localhost:5000/post/single/${id}`).then(res=>{
        //console.log(res.data)
        setPost(res.data)
    })
},[]);
    return(
        <Container maxWidth="lg" align='center' >
          <Grid container spacing={0} direction='column'>
              <Grid item>
              <Card align='left' sx={{ maxWidth: 800, marginTop: 5 , backgroundColor: '#dbefff'}} >
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body1" fontSize={20} color="text.secondary">
                    {post.body}
                  </Typography>
                </CardContent>
                <CardActions>
                <Button size="small" onClick={toggle}><Badge badgeContent={post.comments?post.comments.length:0} color="primary"><ModeCommentOutlinedIcon /></Badge></Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
                </Card>
              </Grid>
                {
                    display?
                         (
                            <Grid item>
                                <CommentsHandler comments = {post.comments} post_id={post._id}/>
                            </Grid>
                    )
                    :''
                }
          </Grid>
        </Container>
    )
}
export default SinglePost