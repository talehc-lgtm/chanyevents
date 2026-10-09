import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import BusinessEvents from "./pages/BusinessEvents";
import CorporateInstitutional from "./pages/CorporateInstitutional";
import Weddings from "./pages/Weddings";
import Careers from "./pages/Careers";
import AdminApplications from "./pages/AdminApplications";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminRanking from "./pages/AdminRanking";
import InVinoItalia from "./pages/InVinoItalia";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/quote" element={<Navigate to="/contact#projet" replace />} />
            <Route path="/business-events" element={<BusinessEvents />} />
            <Route path="/corporate-institutional" element={<CorporateInstitutional />} />
            <Route path="/weddings" element={<Weddings />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/career" element={<Careers />} />
            <Route path="/in-vino-italia-douala-2026" element={<InVinoItalia />} />
            <Route path="/in-vino" element={<Navigate to="/in-vino-italia-douala-2026" replace />} />
            <Route path="/admin/classement" element={<AdminRanking />} />
            <Route path="/admin/candidatures" element={<AdminApplications />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
