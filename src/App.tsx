
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProjectProvider } from "./contexts/ProjectContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectSwitcher from "./components/ProjectSwitcher";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ProjectProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <header className="border-b bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center px-6 py-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <h1 className="text-lg font-semibold text-gray-900">PosterMaker</h1>
              </div>
              
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Templates</a>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">My Posters</a>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Inspiration</a>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  New Poster
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <User className="h-5 w-5" />
                </Button>
              </nav>
              
              <div className="md:hidden">
                <ProjectSwitcher />
              </div>
            </div>
          </header>
          <main className="flex-1">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
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
