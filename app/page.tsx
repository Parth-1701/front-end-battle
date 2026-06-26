'use client'; // Required for client-side state in Next.js App Router

import React, { useState, useEffect, useRef } from 'react';

// --- FEATURE 2: BENTO TO ACCORDION ---
const BENTO_FEATURES = [
  { id: 0, title: 'Neural Pipe Automation', desc: 'Real-time extraction maps optimized via standard infrastructure.', icon: 'cube' },
  { id: 1, title: 'Predictive Matrix Analytics', desc: 'Continuous stream scanning and operational trend charting.', icon: 'trend' },
  { id: 2, title: 'Isolated Multi-Tenant Ledger', desc: 'Strict data security running across structural pipeline nodes.', icon: 'cog' }
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
    <section className="w-full py-20 px-6" id="features">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-mono text-center text-[#F1F6F4] mb-12">System Capabilities</h2>

        {!isMobile && (
          <div className="grid grid-cols-3 gap-6 h-64">
            {BENTO_FEATURES.map((feat) => (
              <div 
                key={feat.id}
                onMouseEnter={() => setActiveIndex(feat.id)}
                className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  activeIndex === feat.id ? 'bg-[#114C5A] border-[#FFC801] scale-[1.02]' : 'bg-[#114C5A]/30 border-[#D9E8E2]/10 opacity-70'
                }`}
              >
                <h3 className="text-lg font-mono font-semibold text-[#F1F6F4]">{feat.title}</h3>
                <p className="text-sm text-[#D9E8E2]/80 mt-2 font-sans">{feat.desc}</p>
              </div>
            ))}
          </div>
        )}

        {isMobile && (
          <div className="flex flex-col gap-4">
            {BENTO_FEATURES.map((feat) => {
              const isOpen = activeIndex === feat.id;
              return (
                <div key={feat.id} className="border border-[#D9E8E2]/10 rounded-lg overflow-hidden bg-[#114C5A]/30">
                  <button 
                    onClick={() => setActiveIndex(isOpen ? -1 : feat.id)}
                    className="w-full p-4 flex justify-between items-center bg-[#114C5A] text-[#F1F6F4] font-mono text-left"
                  >
                    <span>{feat.title}</span>
                    <span className="transform transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>↓</span>
                  </button>
                  <div className="transition-all duration-300 ease-in-out overflow-hidden" style={{ maxHeight: isOpen ? '120px' : '0px' }}>
                    <p className="p-4 text-sm font-sans text-[#D9E8E2] bg-[#172B36]/50">{feat.desc}</p>
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
  currencyMultipliers: {
    USD: { symbol: '$', rate: 1.0 },
    EUR: { symbol: '€', rate: 0.92 },
    INR: { symbol: '₹', rate: 83.5 }
  },
  discount: { annualMultiplier: 0.8 } 
};

function IsolatedPricingSection() {
  const currentCurrency = useRef('USD');
  const currentBilling = useRef('monthly'); 
  const starterPriceRef = useRef(null);
  const proPriceRef = useRef(null);
  const enterprisePriceRef = useRef(null);

  const calculateAndRenderPrices = () => {
    const currency = currentCurrency.current;
    const billing = currentBilling.current;
    const config = PRICING_MATRIX.currencyMultipliers[currency];
    const billingMultiplier = billing === 'annual' ? PRICING_MATRIX.discount.annualMultiplier : 1.0;

    if (starterPriceRef.current) starterPriceRef.current.innerText = `${config.symbol}${(PRICING_MATRIX.baseTiers.starter * config.rate * billingMultiplier).toFixed(0)}`;
    if (proPriceRef.current) proPriceRef.current.innerText = `${config.symbol}${(PRICING_MATRIX.baseTiers.pro * config.rate * billingMultiplier).toFixed(0)}`;
    if (enterprisePriceRef.current) enterprisePriceRef.current.innerText = `${config.symbol}${(PRICING_MATRIX.baseTiers.enterprise * config.rate * billingMultiplier).toFixed(0)}`;
  };

  useEffect(() => { calculateAndRenderPrices(); }, []);

  const handleCurrencyChange = (e) => { currentCurrency.current = e.target.value; calculateAndRenderPrices(); };
  const handleBillingToggle = (type) => { currentBilling.current = type; calculateAndRenderPrices(); };

  return (
    <section className="w-full py-20 px-6 bg-[#172B36]" id="pricing">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-mono font-bold mb-8 text-[#F1F6F4]">Isolated Tier Matrix</h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12 items-center bg-[#114C5A] p-2 rounded-lg">
          <button onClick={() => handleBillingToggle('monthly')} className="px-4 py-2 rounded font-mono text-sm hover:bg-[#FFC801] hover:text-[#172B36] text-[#F1F6F4] transition-colors duration-150">Monthly</button>
          <button onClick={() => handleBillingToggle('annual')} className="px-4 py-2 rounded font-mono text-sm hover:bg-[#FFC801] hover:text-[#172B36] text-[#F1F6F4] transition-colors duration-150">Annual (-20%)</button>
          
          <select onChange={handleCurrencyChange} className="bg-[#172B36] text-[#F1F6F4] px-3 py-2 rounded outline-none border border-[#D9E8E2]/20 font-mono text-sm">
            <option value="USD">USD ($)</option>
            <option value="INR">INR (₹)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {['Starter', 'Pro', 'Enterprise'].map((tier) => {
            const refMap = { Starter: starterPriceRef, Pro: proPriceRef, Enterprise: enterprisePriceRef };
            return (
              <div key={tier} className="bg-[#114C5A]/40 border border-[#D9E8E2]/10 p-8 rounded-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-mono text-[#FFC801] font-semibold mb-4">{tier} Node</h3>
                  <div ref={refMap[tier]} className="text-4xl font-bold mb-4 font-mono text-[#F1F6F4]">--</div>
                  <p className="text-[#D9E8E2]/80 text-sm mb-6 font-sans">High-performance computational automation block.</p>
                </div>
                <button className="w-full py-3 bg-[#FF9932] text-[#172B36] font-bold rounded-lg hover:bg-[#FFC801] transition-colors duration-150 font-mono">
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
    <main className="flex min-h-screen flex-col items-center bg-[#172B36] text-[#F1F6F4]">
      {/* Hero Section */}
      <section className="w-full max-w-5xl flex flex-col items-center text-center pt-24 pb-16 px-6">
        <h1 className="text-4xl md:text-7xl font-mono font-bold leading-tight mb-6 tracking-tight">
          Accelerate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC801] to-[#FF9932]">data pipeline.</span>
        </h1>
        <p className="text-base md:text-lg text-[#D9E8E2] max-w-2xl font-sans mb-10">
          Deploy high-performance computational nodes instantly. Optimize your infrastructure with predictive matrix analytics and isolated multi-tenant ledgers.
        </p>
        <button className="px-8 py-4 bg-[#FF9932] text-[#172B36] font-bold font-mono rounded-lg hover:bg-[#FFC801] transition-colors duration-200">
          Initialize System Core
        </button>
      </section>

      <ResponsiveBentoAccordion />
      <IsolatedPricingSection />
    </main>
  );
}
