import { AppBar, CssBaseline, Grid, Toolbar, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

const Header = () =>{
    return(
        <>
    
    
     <CssBaseline />
        <AppBar position='relative'>
            <Toolbar>
                <Grid container spacing={3}>
                    <Grid item>
                        <Typography variant="h6" gutterBottom>Simple Blog</Typography>
                    </Grid>
                    <Grid item>
                        <Link to={'/'}> 
                            <Button variant="outlined" color="secondary" >
                                   <HomeRoundedIcon />
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item >
                        <Link to={'/login'}> 
                            <Button variant="contained" color="secondary" >
                                   Login
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to={'/register'}> 
                            <Button variant="outlined" color="secondary" >
                                   Register
                            </Button>
                        </Link>
                    </Grid>

                </Grid>
                
            </Toolbar>

        </AppBar>
    </>
    )
    
}


export default Header