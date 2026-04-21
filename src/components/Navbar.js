'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#planner', label: 'Trip Planner' },
    { href: '/prices', label: 'Fair Prices' },
    { href: '#services', label: 'Book Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/checklist', label: 'Checklist' },
  ];

  const NavLink = ({ href, className, onClick, children }) => {
    if (href.startsWith('#')) {
      return <a href={href} className={className} onClick={onClick}>{children}</a>;
    }
    return <Link href={href} className={className} onClick={onClick}>{children}</Link>;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 ${scrolled ? 'bg-[#0a0f1a]/95 backdrop-blur-xl' : 'bg-[#0a0f1a]/80 backdrop-blur-lg'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-2xl">🌴</span>
          <span className="font-display text-xl text-white">BaliBuddy</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <NavLink key={l.href} href={l.href} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              {l.label}
            </NavLink>
          ))}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            💬 WhatsApp Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-2xl">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/5 px-6 pb-6 animate-fade-in">
          {links.map(l => (
            <NavLink key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="block py-3 text-slate-400 hover:text-white border-b border-white/5 transition-colors">
              {l.label}
            </NavLink>
          ))}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}`}
            target="_blank" rel="noopener noreferrer"
            className="block mt-4 text-center py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 font-semibold"
          >
            💬 WhatsApp Us
          </a>
        </div>
      )}
    </nav>
  );
}