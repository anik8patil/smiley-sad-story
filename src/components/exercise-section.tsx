import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmotionCard } from '@/components/ui/emotion-card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react';
import { ChatBubble } from '@/components/ui/chat-bubble';
import mayaAvatar from '@/assets/maya-character.png';
import alexAvatar from '@/assets/alex-character.png';

interface Exercise {
  id: string;
  text: string;
  correctAnswer: 'positive' | 'negative' | 'neutral';
  explanation: string;
}

const exercises: Exercise[] = [
  {
    id: 'ex1',
    text: "I got an A+ on my math test!",
    correctAnswer: 'positive',
    explanation: "Words like 'A+' (a great grade) show happiness and achievement, making this positive!"
  },
  {
    id: 'ex2',
    text: "This movie is so boring.",
    correctAnswer: 'negative',
    explanation: "'Boring' is a negative word that shows the person doesn't like the movie."
  },
  {
    id: 'ex3',
    text: "The weather today is cloudy.",
    correctAnswer: 'neutral',
    explanation: "This is just stating a fact about weather without showing any emotions - it's neutral."
  },
  {
    id: 'ex4',
    text: "I can't wait for summer vacation!",
    correctAnswer: 'positive',
    explanation: "'Can't wait' shows excitement and anticipation, which are positive emotions!"
  },
  {
    id: 'ex5',
    text: "My phone battery died during the game.",
    correctAnswer: 'negative',
    explanation: "While not using strong negative words, this describes an unfortunate situation that would be frustrating."
  }
];

export function ExerciseSection() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleAnswerSelect = (emotion: string) => {
    if (showResult) return;
    setSelectedAnswer(emotion);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    setShowResult(true);
    
    if (selectedAnswer === exercises[currentExercise].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentExercise(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  const current = exercises[currentExercise];
  const isCorrect = selectedAnswer === current.correctAnswer;

  if (completed) {
    const percentage = Math.round((score / exercises.length) * 100);
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-card gradient-card text-center p-8">
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <Award className="w-16 h-16 text-primary animate-bounce" />
            </div>
            
            <h3 className="text-3xl font-bold gradient-hero bg-clip-text text-transparent">
              Congratulations, Emotion Detective!
            </h3>
            
            <div className="space-y-2">
              <p className="text-xl">You scored {score} out of {exercises.length}!</p>
              <p className="text-lg text-muted-foreground">That's {percentage}% correct!</p>
            </div>

            <div className="space-y-4">
              <ChatBubble character="maya" avatar={mayaAvatar}>
                <p>
                  {percentage >= 80 
                    ? "Excellent work! You're a natural emotion detective. You really understand how to spot emotional clues in text!"
                    : percentage >= 60
                    ? "Good job! You're getting the hang of emotion detection. Keep practicing and you'll be an expert soon!"
                    : "Don't worry, emotion detection takes practice! Try again and pay attention to the emotion words like 'love', 'hate', 'excited', and 'boring'."
                  }
                </p>
              </ChatBubble>
              
              <ChatBubble character="alex" avatar={alexAvatar}>
                <p>
                  This was so much fun! I never knew computers could be such good emotion detectives. Now I understand how sentiment analysis works!
                </p>
              </ChatBubble>
            </div>

            <Button 
              onClick={handleRestart}
              className="gradient-button shadow-button"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
          Emotion Detective Challenge
        </h3>
        <div className="flex justify-center gap-2">
          <Badge variant="outline">
            Question {currentExercise + 1} of {exercises.length}
          </Badge>
          <Badge variant="secondary">
            Score: {score}/{currentExercise + (showResult && isCorrect ? 1 : 0)}
          </Badge>
        </div>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-center text-lg">
            What emotion does this text show?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-6 bg-muted/50 rounded-lg">
            <p className="text-xl font-medium">"{current.text}"</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <EmotionCard
              emotion="positive"
              onClick={() => handleAnswerSelect('positive')}
              isActive={selectedAnswer === 'positive'}
              className="p-6 text-center"
            >
              <div className="space-y-2">
                <div className="text-2xl">😊</div>
                <div className="font-semibold">Positive</div>
                <div className="text-sm opacity-75">Happy, excited, love</div>
              </div>
            </EmotionCard>

            <EmotionCard
              emotion="negative"
              onClick={() => handleAnswerSelect('negative')}
              isActive={selectedAnswer === 'negative'}
              className="p-6 text-center"
            >
              <div className="space-y-2">
                <div className="text-2xl">😞</div>
                <div className="font-semibold">Negative</div>
                <div className="text-sm opacity-75">Sad, angry, hate</div>
              </div>
            </EmotionCard>

            <EmotionCard
              emotion="neutral"
              onClick={() => handleAnswerSelect('neutral')}
              isActive={selectedAnswer === 'neutral'}
              className="p-6 text-center"
            >
              <div className="space-y-2">
                <div className="text-2xl">😐</div>
                <div className="font-semibold">Neutral</div>
                <div className="text-sm opacity-75">Calm, factual, ok</div>
              </div>
            </EmotionCard>
          </div>

          {showResult && (
            <div className="space-y-4 animate-in slide-in-from-bottom-5">
              <div className={`flex items-center gap-2 justify-center p-4 rounded-lg ${
                isCorrect ? 'bg-positive-light text-positive' : 'bg-negative-light text-negative'
              }`}>
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <XCircle className="w-6 h-6" />
                )}
                <span className="font-semibold">
                  {isCorrect ? 'Correct!' : 'Not quite right'}
                </span>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm">
                  <strong>Explanation:</strong> {current.explanation}
                  {!isCorrect && (
                    <span className="block mt-2">
                      The correct answer was <strong>{current.correctAnswer}</strong>.
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}

          <div className="text-center">
            {!showResult ? (
              <Button 
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="gradient-button shadow-button"
                size="lg"
              >
                Submit Answer
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                className="gradient-button shadow-button"
                size="lg"
              >
                {currentExercise < exercises.length - 1 ? 'Next Question' : 'See Results'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}