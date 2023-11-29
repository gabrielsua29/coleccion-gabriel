import React from "react"
import MaterialTable from "@material-table/core"
//Nos permite exportar a CSV y PDF
import { ExportCsv, ExportPdf } from "@material-table/exporters";

function InformeUsuarios(props) {

    console.log(props.data)
    const cols = [
        {title: "Nombre", field:"nombre", filtering: true},
        {title: "Login", field:"login", filtering: false},
        {title: "Password", field:"password", filtering: false},
        {title: "Rol", field:"rol", filtering: false}
    ]
    const tableData = props.data

    return <>
        <MaterialTable 
        columns={cols} 
        data={tableData}
        title="Usuarios"
        options={{
            exportMenu: [
            {
                label: "Exportar a PDF",
                exportFunc: (cols, datas) => ExportPdf(cols, datas, "Usuarios_PDF"),
            },
            {
                label: "Exportar a CSV",
                exportFunc: (cols, datas) => ExportCsv(cols, datas, "Usuarios_CSV"),
            },
        ],
        headerStyle: {
            backgroundColor: "rgba(201,43,43,0.66)"
        },
        columnsButton: true,
        filtering: true
        }}
        />
    </>
}

export default InformeUsuarios