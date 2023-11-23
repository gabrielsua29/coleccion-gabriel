import React from "react"
import MaterialTable from "@material-table/core"

function InformeColeccion(props) {

    console.log(props.data)
    const cols = [
        {title: "Nombre", field:"nombre"},
        {title: "Marca", field:"marca"},
        {title: "Tipo", field:"tipo"},
        {title: "Precio", field:"precio"}
    ]
    const tableData = props.data

    return <>
        <MaterialTable columns={cols} data={tableData}/>
    </>
}

export default InformeColeccion