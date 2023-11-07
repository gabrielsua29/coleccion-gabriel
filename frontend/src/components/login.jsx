import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { Avatar, Box, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import LockPersonRoundedIcon from '@mui/icons-material/LockPersonRounded';
import { useNavigate } from 'react-router-dom';
//Importamos el useDispatch del react-redux
import { useDispatch} from 'react-redux'
//Importamos el componente loginActions que está en el fichero storelogin.js
import { loginActions } from '../store/storelogin';
import './login.css';

function Login () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login, setLogin] = useState({user: '' , password: ''}) //login ahora vale lo que vale useState, y se puede cambiar con la funcion setLogin

    const isVerifiedUser = () => {
        fetch(`http://localhost:3030/login?user=${login.user}&password=${login.password}`)
        .then(Response => Response.json())
        .then(Response => {
            if (Response) {
                if (Response.data.nombre !== undefined) {
                    console.log('entro')
                    dispatch(loginActions.login({
                        name: Response.data.nombre,
                        rol: Response.data.rol
                    }))    
                    navigate('/home')
                }
            }
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault(); // Para que no mande el formulario por defecto
        if (login.user.length === 0 || login.password.length === 0) {
            console.log("Campos incompletos")
        } else {
            isVerifiedUser();
            //console.log(login.user, login.password)
        }
    }
    
    return <>
        <Container>
            <Grid container spacing={5} component='main' className='login_container'>
                <Grid item xs={12} sm={6} className='login_container-grid'>
                    <Paper elevation={5} className='login_container-paper'>
                        <Box component='form' onSubmit={handleSubmit} className='form'>
                            <Avatar sx={{bgcolor: 'rgba(201,43,43,0.66)' }} className='icon'> {/* El color no admite los colores de paleta */}
                                <LockPersonRoundedIcon />
                            </Avatar>
                            <Typography variant='h2, h3' component='h2' className='login_title'>
                                Iniciar Sesión
                            </Typography>
                            <TextField id='login'autoFocus label='Usuario' value={login.user}
                                onChange={(Event) => {setLogin({...login, user: Event.target.value})}} className='username_text'>
                            </TextField>
                            <br/><br/>
                            <TextField id='password' label='Password' type='password' value={login.password}
                                onChange={(Event) => {setLogin({...login, password: Event.target.value})}} className='password_text'>
                            </TextField>
                            <br/><br/>
                            <Button type='submit' color='secondary' variant='contained' className='login_button'>Iniciar Sesión</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>    
    </>    
}

export default Login
// Ernesto Gabriel Suárez Barrera
/**
 * <Container>
            <Typography variant='h1, h2, h3' component='h1' color='primary'>Tipografia h1</Typography> 
            <Typography variant='h1, h2, h3' component='h2'>Tipografia h2</Typography>
            <Typography variant='h1, h2, h3' component='h3' color='secondary'>Tipografia h3</Typography>
            <Button color='primary' variant='contained'>Primario</Button>
            <Button color='secondary' variant='outlined'>Secundario</Button>
            <Button color='primary' variant='text'>Variant text</Button>
            <Button color='secondary' variant='contained'
                    onClick={() => {
                        alert("Has pulsado un botón");
                    }}
            >Botón con evento</Button>        
        </Container>
 */

/*
        <Box component='form' onSubmit={handleSubmit}>
            <TextField id='login' label='Usuario' variant='outlined' fullWidth autoFocus value= {login} 
                        onChange={(Event) => setLogin(Event.target.value)}>
            </TextField>
            <Button color='secondary' variant='contained' fullWidth type='submit'>Acceder</Button>
        </Box> 
*/   

/*
    const isVerifiedUser = () => {
        fetch(`http://localhost:3030/login?user=${login}&password=${'123456789'}`)
        .then(Response => Response.json)
        .then(Response => {
            if (Response) {
                console.log(Response)
            }
        })
    }
    const [login, setLogin] = useState('') //login ahora vale lo que vale useState, y se puede cambiar con la funcion setLogin
    const handleSubmit = (e) => {
        e.preventDefault(); // Para que no mande el formulario por defecto
        isVerifiedUser();
        console.log(login)
    }
*/

/*
container: fila item: columna
<Grid container spacing={5}> 
<Grid item xs={12} sm={6}> 
<p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam illum nam deserunt labore.
    Alias in veritatis fugit sequi dicta quaerat earum ea minus,
    quae qui ab at, similique vero cupiditate.
</p>
</Grid>
<Grid item xs={12} sm={6}> 
<p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam illum nam deserunt labore.
    Alias in veritatis fugit sequi dicta quaerat earum ea minus,
    quae qui ab at, similique vero cupiditate.
</p>
</Grid>
</Grid>
*/