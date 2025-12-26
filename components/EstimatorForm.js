"use client";
import React, { useState, useMemo } from 'react';
import { 
  Search, Calculator, FileText, CheckCircle2, ChevronRight, 
  ChevronLeft, Zap, Sparkles, Layers, Globe, Box, TrendingUp
} from 'lucide-react';
import { ServiceLogic, calculateEstimate } from '@/constants/pricingLogic';
import { generateQuotePDF } from '@/components/PDFGenerator';

export default function EstimatorForm() {
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("ALL");
  const [formData, setFormData] = useState({
    region: 'USA_CAN', niche: 'PLUMBING', task: 'leak', scale: 'small', complexity: 'simple', quality: 'standard', urgency: 'standard'
  });

  // Function to trigger PDF Download (Fixed: Added back to scope)
  const handleDownload = () => {
    const currentNiche = ServiceLogic.niches[formData.niche];
    const taskLabel = currentNiche.tasks.find(t => t.id === formData.task)?.label || 'General Service';
    generateQuotePDF({
      ...formData,
      niche: currentNiche.label,
      task: taskLabel,
      total: liveEstimate
    });
  };

  const filteredNiches = Object.keys(ServiceLogic.niches).filter(key => {
    const n = ServiceLogic.niches[key];
    const matchesSearch = n.label.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === "ALL" || n.cat === selectedCat;
    return matchesSearch && matchesCat;
  });

  const liveEstimate = useMemo(() => {
    return calculateEstimate(formData.niche, formData.task, formData.complexity, formData.quality, formData.urgency, formData.scale, formData.region);
  }, [formData]);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  return (
    <div className="max-w-6xl mx-auto px-4 pb-24 relative">
      {/* Floating Price Pill */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-zinc-900 border border-white/20 px-6 py-4 rounded-3xl shadow-2xl flex flex-col items-center text-white backdrop-blur-md">
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Estimated Value</span>
          <span className="text-3xl font-black text-blue-400">${liveEstimate.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl border border-zinc-100 overflow-hidden">
        {/* Step Line */}
        <div className="flex bg-zinc-50 border-b border-zinc-100">
          {[1,2,3,4,5].map(i => (
            <div key={i} className={`h-2 flex-1 transition-all duration-700 ${step >= i ? 'bg-blue-600' : 'bg-zinc-200'}`} />
          ))}
        </div>

        <div className="p-8 md:p-16">
          {/* STEP 1: REGION SELECT */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center space-y-4">
                <Globe className="mx-auto text-blue-600" size={48} />
                <h2 className="text-4xl font-black tracking-tight">Select Market Region</h2>
                <p className="text-zinc-500 italic">Adjusts logic for regional purchasing power and currencies.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {Object.entries(ServiceLogic.regions).map(([key, val]) => (
                  <button key={key} onClick={() => { setFormData({...formData, region: key}); handleNext(); }}
                    className={`p-6 border-2 rounded-2xl text-left transition-all group ${formData.region === key ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-zinc-100 bg-white hover:border-zinc-300'}`}>
                    <h3 className="font-black text-lg group-hover:text-blue-600 transition-colors">{val.label}</h3>
                    <p className="text-xs text-zinc-400 uppercase font-bold tracking-tighter">Market Weight: {val.multiplier}x</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: SEARCH & CATEGORY DIRECTORY */}
          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <button onClick={handleBack} className="p-4 bg-zinc-100 rounded-full transition-all active:scale-90"><ChevronLeft /></button>
                <div className="relative w-full max-w-lg group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                  <input type="text" placeholder="Search 40+ services..." className="w-full pl-12 pr-4 py-5 rounded-2xl border-2 border-zinc-100 bg-zinc-50 focus:bg-white focus:border-blue-500 outline-none transition-all shadow-inner text-lg" onChange={(e) => setSearch(e.target.value)} />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                <button onClick={() => setSelectedCat("ALL")} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedCat === "ALL" ? 'bg-zinc-900 text-white shadow-xl' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>ALL</button>
                {Object.entries(ServiceLogic.categories).map(([key, val]) => (
                  <button key={key} onClick={() => setSelectedCat(key)} className={`px-6 py-2 whitespace-nowrap rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedCat === key ? 'bg-zinc-900 text-white shadow-xl' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>{val}</button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredNiches.map((key) => (
                  <button key={key} onClick={() => { setFormData({...formData, niche: key, task: ServiceLogic.niches[key].tasks[0].id}); handleNext(); }}
                    className="group relative p-6 border-2 border-zinc-100 rounded-3xl text-left bg-white hover:border-blue-600 hover:shadow-2xl transition-all hover:-translate-y-2">
                    <div className="p-4 bg-zinc-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all mb-4 inline-block shadow-sm group-hover:rotate-12"><Calculator size={22} /></div>
                    <h3 className="font-black text-zinc-800 text-sm group-hover:text-blue-700 tracking-tight leading-tight">{ServiceLogic.niches[key].label}</h3>
                    <div className="absolute top-4 right-4 text-zinc-100 group-hover:text-blue-100 transition-colors"><Zap size={14}/></div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: PROJECT MAGNITUDE (SCALE) */}
          {step === 3 && (
            <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
              <div className="flex items-center gap-6">
                <button onClick={handleBack} className="p-4 bg-zinc-100 rounded-full transition-all active:scale-90"><ChevronLeft /></button>
                <h2 className="text-4xl font-black">Project Magnitude</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {Object.entries(ServiceLogic.multipliers.scale).map(([key, val]) => (
                  <button key={key} onClick={() => { setFormData({...formData, scale: key}); handleNext(); }}
                    className={`group p-8 border-2 rounded-[2rem] text-left transition-all flex items-center justify-between
                      ${formData.scale === key ? 'border-blue-600 bg-blue-50 shadow-2xl' : 'border-zinc-100 bg-white hover:border-zinc-300'}`}>
                    <div className="flex items-center gap-6">
                      <div className={`p-5 rounded-2xl transition-all ${formData.scale === key ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-500'}`}><Layers size={28} /></div>
                      <div>
                        <h3 className="font-black text-2xl capitalize tracking-tight">{key} Scope</h3>
                        <p className="text-zinc-500 text-sm">Value Factor: {val}x multiplier</p>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${formData.scale === key ? 'border-blue-600 bg-blue-600 text-white' : 'border-zinc-200 group-hover:border-zinc-400'}`}>
                      <CheckCircle2 size={16} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: SERVICE SPECIFICS (TASK & COMPLEXITY) */}
          {step === 4 && (
            <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
               <div className="flex items-center gap-6">
                <button onClick={handleBack} className="p-4 bg-zinc-100 rounded-full transition-all active:scale-90"><ChevronLeft /></button>
                <h2 className="text-4xl font-black tracking-tighter">Assignment Refinement</h2>
              </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2"><Box size={16} className="text-blue-500" /> Service Focus</label>
                    <div className="space-y-3">
                      {ServiceLogic.niches[formData.niche].tasks.map(t => (
                        <button key={t.id} onClick={() => setFormData({...formData, task: t.id})}
                          className={`w-full p-6 rounded-2xl text-left border-2 transition-all flex justify-between items-center group
                          ${formData.task === t.id ? 'border-blue-600 bg-white shadow-xl font-black text-zinc-900' : 'border-zinc-100 bg-zinc-50/50 text-zinc-400 hover:bg-white'}`}>
                          {t.label} <Sparkles size={18} className={formData.task === t.id ? 'text-blue-500 animate-pulse' : 'text-zinc-200'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2"><TrendingUp size={16} className="text-blue-500" /> Complexity Factor</label>
                    <div className="space-y-3">
                      {Object.keys(ServiceLogic.multipliers.complexity).map(level => (
                        <button key={level} onClick={() => setFormData({...formData, complexity: level})}
                          className={`w-full p-6 rounded-2xl text-left border-2 transition-all capitalize group
                          ${formData.complexity === level ? 'border-blue-600 bg-white shadow-xl font-black text-zinc-900' : 'border-zinc-100 bg-zinc-50/50 text-zinc-400 hover:bg-white'}`}>
                          {level} <div className={`w-2 h-2 rounded-full transition-all ${formData.complexity === level ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,1)]' : 'bg-zinc-200'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
               </div>
               <button onClick={handleNext} className="w-full bg-zinc-900 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-black transition-all shadow-2xl active:scale-95">Generate Final Quote</button>
            </div>
          )}

          {/* STEP 5: FINAL SUMMARY & PDF EXPORT */}
          {step === 5 && (
            <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8 text-left">
                     <div className="space-y-2">
                        <h2 className="text-5xl font-black tracking-tighter">Ready for Review.</h2>
                        <p className="text-zinc-500 text-lg">Logic verified for <b>{ServiceLogic.regions[formData.region].label}</b>. This ensures market-competitive pricing and currency alignment.</p>
                     </div>
                     <div className="p-8 bg-zinc-50 rounded-[2rem] border border-zinc-200 space-y-6 shadow-inner">
                        <div className="flex justify-between border-b border-zinc-200 pb-3"><span className="text-zinc-400 font-bold text-xs uppercase">Primary Sector</span><span className="font-black text-sm">{formData.niche}</span></div>
                        <div className="flex justify-between border-b border-zinc-200 pb-3"><span className="text-zinc-400 font-bold text-xs uppercase">Job Magnitude</span><span className="font-black text-sm capitalize">{formData.scale}</span></div>
                        <div className="flex justify-between"><span className="text-zinc-400 font-bold text-xs uppercase">Material Quality</span><span className="font-black text-sm capitalize text-blue-600">{formData.quality}</span></div>
                     </div>
                  </div>
                  <div className="bg-zinc-900 rounded-[3.5rem] p-12 text-white shadow-[0_40px_80px_rgba(0,0,0,0.3)] flex flex-col justify-between relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full -translate-y-20 translate-x-20 blur-[80px]" />
                     <div className="relative z-10">
                        <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Final Estimated Total</div>
                        <div className="text-6xl font-black mb-10 tracking-tighter">${liveEstimate.toLocaleString()}</div>
                        <button onClick={handleDownload} className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-4 transition-all shadow-xl active:scale-95">
                           <FileText size={22} /> DOWNLOAD PDF
                        </button>
                        <button onClick={() => setStep(1)} className="w-full mt-6 text-zinc-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">Restart Calculation</button>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}