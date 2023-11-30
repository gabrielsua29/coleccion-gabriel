import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Button, Typography, AppBar, Container, Toolbar, Grid, Tooltip} from "@mui/material"
import { loginActions } from "../store/storelogin"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

function Topbar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(state => state.login)
    const isLoggedin = userData.isAutenticated
    useEffect(() => {
        console.log(isLoggedin)
        if (!isLoggedin) {
            navigate('/')
        }
    }, [isLoggedin, navigate])

    const handleLogout = () => {
        dispatch(loginActions.logout)
        navigate('/')
    }

    return <>
         <AppBar position='relative' className="appBarMenu">
            <Container>
                <Toolbar>
                    <Grid container className="menuContainer">
                        <Grid item xs={8} md={5} lg={2} className="iconGrid">
                            {userData.userRol ==='user'&&
                                <AccountCircleIcon fontSize="large" />
                            }
                            {userData.userRol === 'admin'&&
                                <SupervisorAccountIcon fontSize="large" />
                            }
                            {userData.userRol === 'invitado'&&
                                <AccessibilityNewIcon fontSize="large" />
                            }
                            <Typography variant='h6' component='h6' className='username'>{userData.userName}</Typography>
                        </Grid>
                        <Grid item xs={8} md={5} lg={2}>
                            <Link to='/home'>
                                <Typography variant='h6' component='h6' className='username'>Inicio</Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={8} md={5} lg={2}>
                        {userData.userRol==='admin'&&
                            <Link to='/informes'>
                                <Typography variant='h6' component='h6' className='username'>Informes</Typography>
                            </Link>
                        }
                        </Grid>
                        <Grid item xs={8} md={5} lg={2}>
                            <Link to={'/Suárez_Barrera_ErnestoGabriel_EXUT4_Manual.pdf'} target="_blank">
                                <Typography variant='h6' component='h6' className='username'>Ayuda</Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={8} md={5} lg={2}>
                        {userData.userRol==='admin'&&
                            <Link to='/examen'>
                                <Typography variant='h6' component='h6' className='username'>Usuarios</Typography>
                            </Link>
                        }
                        </Grid>
                        <Grid item xs={8} md={5} lg={2}>
                            <Tooltip title='Salir' arrow>
                                <Button variant='contained' onClick = {handleLogout}>Salir</Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    </>   
}

export default Topbar;    