import { persistedStore, store } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { MapProvider } from "react-map-gl";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

const GeneralProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <MapProvider>{children}</MapProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default GeneralProvider;
