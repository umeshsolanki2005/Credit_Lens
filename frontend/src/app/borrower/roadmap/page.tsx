'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Target, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        // Mocking the hurting features since we didn't pass them via context
        const hurting = ['EXT_SOURCE_2', 'DAYS_EMPLOYED'];
        const { data } = await api.post('/roadmap', { hurting });
        setRoadmap(data);
      } catch (err) {
        console.error('Failed to fetch roadmap', err);
        // Mock data for demo
        setRoadmap({
          '3_months': ['Clear any outstanding utility bills', 'Maintain minimum balance of ₹2,000'],
          '6_months': ['Stay at current job for 6+ months', 'Increase UPI transaction frequency'],
          '12_months': ['Apply for a micro-loan and repay on time to build formal credit']
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
        <p>Generating your personalized roadmap...</p>
      </div>
    );
  }

  const timelines = [
    { key: '3_months', title: '3-Month Plan', color: 'bg-primary' },
    { key: '6_months', title: '6-Month Plan', color: 'bg-accent' },
    { key: '12_months', title: '12-Month Plan', color: 'bg-purple-500' }
  ];

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <Target size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Improvement Roadmap</h1>
          <p className="text-secondary-foreground/70 text-sm">Actionable steps to boost your score</p>
        </div>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {timelines.map((timeline, index) => {
          const items = roadmap?.[timeline.key] || [];
          return (
            <div key={timeline.key} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 border-background ${timeline.color} text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10`}>
                <span className="font-bold">{index + 1}</span>
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] card glass p-6">
                <h3 className="font-bold text-lg mb-4">{timeline.title}</h3>
                <ul className="space-y-3">
                  {items.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-secondary-foreground/80">
                      <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center pt-12">
        <Link href="/borrower/simulator" className="btn btn-primary text-lg px-8 py-3">
          Try Loan Simulator <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
