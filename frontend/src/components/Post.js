import { Grid, Typography, CardActions,Badge, Button } from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { Link } from "react-router-dom";
const Post = (props)=>{
    return(
      <Grid item xs={12} >
         <Card sx={{ maxWidth: 345 ,
        margin:3,
        minWidth:275}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {props.body}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          by {props.by}
        </Typography>
      </CardContent>
      <CardActions>
        {props.comment?<Badge badgeContent={props.comment} color="primary"><ModeCommentOutlinedIcon /></Badge>:''}
        <Link to={`/post/${props.id}`}><Button size="small" align='right' >Read</Button></Link>
      </CardActions>
    </Card>
      </Grid>
    )
}
export default Post