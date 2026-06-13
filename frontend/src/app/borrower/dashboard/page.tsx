'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function BorrowerDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="border-b-2 border-[#320070] pb-4">
        <h1 className="text-3xl font-black uppercase tracking-tight text-[#320070]">Welcome, {user?.name}</h1>
        <p className="text-[#64748B] text-xs font-bold uppercase tracking-wider mt-1">
          Track your credit journey and unlock loan opportunities.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card bg-white border-2 border-[#320070] shadow-[4px_4px_0px_0px_#320070] hover:shadow-[6px_6px_0px_0px_#7100eb] transition-all p-6 hover:-translate-y-0.5">
          <div className="w-9 h-9 rounded bg-[#ecebe8] border border-[#320070] flex items-center justify-center text-[#320070] font-black text-xs mb-4">
            1
          </div>
          <h3 className="text-lg font-black uppercase tracking-tight text-[#320070] mb-2">Onboarding</h3>
          <p className="text-xs font-semibold text-[#64748B] leading-relaxed mb-6 min-h-[48px]">
            Complete your financial profile to help us understand your background.
          </p>
          <Link href="/borrower/onboarding" className="inline-flex items-center text-xs font-black uppercase tracking-wider text-[#7100eb] hover:text-[#320070] transition-all">
            Start Profile <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>

        <div className="card bg-white border-2 border-[#320070] shadow-[4px_4px_0px_0px_#320070] hover:shadow-[6px_6px_0px_0px_#7100eb] transition-all p-6 hover:-translate-y-0.5">
          <div className="w-9 h-9 rounded bg-[#ecebe8] border border-[#320070] flex items-center justify-center text-[#320070] font-black text-xs mb-4">
            2
          </div>
          <h3 className="text-lg font-black uppercase tracking-tight text-[#320070] mb-2">Upload Docs</h3>
          <p className="text-xs font-semibold text-[#64748B] leading-relaxed mb-6 min-h-[48px]">
            Securely connect your bank account or upload UPI statements.
          </p>
          <Link href="/borrower/upload" className="inline-flex items-center text-xs font-black uppercase tracking-wider text-[#7100eb] hover:text-[#320070] transition-all">
            Upload Data <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>

        <div className="card bg-white border-2 border-[#320070] shadow-[4px_4px_0px_0px_#320070] hover:shadow-[6px_6px_0px_0px_#7100eb] transition-all p-6 hover:-translate-y-0.5">
          <div className="w-9 h-9 rounded bg-[#ecebe8] border border-[#320070] flex items-center justify-center text-[#320070] font-black text-xs mb-4">
            3
          </div>
          <h3 className="text-lg font-black uppercase tracking-tight text-[#320070] mb-2">Credit Score</h3>
          <p className="text-xs font-semibold text-[#64748B] leading-relaxed mb-6 min-h-[48px]">
            Discover your alternative credit score and what's affecting it.
          </p>
          <Link href="/borrower/score" className="inline-flex items-center text-xs font-black uppercase tracking-wider text-[#7100eb] hover:text-[#320070] transition-all">
            View Score <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
