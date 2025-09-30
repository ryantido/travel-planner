"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  idleText = "Create Trip",
  pendingText = "Creating",
}: {
  idleText?: string;
  pendingText?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      {pending ? (
        <div className="flex items-center space-x-2">
          <span>{pendingText}</span>
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : (
        idleText
      )}
    </Button>
  );
}
