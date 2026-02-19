import { AnimatedPage } from '@/app/components/common/AnimatedPage';

export function LoginPage() {
  return (
    <AnimatedPage>
      <div className="mx-auto mt-20 max-w-md rounded-xl border p-8">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500">Milestone 2: wired auth forms with React Hook Form + zod.</p>
      </div>
    </AnimatedPage>
  );
}
