'use client';

import { useInView } from 'react-intersection-observer';
import { cn } from '@/app/_lib/utils';

interface Skill {
  name: string;
  level: number;  // 0-100
  category: 'frontend' | 'backend' | 'tools' | 'other';
  icon?: string;
}

const SKILLS: Skill[] = [
  { name: 'React',      level: 90, category: 'frontend' },
  { name: 'TypeScript', level: 85, category: 'frontend' },
  { name: 'Next.js',    level: 82, category: 'frontend' },
  { name: 'Tailwind',   level: 88, category: 'frontend' },
  { name: 'Node.js',    level: 70, category: 'backend'  },
  { name: 'PostgreSQL', level: 60, category: 'backend'  },
  { name: 'Git',        level: 85, category: 'tools'    },
  { name: 'Docker',     level: 55, category: 'tools'    },
  { name: 'C / C++',   level: 65, category: 'other'    },
  { name: 'Python',     level: 60, category: 'other'    },
];

interface SkillBarProps {
  skill: Skill;
  delay: number;
  animate: boolean;
}

function SkillBar({ skill, delay, animate }: SkillBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm font-medium">
        <span>{skill.name}</span>
        <span className="text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all ease-out"
          style={{
            width: animate ? `${skill.level}%` : '0%',
            transitionDuration: '1000ms',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export function SkillsGrid() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {SKILLS.map((skill, i) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            delay={i * 80}
            animate={inView}
          />
        ))}
      </div>
    </section>
  );
}
