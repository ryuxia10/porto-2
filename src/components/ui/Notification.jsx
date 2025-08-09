// src/components/ui/Notification.jsx

import React, { useContext } from 'react';
import { NotificationContext } from '../../context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';
import './Notification.css';

const Notification = () => {
  const { notification } = useContext(NotificationContext);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          className="notification-pill"
          // DIUBAH: Tambahkan x: "-50%" di semua tahap
          initial={{ y: -100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: -100, x: "-50%", opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {notification.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;