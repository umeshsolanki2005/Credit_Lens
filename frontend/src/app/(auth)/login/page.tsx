'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data } = await api.post('/auth/login', { email, password });
      await login(data.access_token);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#f8f7f5] flex">
      {/* Left: Branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#320070] relative overflow-hidden items-center justify-center p-12 border-r-4 border-[#7100eb]">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="relative z-10 max-w-md space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded bg-[#95f4a0] border border-white text-[#320070] flex items-center justify-center font-black text-xl">C</div>
            <span className="text-white font-extrabold text-2xl tracking-tight uppercase">CreditLens</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight">
            Alternative underwriting that looks at <span className="text-[#95f4a0]">your context.</span>
          </h2>
          <p className="text-white/80 leading-relaxed font-medium">
            Log in to evaluate transaction profiles, monitor financial standing, or customize score pathways instantly.
          </p>
          <div className="flex gap-6 pt-4 text-[#95f4a0] text-xs font-bold uppercase tracking-wider">
            <span>✓ OCEN INTEGRATED</span>
            <span>✓ REAL-TIME SCORING</span>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-[420px] animate-fade-in card bg-white border-2 border-[#320070] shadow-[6px_6px_0px_0px_#320070] p-8">
          <div className="mb-8 border-b-2 border-[#f8f7f5] pb-4">
            <h1 className="text-2xl font-black uppercase tracking-tight text-[#320070]">Welcome back</h1>
            <p className="text-[#64748B] text-xs font-bold uppercase tracking-wider mt-1">Sign in to your dashboard</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="px-4 py-3 rounded border-2 border-[#EF476F] bg-[#EF476F]/10 text-[#dc2626] text-xs font-bold uppercase tracking-wider">
                {error}
              </div>
            )}
            
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                required
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                required
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            
            <button type="submit" className="btn btn-primary w-full py-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] flex justify-center" disabled={isLoading}>
              {isLoading ? <Loader2 size={20} className="animate-spin text-white" /> : 'Sign In'}
            </button>
          </form>
          
          <p className="text-center text-xs font-bold uppercase tracking-wider text-[#64748B] mt-6">
            Don't have an account?{' '}
            <Link href="/register" className="text-[#7100eb] hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
