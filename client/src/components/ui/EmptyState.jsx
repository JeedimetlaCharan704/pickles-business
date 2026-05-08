import { motion } from 'framer-motion';

export const EmptyState = ({ icon: Icon, title, description, action }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16 px-4">
    {Icon && <Icon className="w-16 h-16 text-muted mx-auto mb-4" />}
    <h3 className="text-xl font-heading font-semibold text-primary mb-2">{title}</h3>
    <p className="text-muted mb-6">{description}</p>
    {action}
  </motion.div>
);
