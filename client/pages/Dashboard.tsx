import { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Bot, 
  Wallet, 
  Activity, 
  DollarSign,
  BarChart3,
  Users,
  Shield,
  Clock,
  Play,
  Pause,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ComponentType<{ className?: string }>;
}

interface TradeEntry {
  id: string;
  pair: string;
  type: "BUY" | "SELL";
  amount: string;
  price: string;
  profit: string;
  time: string;
  status: "completed" | "pending" | "failed";
}

const statsData: StatCard[] = [
  {
    title: "Saldo Totale",
    value: "€24,580.50",
    change: "+12.5%",
    changeType: "positive",
    icon: Wallet,
  },
  {
    title: "ROI Giornaliero",
    value: "+3.2%",
    change: "+0.8%",
    changeType: "positive",
    icon: TrendingUp,
  },
  {
    title: "Trade Attivi",
    value: "8",
    change: "+2",
    changeType: "positive",
    icon: Activity,
  },
  {
    title: "Profitto Totale",
    value: "€3,247.80",
    change: "+18.2%",
    changeType: "positive",
    icon: DollarSign,
  },
];

const recentTrades: TradeEntry[] = [
  {
    id: "1",
    pair: "BTC/EUR",
    type: "BUY",
    amount: "0.125",
    price: "€42,580",
    profit: "+€158.20",
    time: "2 min fa",
    status: "completed",
  },
  {
    id: "2",
    pair: "ETH/EUR",
    type: "SELL",
    amount: "2.5",
    price: "€2,840",
    profit: "+€95.60",
    time: "8 min fa",
    status: "completed",
  },
  {
    id: "3",
    pair: "ADA/EUR",
    type: "BUY",
    amount: "1,250",
    price: "€0.48",
    profit: "+€24.30",
    time: "15 min fa",
    status: "completed",
  },
  {
    id: "4",
    pair: "SOL/EUR",
    type: "BUY",
    amount: "15",
    price: "€98.50",
    profit: "Pending",
    time: "22 min fa",
    status: "pending",
  },
];

export default function Dashboard() {
  const [botStatus, setBotStatus] = useState<"active" | "paused">("active");

  const toggleBot = () => {
    setBotStatus(botStatus === "active" ? "paused" : "active");
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Benvenuto, <span className="text-gold-400">Fabio</span>
        </h1>
        <p className="text-muted-foreground">
          Ecco una panoramica delle tue attività di trading oggi
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <Card key={index} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gold-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                )}
                <span className={stat.changeType === "positive" ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span className="ml-1">da ieri</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Bot Control & Performance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trading Bot Status */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500 text-dark-900">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">Trading Bot</CardTitle>
                    <CardDescription>
                      Strategia: <span className="text-gold-400">Scalping Pro</span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    className={`${
                      botStatus === "active" 
                        ? "bg-green-500 text-white" 
                        : "bg-yellow-500 text-dark-900"
                    }`}
                  >
                    {botStatus === "active" ? "Attivo" : "In Pausa"}
                  </Badge>
                  <Button 
                    onClick={toggleBot} 
                    size="sm"
                    className="bg-gold-500 text-dark-900 hover:bg-gold-400"
                  >
                    {botStatus === "active" ? (
                      <Pause className="h-4 w-4 mr-2" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    {botStatus === "active" ? "Pausa" : "Avvia"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-dark-800 rounded-lg">
                  <div className="text-2xl font-bold text-green-500">96.8%</div>
                  <div className="text-sm text-muted-foreground">Precisione</div>
                </div>
                <div className="text-center p-4 bg-dark-800 rounded-lg">
                  <div className="text-2xl font-bold text-gold-400">247</div>
                  <div className="text-sm text-muted-foreground">Trade Oggi</div>
                </div>
                <div className="text-center p-4 bg-dark-800 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">€1,247</div>
                  <div className="text-sm text-muted-foreground">Profitto Oggi</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Ultimo aggiornamento: 1 min fa</span>
                <Button variant="ghost" size="sm" className="text-gold-400 hover:text-gold-300">
                  <Settings className="h-4 w-4 mr-2" />
                  Configura
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Trades */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Ultimi Trade</CardTitle>
                <CardDescription>I tuoi trade più recenti</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-gold-400 hover:text-gold-300">
                <Eye className="h-4 w-4 mr-2" />
                Vedi Tutti
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTrades.map((trade) => (
                  <div 
                    key={trade.id} 
                    className="flex items-center justify-between p-3 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Badge 
                        className={`${
                          trade.type === "BUY" 
                            ? "bg-green-500 text-white" 
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {trade.type}
                      </Badge>
                      <div>
                        <div className="font-medium text-foreground">{trade.pair}</div>
                        <div className="text-sm text-muted-foreground">
                          {trade.amount} @ {trade.price}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${
                        trade.profit.startsWith("+") ? "text-green-500" : 
                        trade.profit === "Pending" ? "text-yellow-500" : "text-red-500"
                      }`}>
                        {trade.profit}
                      </div>
                      <div className="text-sm text-muted-foreground">{trade.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Azioni Rapide</CardTitle>
              <CardDescription>Accesso veloce alle funzioni principali</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-gold-500 text-dark-900 hover:bg-gold-400">
                <DollarSign className="h-4 w-4 mr-2" />
                Deposita Fondi
              </Button>
              <Button variant="outline" className="w-full border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-dark-900">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analisi Mercato
              </Button>
              <Button variant="outline" className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Impostazioni Sicurezza
              </Button>
            </CardContent>
          </Card>

          {/* Market Overview */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Mercato</CardTitle>
              <CardDescription>Panoramica crypto principali</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Bitcoin", symbol: "BTC", price: "€42,580", change: "+2.4%" },
                { name: "Ethereum", symbol: "ETH", price: "€2,840", change: "+1.8%" },
                { name: "Cardano", symbol: "ADA", price: "€0.48", change: "-0.5%" },
                { name: "Solana", symbol: "SOL", price: "€98.50", change: "+5.2%" },
              ].map((crypto, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-dark-800 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gold-500 text-dark-900 text-xs">
                        {crypto.symbol.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground text-sm">{crypto.name}</div>
                      <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-foreground text-sm">{crypto.price}</div>
                    <div className={`text-xs ${
                      crypto.change.startsWith("+") ? "text-green-500" : "text-red-500"
                    }`}>
                      {crypto.change}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Progress to Premium */}
          <Card className="bg-gradient-to-br from-gold-900/20 to-gold-800/20 border-gold-500/30">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-gold-400 rounded-full"></div>
                <CardTitle className="text-gold-400">Premium Status</CardTitle>
              </div>
              <CardDescription>I tuoi benefici premium</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Utilizzo mensile</span>
                  <span className="text-foreground">78% utilizzato</span>
                </div>
                <Progress value={78} className="h-2 bg-dark-700">
                  <div className="h-2 bg-gold-500 rounded-full transition-all" style={{ width: '78%' }} />
                </Progress>
              </div>
              <div className="text-sm text-muted-foreground">
                Accesso illimitato a tutte le strategie avanzate
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-dark-900"
              >
                Gestisci Piano
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
