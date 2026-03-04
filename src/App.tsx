import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import Dashboard from "@/pages/Dashboard";
import Accidents from "@/pages/Accidents";
import Violations from "@/pages/Violations";
import RoadInfo from "@/pages/RoadInfo";
import Vehicles from "@/pages/Vehicles";
import Alerts from "@/pages/Alerts";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <AppHeader />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/accidents" element={<Accidents />} />
              <Route path="/violations" element={<Violations />} />
              <Route path="/road-info" element={<RoadInfo />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
