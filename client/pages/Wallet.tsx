import { useState } from "react";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Copy, 
  ExternalLink, 
  Plus, 
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface WalletBalance {
  symbol: string;
  name: string;
  balance: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: string;
}

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "trade";
  crypto: string;
  amount: string;
  value: string;
  status: "completed" | "pending" | "failed";
  time: string;
  txHash?: string;
}

interface ExternalWallet {
  name: string;
  icon: string;
  status: "connected" | "disconnected";
  address?: string;
  balance?: string;
}

const balances: WalletBalance[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    balance: "0.5847",
    value: "€24,890.50",
    change: "+2.4%",
    changeType: "positive",
    icon: "₿"
  },
  {
    symbol: "ETH",
    name: "Ethereum", 
    balance: "8.247",
    value: "€23,421.80",
    change: "+1.8%",
    changeType: "positive",
    icon: "Ξ"
  },
  {
    symbol: "USDT",
    name: "Tether",
    balance: "15,250.00",
    value: "€15,250.00",
    change: "0.0%",
    changeType: "positive",
    icon: "₮"
  },
  {
    symbol: "ADA",
    name: "Cardano",
    balance: "12,500",
    value: "€6,000.00",
    change: "-0.5%",
    changeType: "negative", 
    icon: "₳"
  },
  {
    symbol: "EUR",
    name: "Euro (Fiat)",
    balance: "2,450.75",
    value: "€2,450.75",
    change: "0.0%",
    changeType: "positive",
    icon: "€"
  }
];

const transactions: Transaction[] = [
  {
    id: "1",
    type: "deposit",
    crypto: "BTC",
    amount: "+0.125",
    value: "+€5,322.50",
    status: "completed",
    time: "2 ore fa",
    txHash: "0x1a2b3c..."
  },
  {
    id: "2", 
    type: "withdrawal",
    crypto: "ETH",
    amount: "-2.5",
    value: "-€7,100.00",
    status: "completed",
    time: "5 ore fa",
    txHash: "0x4d5e6f..."
  },
  {
    id: "3",
    type: "deposit",
    crypto: "USDT", 
    amount: "+1,000.00",
    value: "+€1,000.00",
    status: "pending",
    time: "1 giorno fa"
  },
  {
    id: "4",
    type: "trade",
    crypto: "ADA",
    amount: "+2,500",
    value: "+€1,200.00",
    status: "completed",
    time: "2 giorni fa"
  }
];

const externalWallets: ExternalWallet[] = [
  {
    name: "MetaMask",
    icon: "🦊",
    status: "connected",
    address: "0x742d...4e8a",
    balance: "3.247 ETH"
  },
  {
    name: "Trust Wallet",
    icon: "🔵",
    status: "disconnected"
  },
  {
    name: "Coinbase Wallet",
    icon: "🔷",
    status: "disconnected"
  },
  {
    name: "Binance Wallet",
    icon: "🟡",
    status: "disconnected"
  },
  {
    name: "Ledger",
    icon: "🔒",
    status: "connected",
    address: "bc1q...xyz",
    balance: "0.5847 BTC"
  }
];

