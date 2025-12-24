'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import { cn } from '@/app/_lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  tags,
  githubUrl,
  liveUrl,
  imageUrl,
  featured = false,
  className,
}: ProjectCardProps) {
  return (
    <article
      className={cn(
        'group relative flex flex-col rounded-xl border bg-card',
        'overflow-hidden transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-1',
        featured && 'ring-2 ring-primary/20',
        className,
      )}
    >
      {imageUrl && (
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {featured && (
            <span className="absolute top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              Featured
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 gap-3">
        <h3 className="font-semibold text-lg leading-tight">{title}</h3>
        <p className="text-sm text-muted-foreground flex-1">{description}</p>

        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3 pt-1">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              Code
            </Link>
          )}
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Live
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
