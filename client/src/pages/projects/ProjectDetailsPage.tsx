import { useState } from 'react';
import { AnimatedPage } from '@/app/components/common/AnimatedPage';
import { TaskDrawer } from '@/app/components/tasks/TaskDrawer';

export function ProjectDetailsPage() {
  const [open, setOpen] = useState(false);

  return (
    <AnimatedPage>
      <nav className="text-sm text-slate-500">Projects / Website Revamp</nav>
      <h1 className="mt-2 text-2xl font-semibold">Website Revamp</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        {['Overview', 'Tasks', 'Calendar', 'Members', 'Activity'].map((tab) => (
          <button key={tab} className="rounded-lg border px-3 py-1.5 text-sm">
            {tab}
          </button>
        ))}
      </div>
      <button onClick={() => setOpen(true)} className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
        Open task drawer
      </button>
      <TaskDrawer open={open} onClose={() => setOpen(false)} />
    </AnimatedPage>
  );
}
