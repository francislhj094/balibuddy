'use client';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Bali Trip';

  useEffect(() => {
    // Parallax
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Typewriter
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(typeInterval);
    };
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-20 overflow-hidden">
      {/* Background effects with Parallax */}
      <div className="absolute inset-0 z-[-2] pointer-events-none" style={{ transform: `translateY(${scrollY * 0.4}px)` }}>
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-[0.7]" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=80')" }} 
        />
      </div>
      
      {/* Overlay and Particles */}
      <div className="hero-particles"></div>
      <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.015%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

      <div className="relative text-center max-w-3xl mx-auto">
        {/* Badge */}
        <div className="inline-block px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-7 animate-fade-in-up">
          🛡️ Trusted by 10,000+ travelers
        </div>

        {/* Heading */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 animate-fade-in-up delay-100">
          Plan Your Perfect <br />
          <span className="gradient-text">{typedText}</span><span className="animate-pulse">|</span> in 60 Seconds
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
          AI-powered itineraries. Transparent pricing. Vetted local services.
          <br />Never overpay or get scammed again.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-16 animate-fade-in-up delay-300">
          <a href="/planner" className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 font-semibold text-base shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all">
            Plan My Trip — Free
          </a>
          <a href="#prices" className="px-8 py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 hover:border-white/25 transition-all">
            See Fair Prices →
          </a>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 animate-fade-in-up delay-400">
          {[
            { value: '7M+', label: 'Tourists/Year' },
            { value: '$0', label: 'Planning Cost' },
            { value: '500+', label: 'Vetted Drivers' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              {i > 0 && <div className="hidden" />}
              <span className="text-2xl font-display text-cyan-400">{stat.value}</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-500">
        <span className="text-xs text-slate-600 uppercase tracking-widest">Scroll to explore</span>
        <div className="w-px h-8 bg-gradient-to-b from-cyan-500/50 to-transparent" />
      </div>
    </section>
  );
}