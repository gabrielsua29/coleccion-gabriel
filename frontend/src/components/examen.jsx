import React from "react";
import { Button, Grid, Paper, Box, TextField, TableContainer, TableCell, Table, TableHead, TableRow, TableBody } from "@mui/material"
import { useState, useEffect } from "react";
import Topbar from "./Topbar";

function Examen() {

    const [firstSelect, setFirstSelect] = useState(false)
    useEffect(() => {
        if (!firstSelect) {
            handleGetItem()
            setFirstSelect(true)
        }
    })

    const [user, setUser] = useState({nombre: '', login:'', password:'', rol:''}) //SUSTITUIR POR VALORES DEL EXAMEN
    const [tableData, setTableData] = useState([])

    function handleSaveItem(e) { //Funcion para comprobar que estén todos los campos
        e.preventDefault(); // Para que no mande el formulario por defecto
        if (user.nombre.length === 0 || user.login.length === 0 || user.password.length === 0 || user.rol.length === 0) {
            console.log("Campos incompletos")
        } else {
            handleSubmit()
        }
    }

    function handleSubmit(e) { //Funcion para hacer el insert
        fetch(`http://localhost:3030/insertExamen?nombre=${user.nombre}&login=${user.login}&password=${user.password}&rol=${user.rol}`)
        .then(Response => Response.json())
        .then(Response => {
            if (Response) {
                if (Response > 0) {
                    alert('Datos guardados con éxito.')
                    setUser({...user, nombre:'', login:'', password:'', rol:''})
                    handleGetItem()
                }
            }
        })
     }

     function handleGetItem(e) {
        fetch(`http://localhost:3030/getExamen?`)
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


    return <>
    <Topbar />
    <Paper elevation={3}>
            <Box component='form' autoComplete='off' onSubmit={handleSaveItem} >
                <Grid container className="textFieldsContainer">
                    <Grid item xs={6} md={3}>
                        <br/>
                        <TextField
                            label='Nombre'
                            required
                            value={user.nombre}
                            /*Cuando el usuario escriba algo en el TextField nombre, se irá almacenando en el 
                            atributo nombre del objeto item*/
                            onChange={(Event) => setUser({...user, nombre: Event.target.value })}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <br/>
                        <TextField
                            label='Login'
                            required
                            value={user.login}
                            onChange={(Event) => setUser({...user, login: Event.target.value })}
                        >
                        </TextField>   
                    </Grid>    
                    <Grid item xs={6} md={3}>
                        <br/>
                        <TextField
                            label='Password'
                            required
                            value={user.password}
                            onChange={(Event) => setUser({...user, password: Event.target.value })}
                        >
                        </TextField>    
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <br/>
                        <TextField
                            label='Rol'
                            required
                            value={user.rol}
                            onChange={(Event) => setUser({...user, rol: Event.target.value })}
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
                        <TableCell>Nombre</TableCell>
                        <TableCell>Login</TableCell>
                        <TableCell>Password</TableCell>
                        <TableCell>Rol</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.nombre}</TableCell>
                        <TableCell>{row.login}</TableCell>
                        <TableCell>{row.password}</TableCell>
                        <TableCell>{row.rol}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}

export default Examen