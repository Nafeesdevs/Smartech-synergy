import { motion } from 'framer-motion'
import { areas, brand } from '../data/content'
import { SectionLabel, MaskLines, Reveal, ease } from './Motion'
import Icon from './Icons'

/* A radar-style coverage map built from dots — echoing the reel's particle ring */
function Radar() {
  const rings = [0.32, 0.56, 0.8]
  const placed = areas.map((a, i) => {
    const ring = rings[i % 3]
    const ang = (i / areas.length) * Math.PI * 2 + (i % 3) * 0.5
    return { a, x: 50 + Math.cos(ang) * ring * 50, y: 50 + Math.sin(ang) * ring * 50 }
  })
  const particles = Array.from({ length: 180 }, (_, i) => {
    const r = 0.18 + ((Math.sin(i * 91.7) + 1) / 2) * 0.8
    const ang = i * 2.399
    return { x: 50 + Math.cos(ang) * r * 50, y: 50 + Math.sin(ang) * r * 50, s: 1 + ((i * 7) % 3) * 0.5 }
  })
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[620px]">
      {rings.map((r) => (
        <span key={r} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15" style={{ width: `${r * 100}%`, height: `${r * 100}%` }} />
      ))}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: 'conic-gradient(from 0deg, rgba(244,188,33,.28), transparent 18%)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div className="absolute inset-0" animate={{ rotate: -360 }} transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}>
        {particles.map((p, i) => (
          <span key={i} className="absolute rounded-full bg-white/30" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s }} />
        ))}
      </motion.div>
      {/* HQ */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 animate-ping rounded-full bg-sun/60" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-sun text-ink">
          <Icon name="pin" className="h-6 w-6" />
        </span>
      </div>
      {placed.map((p, i) => (
        <motion.div
          key={p.a}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.2 + i * 0.07 }}
        >
          <span className="flex items-center gap-2 whitespace-nowrap rounded-full bg-steel/90 px-3 py-1.5 text-xs font-semibold ring-1 ring-white/10 backdrop-blur">
            <span className={`h-2 w-2 rounded-full ${i % 2 ? 'bg-volt' : 'bg-sun'}`} />
            {p.a}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

export default function Coverage() {
  return (
    <section id="coverage" data-section className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionLabel index="07">Coverage</SectionLabel>
          <h2 className="display mt-8 text-[13vw] sm:text-7xl lg:text-[6vw]">
            <MaskLines lines={['We come', <span key="t" className="text-sun">to you.</span>]} />
          </h2>
          <Reveal>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-white/65">
              Based in {brand.base} and covering the entire Klang Valley. Whether you&rsquo;re in KL, Petaling Jaya, Subang, Shah Alam, Ampang or anywhere in between — we&rsquo;ve got you covered.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {['Offices', 'Businesses', 'Homes'].map((t, i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/10 p-5 text-center">
                  <div className="font-display text-lg font-black uppercase">{t}</div>
                  <div className="label mt-1 text-white/40">On-site</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Radar />
      </div>
    </section>
  )
}
