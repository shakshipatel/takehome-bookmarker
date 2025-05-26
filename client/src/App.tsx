import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import store from "./store";

import RoutesWrapper from "./RoutesWrapper";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RoutesWrapper />
          </BrowserRouter>
        </TooltipProvider>
        <ToastContainer />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
