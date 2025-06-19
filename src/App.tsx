
import { Toaster } from "@/components/ui/toaster";
import { Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProjectProvider } from "./contexts/ProjectContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Button } from "@/components/ui/button";
import { Download, Monitor, Undo, Redo } from "lucide-react";
import { exportToPDF } from '@/utils/pdfExport';
import ImportExportButtons from "./components/ImportExportButtons";
import { useIsMobile } from "./hooks/use-mobile";
import { useAnalytics } from "./hooks/useAnalytics";
import { useEffect } from "react";

const queryClient = new QueryClient();

const MobileRestrictionMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="text-center max-w-md">
        <Monitor className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Desktop Only</h1>
        <p className="text-gray-600 mb-6">
          PosterMaker is designed for desktop use only. Please open this application on a desktop or laptop computer for the best experience.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            For optimal poster creation and editing, a larger screen is required.
          </p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const isMobile = useIsMobile();
  const { trackPDFExported, trackEvent } = useAnalytics();
  
  // Clear all data on page refresh/exit
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave? All unsaved changes will be lost.';
      return 'Are you sure you want to leave? All unsaved changes will be lost.';
    };

    const handleUnload = () => {
      // Clear all localStorage data
      localStorage.clear();
      // Clear sessionStorage as well
      sessionStorage.clear();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);
  
  const handleExportPDF = () => {
    exportToPDF('poster-content');
    trackPDFExported();
  };

  const handleUndo = () => {
    // Browser undo functionality
    document.execCommand('undo');
    trackEvent('undo_action', { event_category: 'Interaction' });
  };

  const handleRedo = () => {
    // Browser redo functionality  
    document.execCommand('redo');
    trackEvent('redo_action', { event_category: 'Interaction' });
  };

  // Show mobile restriction message on mobile devices
  if (isMobile) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <MobileRestrictionMessage />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ProjectProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <header className="border-b bg-white shadow-sm sticky top-0 z-50">
              <div className="flex justify-between items-center px-6 py-3">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
                      <span className="text-white font-bold text-sm">P</span>
                    </div>
                    <h1 className="text-lg font-semibold text-gray-900">PosterMaker</h1>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      onClick={handleUndo}
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
                    >
                      <Undo className="h-4 w-4" />
                      <span className="text-xs">Undo</span>
                    </Button>
                    <Button 
                      onClick={handleRedo}
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
                    >
                      <Redo className="h-4 w-4" />
                      <span className="text-xs">Redo</span>
                    </Button>
                  </div>
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
