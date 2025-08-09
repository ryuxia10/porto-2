// src/context/NotificationContext.jsx

import React, { createContext, useState, useCallback } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message) => {
    setNotification({ id: Date.now(), message });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Notifikasi akan hilang setelah 3 detik
  }, []);

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};