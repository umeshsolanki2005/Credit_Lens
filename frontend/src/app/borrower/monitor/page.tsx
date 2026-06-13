'use client';

import { Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MonitorPage() {
  // Mock data showing credit improvement over time
  const data = [
    { month: 'Jan', score: 300 },
    { month: 'Feb', score: 380 },
    { month: 'Mar', score: 450 },
    { month: 'Apr', score: 520 },
    { month: 'May', score: 610 },
    { month: 'Jun', score: 694 },
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <Activity size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Health Monitor</h1>
          <p className="text-secondary-foreground/70 text-sm">Track your credit score over time</p>
        </div>
      </div>

      <div className="card glass p-6">
        <h3 className="text-xl font-bold mb-6">Score History (Last 6 Months)</h3>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--secondary-foreground)" tick={{fill: 'var(--secondary-foreground)'}} />
              <YAxis domain={[300, 900]} stroke="var(--secondary-foreground)" tick={{fill: 'var(--secondary-foreground)'}} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--card)', 
                  borderColor: 'var(--border)',
                  borderRadius: 'var(--radius)',
                  color: 'var(--foreground)'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="var(--primary)" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorScore)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-8 flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/20">
          <div>
            <p className="font-bold text-lg">Great Progress!</p>
            <p className="text-sm text-secondary-foreground/80">Your score increased by 394 points since January.</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-secondary-foreground/60 mb-1">Current Score</p>
            <p className="text-3xl font-bold text-primary">694</p>
          </div>
        </div>
      </div>
    </div>
  );
}
