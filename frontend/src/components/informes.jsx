import React, { useState } from "react"
import Topbar from "./Topbar"
import { Button, Paper, Tooltip } from "@mui/material";
import InformeColeccion from "./InformeColeccion";
import InformeUsuarios from "./InformeUsuarios";

function Informes() {

    const [isPressed, setIsPressed] = useState(false)
    const [userBtisPressed, setUserBtIsPressed] = useState(false)
    const [item, setItem] = useState([])
    const [user, setUser] = useState([])

    function handleButton() {
        setIsPressed(true)
        fetch(`http://localhost:3030/getItems?`)
        .then(Response => Response.json())
        .then(Response => {
            if (Response) {
                console.log(Response.data)
                if (Response !== 0) {
                    setItem(Response.data)
                } else {
                    console.log("Error al hacer el select")
                }
            }
        })
    }

    function handleButtonUsuarios() {
        setUserBtIsPressed(true)
        fetch(`http://localhost:3030/getExamen?`)
        .then(Response => Response.json())
        .then(Response => {
            if (Response) {
                if (Response !== 0) {
                    setUser(Response.data)
                } else {
                    console.error("Error al hace el select")
                }
            }
        })
    }
    
    return<>
        <Topbar/>
        <Paper elevation={3}>
        <Tooltip title='Colección informes' arrow placement='bottom'>
            <Button variant='contained' onClick={handleButton}>COLECCIÓN INFORMES</Button>
        </Tooltip>
        <Tooltip title='Informe usuarios' arrow placement='bottom'>
            <Button variant='contained' onClick={handleButtonUsuarios}>INFORME USUARIOS</Button>
        </Tooltip>
        </Paper>
        {isPressed=== true &&
            <InformeColeccion data={item}/>
        }
        {userBtisPressed === true &&
            <InformeUsuarios data={user}/>
        }
        
    </>
}

export default Informes;