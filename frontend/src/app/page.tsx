'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, TrendingUp, BarChart3 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(user.role === 'borrower' ? '/borrower/dashboard' : '/lender/dashboard');
    }
  }, [user, router]);

  if (loading || user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 flex flex-col">
      <header className="page-container w-full py-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">
            C
          </div>
          <span className="font-bold text-2xl tracking-tight">CreditLens</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="btn btn-secondary">Login</Link>
          <Link href="/register" className="btn btn-primary">Sign Up</Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10">
        <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
        </div>

        <div className="animate-fade-in max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
            Now live for Thin-File Borrowers
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
            Unlock your <span className="gradient-text">financial potential</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-secondary-foreground/80 max-w-2xl mx-auto">
            The intelligent credit scoring platform that sees beyond traditional CIBIL scores to empower millions of thin-file borrowers in India.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/register?role=borrower" className="btn btn-primary text-lg px-8 py-4">
              I want a loan <ArrowRight size={20} />
            </Link>
            <Link href="/register?role=lender" className="btn btn-secondary text-lg px-8 py-4 glass">
              I am a lender
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-32 animate-fade-in delay-200">
          <div className="card text-left space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-bold">Alternative Data Scoring</h3>
            <p className="text-secondary-foreground/70">We analyze UPI transactions, utility bills, and non-traditional data to build a holistic financial profile.</p>
          </div>
          <div className="card text-left space-y-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold">OCEN Ready</h3>
            <p className="text-secondary-foreground/70">Seamlessly integrate with the Open Credit Enablement Network for instant lender matchmaking.</p>
          </div>
          <div className="card text-left space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold">Improvement Roadmap</h3>
            <p className="text-secondary-foreground/70">Get actionable AI-driven insights to improve your score over a 3, 6, and 12-month horizon.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
