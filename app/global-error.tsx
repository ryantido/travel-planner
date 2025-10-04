"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="h-screen grid place-items-center p-4 space-y-4 text-center">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p>{error.message}</p>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  );
}
