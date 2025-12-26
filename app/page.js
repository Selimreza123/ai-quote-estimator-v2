import EstimatorForm from '@/components/EstimatorForm';
import { Star } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 selection:bg-blue-100 pb-20">
      <section className="pt-24 pb-16 px-6 text-center bg-white border-b border-zinc-100 mb-12 shadow-sm">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-blue-100">
          <Star size={14} fill="currentColor" /> Global Service Valuation v3.5
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-zinc-900 mb-6 tracking-tighter leading-[0.9]">
          The Quote <br />
          <span className="text-blue-600">Engine.</span>
        </h1>
        <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed italic">
          High-precision B2B valuations for 40+ global service industries. Modular. Scalable. Enterprise-ready.
        </p>
      </section>

      <EstimatorForm />
    </main>
  );
}