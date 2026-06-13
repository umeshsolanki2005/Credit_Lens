'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, UserPlus, Upload, ShieldAlert, TrendingUp, Calculator, Activity, LogOut } from 'lucide-react';

export default function BorrowerLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'borrower')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const navItems = [
    { href: '/borrower/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { href: '/borrower/onboarding', label: '1. Onboarding', icon: <UserPlus size={20} /> },
    { href: '/borrower/upload', label: '2. Upload Docs', icon: <Upload size={20} /> },
    { href: '/borrower/score', label: '3. Credit Score', icon: <ShieldAlert size={20} /> },
    { href: '/borrower/roadmap', label: '5. Roadmap', icon: <TrendingUp size={20} /> },
    { href: '/borrower/simulator', label: '6. Loan Simulator', icon: <Calculator size={20} /> },
    { href: '/borrower/monitor', label: '7. Health Monitor', icon: <Activity size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">C</div>
            CreditLens
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-secondary-foreground/70 hover:bg-secondary/50 hover:text-foreground'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-secondary-foreground">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name || 'User'}</p>
              <p className="text-xs text-secondary-foreground/70 truncate w-32">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-danger hover:bg-danger/10 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-card border-b border-border p-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-primary font-bold">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">C</div>
            CreditLens
          </div>
          <button onClick={logout} className="text-danger"><LogOut size={20} /></button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
