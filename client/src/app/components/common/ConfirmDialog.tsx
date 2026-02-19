import * as Dialog from '@radix-ui/react-dialog';
import type { PropsWithChildren } from 'react';

type ConfirmDialogProps = PropsWithChildren<{
  title: string;
  description: string;
  onConfirm: () => void;
}>;

export function ConfirmDialog({ title, description, onConfirm, children }: ConfirmDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-slate-500">{description}</Dialog.Description>
          <div className="mt-6 flex justify-end gap-2">
            <Dialog.Close className="rounded-md border px-3 py-1.5">Cancel</Dialog.Close>
            <Dialog.Close onClick={onConfirm} className="rounded-md bg-red-600 px-3 py-1.5 text-white">
              Confirm
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
