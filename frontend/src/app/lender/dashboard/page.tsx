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
  status: string;
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

  const getRiskBadge = (tier: string) => {
    switch (tier) {
      case 'Green': return 'badge badge-success';
      case 'Yellow': return 'badge badge-warning';
      case 'Red': return 'badge badge-danger';
      default: return 'badge';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#320070] pb-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#320070]">Applicant Pool</h1>
          <p className="text-[#64748B] text-xs font-bold uppercase tracking-wider mt-1">
            Review borrowers who have selected your lending institution.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748B]"><Filter size={12} className="inline mr-1"/>Risk:</span>
          <div className="flex items-center gap-1 p-1 bg-[#ecebe8] border border-[#320070] rounded-sm">
            {['All', 'Green', 'Yellow', 'Red'].map(tier => (
              <button
                key={tier}
                onClick={() => setFilter(tier)}
                className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-sm transition-all border ${
                  filter === tier 
                    ? 'bg-[#320070] text-white border-[#320070]' 
                    : 'text-[#320070] border-transparent hover:bg-white/40'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Stats overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card bg-white border-2 border-[#320070] shadow-[4px_4px_0px_0px_#320070] p-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748B] mb-1">Total Applicants</p>
            <p className="text-3xl font-black text-[#320070]">{applicants.length}</p>
          </div>
          <div className="w-10 h-10 rounded border-2 border-[#320070] bg-[#ecebe8] flex items-center justify-center text-[#320070]">
            <TrendingUp size={20} />
          </div>
        </div>
      </div>

      <div className="card bg-white border-2 border-[#320070] shadow-[6px_6px_0px_0px_#320070] p-0 overflow-hidden">
        <div className="p-4 border-b-2 border-[#320070] flex justify-between items-center bg-[#f8f7f5]">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#320070]" size={14} />
            <input 
              type="text" 
              placeholder="Search applicants..." 
              className="w-full pl-9 pr-4 py-2 bg-white border-2 border-[#320070] rounded-sm text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-[#7100eb] transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[#320070] text-xs text-[#320070] font-black uppercase tracking-widest bg-[#ecebe8]">
                <th className="px-6 py-4">Applicant Name</th>
                <th className="px-6 py-4">CreditLens Score</th>
                <th className="px-6 py-4">Risk Tier</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[#64748B] bg-[#f8f7f5]">
                    <div className="inline-block w-6 h-6 border-2 border-[#ecebe8] border-t-[#7100eb] rounded-full animate-spin mb-2"></div>
                    <p className="text-xs font-bold uppercase tracking-wider">Loading applicants...</p>
                  </td>
                </tr>
              ) : applicants.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[#64748B] text-xs font-bold uppercase tracking-wider bg-[#f8f7f5]">
                    No applicants found for the selected filter.
                  </td>
                </tr>
              ) : (
                applicants.map((applicant) => (
                  <tr key={applicant.id} className="border-b border-[#ecebe8] hover:bg-[#f8f7f5] transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-black text-sm uppercase tracking-wider text-[#320070]">{applicant.name}</p>
                      <p className="text-[10px] font-bold text-[#64748B] mt-0.5">{applicant.email}</p>
                    </td>
                    <td className="px-6 py-4 font-black text-lg text-[#320070]">
                      {applicant.score}
                    </td>
                    <td className="px-6 py-4">
                      <span className={getRiskBadge(applicant.risk_tier)}>
                        {applicant.risk_tier}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-sm ${
                        applicant.status === 'accepted' ? 'bg-[#95f4a0]/20 text-[#059669] border border-[#059669]/20' :
                        applicant.status === 'rejected' ? 'bg-[#EF476F]/10 text-[#EF476F] border border-[#EF476F]/20' :
                        'bg-[#ecebe8] text-[#64748B] border border-[#d1cfc8]'
                      }`}>
                        {applicant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/lender/applicant/${applicant.id}`}
                        className="inline-flex items-center text-xs font-black uppercase tracking-wider text-[#7100eb] hover:text-[#320070] transition-colors"
                      >
                        View Profile <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
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
