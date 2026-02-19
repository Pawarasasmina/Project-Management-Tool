import { AnimatedPage } from '@/app/components/common/AnimatedPage';
import { EmptyState } from '@/app/components/common/EmptyState';
import { Button } from '@/components/ui/button';

export function ProjectsPage() {
  return (
    <AnimatedPage>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Button>New Project</Button>
      </div>
      <div className="mt-6">
        <EmptyState title="No projects yet" description="Create your first project and start assigning tasks." />
      </div>
    </AnimatedPage>
  );
}
