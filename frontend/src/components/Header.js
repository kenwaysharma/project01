import { AppBar, CssBaseline, Grid, Toolbar, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import userReducer, { logOut } from "../redux/userReducer";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
const Header = () =>{
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user)
    let display = '';
    if(user.isLogged){
        display= 'none';
    }

//Logout handler
const logout = ()=>{
Cookies.remove('username');
Cookies.remove('userID');
Cookies.remove('connect.sid');
dispatch(logOut())
}

    return(
        <>
     <CssBaseline />
        <AppBar position='relative'>
            <Toolbar>
                <Grid container spacing={3}>
                    <Grid item>
                        <Typography variant="h5" gutterBottom>STABLX</Typography>
                    </Grid>
                    <Grid item >
                        <Link to={'/'} > 
                            <Button variant="outlined" color="secondary" >
                                   <HomeRoundedIcon />
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item display={display}>
                        <Link to={'/login'}> 
                            <Button variant="contained" color="secondary" >
                                   Login
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item display={display}>
                        <Link to={'/register'}> 
                            <Button variant="outlined" color="secondary" >
                                   Register
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item display={display!='none'?'none':'block'}>
                        
                    <Button variant="contained" color="secondary" onClick={logout}>
                           Logout
                    </Button>
                        
                    </Grid>

                </Grid>
                
            </Toolbar>
        </AppBar>
    </>
    )
    
}


export default Header