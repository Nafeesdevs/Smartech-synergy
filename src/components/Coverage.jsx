import { motion } from 'framer-motion'
import { SectionLabel, MaskLines, Reveal, ease } from './Motion'
import Icon from './Icons'

// City marker positions follow the supplied coverage-map reference.
const cities = [
  { name: 'Cheras', ring: 0.15, bearing: 90, dot: 'bg-sun' },

  { name: 'Kuala Lumpur', ring: 0.38, bearing: 350, dot: 'bg-volt' },
  { name: 'Ampang', ring: 0.75, bearing: 340, dot: 'bg-sun' },

  { name: 'Petaling Jaya', ring: 0.5, bearing: 201, dot: 'bg-sun' },
  { name: 'Sunway', ring: 0.46, bearing: 240, dot: 'bg-volt' },
  { name: 'Subang', ring: 0.78, bearing: 245, dot: 'bg-sun' },
  { name: 'Puchong', ring: 0.72, bearing: 95, dot: 'bg-volt' },

  { name: 'Shah Alam', ring: 0.58, bearing: 279, dot: 'bg-sun' },
  { name: 'Cyberjaya', ring: 0.63, bearing: 140, dot: 'bg-volt' },
  { name: 'Klang', ring: 0.82, bearing: 284, dot: 'bg-sun' },
]

function toScreen(bearing, ring) {
  const rad = ((bearing - 90) * Math.PI) / 180
  return {
    x: 50 + Math.cos(rad) * ring * 50,
    y: 50 + Math.sin(rad) * ring * 50,
  }
}

function Radar() {
  // 4 Concentric circles radiating outward from Sunway Visio Tower
  const rings = [0.22, 0.44, 0.64, 0.82]

  const particles = Array.from({ length: 160 }, (_, i) => {
    const r = 0.14 + ((Math.sin(i * 91.7) + 1) / 2) * 0.84
    const ang = i * 2.399
    return { x: 50 + Math.cos(ang) * r * 50, y: 50 + Math.sin(ang) * r * 50, s: 1 + ((i * 7) % 3) * 0.5 }
  })

  return (
    <div className="relative mx-auto aspect-square w-[94%] max-w-[620px] select-none sm:w-full">
      {/* 4 Concentric distance rings radiating from Cheras HQ */}
      {rings.map((r) => (
        <span
          key={r}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/20"
          style={{ width: `${r * 100}%`, height: `${r * 100}%` }}
        />
      ))}

      {/* Radar sweeping beam animation */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{ background: 'conic-gradient(from 0deg, rgba(244,188,33,.28), transparent 22%)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Orbiting particles */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 130, repeat: Infinity, ease: 'linear' }}
      >
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/30"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s }}
          />
        ))}
      </motion.div>

      {/* Center Location Map Pin with pulsing radar glow */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 animate-ping rounded-full bg-sun/60" />
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-sun text-ink shadow-[0_0_24px_rgba(244,188,33,0.7)] sm:h-12 sm:w-12 sm:shadow-[0_0_30px_rgba(244,188,33,0.7)]">
          <Icon name="pin" className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      </div>

      {/* Cities placed to match the supplied coverage-map reference */}
      {cities.map((city, i) => {
        const { x, y } = toScreen(city.bearing, city.ring)

        return (
          <motion.div
            key={city.name}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.05 }}
          >
            <span className="flex items-center gap-1 rounded-full bg-steel/95 px-1.5 py-1 text-[8px] font-bold text-white shadow-lg ring-1 ring-white/20 transition-all duration-300 hover:scale-105 hover:ring-sun/60 sm:gap-2 sm:whitespace-nowrap sm:px-3.5 sm:py-1.5 sm:text-xs">
              <span className={`h-1 w-1 shrink-0 rounded-full sm:h-2 sm:w-2 ${city.dot}`} />
              <span className="text-center font-display leading-[1.05] tracking-tight uppercase text-white sm:text-left">
                {city.name.split(' ').map((word, wordIndex, words) => (
                  <span key={word} className="block sm:inline">
                    {word}
                    {wordIndex < words.length - 1 && <span className="hidden sm:inline"> </span>}
                  </span>
                ))}
              </span>
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Coverage() {
  return (
    <section id="coverage" data-section className="relative overflow-hidden bg-ink py-20 sm:py-28 md:py-40">
      <div className="container-x grid items-center gap-12 sm:gap-16 lg:grid-cols-2">
        <div>
          <SectionLabel index="08">Coverage</SectionLabel>
          <h2 className="display mt-6 sm:mt-8 text-[12vw] sm:text-6xl md:text-7xl lg:text-[6vw]">
            <MaskLines lines={['We come', <span key="t" className="text-sun">to you.</span>]} />
          </h2>
          <Reveal>
            <p className="mt-6 sm:mt-8 max-w-md text-base sm:text-lg leading-relaxed text-white/65">
              Based at Sunway Visio Tower in Cheras, Kuala Lumpur, our technicians provide fast on-site IT support across the entire Klang Valley. We deploy directly to your workplace or residence — from Cheras and central KL to Petaling Jaya, Subang, Shah Alam, and Klang.
            </p>
          </Reveal>
          <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-2.5 sm:gap-3">
            {[
              { t: 'Offices', sub: 'Corporate & SME' },
              { t: 'Businesses', sub: 'Retail & Shophouse' },
              { t: 'Homes', sub: 'Remote & WFH' },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 0.08} className="w-full">
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-coal/50 px-5 py-3.5 sm:px-6 sm:py-4 transition-all duration-300 hover:border-sun/40 hover:bg-steel/70">
                  <span className="font-display text-sm sm:text-base font-black uppercase tracking-tight text-white shrink-0">
                    {item.t}
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/50 text-right shrink-0 whitespace-nowrap">
                    {item.sub}
                  </span>
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
