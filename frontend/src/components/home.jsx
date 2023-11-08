import React from "react"
//Importamos el useSelector del react-redux
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Button, Typography, AppBar, Container, Toolbar, Grid, Paper, Box, TextField } from "@mui/material"
import { loginActions } from "../store/storelogin"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './home.css'

function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //const userData = useSelector(state => state.login)
    const userData = useSelector(state => state.login)
    //Trozo de código donde vamos a usar el useEffect(): siempre los hooks van al principio del componente
    const isLoggedin = userData.isAutenticated
    useEffect(() => {
        if (!isLoggedin) {
            navigate('/')
        }
    }, [isLoggedin, navigate])
    //Almacenamos en la variable userData el estado del store
    
    //Comprobamos por la consola qué obtenemos en userData
    console.log(userData)

    const [item, setItem] = useState({nombre: '', marca:'', tipo:'', precio:''})

    function handleLogout(e) {
        dispatch(loginActions.logout)
        navigate('/')
    }

    function handleSaveItem(e) {
        e.preventDefault(); // Para que no mande el formulario por defecto
        if (item.nombre.length === 0 || item.marca.length === 0 || item.tipo.length === 0 || item.precio.length === 0) {
            console.log("Campos incompletos")
        } else {
            handleSubmit()
        }
    
    }
     function handleSubmit(e) {
        fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`)
        .then(Response => Response.json())
        .then(Response => {
            if (Response) {
                if (Response > 0) {
                    alert('Datos guardados con éxito.')
                }
            }
        })
     }

    return <>
        <AppBar position='static'>
            <Container>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={12} md={6} lg={3}>
                            <AccountCircleIcon />
                                <Typography className="username">{userData.userName}</Typography>
                        </Grid>
                        <Grid item xs={8} md={6} lg={3}>
                        <Link to='/home'>Inicio</Link>
                        </Grid>
                        <Grid item xs={8} md={6} lg={3}>
                            <Link to='/informes'>Informes</Link>
                        </Grid>
                        <Grid item xs={8} md={6} lg={3}>
                            <Link to='/ayuda'>Ayuda</Link>
                        </Grid>
                        <Grid item xs={8} md={6} lg={3}>
                            <Button variant='text' onClick = {handleLogout}>Salir</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>

        <Paper elevation={5}>
            <Box component='form' autoComplete='off' onSubmit={handleSaveItem} >
                <Grid container>
                    <Grid item xs={8} md={3}>
                        <TextField
                            label='Nombre'
                            required
                            value={item.nombre}
                            /*Cuando el usuario escriba algo en el TextField nombre, se irá almacenando en el 
                            atributo nombre del objeto item*/
                            onChange={(Event) => setItem({...item, nombre: Event.target.value })}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={8} md={3}>
                        <TextField
                            label='Marca'
                            required
                            value={item.marca}
                            onChange={(Event) => setItem({...item, marca: Event.target.value })}
                        >
                        </TextField>   
                    </Grid>    
                    <Grid item xs={8} md={3}>
                        <TextField
                            label='Tipo'
                            required
                            value={item.tipo}
                            onChange={(Event) => setItem({...item, tipo: Event.target.value })}
                        >
                        </TextField>    
                    </Grid>
                    <Grid item xs={8} md={3}>
                        <TextField
                            label='Precio'
                            required
                            value={item.precio}
                            onChange={(Event) => setItem({...item, precio: Event.target.value })}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={8} md={3}>
                        <Button type='submit' variant='contained'>Añadir</Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    </>
}

export default Home;