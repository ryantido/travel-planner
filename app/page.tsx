"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950">
      <section className="container mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[2rem]">
            Travel beautifully with <span className="text-primary">Velora</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-prose">
            Plan, document, and share your journeys. Build stunning itineraries,
            visualize destinations on an interactive map, and keep memories
            organized.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/trips"
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-3 text-base font-medium hover:opacity-90 transition"
            >
              Get started
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-md border px-5 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground transition"
            >
              Explore features
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            No credit card required. Open-source and built with Next.js.
          </p>
        </div>
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden ring-1 ring-border shadow-sm">
          <Image
            src="/placeholder.jpg"
            alt="Velora preview"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      <ClientUnauthorizedToast />

      <section id="features" className="container mx-auto px-4 py-4">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="Smart itineraries"
            description="Create, sort, and manage your trip schedule with an intuitive drag-and-drop experience."
            icon="/file.svg"
          />
          <FeatureCard
            title="Beautiful maps"
            description="See every destination on an interactive map for quick context and better planning."
            icon="/globe.svg"
          />
          <FeatureCard
            title="Private by default"
            description="Your trips are yours. Sign in securely with GitHub and keep your data safe."
            icon="/github-mark.svg"
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="rounded-2xl border p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-card">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">
              Ready to plan your next trip?
            </h2>
            <p className="text-muted-foreground">
              Start by creating a new trip and adding your first destination.
            </p>
          </div>
          <Link
            href="/trips"
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-3 text-base font-medium hover:opacity-90 transition w-full md:w-auto"
          >
            Create a trip
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="rounded-xl border p-6 bg-card">
      <div className="flex items-center gap-3 mb-3">
        <Image src={icon} alt="" width={24} height={24} aria-hidden />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

function ClientUnauthorizedToast() {
  const params = useSearchParams();
  const Unauthorized = params.get("unauthorized");
  useEffect(() => {
    if (Unauthorized) {
      toast.custom((t) => (
        <div
          className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md p-4 shadow-lg flex items-start justify-between w-full max-w-sm"
          data-id={t}
          role="alert"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-md text-red-500 font-semibold">
              Unauthorized
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toast.dismiss(t)}
                aria-label="Close"
                className="translate-x-2"
              >
                <X className="w-4 h-4 text-black dark:text-white" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              You must be signed in to view this page.
            </p>
          </div>
        </div>
      ));
    }
  }, [Unauthorized]);
  return null;
}
