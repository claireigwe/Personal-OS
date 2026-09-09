"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/confirm-modal";
import { resetProgressAction } from "./actions";

export function ResetProgressButton() {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    setShowConfirm(false);
    startTransition(async () => {
      try {
        await resetProgressAction();
      } catch (error) {
        console.error("Failed to reset progress", error);
      }
    });
  };

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setShowConfirm(true)}
        disabled={isPending}
        className="w-full"
      >
        {isPending ? "Resetting..." : "Reset Progress"}
      </Button>
      {showConfirm && (
        <ConfirmModal
          title="Reset Progress"
          message="Are you sure you want to reset your learning progress and streak? This action cannot be undone."
          confirmLabel="Reset"
          onConfirm={handleReset}
          onDismiss={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
