/* eslint-disable @typescript-eslint/no-explicit-any */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import LoadingSpinner from "./components/ui/loading-spinner";
import MySchedules from "./pages/MySchedules";

const queryClient = new QueryClient();

function App() {
  const [isFetching, setIsFetching] = useState(true);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    const Zcatalyst = (window as any).catalyst;
    Zcatalyst.auth
      .isUserAuthenticated()
      .then(() => {
        setIsUserAuthenticated(true);
      })
      .catch((err: any) => {
        console.error(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);
  return (
    <>
      {isFetching ? (
        <LoadingSpinner />
      ) : isUserAuthenticated ? (
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/app" element={<Index />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/schedules" element={<MySchedules />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      ) : (
        (window.location.href = "/__catalyst/auth/login")
      )}
    </>
  );
}

export default App;
