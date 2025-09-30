"use client";

import React from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface ToasterProps {
  message: string;
  description: string;
  duration?: number;
}
export default function Toast({
  message = "Unauthorized",
  description = "You must be signed in to view this page.",
  duration = 8000,
}: Partial<ToasterProps>) {
  toast.custom(
    (t) => (
      <div
        className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md p-4 shadow-lg flex items-start justify-between w-full max-w-sm"
        data-id={t}
        role="alert"
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-md font-semibold">
            {message}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast.dismiss(t)}
              aria-label="Close"
              className="translate-x-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    ),
    { duration }
  );
}
