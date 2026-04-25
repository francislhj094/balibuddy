'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { href: '/planner', label: 'Trip Planner' },
    { href: '/prices', label: 'Fair Prices' },
    { href: '/services', label: 'Book Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/checklist', label: 'Checklist' },
  ];

  const NavLink = ({ href, className, onClick, children }) => {
    const isActive = pathname === href;
    const activeClass = isActive ? 'text-cyan-400' : '';
    if (href.startsWith('#')) {
      return <a href={href} className={`${className} ${activeClass}`} onClick={onClick}>{children}</a>;
    }
    return <Link href={href} className={`${className} ${activeClass}`} onClick={onClick}>{children}</Link>;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? 'border-white/8 bg-[#0a0f1a]/95 backdrop-blur-2xl shadow-lg shadow-black/20' : 'border-transparent bg-[#0a0f1a]/60 backdrop-blur-lg'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🌴</span>
            <span className="font-display text-xl text-white">BaliBuddy</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <NavLink key={l.href} href={l.href} className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-300 relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </NavLink>
            ))}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6282341834263'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              💬 WhatsApp Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white text-2xl w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            <motion.span
              key={menuOpen ? 'close' : 'open'}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              {menuOpen ? '✕' : '☰'}
            </motion.span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu — Full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-[45] bg-[#0a0f1a]/98 backdrop-blur-2xl pt-[72px]"
          >
            <div className="flex flex-col justify-between h-full px-8 py-8">
              <div className="space-y-1">
                {links.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <NavLink href={l.href} onClick={() => setMenuOpen(false)}
                      className="block py-4 text-lg text-slate-300 hover:text-white border-b border-white/5 transition-colors">
                      {l.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="pb-8"
              >
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6282341834263'}`}
                  target="_blank" rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center py-4 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 font-semibold text-base"
                >
                  💬 WhatsApp Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}