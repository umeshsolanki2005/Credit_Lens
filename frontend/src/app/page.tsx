'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3, ShieldCheck, TrendingUp, Zap, ChevronRight, Users } from 'lucide-react';
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
    <div className="flex flex-col min-h-screen bg-[#f8f7f5]">
      
      {/* ─── HERO ─── */}
      <section className="relative bg-[#320070] border-b-4 border-[#7100eb] overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center py-20 lg:py-28">
            
            {/* Left: Copy (Cols 1 to 7) */}
            <div className="space-y-8 animate-fade-in lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#95f4a0] border-2 border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
                <span className="w-2 h-2 rounded-full bg-[#06382e] animate-pulse" />
                <span className="text-[#06382e] text-xs font-black uppercase tracking-wider">Alternative Credit Scoring</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold text-white leading-[1.05] tracking-tight">
                Credit scoring that sees the <span className="text-[#95f4a0] underline decoration-4 decoration-[#7100eb]">full picture.</span>
              </h1>
              
              <p className="text-lg text-white/80 max-w-xl leading-relaxed font-medium">
                CreditLens utilizes transaction history, utility records, and explainable AI to build high-fidelity credit profiles for thin-file borrowers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/register?role=borrower" className="btn btn-accent text-xs px-8 py-4 shadow-[4px_4px_0px_0px_#ffffff]">
                  Check Your Score <ArrowRight size={18} />
                </Link>
                <Link href="/register?role=lender" className="btn text-xs px-8 py-4 bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#320070] transition-all">
                  For Lenders <ChevronRight size={18} />
                </Link>
              </div>
              
              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-white/60 text-xs font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5 border border-white/20 px-2.5 py-1 rounded bg-white/5"><ShieldCheck size={16} className="text-[#95f4a0]" /> OCEN Integrated</span>
                <span className="flex items-center gap-1.5 border border-white/20 px-2.5 py-1 rounded bg-white/5"><Zap size={16} className="text-[#95f4a0]" /> Real-Time Decisions</span>
              </div>
            </div>

            {/* Right: Mockup Card (Cols 8 to 12) */}
            <div className="hidden lg:flex justify-center animate-fade-in delay-200 lg:col-span-5">
              <div className="relative">
                {/* Offset Background Highlight Block */}
                <div className="absolute -inset-2 bg-[#95f4a0] border-2 border-[#320070] rounded" />
                
                {/* Main mockup card */}
                <div className="relative w-[380px] bg-white border-2 border-[#320070] rounded p-8 space-y-6 text-[#320070] shadow-[6px_6px_0px_0px_#7100eb]">
                  <div className="flex items-center justify-between border-b-2 border-[#f8f7f5] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#320070] border border-[#320070] flex items-center justify-center">
                        <BarChart3 size={20} className="text-[#95f4a0]" />
                      </div>
                      <div>
                        <p className="text-[#64748B] text-[10px] font-extrabold uppercase tracking-wider">CreditLens Score</p>
                        <p className="text-[#320070] font-black text-sm">Priya Sharma</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#95f4a0] border border-[#320070] text-[#06382e] text-[10px] font-black uppercase tracking-wider">
                      Low Risk
                    </span>
                  </div>
                  
                  <div className="text-center py-4 bg-[#f8f7f5] border-2 border-[#320070] rounded">
                    <p className="text-6xl font-black text-[#320070] tracking-tight">742</p>
                    <p className="text-[#64748B] text-xs font-bold uppercase tracking-wider mt-1">out of 900</p>
                    <div className="mt-4 mx-6 h-3 bg-white border border-[#320070] rounded-full overflow-hidden">
                      <div className="h-full w-[82%] bg-[#95f4a0] border-r border-[#320070] rounded-full" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-[#f8f7f5] rounded p-3 border border-[#320070]">
                      <p className="text-[#64748B] text-[9px] font-extrabold uppercase tracking-wider">UPI Activity</p>
                      <p className="text-[#320070] font-bold text-sm mt-0.5">High Stability</p>
                    </div>
                    <div className="bg-[#f8f7f5] rounded p-3 border border-[#320070]">
                      <p className="text-[#64748B] text-[9px] font-extrabold uppercase tracking-wider">Employment</p>
                      <p className="text-[#320070] font-bold text-sm mt-0.5">2.3 yrs (Ver.)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="bg-[#f8f7f5] py-20 lg:py-28 border-b-2 border-[#ecebe8]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <p className="text-[#7100eb] text-xs font-black uppercase tracking-widest mb-3">Why CreditLens</p>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-[#320070] mb-4">
              Financial inclusion powered by modern data signals.
            </h2>
            <p className="text-[#64748B] text-lg font-medium">
              We leverage alternative transactional data to establish creditworthiness, bypassing traditional paper-based histories.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 size={24} />,
                title: 'Alternative Data Core',
                desc: 'UPI patterns, utility invoice histories, and monthly recharges compiled and audited to construct high-trust credit profiles.',
                color: '#7100eb',
              },
              {
                icon: <ShieldCheck size={24} />,
                title: 'OCEN Protocol Connect',
                desc: 'Integrated with India\'s Open Credit Enablement Network, unlocking instant digital loan matching and direct borrower communication.',
                color: '#06382e',
              },
              {
                icon: <TrendingUp size={24} />,
                title: 'AI Score Roadmap',
                desc: 'Intelligent action roadmap providing explicit steps, targets, and timeline guidance to continuously optimize credit standing.',
                color: '#320070',
              },
            ].map((feature, i) => (
              <div key={i} className="card card-interactive p-8 bg-white border-2 border-[#320070] shadow-[4px_4px_0px_0px_#320070] hover:shadow-[8px_8px_0px_0px_#7100eb] transition-all rounded animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded border-2 border-[#320070] bg-[#f8f7f5] flex items-center justify-center mb-6 text-[#320070]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-extrabold text-[#320070] mb-3 uppercase tracking-tight">{feature.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="bg-[#06382e] py-20 lg:py-28 text-white border-b-4 border-[#320070]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: Steps (Cols 1 to 7) */}
            <div className="space-y-8 lg:col-span-7 animate-fade-in">
              <div>
                <p className="text-[#95f4a0] text-xs font-black uppercase tracking-widest mb-3">Workflow Engine</p>
                <h2 className="text-3xl lg:text-5xl font-extrabold leading-tight text-white mb-4">
                  Go from raw data to matched offer in minutes.
                </h2>
                <p className="text-white/70 text-lg">Three streamlined steps designed to establish verified scores.</p>
              </div>

              <div className="space-y-6">
                {[
                  { step: '01', title: 'Upload & Connect Data', desc: 'Securely sync UPI transaction sheets or bank files. We encrypt and scrub private data instantly.' },
                  { step: '02', title: 'Predictive Assessment', desc: 'Our machine learning models score over 120 alternative variables to determine risk indicators.' },
                  { step: '03', title: 'Unlock Financing Pool', desc: 'Receive your score, detailed SHAP values, credit roadmap, and matched institutional partner offers.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 items-start animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                    <div className="w-12 h-12 rounded border-2 border-white bg-[#95f4a0] text-[#06382e] flex items-center justify-center text-sm font-black shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#95f4a0] text-lg uppercase tracking-wider mb-1">{item.title}</h4>
                      <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: For Lenders card (Cols 8 to 12) */}
            <div id="for-lenders" className="lg:col-span-5 animate-fade-in delay-300">
              <div className="bg-white border-2 border-[#320070] p-8 lg:p-10 rounded text-[#320070] shadow-[8px_8px_0px_0px_#95f4a0]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded bg-[#ecebe8] border-2 border-[#320070] flex items-center justify-center">
                    <Users size={22} className="text-[#320070]" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">For Lenders</h3>
                </div>
                <p className="text-[#64748B] mb-6 leading-relaxed text-sm font-medium">
                  Gain instant access to pre-scored applicants. Our platform provides full model explainability using SHAP values, showing the exact variables driving each credit profile.
                </p>
                <ul className="space-y-3.5 mb-8">
                  {['Curated risk-tiered applicant pipeline', 'Explainable ML underwriting models', 'Integrated API dashboard endpoints'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#320070]">
                      <div className="w-6 h-6 rounded border-2 border-[#320070] bg-[#95f4a0] flex items-center justify-center shrink-0">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#320070" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/register?role=lender" className="btn btn-primary w-full py-4 text-center justify-center shadow-[4px_4px_0px_0px_#95f4a0]">
                  Partner with CreditLens <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#320070] py-24 text-center border-b-8 border-[#7100eb]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 animate-fade-in">
          <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Ready to establish your financial story?
          </h2>
          <p className="text-white/75 text-lg max-w-xl mx-auto font-medium">
            Unlock financial options through our modern, secure credit analytics engine today.
          </p>
          <div className="pt-4">
            <Link href="/register" className="btn btn-accent text-xs px-10 py-4 shadow-[4px_4px_0px_0px_#ffffff]">
              Get Started Free <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#1b003a] py-12 text-white/50 text-xs border-t-2 border-[#320070]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#95f4a0] border border-[#320070] flex items-center justify-center text-[#320070] font-black text-sm">C</div>
            <span className="font-extrabold text-white uppercase tracking-widest text-sm">CreditLens</span>
          </div>
          <p className="font-medium tracking-wide">© 2026 CreditLens Inc. Redefining modern credit metrics for thin-file borrowers.</p>
        </div>
      </footer>
    </div>
  );
}
