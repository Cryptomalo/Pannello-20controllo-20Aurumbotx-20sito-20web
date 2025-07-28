import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Bot, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  TrendingUp,
  CheckCircle,
  Smartphone,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const features = [
    "Trading Bot automatizzato con AI",
    "Analisi di mercato in tempo reale",
    "Sicurezza avanzata con 2FA",
    "Supporto 24/7 dedicato",
    "Dashboard professionale",
    "API per sviluppatori"
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Features & Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 py-24">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-500 text-dark-900">
                <TrendingUp className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gold-400">TradingBot Pro</h1>
                <p className="text-sm text-muted-foreground">Piattaforma di Trading Automatizzata</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Il Futuro del Trading
              <br />
              <span className="text-gold-400">è Automatico</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Unisciti a migliaia di trader che utilizzano la nostra AI avanzata 
              per massimizzare i profitti nel mercato delle criptovalute.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-gold-400 flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-dark-800/50 rounded-lg border border-gold-500/20">
              <div className="text-2xl font-bold text-gold-400">98.7%</div>
              <div className="text-sm text-muted-foreground">Precisione</div>
            </div>
            <div className="p-4 bg-dark-800/50 rounded-lg border border-gold-500/20">
              <div className="text-2xl font-bold text-gold-400">€2.4M</div>
              <div className="text-sm text-muted-foreground">Profitti Totali</div>
            </div>
            <div className="p-4 bg-dark-800/50 rounded-lg border border-gold-500/20">
              <div className="text-2xl font-bold text-gold-400">24/7</div>
              <div className="text-sm text-muted-foreground">Operativo</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Branding */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500 text-dark-900">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gold-400">TradingBot Pro</h1>
            </div>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-dark-800">
              <TabsTrigger value="login" className="data-[state=active]:bg-gold-500 data-[state=active]:text-dark-900">
                Accedi
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-gold-500 data-[state=active]:text-dark-900">
                Registrati
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="bg-card border-border">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-foreground">Bentornato!</CardTitle>
                  <CardDescription>
                    Accedi al tuo account per continuare il trading
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="La tua email"
                        className="pl-10 bg-dark-800 border-border text-foreground"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="La tua password"
                        className="pl-10 pr-10 bg-dark-800 border-border text-foreground"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 px-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        Ricordami
                      </label>
                    </div>
                    <Link 
                      to="/forgot-password"
                      className="text-sm text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      Password dimenticata?
                    </Link>
                  </div>

                  <Button className="w-full bg-gold-500 text-dark-900 hover:bg-gold-400">
                    Accedi
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Oppure</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full border-border">
                    <Bot className="mr-2 h-4 w-4" />
                    Prova la Demo
                  </Button>

                  {/* 2FA Notice */}
                  <div className="flex items-center gap-2 p-3 bg-gold-500/10 border border-gold-500/20 rounded-lg">
                    <Shield className="h-4 w-4 text-gold-400" />
                    <div className="text-sm">
                      <span className="text-foreground font-medium">Sicurezza Avanzata:</span>
                      <span className="text-muted-foreground ml-1">
                        L'autenticazione a due fattori è obbligatoria
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card className="bg-card border-border">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-foreground">Inizia Oggi</CardTitle>
                  <CardDescription>
                    Crea il tuo account e inizia a fare trading
                  </CardDescription>
                  <div className="flex justify-center">
                    <Badge className="bg-gold-500 text-dark-900">
                      Prima settimana gratuita
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-foreground">Nome</Label>
                      <Input
                        id="firstName"
                        placeholder="Nome"
                        className="bg-dark-800 border-border text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-foreground">Cognome</Label>
                      <Input
                        id="lastName"
                        placeholder="Cognome"
                        className="bg-dark-800 border-border text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registerEmail" className="text-foreground">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="registerEmail"
                        type="email"
                        placeholder="La tua email"
                        className="pl-10 bg-dark-800 border-border text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registerPassword" className="text-foreground">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="registerPassword"
                        type="password"
                        placeholder="Crea una password sicura"
                        className="pl-10 bg-dark-800 border-border text-foreground"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Almeno 8 caratteri con lettere, numeri e simboli
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">Telefono (per 2FA)</Label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+39 123 456 7890"
                        className="pl-10 bg-dark-800 border-border text-foreground"
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" className="mt-1" />
                    <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                      Accetto i{" "}
                      <Link to="/terms" className="text-gold-400 hover:text-gold-300">
                        Termini di Servizio
                      </Link>{" "}
                      e la{" "}
                      <Link to="/privacy" className="text-gold-400 hover:text-gold-300">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <Button className="w-full bg-gold-500 text-dark-900 hover:bg-gold-400">
                    Crea Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Hai già un account?{" "}
                    <button 
                      className="text-gold-400 hover:text-gold-300 transition-colors"
                      onClick={() => {
                        const loginTab = document.querySelector('[value="login"]') as HTMLElement;
                        loginTab?.click();
                      }}
                    >
                      Accedi qui
                    </button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Security Notice */}
          <div className="text-center text-xs text-muted-foreground">
            <Shield className="inline h-3 w-3 mr-1" />
            Connessione sicura SSL • I tuoi dati sono protetti
          </div>
        </div>
      </div>
    </div>
  );
}
