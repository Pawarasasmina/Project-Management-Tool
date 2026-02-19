import { AnimatedPage } from '@/app/components/common/AnimatedPage';

export function RegisterPage() {
  return (
    <AnimatedPage>
      <div className="mx-auto mt-20 max-w-md rounded-xl border p-8">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="mt-2 text-sm text-slate-500">Invite-only setup for internal teams.</p>
      </div>
    </AnimatedPage>
  );
}
