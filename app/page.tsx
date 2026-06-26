'use client'; 

import React, { useState, useEffect, useRef } from 'react';

// --- FEATURE 2: BENTO TO ACCORDION ---
const BENTO_FEATURES = [
  { id: 0, title: 'Neural Pipe Automation', desc: 'Real-time extraction maps optimized via standard infrastructure.', icon: '/cube-16-solid.svg' },
  { id: 1, title: 'Predictive Matrix Analytics', desc: 'Continuous stream scanning and operational trend charting.', icon: '/chart-pie.svg' },
  { id: 2, title: 'Isolated Multi-Tenant Ledger', desc: 'Strict data security running across structural pipeline nodes.', icon: '/cog-8-tooth.svg' },
  { id: 3, title: 'Dynamic Scaling', desc: 'Engineered for high-throughput autonomous execution.', icon: '/arrow-trending-up.svg' }
];

function ResponsiveBentoAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="w-full py-24 px-6 border-t border-[#D9E8E2]/10 relative overflow-hidden" id="features">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#114C5A] opacity-20 blur-[120px] pointer-events-none rounded-full"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <span className="text-[#FFC801] font-mono text-sm tracking-widest uppercase mb-4 block">// Core Product</span>
          <h2 className="text-4xl md:text-5xl font-sans font-medium text-[#F1F6F4] tracking-tight mb-4">Engineered for autonomy</h2>
          <p className="text-[#D9E8E2]/70 font-sans max-w-2xl text-lg">Go beyond simple chat interfaces. We provide the underlying architecture to build, test, and scale enterprise-grade agents.</p>
        </div>

        {!isMobile && (
          <div className="grid grid-cols-4 gap-4 h-72">
            {BENTO_FEATURES.map((feat) => (
              <div 
                key={feat.id}
                onMouseEnter={() => setActiveIndex(feat.id)}
                className={`p-8 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  activeIndex === feat.id ? 'bg-[#114C5A]/40 border-[#FFC801]/50 shadow-[0_0_30px_rgba(255,200,1,0.1)] -translate-y-1' : 'bg-transparent border-[#D9E8E2]/10 hover:border-[#D9E8E2]/30'
                }`}
              >
                <div>
                  <div className="w-10 h-10 mb-6 bg-[#172B36] rounded border border-[#D9E8E2]/20 flex items-center justify-center p-2">
                    <img src={feat.icon} alt="icon" className="w-full h-full filter invert opacity-80" />
                  </div>
                  <h3 className="text-lg font-sans font-medium text-[#F1F6F4] leading-tight mb-3">{feat.title}</h3>
                </div>
                <p className="text-sm text-[#D9E8E2]/60 font-sans leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        )}

        {isMobile && (
          <div className="flex flex-col gap-3">
            {BENTO_FEATURES.map((feat) => {
              const isOpen = activeIndex === feat.id;
              return (
                <div key={feat.id} className="border border-[#D9E8E2]/10 rounded-lg overflow-hidden bg-transparent">
                  <button 
                    onClick={() => setActiveIndex(isOpen ? -1 : feat.id)}
                    className="w-full p-5 flex justify-between items-center bg-[#114C5A]/20 text-[#F1F6F4] font-sans font-medium text-left hover:bg-[#114C5A]/40 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img src={feat.icon} alt="icon" className="w-5 h-5 filter invert opacity-80" />
                      <span>{feat.title}</span>
                    </div>
                    <img src={isOpen ? "/chevron-up.svg" : "/chevron-down.svg"} alt="toggle" className="w-4 h-4 filter invert opacity-60" />
                  </button>
                  <div className="transition-all duration-300 ease-in-out overflow-hidden" style={{ maxHeight: isOpen ? '150px' : '0px' }}>
                    <p className="p-5 text-sm font-sans text-[#D9E8E2]/70 bg-[#172B36] border-t border-[#D9E8E2]/5">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

// --- FEATURE 1: ISOLATED PRICING MATRIX ---
const PRICING_MATRIX = {
  baseTiers: { starter: 29, pro: 79, enterprise: 199 },
  currencyMultipliers: { USD: { symbol: '$', rate: 1.0 }, EUR: { symbol: '€', rate: 0.92 }, INR: { symbol: '₹', rate: 83.5 } },
  discount: { annualMultiplier: 0.8 } 
};

function IsolatedPricingSection() {
  const currentCurrency = useRef('USD');
  const currentBilling = useRef('monthly'); 
  const starterPriceRef = useRef<HTMLDivElement>(null);
  const proPriceRef = useRef<HTMLDivElement>(null);
  const enterprisePriceRef = useRef<HTMLDivElement>(null);
  
  const monthlyBtnRef = useRef<HTMLButtonElement>(null);
  const annualBtnRef = useRef<HTMLButtonElement>(null);

  const calculateAndRenderPrices = () => {
    const currency = currentCurrency.current as keyof typeof PRICING_MATRIX.currencyMultipliers;
    const billing = currentBilling.current;
    const config = PRICING_MATRIX.currencyMultipliers[currency];
    const billingMultiplier = billing === 'annual' ? PRICING_MATRIX.discount.annualMultiplier : 1.0;

    if (starterPriceRef.current) starterPriceRef.current.innerText = `${config.symbol}${(PRICING_MATRIX.baseTiers.starter * config.rate * billingMultiplier).toFixed(0)}`;
    if (proPriceRef.current) proPriceRef.current.innerText = `${config.symbol}${(PRICING_MATRIX.baseTiers.pro * config.rate * billingMultiplier).toFixed(0)}`;
    if (enterprisePriceRef.current) enterprisePriceRef.current.innerText = `${config.symbol}${(PRICING_MATRIX.baseTiers.enterprise * config.rate * billingMultiplier).toFixed(0)}`;
  };

  useEffect(() => { calculateAndRenderPrices(); }, []);

  const handleCurrencyChange = (e: any) => { currentCurrency.current = e.target.value; calculateAndRenderPrices(); };
  
  const handleBillingToggle = (type: string) => { 
    currentBilling.current = type; 
    calculateAndRenderPrices(); 
    
    if (type === 'monthly') {
        monthlyBtnRef.current?.classList.add('bg-[#0B252C]', 'text-[#FFC801]'); 
        monthlyBtnRef.current?.classList.remove('bg-transparent', 'text-[#F1F6F4]');
        
        annualBtnRef.current?.classList.remove('bg-[#0B252C]', 'text-[#FFC801]');
        annualBtnRef.current?.classList.add('bg-transparent', 'text-[#F1F6F4]');
    } else {
        annualBtnRef.current?.classList.add('bg-[#0B252C]', 'text-[#FFC801]'); 
        annualBtnRef.current?.classList.remove('bg-transparent', 'text-[#F1F6F4]');
        
        monthlyBtnRef.current?.classList.remove('bg-[#0B252C]', 'text-[#FFC801]');
        monthlyBtnRef.current?.classList.add('bg-transparent', 'text-[#F1F6F4]');
    }
  };

  return (
    <section className="w-full py-24 px-6 bg-[#172B36] border-t border-[#D9E8E2]/10 relative" id="pricing">
      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        <span className="text-[#FFC801] font-mono text-sm tracking-widest uppercase mb-4 block">// Performance Tiers</span>
        <h2 className="text-4xl font-sans font-medium mb-12 text-[#F1F6F4]">Scale with precision</h2>
        
        <div className="flex flex-wrap justify-center gap-2 mb-16 p-1 border border-[#D9E8E2]/20 rounded-lg bg-[#114C5A]/30 backdrop-blur-sm">
          <button 
            ref={monthlyBtnRef}
            onClick={() => handleBillingToggle('monthly')} 
            className="px-6 py-2.5 rounded bg-[#0B252C] text-[#FFC801] font-sans text-sm font-medium transition-colors duration-200"
          >
            Monthly
          </button>
          <button 
            ref={annualBtnRef}
            onClick={() => handleBillingToggle('annual')} 
            className="px-6 py-2.5 rounded bg-transparent text-[#F1F6F4] hover:bg-[#0B252C]/50 font-sans text-sm font-medium transition-colors duration-200 flex items-center gap-2"
          >
            Annual <span className="bg-[#FF9932] text-[#172B36] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Save 20%</span>
          </button>
          <div className="w-[1px] h-6 bg-[#D9E8E2]/20 mx-2 self-center hidden sm:block"></div>
          <select onChange={handleCurrencyChange} className="bg-transparent text-[#F1F6F4] px-4 py-2 outline-none font-mono text-sm cursor-pointer hover:text-[#FFC801] transition-colors">
            <option value="USD" className="bg-[#172B36]">USD ($)</option>
            <option value="INR" className="bg-[#172B36]">INR (₹)</option>
            <option value="EUR" className="bg-[#172B36]">EUR (€)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {['Starter', 'Pro', 'Enterprise'].map((tier, i) => {
            const refMap: any = { Starter: starterPriceRef, Pro: proPriceRef, Enterprise: enterprisePriceRef };
            const isHighlight = tier === 'Pro';
            return (
              <div 
                key={tier} 
                className={`p-8 rounded-xl border flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(255,200,1,0.12)] hover:border-[#FFC801]/60 ${isHighlight ? 'bg-[#114C5A]/30 border-[#FF9932]/50' : 'bg-transparent border-[#D9E8E2]/10'}`}
              >
                {isHighlight && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFC801] to-[#FF9932]"></div>}
                <div>
                  <h3 className={`text-xl font-sans font-medium mb-2 ${isHighlight ? 'text-[#FFC801]' : 'text-[#F1F6F4]'}`}>{tier}</h3>
                  <div className="flex items-baseline gap-1 mb-4 mt-6">
                    <div ref={refMap[tier]} className="text-5xl font-medium tracking-tight font-sans text-[#F1F6F4]">--</div>
                    <span className="text-[#D9E8E2]/50 font-mono text-sm">/mo</span>
                  </div>
                  <p className="text-[#D9E8E2]/60 text-sm mb-8 font-sans border-b border-[#D9E8E2]/10 pb-8">
                    {i === 0 ? 'Essential tools for rapid deployment.' : i === 1 ? 'Advanced telemetry and unlimited nodes.' : 'Custom architecture for high-volume pipelines.'}
                  </p>
                </div>
                <button className={`w-full py-4 text-sm font-medium rounded-lg transition-colors duration-200 font-sans ${isHighlight ? 'bg-[#FF9932] text-[#172B36] hover:bg-[#FFC801]' : 'bg-[#114C5A] text-[#F1F6F4] hover:bg-[#114C5A]/80 hover:text-[#FFC801]'}`}>
                  Deploy Node
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- MAIN PAGE ASSEMBLY ---
export default function Home() {
  return (
    <main id="top" className="flex min-h-screen flex-col items-center bg-[#172B36] text-[#F1F6F4] selection:bg-[#FF9932] selection:text-[#172B36]">
      
      {/* Navigation */}
      <nav className="w-full flex justify-between items-center px-8 py-6 max-w-7xl mx-auto border-b border-[#D9E8E2]/5">
        <div className="flex items-center gap-2">
          <img src="/link-solid.svg" className="w-5 h-5 filter invert" alt="logo"/>
          <span className="font-mono font-bold tracking-tighter text-lg">ARMORY<span className="text-[#FF9932]">.AI</span></span>
        </div>
        <div className="hidden md:flex gap-8 font-mono text-xs text-[#D9E8E2]/70 uppercase tracking-widest">
          <a href="#features" className="hover:text-[#FFC801] transition-colors">Features</a>
          <a href="#pricing" className="hover:text-[#FFC801] transition-colors">Pricing</a>
        </div>
        <button className="hidden md:block px-5 py-2 border border-[#D9E8E2]/20 rounded font-mono text-xs hover:bg-[#F1F6F4] hover:text-[#172B36] transition-colors">
          Log In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between pt-24 pb-32 px-6 relative">
        <div className="w-full md:w-3/5 relative z-10 flex flex-col items-start text-left">
          <h1 className="text-5xl md:text-[80px] font-sans font-medium leading-[1.05] tracking-tight mb-8">
            Power your<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F1F6F4] to-[#D9E8E2]/50">future with AI.</span>
          </h1>
          <p className="text-lg text-[#D9E8E2]/80 max-w-lg font-sans mb-10 font-light leading-relaxed">
            Deploy custom enterprise agents and automate complex workflows. Scale your intelligence with Armory today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="#pricing" className="px-8 py-4 bg-[#F1F6F4] text-[#172B36] font-medium font-sans rounded hover:bg-[#FFC801] transition-colors duration-200 flex items-center justify-center gap-3">
              Build A Workflow
              <img src="/chevron-right.svg" className="w-4 h-4 opacity-70" alt="arrow"/>
            </a>
            <a href="#features" className="px-8 py-4 bg-transparent border border-[#D9E8E2]/20 text-[#F1F6F4] font-medium font-sans rounded hover:bg-[#114C5A]/30 transition-colors duration-200 flex items-center justify-center gap-3">
              <img src="/search.svg" className="w-4 h-4 filter invert opacity-70" alt="search"/>
              Read the Docs
            </a>
          </div>
        </div>
        
        {/* Abstract structural visual */}
        <div className="w-full md:w-2/5 mt-16 md:mt-0 relative hidden md:flex justify-end">
          <div className="w-[400px] h-[400px] border border-[#D9E8E2]/10 rounded-full relative animate-[spin_60s_linear_infinite]">
            <div className="absolute top-0 left-1/2 w-4 h-4 bg-[#FF9932] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(255,153,50,0.8)]"></div>
            <div className="absolute bottom-1/4 left-0 w-3 h-3 bg-[#FFC801] rounded-full -translate-x-1/2 shadow-[0_0_15px_rgba(255,200,1,0.8)]"></div>
            <div className="absolute inset-8 border border-[#D9E8E2]/5 rounded-full border-dashed"></div>
            <div className="absolute inset-16 border border-[#114C5A]/40 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <img src="/arrow-path.svg" className="w-16 h-16 filter invert opacity-20" alt="sync"/>
            </div>
          </div>
        </div>
      </section>

      <ResponsiveBentoAccordion />
      <IsolatedPricingSection />
      
      {/* Premium Dark Footer */}
      <footer className="w-full border-t border-[#D9E8E2]/5 py-12 px-6 mt-8 bg-[#172B36]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
            <img src="/link-solid.svg" className="w-5 h-5 filter invert" alt="logo"/>
            <span className="font-mono font-bold tracking-tighter text-sm">ARMORY<span className="text-[#FF9932]">.AI</span></span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-mono text-xs text-[#D9E8E2]/50">
            <a href="#top" className="hover:text-[#FFC801] transition-colors">Legal</a>
            <a href="#top" className="hover:text-[#FFC801] transition-colors">Terms of Service</a>
            <a href="#top" className="hover:text-[#FFC801] transition-colors">Privacy Policy</a>
            <a href="#top" className="hover:text-[#FFC801] transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </main>
  );
            }
