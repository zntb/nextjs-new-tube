'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search, Play, TvMinimal } from 'lucide-react';

function AnimatedStatic() {
  const [lines, setLines] = useState<
    Array<{ id: number; opacity: number; y: number }>
  >([]);

  useEffect(() => {
    const generateLines = () => {
      const newLines = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        opacity: Math.random() * 0.3 + 0.05,
        y: Math.random() * 100,
      }));
      setLines(newLines);
    };

    generateLines();
    const interval = setInterval(generateLines, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='absolute inset-0 overflow-hidden rounded-2xl'>
      {lines.map(line => (
        <div
          key={line.id}
          className='absolute left-0 right-0 h-px bg-foreground/20'
          style={{
            top: `${line.y}%`,
            opacity: line.opacity,
          }}
        />
      ))}
    </div>
  );
}

function GlitchText({ children }: { children: string }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const glitch = () => {
      if (Math.random() > 0.85) {
        setOffset({
          x: (Math.random() - 0.5) * 6,
          y: (Math.random() - 0.5) * 4,
        });
        setTimeout(() => setOffset({ x: 0, y: 0 }), 100);
      }
    };

    const interval = setInterval(glitch, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className='relative inline-block'>
      <span
        className='absolute text-red-500/30'
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
        aria-hidden
      >
        {children}
      </span>
      <span
        className='absolute text-blue-500/30'
        style={{
          transform: `translate(${-offset.x}px, ${-offset.y}px)`,
        }}
        aria-hidden
      >
        {children}
      </span>
      <span className='relative'>{children}</span>
    </span>
  );
}

export default function NotFound() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (trimmed) {
        router.push(`/search?query=${encodeURIComponent(trimmed)}`);
      }
    },
    [query, router],
  );

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background px-4'>
      <div className='w-full max-w-lg text-center'>
        {/* Animated TV screen */}
        <div className='relative mx-auto mb-8 flex h-48 w-72 items-center justify-center rounded-2xl border-2 border-border bg-muted/50 sm:h-56 sm:w-80'>
          <AnimatedStatic />
          <div className='relative z-10 flex flex-col items-center gap-2'>
            <TvMinimal className='h-10 w-10 text-muted-foreground/60' />
            <p className='text-xs font-medium text-muted-foreground/60'>
              No signal
            </p>
          </div>
          {/* TV stand */}
          <div className='absolute -bottom-3 left-1/2 h-3 w-20 -translate-x-1/2 rounded-b-lg border-x-2 border-b-2 border-border bg-muted/80' />
        </div>

        {/* 404 heading with glitch */}
        <h1 className='mb-3 text-7xl font-black tracking-tight text-foreground sm:text-8xl'>
          <GlitchText>404</GlitchText>
        </h1>

        <h2 className='mb-2 text-xl font-semibold text-foreground sm:text-2xl'>
          Page not found
        </h2>

        <p className='mb-8 text-sm text-muted-foreground sm:text-base'>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Try searching for what you need or head back to the home page.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className='mb-6'>
          <div className='flex items-center gap-2'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              <input
                type='text'
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder='Search for videos...'
                className='h-10 w-full rounded-full border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring'
              />
            </div>
            <Button
              type='submit'
              size='icon'
              variant='secondary'
              className='h-10 w-10 shrink-0 rounded-full'
            >
              <Search className='h-4 w-4' />
            </Button>
          </div>
        </form>

        {/* Action buttons */}
        <div className='flex flex-col items-center gap-3 sm:flex-row sm:justify-center'>
          <Button asChild variant='default' className='w-full sm:w-auto'>
            <Link href='/'>
              <Home className='h-4 w-4' />
              Back to Home
            </Link>
          </Button>
          <Button
            variant='outline'
            className='w-full sm:w-auto'
            onClick={() => router.back()}
          >
            <ArrowLeft className='h-4 w-4' />
            Go Back
          </Button>
          <Button asChild variant='ghost' className='w-full sm:w-auto'>
            <Link href='/feed/trending'>
              <Play className='h-4 w-4' />
              Trending
            </Link>
          </Button>
        </div>

        {/* Subtle branding */}
        <p className='mt-12 text-xs text-muted-foreground/50'>NewTube</p>
      </div>
    </div>
  );
}
