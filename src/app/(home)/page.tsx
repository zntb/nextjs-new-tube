import { HydrateClient, trpc } from '@/trpc/server';
import { PageClient } from './client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default async function Home() {
  void trpc.hello({ text: 'world' });

  return (
    <HydrateClient>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <PageClient />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
}
