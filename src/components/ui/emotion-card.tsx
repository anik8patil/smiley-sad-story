import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface EmotionCardProps {
  emotion: 'positive' | 'negative' | 'neutral';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export function EmotionCard({ emotion, children, className, onClick, isActive }: EmotionCardProps) {
  const emotionStyles = {
    positive: 'border-positive/20 bg-positive-light hover:border-positive/40',
    negative: 'border-negative/20 bg-negative-light hover:border-negative/40',
    neutral: 'border-neutral/20 bg-neutral-light hover:border-neutral/40',
  };

  const activeStyles = {
    positive: 'border-positive bg-positive-light ring-2 ring-positive/30',
    negative: 'border-negative bg-negative-light ring-2 ring-negative/30',
    neutral: 'border-neutral bg-neutral-light ring-2 ring-neutral/30',
  };

  return (
    <Card 
      className={cn(
        'transition-all duration-300 cursor-pointer transform hover:scale-105',
        isActive ? activeStyles[emotion] : emotionStyles[emotion],
        className
      )}
      onClick={onClick}
    >
      {children}
    </Card>
  );
}