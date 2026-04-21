export default function ProblemSection() {
  const problems = [
    { emoji: '😤', title: 'Overcharged Everywhere', desc: 'Airport taxi quotes 500K IDR for a ride that should cost 175K. Tour operators charge 3x the fair price. You never know what\'s real.' },
    { emoji: '😰', title: 'Hours of Research', desc: 'Reddit threads, TikTok videos, Facebook groups, outdated blogs — you spend more time planning than actually enjoying Bali.' },
    { emoji: '🤷', title: 'Who Do You Trust?', desc: 'Random WhatsApp drivers, unreviewed tour operators, fake Gojek jackets — it\'s impossible to know who\'s legit as a first-timer.' },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">The Problem</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-4">Bali Is Amazing. <span className="gradient-text">Planning It Shouldn't Be Painful.</span></h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <div key={i} className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-9 card-hover shadow-xl shadow-black/20">
              <div className="text-4xl mb-4">{p.emoji}</div>
              <h3 className="font-display text-xl mb-3">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}