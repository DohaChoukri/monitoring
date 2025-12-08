import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, UsersIcon, DollarSignIcon, ActivityIcon } from "lucide-react"

export default function CardStats() {
  return (
    <div className="w-full p-6 flex justify-center">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients (par mois)</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">+5500 depuis le mois dernier</p>
            </div>
          </CardContent>
        </Card>

        {/* Clients Visités Aujourd'hui */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients visités aujourd’hui</CardTitle>
            <UsersIcon className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <div>
              <div className="text-2xl font-bold">35</div>
              <p className="text-xs text-muted-foreground">+180 depuis hier</p>
            </div>
          </CardContent>
        </Card>

        {/* Clients Actifs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients actifs (ce mois)</CardTitle>
            <TrendingUpIcon className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <div>
              <div className="text-2xl font-bold">30</div>
              <p className="text-xs text-muted-foreground">+195 depuis le mois dernier</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients inactifs</CardTitle>
            <ActivityIcon className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <div>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">+20 depuis 1 heure</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
