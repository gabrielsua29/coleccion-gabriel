import React from "react"
import MaterialTable from "@material-table/core"
//Nos permite exportar a CSV y PDF
import { ExportCsv, ExportPdf } from "@material-table/exporters";

function InformeColeccion(props) {

    console.log(props.data)
    const cols = [
        {title: "Nombre", field:"nombre", filtering: false},
        {title: "Marca", field:"marca", filtering: true},
        {title: "Tipo", field:"tipo", filtering: true},
        {title: "Precio", field:"precio", filtering: false}
    ]
    const tableData = props.data

    return <>
        <MaterialTable 
        columns={cols} 
        data={tableData}
        renderSummaryRow={({ column, data }) =>
        column.field === "precio"
          ? {
              value: data.reduce((agg, row) => agg + row.precio, 0)
            }
          : undefined
        }
        title="Colección"
        options={{
            exportMenu: [
            {
                label: "Exportar a PDF",
                exportFunc: (cols, datas) => ExportPdf(cols, datas, "coleccion_PDF"),
            },
            {
                label: "Exportar a CSV",
                exportFunc: (cols, datas) => ExportCsv(cols, datas, "coleccion_CSV"),
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

export default InformeColeccion