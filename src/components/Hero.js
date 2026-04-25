'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const num = parseInt(target.replace(/[^0-9]/g, ''));
    if (isNaN(num)) { setCount(target); return; }
    const duration = 1500;
    const steps = 40;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={ref}>
      {prefix}{typeof count === 'number' ? count.toLocaleString() : count}{suffix}
    </span>
  );
}

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Bali Trip';

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(typeInterval);
    };
  }, []);

  const stats = [
    { value: '7', suffix: 'M+', label: 'Tourists/Year' },
    { value: '0', prefix: '$', suffix: '', label: 'Planning Cost' },
    { value: '500', suffix: '+', label: 'Vetted Drivers' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-20 overflow-hidden">
      {/* Parallax background */}
      <div className="absolute inset-0 z-[-3] pointer-events-none" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=80')",
            filter: 'brightness(0.55) saturate(1.2)',
          }}
        />
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 z-[-2] bg-gradient-to-b from-[#0a0f1a]/40 via-transparent to-[#0a0f1a]" />

      {/* Floating gradient orbs */}
      <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.04] blur-[100px]" style={{ animation: 'float-orb-1 15s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/[0.04] blur-[80px]" style={{ animation: 'float-orb-2 18s ease-in-out infinite' }} />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-emerald-500/[0.03] blur-[80px]" style={{ animation: 'float-orb-1 20s ease-in-out infinite reverse' }} />
      </div>

      {/* Particles */}
      <div className="hero-particles" />

      {/* Pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%221%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

      <div className="relative text-center max-w-3xl mx-auto z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-block px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8"
        >
          🛡️ Trusted by 10,000+ travelers
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] leading-[1.1] mb-7 tracking-tight"
        >
          Plan Your Perfect <br />
          <span className="gradient-text">{typedText}</span>
          {showCursor && <span className="animate-pulse text-cyan-400">|</span>}
          {' '}in 60 Seconds
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-lg text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed"
        >
          AI-powered itineraries. Transparent pricing. Vetted local services.
          <br />Never overpay or get scammed again.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <a href="/planner" className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 font-semibold text-base shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/35 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
            <span className="relative z-10">Plan My Trip — Free</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a href="#prices" className="px-8 py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 hover:border-white/30 transition-all duration-300">
            See Fair Prices →
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex items-center justify-center gap-8 sm:gap-14"
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-8 sm:gap-14">
              {i > 0 && <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent" />}
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-display text-cyan-400">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-[0.15em] mt-1.5">{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-slate-600 uppercase tracking-[0.2em]">Scroll to explore</span>
        <div className="w-px h-8 bg-gradient-to-b from-cyan-500/50 to-transparent" style={{ animation: 'scrollPulse 2s ease infinite' }} />
      </motion.div>
    </section>
  );
}