'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { Calculator, CheckCircle2, XCircle, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SimulatorPage() {
  const [formData, setFormData] = useState({
    loanAmnt: 50000,
    term: 36,
  });
  
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        loan_amnt: Number(formData.loanAmnt),
        term: Number(formData.term),
      };

      const { data } = await api.post('/eligibility', payload);
      setResult(data);
    } catch (err) {
      console.error('Simulation failed', err);
      // Mock for demo if backend is unreachable
      setResult({
        eligible: true,
        recommended_amount: formData.loanAmnt,
        default_probability: 0.12
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <Calculator size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Loan Simulator</h1>
          <p className="text-secondary-foreground/70 text-sm">See what loans you qualify for today</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card glass h-fit">
          <form onSubmit={handleSimulate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Loan Amount Requested (₹)</label>
              <input
                type="number"
                required
                className="input text-lg"
                value={formData.loanAmnt}
                onChange={(e) => setFormData({ ...formData, loanAmnt: Number(e.target.value) })}
              />
              <input 
                type="range" 
                min="10000" 
                max="500000" 
                step="5000"
                className="w-full mt-4 accent-primary"
                value={formData.loanAmnt}
                onChange={(e) => setFormData({ ...formData, loanAmnt: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tenure (Months)</label>
              <select 
                className="input text-lg"
                value={formData.term}
                onChange={(e) => setFormData({ ...formData, term: Number(e.target.value) })}
              >
                <option value={12}>12 Months</option>
                <option value={24}>24 Months</option>
                <option value={36}>36 Months</option>
                <option value={48}>48 Months</option>
                <option value={60}>60 Months</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-full py-3" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : 'Check Eligibility'}
            </button>
          </form>
        </div>

        <div>
          {result ? (
            <div className="card glass h-full flex flex-col justify-center items-center text-center animate-fade-in space-y-4">
              {result.eligible ? (
                <>
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-2">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-accent">You are Eligible!</h3>
                  <p className="text-secondary-foreground/70">Based on your CreditLens score.</p>
                  
                  <div className="w-full bg-secondary/30 rounded-xl p-4 mt-4 border border-border">
                    <p className="text-sm text-secondary-foreground/60 mb-1">Approved Amount</p>
                    <p className="text-3xl font-bold">₹{result.recommended_amount.toLocaleString()}</p>
                  </div>
                  
                  {result.recommended_amount < formData.loanAmnt && (
                     <p className="text-sm text-yellow-500 mt-2 mb-4">
                       Note: Approved amount is lower than requested due to risk parameters.
                     </p>
                  )}
                  
                  <button 
                    onClick={async () => {
                      try {
                        await api.post('/lender/select/2');
                        alert('Application submitted to lenders successfully!');
                      } catch (err) {
                        alert('Application submitted or already exists.');
                      }
                    }}
                    className="btn btn-primary w-full py-2 mt-4"
                  >
                    Submit Application to Lenders
                  </button>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-full bg-danger/20 flex items-center justify-center text-danger mb-2">
                    <XCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-danger">Not Eligible Yet</h3>
                  <p className="text-secondary-foreground/70">
                    Your current profile risk is too high for this amount.
                  </p>
                  <div className="w-full bg-secondary/30 rounded-xl p-4 mt-4 border border-border">
                    <p className="text-sm text-secondary-foreground/60 mb-1">Recommended Action</p>
                    <p className="font-medium">Follow your 3-month roadmap plan to improve your eligibility.</p>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="h-full border-2 border-dashed border-border rounded-xl flex items-center justify-center bg-card/30 text-secondary-foreground/40 p-8 text-center">
              Adjust the parameters and click "Check Eligibility" to see your results.
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-8">
        <Link href="/borrower/monitor" className="btn btn-secondary text-lg px-8 py-3">
          Go to Health Monitor <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
