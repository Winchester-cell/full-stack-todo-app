'use client'
import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = "success", duration = 3000) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-4 left-4 z-[9999999] space-y-2 max-w-xs w-full">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`px-4 py-4 rounded shadow text-white animate-fade-in-down ${toast.type === "error"
                            ? "bg-red-500"
                            : toast.type === "warning"
                                ? "bg-yellow-500"
                                : "bg-green-600"
                            }`}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
