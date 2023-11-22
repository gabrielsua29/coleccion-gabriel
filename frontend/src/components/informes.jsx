import React, { useState } from "react"
import Topbar from "./Topbar"
import { Button, Paper } from "@mui/material";
import InformeColeccion from "./InformeColeccion";

function Informes() {

    var isPressed = false
    const [item, setItem] = useState({nombre:'', marca:'', tipo:'', precio:''})

    function handleButton() {
        isPressed = true
        fetch(`http://localhost:3030/getItems?`)
        .then(Response => Response.json())
        .then(Response => {
            if (Response) {
                console.log(Response)
                if (Response !== 0) {
                    setItem({...item, nombre:'', marca:'', tipo:'', precio:''})
                } else {
                    console.log("Error al hacer el select")
                }
            }
        })
    }
    
    return<>
        <Topbar/>
        <Paper elevation={3}>
            <Button variant='contained' onClick={handleButton}>COLECCIÓN INFORMES</Button>
        </Paper>
        {isPressed=== true &&
            <InformeColeccion item = {item}/>
        }
        
    </>
}

export default Informes;