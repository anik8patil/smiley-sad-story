import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChatBubble } from '@/components/ui/chat-bubble';
import { ChevronRight } from 'lucide-react';
import mayaAvatar from '@/assets/maya-character.png';
import alexAvatar from '@/assets/alex-character.png';

interface StoryStep {
  id: string;
  character: 'maya' | 'alex';
  message: string;
  avatar: string;
}

interface StorySectionProps {
  title: string;
  steps: StoryStep[];
  onComplete?: () => void;
  children?: React.ReactNode;
}

export function StorySection({ title, steps, onComplete, children }: StorySectionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowContinue(true);
    }
  };

  const handleContinue = () => {
    onComplete?.();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center gradient-hero bg-clip-text text-transparent">
        {title}
      </h2>
      
      <div className="bg-card rounded-2xl p-6 shadow-card min-h-[400px]">
        <div className="space-y-4">
          {steps.slice(0, currentStep + 1).map((step, index) => (
            <ChatBubble
              key={step.id}
              character={step.character}
              avatar={step.avatar}
              className={index === currentStep ? 'animate-in slide-in-from-bottom-5' : ''}
            >
              <p className="text-sm md:text-base">{step.message}</p>
            </ChatBubble>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          {!showContinue ? (
            <Button 
              onClick={handleNext}
              className="gradient-button shadow-button animate-bounce-gentle"
            >
              {currentStep < steps.length - 1 ? 'Next' : 'Continue'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <div className="space-y-4 w-full">
              {children}
              {onComplete && (
                <div className="text-center">
                  <Button 
                    onClick={handleContinue}
                    size="lg"
                    className="gradient-button shadow-button"
                  >
                    Let's Practice!
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Story data
export const introSteps: StoryStep[] = [
  {
    id: 'intro-1',
    character: 'alex',
    message: "Hi! I'm Alex, and I just joined the Emotion Detective Academy! But I'm confused... how can computers understand emotions in text?",
    avatar: alexAvatar
  },
  {
    id: 'intro-2',
    character: 'maya',
    message: "Hey Alex! I'm Maya, your AI assistant. Great question! Just like how detectives solve mysteries by looking for clues, computers can detect emotions by looking for special clues in text!",
    avatar: mayaAvatar
  },
  {
    id: 'intro-3',
    character: 'alex',
    message: "Clues in text? What kind of clues?",
    avatar: alexAvatar
  },
  {
    id: 'intro-4',
    character: 'maya',
    message: "Think about it - when you read 'I love ice cream!' vs 'I hate broccoli!', how do you know one is happy and one is not? The words 'love' and 'hate' are emotion clues!",
    avatar: mayaAvatar
  },
  {
    id: 'intro-5',
    character: 'alex',
    message: "Oh! So computers look for happy words and sad words? That's actually pretty smart!",
    avatar: alexAvatar
  },
  {
    id: 'intro-6',
    character: 'maya',
    message: "Exactly! This is called Sentiment Analysis. It's like being a detective, but instead of solving crimes, we're solving emotions! Ready to become an Emotion Detective?",
    avatar: mayaAvatar
  }
];

export const practiceSteps: StoryStep[] = [
  {
    id: 'practice-1',
    character: 'maya',
    message: "Great job learning about emotion clues! Now let's practice. I'll show you our Emotion Detective Tool - it can analyze any text and tell us if it's positive, negative, or neutral.",
    avatar: mayaAvatar
  },
  {
    id: 'practice-2',
    character: 'alex',
    message: "This is so cool! So I can type anything and it will detect the emotions?",
    avatar: alexAvatar
  },
  {
    id: 'practice-3',
    character: 'maya',
    message: "Exactly! Try typing different sentences and see what emotions our detective tool finds. Remember - positive means happy/good, negative means sad/bad, and neutral means in-between!",
    avatar: mayaAvatar
  }
];