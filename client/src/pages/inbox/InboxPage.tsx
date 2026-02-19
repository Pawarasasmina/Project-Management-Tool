import { AnimatedPage } from '@/app/components/common/AnimatedPage';
import { EmptyState } from '@/app/components/common/EmptyState';

export function InboxPage() {
  return (
    <AnimatedPage>
      <h1 className="text-2xl font-semibold">Notifications</h1>
      <div className="mt-6">
        <EmptyState title="No notifications" description="Task assignments, due-date changes, and mentions will appear here." />
      </div>
    </AnimatedPage>
  );
}
