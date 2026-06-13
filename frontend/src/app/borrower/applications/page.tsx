'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Bell, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ApplicationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await api.get('/borrower/notifications');
        setNotifications(data);
      } catch (err) {
        console.error('Failed to fetch notifications', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <Link href="/borrower/dashboard" className="inline-flex items-center text-xs font-black uppercase tracking-wider text-[#64748B] hover:text-[#320070] transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>

      <header className="border-b-2 border-[#320070] pb-4">
        <h1 className="text-3xl font-black uppercase tracking-tight text-[#320070] flex items-center gap-3">
          <Bell size={28} className="text-[#7100eb]" /> Application Status
        </h1>
        <p className="text-[#64748B] text-xs font-bold uppercase tracking-wider mt-2">
          Track the status of your loan applications across all lenders.
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center p-12 text-[#64748B]">
          <div className="w-6 h-6 border-2 border-[#ecebe8] border-t-[#7100eb] rounded-full animate-spin"></div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="card bg-white border-2 border-[#320070] shadow-[4px_4px_0px_0px_#320070] p-12 text-center">
          <p className="text-[#64748B] text-sm font-bold uppercase tracking-wider">No applications found.</p>
          <Link href="/borrower/simulator" className="mt-4 inline-block btn btn-primary px-6 py-3">
            Simulate & Apply
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif, idx) => (
            <div key={idx} className="bg-white border-2 border-[#320070] shadow-[4px_4px_0px_0px_#320070] p-6 flex justify-between items-center rounded-sm hover:-translate-y-0.5 transition-transform">
              <div>
                <p className="font-black text-lg uppercase tracking-wider text-[#320070]">{notif.lender_name}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mt-1">Loan Application</p>
              </div>
              <span className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-sm border ${
                notif.status === 'accepted' ? 'bg-[#95f4a0]/20 text-[#059669] border-[#059669]/20 shadow-[2px_2px_0px_0px_rgba(5,150,105,0.2)]' :
                notif.status === 'rejected' ? 'bg-[#EF476F]/10 text-[#EF476F] border-[#EF476F]/20 shadow-[2px_2px_0px_0px_rgba(239,71,111,0.2)]' :
                'bg-[#ecebe8] text-[#64748B] border-[#d1cfc8] shadow-[2px_2px_0px_0px_rgba(100,116,139,0.2)]'
              }`}>
                {notif.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
