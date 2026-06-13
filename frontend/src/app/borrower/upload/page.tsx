'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, FileText, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      router.push('/borrower/score');
    } catch (err) {
      console.error(err);
      toast.error('Failed to process document');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="border-b-2 border-[#320070] pb-4">
        <h1 className="text-3xl font-black uppercase tracking-tight text-[#320070]">Document Upload</h1>
        <p className="text-[#64748B] text-xs font-bold uppercase tracking-wider mt-1">Step 2 of 3</p>
      </header>

      <div className="card bg-white border-2 border-[#320070] shadow-[6px_6px_0px_0px_#320070] p-8 text-center">
        {!file ? (
          <div className="border-2 border-dashed border-[#7100eb] rounded p-12 flex flex-col items-center justify-center bg-[#f8f7f5]">
            <UploadCloud size={48} className="text-[#7100eb]/50 mb-4" />
            <h3 className="text-lg font-black uppercase tracking-tight text-[#320070] mb-2">Upload UPI Statement</h3>
            <p className="text-xs font-semibold text-[#64748B] leading-relaxed mb-6 max-w-sm">
              Upload your bank statement or UPI transaction history (CSV) for alternative data analysis.
            </p>
            <label className="btn btn-outline cursor-pointer text-xs py-2 px-5">
              Select CSV File
              <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
        ) : (
          <div className="border-2 border-[#320070] rounded p-8 flex flex-col items-center justify-center bg-[#f8f7f5]">
            <FileText size={48} className="text-[#320070] mb-4" />
            <h3 className="text-lg font-black text-[#320070] mb-1">{file.name}</h3>
            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-8">
              {(file.size / 1024).toFixed(2)} KB
            </p>
            
            <div className="flex gap-4 w-full max-w-xs">
              <button 
                onClick={() => setFile(null)} 
                className="btn btn-outline flex-1 text-xs py-2"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button 
                onClick={handleUpload} 
                className="btn btn-primary flex-1 text-xs py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] flex justify-center"
                disabled={isUploading}
              >
                {isUploading ? <Loader2 className="animate-spin text-white" /> : 'Analyze'}
              </button>
            </div>
          </div>
        )}
      </div>
      
      {isUploading && (
        <div className="text-center animate-fade-in">
          <p className="text-[#320070] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#95f4a0] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#95f4a0]"></span>
            </span>
            Extracting financial signals...
          </p>
        </div>
      )}
    </div>
  );
}
