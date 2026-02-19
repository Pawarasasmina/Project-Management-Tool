import type { PropsWithChildren } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function AnimatedPage({ children }: PropsWithChildren) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}
