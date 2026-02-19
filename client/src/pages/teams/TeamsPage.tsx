import { AnimatedPage } from '@/app/components/common/AnimatedPage';
import { EmptyState } from '@/app/components/common/EmptyState';

export function TeamsPage() {
  return (
    <AnimatedPage>
      <h1 className="text-2xl font-semibold">Teams</h1>
      <div className="mt-6">
        <EmptyState title="No teams configured" description="Create a team and assign a leader to begin." />
      </div>
    </AnimatedPage>
  );
}
