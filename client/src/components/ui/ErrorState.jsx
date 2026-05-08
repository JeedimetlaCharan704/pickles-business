import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export const ErrorState = ({ message = 'Something went wrong', onRetry }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 px-4">
    <div className="text-danger text-4xl mb-4">⚠️</div>
    <h3 className="text-xl font-heading font-semibold text-primary mb-2">Error</h3>
    <p className="text-muted mb-6">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="btn-primary inline-flex items-center gap-2">
        <RefreshCw className="w-4 h-4" /> Retry
      </button>
    )}
  </motion.div>
);
