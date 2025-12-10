import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

const ForgotPassword = () => {
  const form = useForm();
  const [error, setError] = useState("");


  const handleForgotPassword = async () => {
    const email = form.getValues("email");
    if (!email) {
      setError("Veuillez saisir votre email pour réinitialiser le mot de passe");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erreur lors de l'envoi de l'email.");
        return;
      }

      alert(data.message || "Un email de réinitialisation a été envoyé !");
    } catch (err) {
      setError("Impossible de contacter le serveur.");
      console.error(err);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">Mot de passe oublié</h2>
      
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          {...form.register("email")}
          placeholder="votre.email@example.com"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <Button
        onClick={handleForgotPassword}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Réinitialiser le mot de passe
      </Button>
    </div>
  </div>
  );
};

export default ForgotPassword;
