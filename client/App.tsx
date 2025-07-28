import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import WalletPage from "./pages/Wallet";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Placeholder component for unimplemented pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-96 space-y-4">
    <h1 className="text-2xl font-bold text-foreground">{title}</h1>
    <p className="text-muted-foreground text-center max-w-md">
      Questa sezione è in fase di sviluppo. Continuate a utilizzare l'app per vedere i contenuti di questa pagina.
    </p>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          } />
          <Route path="/bot" element={
            <MainLayout>
              <PlaceholderPage title="Trading Bot" />
            </MainLayout>
          } />
          <Route path="/wallet" element={
            <MainLayout>
              <PlaceholderPage title="Wallet" />
            </MainLayout>
          } />
          <Route path="/users" element={
            <MainLayout>
              <PlaceholderPage title="Gestione Utenti" />
            </MainLayout>
          } />
          <Route path="/premium" element={
            <MainLayout>
              <PlaceholderPage title="Piano Premium" />
            </MainLayout>
          } />
          <Route path="/security" element={
            <MainLayout>
              <PlaceholderPage title="Sicurezza" />
            </MainLayout>
          } />
          <Route path="/docs" element={
            <MainLayout>
              <PlaceholderPage title="Documentazione" />
            </MainLayout>
          } />
          <Route path="/support" element={
            <MainLayout>
              <PlaceholderPage title="Supporto" />
            </MainLayout>
          } />
          <Route path="/settings" element={
            <MainLayout>
              <PlaceholderPage title="Impostazioni" />
            </MainLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
