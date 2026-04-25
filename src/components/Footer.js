import Link from 'next/link';

export default function Footer() {
  const columns = [
    { title: 'Plan', links: [{name: 'AI Trip Planner', href: '/planner'}, {name: 'Fair Price Guide', href: '/prices'}, {name: 'Arrival Checklist', href: '/checklist'}, {name: 'Bali Travel Blog', href: '/blog'}] },
    { title: 'Book', links: [{name: 'Airport Transfer', href: '/services'}, {name: 'Private Driver', href: '/services'}, {name: 'Day Tours', href: '/services'}, {name: 'Spa & Wellness', href: '/services'}] },
    { title: 'Company', links: [{name: 'About Us', href: '#'}, {name: 'For Drivers', href: '#'}, {name: 'Terms of Service', href: '/terms'}, {name: 'Privacy Policy', href: '/privacy'}] },
  ];

  const FooterLink = ({ href, children }) => {
    if (href.startsWith('#') || href.startsWith('http')) {
      return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="block text-sm text-slate-400 py-1.5 hover:text-white hover:translate-x-1 transition-all duration-300">{children}</a>;
    }
    return <Link href={href} className="block text-sm text-slate-400 py-1.5 hover:text-white hover:translate-x-1 transition-all duration-300">{children}</Link>;
  };

  return (
    <footer className="relative border-t border-white/5 py-20 px-6">
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3 group">
              <span className="text-xl group-hover:scale-110 transition-transform duration-300">🌴</span>
              <span className="font-display text-lg">BaliBuddy</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[260px]">Your trusted AI-powered travel companion for Bali. Plan smarter, pay fairly, travel safely.</p>
          </div>
          {columns.map((col, i) => (
            <div key={i}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 mb-4">{col.title}</h4>
              {col.links.map((link, j) => (
                <FooterLink key={j} href={link.href}>{link.name}</FooterLink>
              ))}
            </div>
          ))}
        </div>

        {/* BaliLingo Cross-Promotion */}
        <div className="mb-8 py-5 px-6 rounded-xl bg-gradient-to-r from-cyan-500/[0.04] to-emerald-500/[0.04] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-cyan-500/15 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🗣️</span>
            <div>
              <p className="text-sm font-medium text-slate-300">Want to learn Bahasa before your trip?</p>
              <p className="text-xs text-slate-500">Try <strong className="text-cyan-400">BaliLingo</strong> — learn Indonesian phrases tourists actually need</p>
            </div>
          </div>
          <a
            href="https://balilingo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300 whitespace-nowrap"
          >
            Try BaliLingo →
          </a>
        </div>

        <div className="text-center pt-8 border-t border-white/5">
          <p className="text-sm text-slate-600">© 2026 BaliBuddy. Made with ☀️ in Bali.</p>
        </div>
      </div>
    </footer>
  );
}