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
      <body className="h-screen flex flex-col items-center justify-center p-4 space-y-3 text-center">
        <h2 className="text-4xl font-bold">Something went wrong!</h2>
        <p>{error.message}</p>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  );
}
