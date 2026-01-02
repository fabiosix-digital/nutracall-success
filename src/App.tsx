import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import Agents from "./pages/Agents";
import PhoneNumbers from "./pages/PhoneNumbers";
import KnowledgeBase from "./pages/KnowledgeBase";
import CallLogs from "./pages/CallLogs";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Employees from "./pages/Employees";
import Automations from "./pages/Automations";
import Settings from "./pages/Settings";
import Billing from "./pages/Billing";
import Voices from "./pages/Voices";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/voices" element={<Voices />} />
            <Route path="/phone-numbers" element={<PhoneNumbers />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/call-logs" element={<CallLogs />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/automations" element={<Automations />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
