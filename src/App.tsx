
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProjectProvider } from "./contexts/ProjectContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportToPDF } from '@/utils/pdfExport';
import ImportExportButtons from "./components/ImportExportButtons";

const queryClient = new QueryClient();

const App = () => {
  const handleExportPDF = () => {
    exportToPDF('poster-content');
  };

  return (
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
                
                <div className="flex items-center space-x-4">
                  <ImportExportButtons />
                  <Button 
                    onClick={handleExportPDF}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export to PDF
                  </Button>
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
};

export default App;
