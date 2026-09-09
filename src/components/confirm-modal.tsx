"use client";

import { Portal } from "@/components/ui/portal";

export function ConfirmModal({
  title,
  message,
  confirmLabel,
  onConfirm,
  onDismiss,
}: {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onDismiss: () => void;
}) {
  return (
    <Portal>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in p-4">
        <div className="mx-auto w-full max-w-sm rounded-3xl border-2 border-white/20 dark:border-white/[0.1] bg-card backdrop-blur-2xl shadow-2xl p-6 grid gap-4 animate-scale-up">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{message}</p>
          <div className="flex gap-3 pt-2">
            <button
              onClick={onDismiss}
              className="flex-1 h-12 rounded-xl bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 h-12 rounded-xl bg-destructive text-white font-bold hover:bg-destructive/90 transition-colors shadow-sm"
            >
              {confirmLabel ?? "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