export default function WalletPage() {
  const [showBalances, setShowBalances] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");

  const totalValue = balances.reduce((sum, balance) => {
    return sum + parseFloat(balance.value.replace(/[€,]/g, ""));
  }, 0);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Il Tuo <span className="text-gold-400">Wallet</span>
        </h1>
        <p className="text-muted-foreground">
          Gestisci i tuoi fondi crypto e fiat in modo sicuro
        </p>
      </div>

      {/* Portfolio Overview */}
      <Card className="bg-gradient-to-br from-gold-900/20 to-gold-800/20 border-gold-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-gold-400">Valore Totale Portfolio</CardTitle>
              <CardDescription>Distribuzione delle tue criptovalute</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalances(!showBalances)}
                className="text-gold-400 hover:text-gold-300"
              >
                {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" className="text-gold-400 hover:text-gold-300">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-foreground mb-4">
            {showBalances ? `€${totalValue.toLocaleString()}` : "€••••••••"}
          </div>
          <div className="flex items-center gap-2 text-green-500 mb-6">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">+€2,347.80 (+3.4%) oggi</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="h-20 bg-green-600 hover:bg-green-700 text-white">
                  <div className="flex flex-col items-center gap-2">
                    <ArrowDownLeft className="h-6 w-6" />
                    <span className="font-medium">Deposita</span>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Deposita Fondi</DialogTitle>
                  <DialogDescription>
                    Trasferisci criptovalute nel tuo wallet AurumBotX
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Seleziona Criptovaluta</Label>
                    <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                      <SelectTrigger className="bg-dark-800 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {balances.filter(b => b.symbol !== "EUR").map((balance) => (
                          <SelectItem key={balance.symbol} value={balance.symbol}>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{balance.icon}</span>
                              <span>{balance.name} ({balance.symbol})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-4 bg-dark-800 rounded-lg">
                    <Label className="text-sm text-muted-foreground">Indirizzo di Deposito</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <code className="flex-1 text-sm bg-dark-700 p-2 rounded text-gold-400">
                        bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                      </code>
                      <Button size="sm" variant="ghost" onClick={() => copyToClipboard("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh")}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Invia solo {selectedCrypto} a questo indirizzo. Altri token verranno persi.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-foreground">Importo (opzionale)</Label>
                    <Input
                      placeholder={`Quantità di ${selectedCrypto}`}
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="bg-dark-800 border-border text-foreground"
                    />
                  </div>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Genera QR Code
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 border-red-500 text-red-400 hover:bg-red-500 hover:text-white">
                  <div className="flex flex-col items-center gap-2">
                    <ArrowUpRight className="h-6 w-6" />
                    <span className="font-medium">Preleva</span>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Preleva Fondi</DialogTitle>
                  <DialogDescription>
                    Trasferisci criptovalute dal tuo wallet a un indirizzo esterno
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Seleziona Criptovaluta</Label>
                    <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                      <SelectTrigger className="bg-dark-800 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {balances.filter(b => b.symbol !== "EUR").map((balance) => (
                          <SelectItem key={balance.symbol} value={balance.symbol}>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{balance.icon}</span>
                              <span>{balance.name} ({balance.symbol})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-foreground">Indirizzo di Destinazione</Label>
                    <Input
                      placeholder="Inserisci l'indirizzo wallet di destinazione"
                      value={withdrawAddress}
                      onChange={(e) => setWithdrawAddress(e.target.value)}
                      className="bg-dark-800 border-border text-foreground"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-foreground">Importo</Label>
                    <Input
                      placeholder={`Quantità di ${selectedCrypto}`}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="bg-dark-800 border-border text-foreground"
                    />
                    <p className="text-xs text-muted-foreground">
                      Disponibile: {balances.find(b => b.symbol === selectedCrypto)?.balance} {selectedCrypto}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-400 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span className="font-medium">Commissioni di rete: 0.0005 {selectedCrypto}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Conferma Prelievo
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="h-20 border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-dark-900">
              <div className="flex flex-col items-center gap-2">
                <Plus className="h-6 w-6" />
                <span className="font-medium">Acquista Crypto</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Balances and External Wallets */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Crypto Balances */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">I Tuoi Saldi</CardTitle>
              <CardDescription>Panoramica delle tue criptovalute</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {balances.map((balance) => (
                  <div key={balance.symbol} className="flex items-center justify-between p-3 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/20 text-gold-400 font-bold text-lg">
                        {balance.icon}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{balance.name}</div>
                        <div className="text-sm text-muted-foreground">{balance.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-foreground">
                        {showBalances ? balance.balance : "••••••"} {balance.symbol}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {showBalances ? balance.value : "€••••••"}
                      </div>
                      <div className={`text-xs flex items-center gap-1 ${
                        balance.changeType === "positive" ? "text-green-500" : "text-red-500"
                      }`}>
                        {balance.changeType === "positive" ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {balance.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Cronologia Transazioni</CardTitle>
                <CardDescription>Le tue ultime operazioni</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-gold-400 hover:text-gold-300">
                <Eye className="h-4 w-4 mr-2" />
                Vedi Tutto
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        tx.type === "deposit" ? "bg-green-500/20 text-green-500" :
                        tx.type === "withdrawal" ? "bg-red-500/20 text-red-500" :
                        "bg-blue-500/20 text-blue-500"
                      }`}>
                        {tx.type === "deposit" ? <ArrowDownLeft className="h-4 w-4" /> :
                         tx.type === "withdrawal" ? <ArrowUpRight className="h-4 w-4" /> :
                         <RefreshCw className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {tx.type === "deposit" ? "Deposito" :
                           tx.type === "withdrawal" ? "Prelievo" : "Scambio"} {tx.crypto}
                        </div>
                        <div className="text-sm text-muted-foreground">{tx.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${
                        tx.amount.startsWith("+") ? "text-green-500" : "text-red-500"
                      }`}>
                        {tx.amount} {tx.crypto}
                      </div>
                      <div className="text-sm text-muted-foreground">{tx.value}</div>
                      <Badge className={`text-xs ${
                        tx.status === "completed" ? "bg-green-500 text-white" :
                        tx.status === "pending" ? "bg-yellow-500 text-dark-900" :
                        "bg-red-500 text-white"
                      }`}>
                        {tx.status === "completed" ? "Completato" :
                         tx.status === "pending" ? "In Attesa" : "Fallito"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* External Wallets */}
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Wallet Esterni</CardTitle>
              <CardDescription>Collega i tuoi wallet crypto preferiti</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {externalWallets.map((wallet, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{wallet.icon}</div>
                    <div>
                      <div className="font-medium text-foreground">{wallet.name}</div>
                      {wallet.address && (
                        <div className="text-xs text-muted-foreground">
                          {wallet.address}
                        </div>
                      )}
                      {wallet.balance && (
                        <div className="text-xs text-gold-400">{wallet.balance}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {wallet.status === "connected" ? (
                      <>
                        <Badge className="bg-green-500 text-white">Connesso</Badge>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" className="bg-gold-500 text-dark-900 hover:bg-gold-400">
                        Connetti
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Security Status */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Sicurezza Wallet</CardTitle>
              <CardDescription>Stato della protezione del tuo wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Autenticazione 2FA</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Backup Seed</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Whitelist IP</span>
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Cold Storage</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </div>
              
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Livello Sicurezza</span>
                  <span className="text-foreground">Molto Alto</span>
                </div>
                <Progress value={85} className="h-2 bg-dark-700">
                  <div className="h-2 bg-green-500 rounded-full transition-all" style={{ width: '85%' }} />
                </Progress>
              </div>
              
              <Button variant="outline" size="sm" className="w-full border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-dark-900">
                Migliora Sicurezza
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
