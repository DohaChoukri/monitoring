"use client";

import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "../../assets/css/table.css";

import {
  CellStyleModule,
  ClientSideRowModelModule,
  ModuleRegistry,
  ValidationModule,
} from "ag-grid-community";

ModuleRegistry.registerModules([
  CellStyleModule,
  ClientSideRowModelModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]);

import CustomButtonComponent from "./customButtonComponent.jsx";
import MissionResultRenderer from "./missionResultRenderer.jsx";

import rawClients from "@/assets/json/client.json";

/**
 * GridExample
 * Props:
 *  - onGridReady: function(api) called when ag-Grid is ready (receives api)
 */
const GridExample = ({ onGridReady: onGridReadyProp }) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "600px" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  // Normalize possible json shapes:
  // - [{ "Clients": [ ... ] }]
  // - [ ... ] (array of objects)
  // - { "Clients": [...] }
  let rowData = [];
  if (Array.isArray(rawClients) && rawClients.length > 0 && rawClients[0].Clients) {
    rowData = rawClients[0].Clients;
  } else if (Array.isArray(rawClients)) {
    rowData = rawClients;
  } else if (rawClients && rawClients.Clients) {
    rowData = rawClients.Clients;
  } else {
    rowData = [];
  }

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      minWidth: 80,
    }),
    []
  );

  // AG Grid Columns
  const [columnDefs] = useState([
    { field: "id", headerName: "ID", maxWidth: 90 },

    {
      field: "nom",
      headerName: "Nom",
      flex: 1.2,
      cellRenderer: (params) => (
        <div className="flex items-center">
          <span style={{ marginRight: 8 }}>{params.value}</span>
        </div>
      ),
    },

    { field: "prenom", headerName: "Prénom", flex: 1 },
    { field: "ville", headerName: "Ville", flex: 1 },
    { field: "telephone", headerName: "Téléphone", flex: 1 },

    {
      field: "email",
      headerName: "Email",
      flex: 1.4,
      cellRenderer: (params) => <a href={`mailto:${params.value}`}>{params.value}</a>,
    },

    {
      headerName: "Statut",
      field: "statut",
      flex: 0.8,
      valueGetter: (p) => (p.data ? p.data.statut === "actif" : false),
      cellRenderer: MissionResultRenderer,
      maxWidth: 120,
    },

    {
      headerName: "Actions",
      field: "actions",
      maxWidth: 160,
      cellRenderer: CustomButtonComponent,
    },
  ]);

  // onGridReady handler: forward the API to parent if provided
  const handleGridReady = (params) => {
    try {
      if (typeof onGridReadyProp === "function") {
        onGridReadyProp(params.api);
      }
    } catch (err) {
      // ignore
    }
  };

  return (
    <>
      {/* Table */}
      <div style={containerStyle} className="w-full p-6 flex justify-center">
        <div style={gridStyle} className="ag-theme-alpine w-full">
          <AgGridReact
            rowData={rowData}
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            rowSelection="single"
            animateRows={true}
            onGridReady={handleGridReady}
          />
        </div>
      </div>
    </>
  );
};

export default GridExample;
