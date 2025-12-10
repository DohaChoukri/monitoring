import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, UsersIcon, DollarSignIcon, ActivityIcon, UserCheckIcon, UserXIcon } from "lucide-react"

export default function CardStats() {
  const totalClients = 45
  const visitesAujourdHui = 35
  const clientsPositifs = 30
  const clientsNegatifs = 5

  return (
    <div className="w-full p-4 md:p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full max-w-7xl mx-auto">
        {/* Total Clients */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <div className="rounded-lg bg-blue-100 p-2">
              <DollarSignIcon className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold">{totalClients}</div>
                <div className="flex items-center text-sm text-green-600 font-medium">
                  <TrendingUpIcon className="mr-1 h-4 w-4" />
                  +5
                </div>
              </div>
              <p className="text-xs text-muted-foreground">+5 depuis le mois dernier</p>
            </div>
          </CardContent>
        </Card>

        {/* Clients Visités Aujourd'hui */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium">Clients visités aujourd'hui</CardTitle>
            <div className="rounded-lg bg-green-100 p-2">
              <UsersIcon className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold">{visitesAujourdHui}</div>
                <div className="flex items-center text-sm text-green-600 font-medium">
                  <TrendingUpIcon className="mr-1 h-4 w-4" />
                  +2
                </div>
              </div>
              <p className="text-xs text-muted-foreground">+2 ce jour</p>
            </div>
          </CardContent>
        </Card>

        {/* Clients Satisfaits */}
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium">Clients positifs</CardTitle>
            <div className="rounded-lg bg-emerald-100 p-2">
              <UserCheckIcon className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold">{clientsPositifs}</div>
                <div className="flex items-center text-sm text-emerald-600 font-medium">
                  <TrendingUpIcon className="mr-1 h-4 w-4" />
                  +3
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">+3 ce jour</p>
                <span className="text-xs font-medium text-emerald-600">
                  {((clientsPositifs / visitesAujourdHui) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clients Insatisfaits */}
        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium">Clients négatifs</CardTitle>
            <div className="rounded-lg bg-amber-100 p-2">
              <UserXIcon className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold">{clientsNegatifs}</div>
                <div className="flex items-center text-sm text-amber-600 font-medium">
                  <ActivityIcon className="mr-1 h-4 w-4" />
                  +1
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">+1 ce jour</p>
                <span className="text-xs font-medium text-amber-600">
                  {((clientsNegatifs / visitesAujourdHui) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
