import Post from './Post';
import { useSelector, useDispatch } from 'react-redux'
import { putposts } from '../redux/postReducer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress';
const axios = require('axios').default;
const {useState, useEffect} = require('react')
const {Link} = require('react-router-dom')
const {Button} = require("@mui/material")
const Home = (props)=>{
const [loading, setLoading] = useState(true);
const allPosts = useSelector(state=>state.posts);
const dispatch = useDispatch();
useEffect(()=>{
    axios.get('http://localhost:5000/post/')
    .then((res)=>{
        dispatch(putposts(res.data))
        //setState(res.data)
        setLoading(false)
    })
},[])     
 const posts = 
  allPosts.map(x=>{
      const {title, body, by} = x;
        return(
            <div key={x._id}>
                <Post title={title} body={body} by={by.username} comment={x.comments?x.comments.length:''} id={x._id}/>
            </div>
        )
})
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
                    {!loading?posts:(<Box margin={4} sx={{ display: 'flex' }}><CircularProgress /></Box>)}
                </Grid>
            </Container>
        </main>
        </>
    )
}
export default Home;