import React from "react"
//Importamos el useSelector del react-redux
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Grid, Paper, Box, TextField, TableContainer, TableCell, Table, TableHead, TableRow, TableBody, Tooltip } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import './home.css'
import Topbar from "./Topbar"

function Home() {

    const navigate = useNavigate()
    //const userData = useSelector(state => state.login)
    const userData = useSelector(state => state.login)
    //Trozo de código donde vamos a usar el useEffect(): siempre los hooks van al principio del componente
    const isLoggedin = userData.isAutenticated
    useEffect(() => {
        handleGetItem()
        console.log("estoy aqui")
        console.log(userData)
        // eslint-disable-next-line
    }, [isLoggedin, navigate])
    //Almacenamos en la variable userData el estado del store

    const [item, setItem] = useState({nombre: '', marca:'', tipo:'', precio:''})
    const [tableData, setTableData] = useState([])

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
                    setItem({...item, nombre:'', marca:'', tipo:'', precio:''})
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
        <Topbar/>
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
                        <Tooltip title='Añadir' arrow placement='right-end'>
                            <Button type='submit' variant='contained' className="addButton">Añadir</Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
        </Paper>

        <TableContainer>
            <Table aria-label=''>
                <TableHead>
                    <TableRow>
                        {userData.userRol === 'admin' &&
                            <TableCell>Eliminar</TableCell>
                        }
                        <TableCell>Nombre</TableCell>
                        <TableCell>Marca</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Precio</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                    <TableRow key={row.id}>
                        {userData.userRol === 'admin' &&
                            <TableCell>
                            <Tooltip title='Eliminar' arrow placement='right-end'>
                                <Button onClick={() => handleDeleteItem(row.id)}>
                                    <DeleteForeverIcon />
                                </Button>
                            </Tooltip>
                            </TableCell>
                        }
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