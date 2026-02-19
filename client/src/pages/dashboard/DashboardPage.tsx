import { AnimatedPage } from '@/app/components/common/AnimatedPage';
import { EmptyState } from '@/app/components/common/EmptyState';

export function DashboardPage() {
  return (
    <AnimatedPage>
      <h1 className="text-2xl font-semibold">What should I do next?</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {['New Project', 'New Task', 'Invite Member'].map((action) => (
          <button key={action} className="rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm">
            {action}
          </button>
        ))}
      </div>
      <div className="mt-8">
        <EmptyState title="No urgent tasks" description="You’re all caught up. Create a project or assign work to get started." />
      </div>
    </AnimatedPage>
  );
}
