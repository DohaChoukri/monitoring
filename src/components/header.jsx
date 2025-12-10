import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const Header = () => {
  const [now, setNow] = useState(new Date())
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    permissions: []
  })
  const [isLoading, setIsLoading] = useState(true)

  // Mettre à jour l'heure chaque seconde
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Récupérer les infos utilisateur
  useEffect(() => {
    const loadUserData = () => {
      try {
        const userData = localStorage.getItem('user_data')
        const userRoles = localStorage.getItem('user_roles')
        const userPerms = localStorage.getItem('user_permissions')

        if (userData) {
          const parsed = JSON.parse(userData)
          
          // Gérer les rôles
          let roleText = 'Utilisateur'
          if (userRoles) {
            const roles = JSON.parse(userRoles)
            roleText = roles.length > 0 ? roles.join(", ") : 'Aucun rôle'
          }

          // Gérer les permissions
          let permissions = []
          if (userPerms) {
            const perms = JSON.parse(userPerms)
            permissions = Array.isArray(perms) 
              ? perms.map(p => typeof p === 'object' ? p.name || p.title || 'Permission' : p)
              : []
          }

          setUser({
            name: parsed.name || parsed.username || 'Utilisateur',
            email: parsed.email || 'Non spécifié',
            role: roleText,
            permissions
          })
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données utilisateur:', error)
        setUser({
          name: 'Utilisateur',
          email: 'Erreur de chargement',
          role: 'Non défini',
          permissions: []
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
    
    // Écouter les changements de localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'user_data' || e.key === 'user_roles' || e.key === 'user_permissions') {
        loadUserData()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const formattedDate = now.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  const formattedTime = now.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  // Générer les initiales
  const getInitials = (name) => {
    if (!name || name === 'Utilisateur') return 'US'
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  // Déconnexion
  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <div className="flex items-center gap-2 text-sm">
            <div className="flex flex-col">
              <span className="font-medium">{formattedDate}</span>
              <span className="text-xs text-muted-foreground">{formattedTime}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setNow(new Date())}
              aria-label="Actualiser l'heure"
              className="h-8 w-8"
              title="Actualiser l'heure"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Partie centrale - Recherche */}
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg 
                  className="w-4 h-4 text-muted-foreground" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
              <input
                type="search"
                className="w-full pl-10 pr-4 py-2 text-sm rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="Rechercher..."
                aria-label="Recherche"
              />
            </div>
          </div>
        </div>

          {/* Menu Profil */}
          <Sheet >
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 hover:bg-accent"
                aria-label="Ouvrir le profil"
              >
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                    {getInitials(user.name)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium leading-none">
                    {isLoading ? 'Chargement...' : user.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {isLoading ? '...' : user.role}
                  </span>
                </div>
              </Button>
            </SheetTrigger>
            
            <SheetContent side="right" className="p-5">
              {/* <SheetHeader className="text-left">
                <SheetTitle>Profil Utilisateur</SheetTitle>
                <SheetDescription>
                  Informations et paramètres de votre compte
                </SheetDescription>
              </SheetHeader> */}
              
              <div className=" space-y-6">
                {/* En-tête du profil */}
                <div className="flex items-center gap-4 pb-4 border-b">
                  <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                    {getInitials(user.name)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {user.role}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Connecté
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions rapides */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Actions rapides</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="justify-start"
                      onClick={() => window.location.href = '/settings'}
                    >
                      <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Paramètres
                    </Button>
                  </div>
                </div>

                {/* Déconnexion */}
                <div className="pt-4 border-t">
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Déconnexion
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Vous serez redirigé vers la page de connexion
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
      </div>
    </header>
  )
}

export default Header;
