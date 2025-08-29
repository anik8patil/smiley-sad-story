import React from 'react';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  character: 'maya' | 'alex' | 'user';
  children: React.ReactNode;
  className?: string;
  avatar?: string;
}

export function ChatBubble({ character, children, className, avatar }: ChatBubbleProps) {
  const isUser = character === 'user';
  
  const bubbleStyles = {
    maya: 'bg-gradient-button text-white',
    alex: 'bg-accent text-accent-foreground',
    user: 'bg-primary text-primary-foreground ml-auto',
  };

  return (
    <div className={cn('flex items-start gap-3 mb-4', isUser && 'flex-row-reverse', className)}>
      {avatar && (
        <img 
          src={avatar} 
          alt={`${character} avatar`}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0 shadow-card"
        />
      )}
      <div className={cn(
        'max-w-[70%] px-4 py-3 rounded-2xl shadow-card',
        bubbleStyles[character],
        isUser ? 'rounded-br-md' : 'rounded-bl-md'
      )}>
        {children}
      </div>
    </div>
  );
}