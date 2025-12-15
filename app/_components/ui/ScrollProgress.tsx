'use client';

import { useEffect, useState } from 'react';

interface ScrollProgressProps {
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
  className?: string;
}

export function ScrollProgress({
  color = 'hsl(var(--primary))',
  height = 3,
  position = 'top',
  className = '',
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      setProgress((scrollTop / total) * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed left-0 right-0 z-50 ${position === 'top' ? 'top-0' : 'bottom-0'} ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <div
        className="h-full transition-all duration-100 ease-linear"
        style={{
          width: `${progress}%`,
          background: color,
        }}
      />
    </div>
  );
}
