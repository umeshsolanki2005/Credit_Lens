'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, UserCircle } from 'lucide-react';
import api from '@/lib/api';

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
      alert('Failed to save profile');
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <UserCircle size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Financial Profile</h1>
          <p className="text-secondary-foreground/70 text-sm">Step 1 of 7</p>
        </div>
      </div>

      <div className="card glass">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Annual Income (₹)</label>
            <input
              type="number"
              required
              className="input text-lg"
              placeholder="e.g. 300000"
              value={formData.income}
              onChange={(e) => setFormData({ ...formData, income: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Days Employed</label>
            <input
              type="number"
              required
              className="input text-lg"
              placeholder="e.g. 365"
              value={formData.employmentDays}
              onChange={(e) => setFormData({ ...formData, employmentDays: e.target.value })}
            />
            <p className="text-xs text-secondary-foreground/60 mt-1">Number of days in current job</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Age (Years)</label>
            <input
              type="number"
              required
              className="input text-lg"
              placeholder="e.g. 28"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
          </div>

          <div className="pt-4 border-t border-border">
            <button type="submit" className="btn btn-primary w-full py-3 text-lg">
              Save & Continue to Upload <ArrowRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
