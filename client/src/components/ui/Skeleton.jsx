import { motion } from 'framer-motion';

export const Skeleton = ({ className = '' }) => (
  <motion.div
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity }}
    className={`bg-gray-200 rounded-xl ${className}`}
  />
);

export const ProductCardSkeleton = () => (
  <div className="card p-4">
    <Skeleton className="w-full h-48 mb-4" />
    <Skeleton className="w-3/4 h-4 mb-2" />
    <Skeleton className="w-1/2 h-4 mb-2" />
    <Skeleton className="w-1/4 h-6" />
  </div>
);

export const HeroSkeleton = () => (
  <Skeleton className="w-full h-64 md:h-96" />
);
