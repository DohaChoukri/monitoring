"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import axios from 'axios';
import { Link } from "react-router-dom";

const connexionFormSchema = z.object({
  email: z
    .string({ required_error: "Veuillez saisir votre email." })
    .email("Format d'email invalide"),

  password: z
    .string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." })
    .max(50, { message: "Le mot de passe ne doit pas dépasser 50 caractères." })
    .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule." })
    .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre." })
})

export default function Connexion() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const form = useForm({
    resolver: zodResolver(connexionFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })


  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // 👉 Une seule requête login
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login", data);
      const json = res.data;

      console.log("Réponse serveur :", json);

      // 👉 Stockage dans localStorage
      localStorage.setItem("access_token", json.access_token);
      localStorage.setItem("user_data", JSON.stringify(json.user));
      localStorage.setItem("user_roles", JSON.stringify(json.role));
      localStorage.setItem("user_permissions", JSON.stringify(json.userPermissions));

      setSuccess("Connexion réussie !");

      // 👉 Redirection propre
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);

    } catch (err) {
      console.error("Erreur de connexion:", err);

      if (err.response) {
        const status = err.response.status;

        if (status === 401) setError("Email ou mot de passe incorrect");
        else if (status === 404) setError("Utilisateur non trouvé");
        else if (status === 422) setError("Donnees invalides");
        else setError(err.response.data?.message || "Erreur de connexion");
      } else {
        setError("Erreur serveur. Vérifiez votre connexion internet.");
      }
    } finally {
      setLoading(false);
    }
  };



  // Afficher les données du formulaire en temps réel (pour le débogage)
  const watchEmail = form.watch("email")
  const watchPassword = form.watch("password")
  
  console.log("Email saisi:", watchEmail)
  console.log("Mot de passe saisi (longueur):", watchPassword.length)

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Connexion</h1>
          <p className="text-gray-600 mt-2">Connectez-vous à votre compte</p>
        </div>
        
        {/* Messages d'état */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}
        
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-white p-8 rounded-lg shadow-md"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="votre.email@exemple.com"
                      type="email"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    Saisissez l'adresse email associée à votre compte.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mot de passe */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    Minimum 8 caractères avec au moins une majuscule et un chiffre.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-right">
              <Link to={"/MotPassOublié"}>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Mot de passe oublié ?
              </button>
              </Link>
            </div>


            {/* Bouton de connexion avec état de chargement */}
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Connexion en cours...
                </>
              ) : "Se connecter"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}