'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, ShieldCheck, TrendingUp, TrendingDown, CheckCircle2, Download } from 'lucide-react';
import api from '@/lib/api';

export default function ApplicantPage() {
  const params = useParams();
  const router = useRouter();
  const [applicant, setApplicant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicantDetails = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/lender/applicant/${params.id}`);
        setApplicant(data);
      } catch (err) {
        console.error('Failed to fetch applicant', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicantDetails();
  }, [params.id]);

  if (loading) return <div className="flex justify-center p-12">Loading applicant details...</div>;
  if (!applicant) return <div>Applicant not found</div>;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Link href="/lender/dashboard" className="inline-flex items-center text-sm font-medium text-secondary-foreground/60 hover:text-accent mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="card glass mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b border-border pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold text-secondary-foreground">
              {applicant.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{applicant.name}</h1>
              <p className="text-secondary-foreground/70">{applicant.email}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="text-sm text-secondary-foreground/70">CreditLens Score</div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 text-sm font-bold rounded-full border ${
                applicant.risk_tier === 'Green' ? 'bg-accent/10 text-accent border-accent/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
              }`}>
                {applicant.risk_tier} Risk
              </span>
              <span className="text-4xl font-extrabold">{applicant.score}</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 pt-6">
          <div>
            <h3 className="font-medium text-secondary-foreground/70 mb-4 flex items-center gap-2">
              <User size={18} /> Borrower Profile
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-secondary-foreground/60">Reported Income</p>
                <p className="font-medium">{applicant.income}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-foreground/60">Employment Type</p>
                <p className="font-medium">{applicant.employment}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-foreground/60">Data Sources Verified</p>
                <div className="flex gap-2 mt-1">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary/50 rounded text-xs"><CheckCircle2 size={12} className="text-accent" /> UPI History</span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary/50 rounded text-xs"><CheckCircle2 size={12} className="text-accent" /> Telecom</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-xl p-6 border border-border">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <ShieldCheck size={18} className="text-accent" /> ML Underwriting Decision
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium mb-2 text-accent">
                  <TrendingUp size={16} /> Positive Signals (Helping Score)
                </div>
                <ul className="space-y-2">
                  {applicant.explainData.helping.map((h: any, i: number) => (
                    <li key={i} className="text-sm flex justify-between bg-secondary/30 px-3 py-2 rounded">
                      <span>{h.feature}</span>
                      <span className="font-mono text-accent">{h.impact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-medium mb-2 text-danger mt-4">
                  <TrendingDown size={16} /> Risk Factors (Hurting Score)
                </div>
                <ul className="space-y-2">
                  {applicant.explainData.hurting.map((h: any, i: number) => (
                    <li key={i} className="text-sm flex justify-between bg-secondary/30 px-3 py-2 rounded">
                      <span>{h.feature}</span>
                      <span className="font-mono text-danger">+{h.impact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="btn btn-secondary glass text-foreground hover:bg-secondary/80">
          <Download size={18} /> Download Full Report
        </button>
        <button className="btn bg-accent text-white hover:bg-accent/90">
          Initiate Loan Offer
        </button>
      </div>
    </div>
  );
}
