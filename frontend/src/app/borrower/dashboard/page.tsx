'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { ArrowRight, UserPlus, Upload, ShieldAlert } from 'lucide-react';

export default function BorrowerDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-secondary-foreground/70 mt-2">
          Track your credit journey and unlock loan opportunities.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card glass relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <UserPlus size={100} />
          </div>
          <h3 className="text-xl font-bold mb-2">Step 1: Onboarding</h3>
          <p className="text-sm text-secondary-foreground/70 mb-6 relative z-10">
            Complete your financial profile to help us understand your background.
          </p>
          <Link href="/borrower/onboarding" className="btn btn-primary relative z-10 w-full">
            Start <ArrowRight size={16} />
          </Link>
        </div>

        <div className="card glass relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Upload size={100} />
          </div>
          <h3 className="text-xl font-bold mb-2">Step 2: Upload Docs</h3>
          <p className="text-sm text-secondary-foreground/70 mb-6 relative z-10">
            Securely connect your bank account or upload UPI statements.
          </p>
          <Link href="/borrower/upload" className="btn btn-secondary relative z-10 w-full">
            Upload <ArrowRight size={16} />
          </Link>
        </div>

        <div className="card glass relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldAlert size={100} />
          </div>
          <h3 className="text-xl font-bold mb-2">Step 3: Credit Score</h3>
          <p className="text-sm text-secondary-foreground/70 mb-6 relative z-10">
            Discover your alternative credit score and what's affecting it.
          </p>
          <Link href="/borrower/score" className="btn btn-secondary relative z-10 w-full">
            View Score <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
