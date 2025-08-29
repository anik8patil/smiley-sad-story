import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Sparkles, Target, BookOpen } from 'lucide-react';
import { StorySection, introSteps, practiceSteps } from '@/components/story-section';
import { SentimentAnalyzer } from '@/components/sentiment-analyzer';
import { ExerciseSection } from '@/components/exercise-section';

type Section = 'intro' | 'story' | 'practice' | 'exercise' | 'complete';

const Index = () => {
  const [currentSection, setCurrentSection] = useState<Section>('intro');

  if (currentSection === 'intro') {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Brain className="w-20 h-20 text-white animate-float" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
              Emotion Detective Academy
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Join Maya and Alex on an exciting adventure to learn how computers understand emotions in text!
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-glow max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                <div className="text-center space-y-3">
                  <Sparkles className="w-12 h-12 mx-auto text-yellow-300" />
                  <h3 className="font-semibold">Interactive Story</h3>
                  <p className="text-sm opacity-90">Learn through engaging conversations with AI characters</p>
                </div>
                <div className="text-center space-y-3">
                  <Target className="w-12 h-12 mx-auto text-green-300" />
                  <h3 className="font-semibold">Hands-on Practice</h3>
                  <p className="text-sm opacity-90">Try real sentiment analysis with our detective tool</p>
                </div>
                <div className="text-center space-y-3">
                  <BookOpen className="w-12 h-12 mx-auto text-blue-300" />
                  <h3 className="font-semibold">Fun Exercises</h3>
                  <p className="text-sm opacity-90">Test your emotion detection skills with challenges</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={() => setCurrentSection('story')}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 shadow-button text-lg px-8 py-6"
          >
            Start Your Detective Journey!
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (currentSection === 'story') {
    return (
      <div className="min-h-screen bg-background p-4 py-12">
        <StorySection
          title="What is Sentiment Analysis?"
          steps={introSteps}
          onComplete={() => setCurrentSection('practice')}
        />
      </div>
    );
  }

  if (currentSection === 'practice') {
    return (
      <div className="min-h-screen bg-background p-4 py-12">
        <StorySection
          title="Try Our Emotion Detective Tool"
          steps={practiceSteps}
          onComplete={() => setCurrentSection('exercise')}
        >
          <SentimentAnalyzer />
        </StorySection>
      </div>
    );
  }

  if (currentSection === 'exercise') {
    return (
      <div className="min-h-screen bg-background p-4 py-12">
        <ExerciseSection />
        <div className="text-center mt-8">
          <Button 
            onClick={() => setCurrentSection('intro')}
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
          >
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;
