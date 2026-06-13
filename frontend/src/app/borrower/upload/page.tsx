'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, FileText, ArrowRight, Loader2 } from 'lucide-react';
import api from '@/lib/api';

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
      alert('Failed to process document');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
          <UploadCloud size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Document Upload</h1>
          <p className="text-secondary-foreground/70 text-sm">Step 2 of 7</p>
        </div>
      </div>

      <div className="card glass text-center">
        {!file ? (
          <div className="border-2 border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center bg-card/50">
            <UploadCloud size={48} className="text-secondary-foreground/40 mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload UPI Statement</h3>
            <p className="text-sm text-secondary-foreground/60 mb-6 max-w-sm">
              Upload your bank statement or UPI transaction history (CSV) for alternative data analysis.
            </p>
            <label className="btn btn-secondary cursor-pointer">
              Select CSV File
              <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
        ) : (
          <div className="border border-border rounded-xl p-8 flex flex-col items-center justify-center bg-card/50">
            <FileText size={48} className="text-primary mb-4" />
            <h3 className="text-lg font-medium mb-1">{file.name}</h3>
            <p className="text-sm text-secondary-foreground/60 mb-8">
              {(file.size / 1024).toFixed(2)} KB
            </p>
            
            <div className="flex gap-4 w-full max-w-xs">
              <button 
                onClick={() => setFile(null)} 
                className="btn border border-border flex-1"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button 
                onClick={handleUpload} 
                className="btn btn-primary flex-1"
                disabled={isUploading}
              >
                {isUploading ? <Loader2 className="animate-spin" /> : 'Analyze'}
              </button>
            </div>
          </div>
        )}
      </div>
      
      {isUploading && (
        <div className="mt-8 text-center animate-fade-in">
          <p className="text-primary font-medium flex items-center justify-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            Extracting financial signals...
          </p>
        </div>
      )}
    </div>
  );
}
