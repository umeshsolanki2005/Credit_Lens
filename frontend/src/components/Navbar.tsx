'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hide on pages that have their own sidebar layout
  const hasSidebar = pathname.startsWith('/borrower') || pathname.startsWith('/lender');
  if (hasSidebar) return null;

  const isLanding = pathname === '/';
  const isAuth = pathname === '/login' || pathname === '/register';

  return (
    <nav className={`sticky top-0 z-50 border-b-2 transition-colors ${
      isLanding 
        ? 'bg-[#320070] border-[#7100eb]' 
        : 'bg-white border-[#320070] shadow-sm'
    }`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px]">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded flex items-center justify-center font-black text-lg border-2 ${
              isLanding 
                ? 'bg-[#95f4a0] text-[#320070] border-[#ffffff]' 
                : 'bg-[#320070] text-[#95f4a0] border-[#320070]'
            }`}>
              C
            </div>
            <span className={`font-extrabold text-xl tracking-tight uppercase ${
              isLanding ? 'text-white' : 'text-[#320070]'
            }`}>
              CreditLens
            </span>
          </Link>

          {/* Desktop nav links (landing only) */}
          {isLanding && (
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-xs font-bold uppercase tracking-wider text-white/80 hover:text-[#95f4a0] transition-colors">Features</a>
              <a href="#how-it-works" className="text-xs font-bold uppercase tracking-wider text-white/80 hover:text-[#95f4a0] transition-colors">How it Works</a>
              <a href="#for-lenders" className="text-xs font-bold uppercase tracking-wider text-white/80 hover:text-[#95f4a0] transition-colors">For Lenders</a>
            </div>
          )}

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded flex items-center justify-center font-bold text-sm border-2 ${
                  isLanding ? 'bg-white/10 text-white border-white/20' : 'bg-[#ecebe8] text-[#320070] border-[#320070]'
                }`}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className={`text-sm font-bold ${isLanding ? 'text-white' : 'text-[#320070]'}`}>
                  {user.name}
                </span>
                <button onClick={logout} className={`p-2 rounded border-2 transition-colors ${
                  isLanding 
                    ? 'text-white/60 hover:text-[#EF476F] hover:bg-white/10 border-transparent' 
                    : 'text-[#64748B] hover:text-[#EF476F] hover:bg-red-50 border-transparent'
                }`}>
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className={`text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded transition-colors ${
                  isLanding 
                    ? 'text-white/80 hover:text-[#95f4a0] hover:bg-white/10' 
                    : 'text-[#320070] hover:bg-[#ecebe8]'
                }`}>
                  Log in
                </Link>
                <Link href="/register" className="btn btn-accent text-xs px-5 py-2">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen 
              ? <X size={24} className={isLanding ? 'text-white' : 'text-[#320070]'} /> 
              : <Menu size={24} className={isLanding ? 'text-white' : 'text-[#320070]'} />
            }
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className={`md:hidden pb-4 border-t-2 ${isLanding ? 'border-white/10' : 'border-[#320070]'}`}>
            <div className="flex flex-col gap-1 pt-3">
              {isLanding && (
                <>
                  <a href="#features" className={`px-3 py-2 rounded text-xs font-bold uppercase tracking-wider ${isLanding ? 'text-white/70 hover:text-[#95f4a0] hover:bg-white/10' : ''}`}>Features</a>
                  <a href="#how-it-works" className={`px-3 py-2 rounded text-xs font-bold uppercase tracking-wider ${isLanding ? 'text-white/70 hover:text-[#95f4a0] hover:bg-white/10' : ''}`}>How it Works</a>
                </>
              )}
              {!user && (
                <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-white/10">
                  <Link href="/login" className="btn btn-outline text-xs w-full py-2">Log in</Link>
                  <Link href="/register" className="btn btn-accent text-xs w-full py-2">Get Started</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
