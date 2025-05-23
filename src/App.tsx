
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProjectProvider } from "./contexts/ProjectContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectSwitcher from "./components/ProjectSwitcher";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ProjectProvider>
        <div className="flex flex-col min-h-screen">
          <header className="border-b bg-white p-2 shadow-sm">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">Poster Generator</h1>
              <ProjectSwitcher />
            </div>
          </header>
          <main className="flex-1">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </main>
        </div>
      </ProjectProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
