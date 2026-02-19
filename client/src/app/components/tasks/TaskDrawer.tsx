import { motion } from 'framer-motion';

type TaskDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function TaskDrawer({ open, onClose }: TaskDrawerProps) {
  if (!open) return null;

  return (
    <>
      <button aria-label="Close task details" onClick={onClose} className="fixed inset-0 bg-black/20" />
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="fixed right-0 top-0 h-full w-full max-w-xl border-l bg-white p-6"
      >
        <h2 className="text-lg font-semibold">Task details</h2>
        <p className="mt-2 text-sm text-slate-500">Milestone 2 will wire full editor, comments, checklist, and activity.</p>
      </motion.aside>
    </>
  );
}
