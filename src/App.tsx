import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Agents from "./pages/Agents";
import AgentCreate from "./pages/AgentCreate";
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
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected routes - will add ProtectedRoute wrapper when backend is connected */}
              <Route path="/" element={<Index />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/agents/create" element={<AgentCreate />} />
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
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
