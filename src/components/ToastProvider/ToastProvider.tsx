import React from "react";
import useEscapeKey from "../../hooks/useEscapeKey";

export const VARIANT_OPTIONS = [
  "notice",
  "warning",
  "success",
  "error",
] as const;

export type ToastMessage = {
  id: string;
  variant: (typeof VARIANT_OPTIONS)[number];
  message: string;
};

type ToastContextType = {
  toastMessages: ToastMessage[];
  setToastMessages: React.Dispatch<React.SetStateAction<ToastMessage[]>>;
  addToastMessage: (newMessage: ToastMessage) => void;
  dismissToastMessage: (id: string) => void;
};
const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toastMessages, setToastMessages] = React.useState<ToastMessage[]>([]);

  function addToastMessage(newMessage: ToastMessage) {
    setToastMessages([...toastMessages, newMessage]);
  }

  function dismissToastMessage(id: string) {
    setToastMessages(toastMessages.filter((message) => message.id !== id));
  }

  useEscapeKey(() => {
    setToastMessages([]);
  });

  return (
    <ToastContext.Provider
      value={{
        toastMessages,
        setToastMessages,
        addToastMessage,
        dismissToastMessage,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider.");
  }
  return context;
}
