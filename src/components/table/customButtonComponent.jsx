import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function CustomButtonComponent({ data, onSave }) {
  // Valeurs originales (pour Annuler)
  const originalStatut = data?.statut || "À visiter";
  const originalInactifChoice = data?.inactifChoice || "";
  const originalAutreRaison = data?.autreRaison || "";

  // États locaux modifiables
  const [statut, setStatut] = useState(originalStatut);
  const [showDropdown, setShowDropdown] = useState(false);
  const [changes, setChanges] = useState(false);
  const [inactifChoice, setInactifChoice] = useState(originalInactifChoice);
  const [autreRaison, setAutreRaison] = useState(originalAutreRaison);

  const [idClient , setIdClient] = useState(false);
  const [forceOpen, setForceOpen] = useState(false); // empêche fermeture accidentelle
  const [visiteEnCours, setVisiteEnCours] = useState(false);

  const inactifStatut = [
    { value: "choix 1", affiche: "Choix 1" },
    { value: "choix 2", affiche: "Choix 2" },
    { value: "choix 3", affiche: "Choix 3" },
    { value: "autre", affiche: "Autre" },
  ];

  useEffect(() => {
    setIdClient(data?.id)
    setStatut(originalStatut);
    setInactifChoice(originalInactifChoice);
    setAutreRaison(originalAutreRaison);
    setShowDropdown(false);
    setChanges(false);
    setVisiteEnCours(data?.statut === "Visité en cours");
  }, [data]);

  // Variants badge
  const getBadgeVariant = () => {
    switch (statut.toLowerCase()) {
      case "à visiter": return "outline";
      case "visité en cours": return "secondary";
      case "visité": return "default";
      case "positive": return "success";
      case "négative": return "destructive";
      default: return "outline";
    }
  };

  const handleTryOpenSheet = (e) => {
    // Si le client actuel a une visite en cours
    if (visiteEnCours) {
      e.preventDefault();
      alert("Veuillez d'abord fermer la visite de ce client avant d'en démarrer une nouvelle.");
      return;
    }

    setForceOpen(true);
  };
  // --- ACTIONS ---
  const handleVisiteClick = () => {
    let newStatut = statut;

    if (statut === "À visiter") newStatut = "Visité en cours";
    else if (statut === "Visité en cours") {
      newStatut = "Visité";
      setShowDropdown(true);
    }

    setStatut(newStatut);
    setChanges(true);
  };

  const handleDropdownSelect = (value) => {
    setStatut(value === "positive" ? "Positive" : "Négative");
    setShowDropdown(false);
    setChanges(true);
  };

  // 🔄 ANNULER — remet tout comme avant
  const handleReset = () => {
    setStatut(originalStatut);
    setInactifChoice(originalInactifChoice);
    setAutreRaison(originalAutreRaison);
    setShowDropdown(false);
    setChanges(false);
    setForceOpen(false);
  };

  // 💾 SAUVEGARDER — applique les changements
  const handleSave = () => {
    onSave({
      ...data,
      statut,
      inactifChoice,
      autreRaison:
        statut === "Négative" && inactifChoice === "autre" ? autreRaison : "",
    });

    setChanges(false);
    setForceOpen(false);
  };

  // 📌 Interdiction de fermer si modifications non sauvegardées
  const preventClose = (openState) => {
    if (!openState && changes) {
      alert("Veuillez sauvegarder ou annuler avant de fermer.");
      setForceOpen(true);
      return;
    }
    setForceOpen(openState);
  };

  return (
    <Sheet open={forceOpen} onOpenChange={preventClose}>
      <SheetTrigger asChild onClick={() => setForceOpen(true)}>
        <Button variant="outline" size="sm" type="button">
          Démarrer visite
        </Button>
      </SheetTrigger>

      <SheetContent className="p-3 overflow-y-auto max-h-[100vh]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            Détails
            <Badge variant={getBadgeVariant()}>{statut}</Badge>
          </SheetTitle>
          <SheetDescription>
            Gérer le statut de visite pour ce client
          </SheetDescription>
        </SheetHeader>

        {/* --- INFOS CLIENT --- */}
        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Informations</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="font-medium">Nom:</span>
              <span>{data.nom} {data.prenom}</span>
              <span className="font-medium">Ville:</span>
              <span>{data.ville}</span>
              <span className="font-medium">Téléphone:</span>
              <span>{data.telephone}</span>
              <span className="font-medium">Email:</span>
              <span>{data.email}</span>
            </div>
          </div>

          {/* --- ACTIONS --- */}
          <div className="space-y-4">
            <h3 className="font-semibold">Actions</h3>

            <Button
              onClick={handleVisiteClick}
              disabled={statut === "Positive" || statut === "Négative"}
              variant="default"
              className="w-full"
            >
              {statut === "À visiter" && "Marquer comme visité"}
              {statut === "Visité en cours" && "Terminer la visite"}
              {statut === "Visité" && "Visite terminée"}
            </Button>

            {showDropdown && (
              <div className="space-y-3 p-3 border rounded-md">
                <label className="text-sm font-medium block">
                  Sélectionner le statut final:
                </label>
                <Select onValueChange={handleDropdownSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un statut..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Négative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {statut === "Négative" && (
              <div className="space-y-3">
                <label className="text-sm font-medium block">Raison :</label>
                <select
                  className="w-full border rounded-md p-2"
                  value={inactifChoice}
                  onChange={(e) => {
                    setInactifChoice(e.target.value);
                    setChanges(true);
                  }}
                >
                  <option value="">-- Choisir une raison --</option>
                  {inactifStatut.map((i) => (
                    <option key={i.value} value={i.value}>
                      {i.affiche}
                    </option>
                  ))}
                </select>

                {inactifChoice === "autre" && (
                  <textarea
                    className="w-full border rounded-md p-2"
                    placeholder="Préciser la raison..."
                    value={autreRaison}
                    onChange={(e) => {
                      setAutreRaison(e.target.value);
                      setChanges(true);
                    }}
                  />
                )}
              </div>
            )}
          </div>

          {/* RÉSUMÉ */}
          <div className="space-y-2">
            <h3 className="font-semibold">Statut actuel</h3>
            <div className="p-3 bg-muted rounded-md">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">
                  Statut: <b>{statut}</b>
                </p>
                <span className="text-xs text-muted-foreground">
                  {changes ? "Modifié" : "Non modifié"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <SheetFooter className="flex justify-between">
          <Button variant="ghost" onClick={handleReset} disabled={!changes}>
            Annuler
          </Button>

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={!changes}>
              Sauvegarder
            </Button>

            <SheetClose asChild>
              <Button variant="outline" disabled={changes}>
                Fermer
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
