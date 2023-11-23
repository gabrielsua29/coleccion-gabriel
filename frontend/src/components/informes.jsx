import React, { useState } from "react"
import Topbar from "./Topbar"
import { Button, Paper } from "@mui/material";
import InformeColeccion from "./InformeColeccion";

function Informes() {

    const [isPressed, setIsPressed] = useState(false)
    const [item, setItem] = useState([])

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
    
    return<>
        <Topbar/>
        <Paper elevation={3}>
            <Button variant='contained' onClick={handleButton}>COLECCIÓN INFORMES</Button>
        </Paper>
        {isPressed=== true &&
            <InformeColeccion data={item}/>
        }
        
    </>
}

export default Informes;