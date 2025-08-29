import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmotionCard } from '@/components/ui/emotion-card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart, Frown, Meh } from 'lucide-react';

interface SentimentResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  explanation: string;
}

export function SentimentAnalyzer() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simple rule-based sentiment analysis for demonstration
  const analyzeSentiment = (text: string): SentimentResult => {
    const positiveWords = ['happy', 'love', 'great', 'amazing', 'wonderful', 'fantastic', 'excellent', 'awesome', 'good', 'beautiful', 'perfect', 'joy', 'excited', 'brilliant'];
    const negativeWords = ['sad', 'hate', 'terrible', 'awful', 'horrible', 'bad', 'worst', 'angry', 'disappointed', 'upset', 'frustrated', 'annoyed'];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
      if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
    });
    
    let sentiment: 'positive' | 'negative' | 'neutral';
    let confidence: number;
    let explanation: string;
    
    if (positiveCount > negativeCount) {
      sentiment = 'positive';
      confidence = Math.min(95, 60 + (positiveCount - negativeCount) * 10);
      explanation = `Found ${positiveCount} positive word(s) and ${negativeCount} negative word(s). The positive words outweigh the negative ones!`;
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative';
      confidence = Math.min(95, 60 + (negativeCount - positiveCount) * 10);
      explanation = `Found ${negativeCount} negative word(s) and ${positiveCount} positive word(s). The negative words outweigh the positive ones.`;
    } else {
      sentiment = 'neutral';
      confidence = 75;
      explanation = positiveCount === 0 && negativeCount === 0 
        ? "No strong emotional words detected, so this seems neutral."
        : "Equal positive and negative words found, making this neutral overall.";
    }
    
    return { sentiment, confidence, explanation };
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = analyzeSentiment(text);
    setResult(result);
    setIsAnalyzing(false);
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Heart className="w-5 h-5" />;
      case 'negative': return <Frown className="w-5 h-5" />;
      default: return <Meh className="w-5 h-5" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'positive';
      case 'negative': return 'negative';
      default: return 'neutral';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Sparkles className="w-6 h-6" />
          Emotion Detective Tool
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="sentiment-text" className="text-sm font-medium mb-2 block">
            Enter some text to analyze its emotions:
          </label>
          <Textarea
            id="sentiment-text"
            placeholder="Type something here... like 'I love sunny days!' or 'This homework is terrible.'"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>
        
        <Button 
          onClick={handleAnalyze}
          disabled={!text.trim() || isAnalyzing}
          className="w-full gradient-button shadow-button"
        >
          {isAnalyzing ? (
            <>
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              Analyzing Emotions...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Analyze Emotions
            </>
          )}
        </Button>

        {result && (
          <EmotionCard emotion={result.sentiment as any} className="p-4 animate-in slide-in-from-bottom-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getSentimentIcon(result.sentiment)}
                  <span className="font-semibold capitalize">{result.sentiment}</span>
                </div>
                <Badge variant="secondary">
                  {result.confidence}% confident
                </Badge>
              </div>
              
              <p className="text-sm opacity-90">
                {result.explanation}
              </p>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 bg-${getSentimentColor(result.sentiment)}`}
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>
          </EmotionCard>
        )}
      </CardContent>
    </Card>
  );
}