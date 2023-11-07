import React from "react"
//Importamos el useSelector del react-redux
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Typography } from "@mui/material"
import { loginActions } from "../store/storelogin"

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

    const handleClick = (e) =>  {
        dispatch(loginActions.logout)
        navigate('/')
    }

    return <>
        <Typography variant='h1' component='h1'>Página de Home de Ernesto Gabriel Suárez Barrera</Typography>
        <Typography variant='h2' component='h2'>Usuario: {userData.userName} Rol: {userData.userRol}</Typography>
        <Button color='secondary' variant='contained' onClick={handleClick}>Salir</Button>
    </>
}

export default Home;