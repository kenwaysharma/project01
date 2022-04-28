import { Grid, Typography } from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { CardActionArea } from '@mui/material';

const Post = (props)=>{
    return(
      <Grid item xs={12} >
        <Card sx={{ maxWidth: 345,
        minWidth:300,
        margin:3 }} >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.body}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ~{props.by}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Comments: {props.comment}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Grid>
    )
}

export default Post