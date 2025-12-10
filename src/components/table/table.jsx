"use client";

import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Badge } from "@/components/ui/badge";
import "../../assets/css/table.css";

import {
  CellStyleModule,
  ClientSideRowModelModule,
  ModuleRegistry,
  ValidationModule,
  RowSelectionModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
} from "ag-grid-community";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

ModuleRegistry.registerModules([
  CellStyleModule,
  ClientSideRowModelModule,
  RowSelectionModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]);

import CustomButtonComponent from "./customButtonComponent.jsx";
import rawClients from "@/assets/json/client.json";

const GridExample = ({ onGridReady: onGridReadyProp }) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "600px" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [clients, setClients] = useState(rawClients[0].Clients || []);

  const handleSaveStatut = (updatedClient) => {
    console.log("Client mis à jour :", updatedClient);
    setClients((prev) =>
      prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
    );
  };

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

  // 🔄 NORMALISATION : actif → positive, inactif → négative
  function normalizeStatus(value) {
    if (!value) return "";
    const v = String(value).trim().toLowerCase();

    if (["1", "à visiter", "a visiter", "avisite"].includes(v)) return "à visiter";
    if (["2", "visité en cours", "visite en cours"].includes(v)) return "visité en cours";
    if (["3", "visité", "visite"].includes(v)) return "visité";

    if (["4a", "actif"].includes(v)) return "positive";
    if (["4i", "inactif"].includes(v)) return "négative";

    return v;
  }

  const [columnDefs] = useState([
    { field: "id", headerName: "ID", maxWidth: 90 },
    { field: "nom", headerName: "Nom", flex: 1.2 },
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
      maxWidth: 150,
      flex: 1,
      cellRenderer: (params) => {
        const norm = normalizeStatus(params.value);

        let variant = "default";
        switch (norm) {
          case "à visiter":
            variant = "default";
            break;
          case "visité en cours":
            variant = "outline";
            break;
          case "visité":
            variant = "success";
            break;
          case "positive": // ancien actif
            variant = "success";
            break;
          case "négative": // ancien inactif
            variant = "destructive";
            break;
        }

        // Si ce n’est PAS négative, simple badge
        if (norm !== "négative") {
          return (
            <Badge variant={variant} className="capitalize">
              {norm}
            </Badge>
          );
        }

        // Sinon : affichage du Sheet (pour négative)
        const [open, setOpen] = React.useState(false);

        const raisonText =
          params.data.inactifChoice === "autre"
            ? params.data.autreRaison
            : params.data.inactifChoice;

        return (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Badge
                variant={variant}
                className="capitalize"
                style={{ cursor: "pointer" }}
              >
                {norm}
              </Badge>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Raison Statut Négative</SheetTitle>
                <SheetDescription>{raisonText || "-"}</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        );
      },
    },

    {
      headerName: "Actions",
      field: "actions",
      maxWidth: 160,
      cellRenderer: (params) => {
        if (!params.data) return null;

        const rowStatus = normalizeStatus(params.data.statut);
        if (
          !rowStatus.includes("à visiter") &&
          !rowStatus.includes("visité en cours")
        )
          return null;

        return (
          <CustomButtonComponent
            data={params.data}
            onSave={handleSaveStatut}
          />
        );
      },
    },
  ]);

  const handleGridReady = (params) => {
    if (typeof onGridReadyProp === "function") {
      onGridReadyProp(params.api);
    }
  };

  return (
    <div style={containerStyle} className="w-full p-6 flex justify-center">
      <div style={gridStyle} className="ag-theme-alpine w-full">
        <AgGridReact
          rowData={clients}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowSelection={{ type: "single" }}
          animateRows={true}
          onGridReady={handleGridReady}
        />
      </div>
    </div>
  );
};

export default GridExample;
