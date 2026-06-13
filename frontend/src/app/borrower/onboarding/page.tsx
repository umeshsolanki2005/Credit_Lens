'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function OnboardingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    income: '',
    employmentDays: '',
    age: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/auth/profile', {
        income: Number(formData.income),
        employment_days: Number(formData.employmentDays),
        age: Number(formData.age)
      });
      router.push('/borrower/upload');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save profile');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="border-b-2 border-[#320070] pb-4">
        <h1 className="text-3xl font-black uppercase tracking-tight text-[#320070]">Financial Profile</h1>
        <p className="text-[#64748B] text-xs font-bold uppercase tracking-wider mt-1">Step 1 of 3</p>
      </header>

      <div className="card bg-white border-2 border-[#320070] shadow-[6px_6px_0px_0px_#320070] p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label">Annual Income (₹)</label>
            <input
              type="number"
              required
              className="input"
              placeholder="e.g. 300000"
              value={formData.income}
              onChange={(e) => setFormData({ ...formData, income: e.target.value })}
            />
          </div>

          <div>
            <label className="label">Days Employed</label>
            <input
              type="number"
              required
              className="input"
              placeholder="e.g. 365"
              value={formData.employmentDays}
              onChange={(e) => setFormData({ ...formData, employmentDays: e.target.value })}
            />
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mt-1.5">Number of days in current job</p>
          </div>

          <div>
            <label className="label">Age (Years)</label>
            <input
              type="number"
              required
              className="input"
              placeholder="e.g. 28"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
          </div>

          <div className="pt-6 border-t-2 border-[#f8f7f5]">
            <button type="submit" className="btn btn-primary w-full py-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] flex justify-center hover:bg-[#7100eb]">
              Save & Continue to Upload <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
