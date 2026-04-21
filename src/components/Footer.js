import Link from 'next/link';

export default function Footer() {
  const columns = [
    { title: 'Plan', links: [{name: 'AI Trip Planner', href: '/planner'}, {name: 'Fair Price Guide', href: '/prices'}, {name: 'Arrival Checklist', href: '/checklist'}, {name: 'Bali Travel Blog', href: '/blog'}] },
    { title: 'Book', links: [{name: 'Airport Transfer', href: '/services'}, {name: 'Private Driver', href: '/services'}, {name: 'Day Tours', href: '/services'}, {name: 'Spa & Wellness', href: '/services'}] },
    { title: 'Company', links: [{name: 'About Us', href: '#'}, {name: 'For Drivers', href: '#'}, {name: 'Terms of Service', href: '/terms'}, {name: 'Privacy Policy', href: '/privacy'}] },
  ];

  const FooterLink = ({ href, children }) => {
    if (href.startsWith('#')) {
      return <a href={href} className="block text-sm text-slate-400 py-1.5 hover:text-white transition-colors">{children}</a>;
    }
    return <Link href={href} className="block text-sm text-slate-400 py-1.5 hover:text-white transition-colors">{children}</Link>;
  };

  return (
    <footer className="border-t border-white/5 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-xl">🌴</span>
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
        <div className="text-center pt-8 border-t border-white/5">
          <p className="text-sm text-slate-600">© 2026 BaliBuddy. Made with ☀️ in Bali.</p>
        </div>
      </div>
    </footer>
  );
}