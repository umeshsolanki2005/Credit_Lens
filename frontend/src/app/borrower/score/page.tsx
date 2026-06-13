'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { ShieldCheck, Info, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ScorePage() {
  const [score, setScore] = useState<number | null>(null);
  const [explainData, setExplainData] = useState<{helping: any[], hurting: any[]} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const [scoreRes, explainRes] = await Promise.all([
          api.post('/score'),
          api.post('/explain')
        ]);

        setScore(Math.round(scoreRes.data.credit_score));
        setExplainData(explainRes.data);
      } catch (err) {
        console.error('Failed to fetch score', err);
        // Fallback for demo if backend is not reachable
        setScore(694);
        setExplainData({
          helping: [{ feature: 'UPI_CONSISTENCY', impact: -0.8 }],
          hurting: [{ feature: 'DAYS_EMPLOYED', impact: 0.5 }]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchScore();
  }, []);

  const getScoreColor = (s: number) => {
    if (s >= 700) return 'text-accent';
    if (s >= 500) return 'text-yellow-500';
    return 'text-danger';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="w-32 h-32 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-8"></div>
        <h2 className="text-2xl font-bold">Calculating your score...</h2>
        <p className="text-secondary-foreground/60 mt-2">Running our alternative data ML models</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Your CreditLens Score</h1>
        <div className="relative inline-block">
          <svg className="w-64 h-64 transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-secondary"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={2 * Math.PI * 120 * (1 - ((score || 300) - 300) / 600)}
              className={`${getScoreColor(score || 300)} transition-all duration-1500 ease-out`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-6xl font-extrabold ${getScoreColor(score || 300)}`}>
              {score}
            </span>
            <span className="text-sm text-secondary-foreground/60 mt-2">Out of 900</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card glass">
          <div className="flex items-center gap-2 mb-4 text-accent">
            <TrendingUp size={24} />
            <h3 className="text-xl font-bold">What's Helping</h3>
          </div>
          <ul className="space-y-4">
            {explainData?.helping.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                <div>
                  <p className="font-medium">{item.feature}</p>
                  <p className="text-sm text-secondary-foreground/70">Strong positive indicator</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card glass">
          <div className="flex items-center gap-2 mb-4 text-danger">
            <TrendingDown size={24} />
            <h3 className="text-xl font-bold">What's Hurting</h3>
          </div>
          <ul className="space-y-4">
            {explainData?.hurting.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-danger flex-shrink-0" />
                <div>
                  <p className="font-medium">{item.feature}</p>
                  <p className="text-sm text-secondary-foreground/70">Area for improvement</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end pt-8">
        <Link href="/borrower/roadmap" className="btn btn-primary text-lg px-8 py-3">
          View Improvement Roadmap <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
