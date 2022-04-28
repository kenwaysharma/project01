
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux'
import { putposts } from '../redux/postReducer';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CreatePost from './CreatePost';

const axios = require('axios').default;
const {useState, useEffect} = require('react')
const {Link} = require('react-router-dom')
const {Button, AppBar, Toolbar} = require("@mui/material")

const Home = (props)=>{
const [state, setState] = useState([]);
const allPosts = useSelector(state=>state.posts);
const dispatch = useDispatch();

useEffect(()=>{
    axios.get('http://localhost:5000/post/')
    .then((res)=>{
        console.log(res.data)
        dispatch(putposts(res.data))
        setState(res.data)
    })
},[])

 const posts = (allPosts[0]?
  allPosts[0].map(x=>{
      const {title, body, by} = x;
        return(
            <div key={x._id}>
                <Post title={title} body={body} by={by.username} comment={x.comments?x.comments.length:''}/>
            </div>
        )
}):"Laoding")

    return(
        <>
        <main>
            <div>
                <Container maxWidth="sm" >
                  <Typography variant='h2' align='center' color='textprimary'> All Posts</Typography>
                 <div>
                     <Grid container spacing={2} direction="row"alignItems="center" justifyContent="center">
                         <Grid item>
                             <Link to={'/createpost'}>
                             <Button variant="contained" color="primary">
                               Create New Post
                             </Button>
                             </Link>
                         </Grid>
                         <Grid item>
                             
                         </Grid>
                       
                     </Grid>
                 </div>
                </Container>
            </div>
            <Container maxWidth="md" >
                <Grid container direction="row" alignItems="center" justifyContent="center">
                    {posts}
                </Grid>
              
            </Container>
        
        </main>
        </>
    )

}


export default Home;