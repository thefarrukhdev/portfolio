'use client';

import { useEffect, useRef, useState } from 'react';

interface TypewriterTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursor?: boolean;
}

export function TypewriterText({
  texts,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  className = '',
  cursor = true,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = texts[textIndex] ?? '';

    if (phase === 'typing') {
      if (charIndex < current.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((i) => i + 1);
        }, typingSpeed);
      } else {
        timeoutRef.current = setTimeout(() => setPhase('pausing'), pauseDuration);
      }
    } else if (phase === 'pausing') {
      setPhase('deleting');
    } else if (phase === 'deleting') {
      if (charIndex > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((i) => i - 1);
        }, deletingSpeed);
      } else {
        setTextIndex((i) => (i + 1) % texts.length);
        setPhase('typing');
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [charIndex, phase, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayed}
      {cursor && (
        <span className="animate-pulse ml-0.5 inline-block w-0.5 h-[1em] bg-current align-middle" />
      )}
    </span>
  );
}
