/* eslint-disable react-refresh/only-export-components */
import { loadStripe } from "@stripe/stripe-js";
import React, { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";

import * as apiClient from "../api-client";
import Toast from "../components/Toast";
import { AppContextType, ToastMessage } from "../types/appContextTypes";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY;

const AppContext = createContext<AppContextType | undefined>(undefined);
const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => setToast(toastMessage),
        isLoggedIn: !isError,
        stripePromise,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context as AppContextType;
};
