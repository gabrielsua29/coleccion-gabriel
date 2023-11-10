import React from "react"
//Importamos el useSelector del react-redux
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Button, Typography, AppBar, Container, Toolbar, Grid, Paper, Box, TextField, TableContainer, TableCell, Table, TableHead, TableRow, TableBody } from "@mui/material"
import { loginActions } from "../store/storelogin"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
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
        handleGetItem()
    }, [isLoggedin, navigate])
    //Almacenamos en la variable userData el estado del store
    
    //Comprobamos por la consola qué obtenemos en userData
    console.log(userData)

    const [item, setItem] = useState({nombre: '', marca:'', tipo:'', precio:''})
    const [tableData, setTableData] = useState([])

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
                    handleGetItem()
                }
            }
        })
     }

     function handleGetItem(e) {
        fetch(`http://localhost:3030/getItems?`)
        .then(Response => Response.json())
        .then(Response => {
            if (Response) {
                console.log(Response)
                if (Response !== 0) {
                    setTableData(Response.data)
                } else {
                    console.log("Error al hacer el select")
                }
            }
        })
     }

     function handleDeleteItem(id) {
        fetch(`http://localhost:3030/deleteItem?id=${id}`)
        .then(Response => Response.json())
        .then(Response => {
            if (Response) {
                if (Response > 0) {
                    alert('Datos eliminados con éxito.')
                    handleGetItem()
                }
            }
        })
     }

    return <>
        <AppBar position='relative' className="appBarMenu">
            <Container>
                <Toolbar>
                    <Grid container className="menuContainer">
                        <Grid item xs={8} md={5} lg={2} className="iconGrid">
                            <AccountCircleIcon fontSize="large" />
                            <Typography variant='h6' component='h6' className='username'>{userData.userName}</Typography>
                        </Grid>
                        <Grid item xs={8} md={5} lg={2}>
                            <Link to='/home'>
                                <Typography variant='h6' component='h6' className='username'>Inicio</Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={8} md={5} lg={2}>
                            <Link to='/informes'>
                            <Typography variant='h6' component='h6' className='username'>Informes</Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={8} md={5} lg={2}>
                            <Link to='/ayuda'>
                            <Typography variant='h6' component='h6' className='username'>Ayuda</Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={8} md={5} lg={2}>
                            <Button variant='contained' onClick = {handleLogout}>Salir</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>

        <Paper elevation={3}>
            <Box component='form' autoComplete='off' onSubmit={handleSaveItem} >
                <Grid container className="textFieldsContainer">
                    <Grid item xs={6} md={3}>
                        <br/>
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
                    <Grid item xs={6} md={3}>
                        <br/>
                        <TextField
                            label='Marca'
                            required
                            value={item.marca}
                            onChange={(Event) => setItem({...item, marca: Event.target.value })}
                        >
                        </TextField>   
                    </Grid>    
                    <Grid item xs={6} md={3}>
                        <br/>
                        <TextField
                            label='Tipo'
                            required
                            value={item.tipo}
                            onChange={(Event) => setItem({...item, tipo: Event.target.value })}
                        >
                        </TextField>    
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <br/>
                        <TextField
                            label='Precio'
                            required
                            value={item.precio}
                            onChange={(Event) => setItem({...item, precio: Event.target.value })}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={1} md={10.5} lg={10}>
                        <br/>
                        <Button type='submit' variant='contained' className="addButton">Añadir</Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>

        <TableContainer>
            <Table aria-label=''>
                <TableHead>
                    <TableRow>
                        <TableCell>Eliminar</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Marca</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Precio</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>
                            <Button onClick={() => handleDeleteItem(row.id)}>
                                <DeleteForeverIcon />
                            </Button>
                        </TableCell>
                        <TableCell>{row.nombre}</TableCell>
                        <TableCell>{row.marca}</TableCell>
                        <TableCell>{row.tipo}</TableCell>
                        <TableCell>{row.precio}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}

export default Home;