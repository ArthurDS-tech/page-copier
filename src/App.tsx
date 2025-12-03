import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Conversations from "./pages/Conversations";
import Customers from "./pages/Customers";
import Flows from "./pages/Flows";
import Agents from "./pages/Agents";
import Analytics from "./pages/Analytics";
import Training from "./pages/Training";
import Settings from "./pages/Settings";
import Timeline from "./pages/Timeline";
import Calendar from "./pages/Calendar";
import Progress from "./pages/Progress";
import Forms from "./pages/Forms";
import InstagramDirect from "./pages/InstagramDirect";
import Webchat from "./pages/Webchat";
import WhatsApp from "./pages/WhatsApp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/conversations" element={<Conversations />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/flows" element={<Flows />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/training" element={<Training />} />
          <Route path="/settings" element={<Settings />} />
          {/* Channels */}
          <Route path="/whatsapp" element={<WhatsApp />} />
          <Route path="/instagram-direct" element={<InstagramDirect />} />
          <Route path="/webchat" element={<Webchat />} />
          {/* Extra pages */}
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/forms" element={<Forms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
