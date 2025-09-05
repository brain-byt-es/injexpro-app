import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center text-center py-16">
      <AlertTriangle className="h-16 w-16 text-primary" />
      <h1 className="mt-8 font-serif text-5xl font-extrabold">
        404 - Empty Vial
      </h1>
      <p className="mt-4 max-w-lg text-lg text-muted-foreground">
        Oops! Looks like this vial is empty. We couldn’t draw up the page you requested.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">
          Reload your syringe here
        </Link>
      </Button>
    </div>
  );
}