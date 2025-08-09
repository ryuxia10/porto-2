import { motion } from 'framer-motion';

export const Button = ({ children, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgb(255 215 0 / 0.5)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="px-6 py-2 bg-transparent border border-brand-gold rounded-md text-brand-gold font-semibold tracking-wide"
      {...props}
    >
      {children}
    </motion.button>
  );
};