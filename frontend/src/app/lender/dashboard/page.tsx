'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Filter, Search, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Applicant {
  id: number;
  name: string;
  email: string;
  score: number;
  risk_tier: 'Green' | 'Yellow' | 'Red';
}

export default function LenderDashboard() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        const url = filter === 'All' ? '/lender/applicants' : `/lender/applicants?risk=${filter}`;
        const { data } = await api.get(url);
        setApplicants(data);
      } catch (err) {
        console.error('Failed to fetch applicants', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [filter]);

  const getRiskColor = (tier: string) => {
    switch (tier) {
      case 'Green': return 'bg-accent/20 text-accent border-accent/30';
      case 'Yellow': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'Red': return 'bg-danger/20 text-danger border-danger/30';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Applicant Pool</h1>
          <p className="text-secondary-foreground/70 mt-1">
            Review borrowers who have selected your lending institution.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-secondary-foreground/70"><Filter size={16} className="inline mr-1"/> Risk Tier:</span>
          {['All', 'Green', 'Yellow', 'Red'].map(tier => (
            <button
              key={tier}
              onClick={() => setFilter(tier)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === tier 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </header>

      {/* Stats overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card glass p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-secondary-foreground/70 font-medium">Total Applicants</p>
            <p className="text-2xl font-bold">{applicants.length}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <TrendingUp size={20} />
          </div>
        </div>
      </div>

      <div className="card glass overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center bg-card/50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-foreground/50" size={16} />
            <input 
              type="text" 
              placeholder="Search applicants..." 
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-sm text-secondary-foreground/70 uppercase tracking-wider">
                <th className="p-4 font-medium">Applicant Name</th>
                <th className="p-4 font-medium">CreditLens Score</th>
                <th className="p-4 font-medium">Risk Tier</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-secondary-foreground/60">
                    <div className="inline-block w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-2"></div>
                    <p>Loading applicants...</p>
                  </td>
                </tr>
              ) : applicants.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-secondary-foreground/60">
                    No applicants found for the selected filter.
                  </td>
                </tr>
              ) : (
                applicants.map((applicant) => (
                  <tr key={applicant.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors group">
                    <td className="p-4">
                      <p className="font-medium text-foreground">{applicant.name}</p>
                      <p className="text-sm text-secondary-foreground/70">{applicant.email}</p>
                    </td>
                    <td className="p-4 font-bold">
                      {applicant.score}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRiskColor(applicant.risk_tier)}`}>
                        {applicant.risk_tier}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link 
                        href={`/lender/applicant/${applicant.id}`}
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        View Profile <ArrowRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
