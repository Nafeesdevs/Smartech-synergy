import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { services } from '../data/content'
import Icon from './Icons'
import { SectionLabel, MaskLines } from './Motion'

const tones = {
  sun: 'bg-sun text-ink',
  volt: 'bg-volt text-white',
  paper: 'bg-paper text-ink',
}

function Card({ s, i, progress, total }) {
  const center = (i + 0.5) / total
  const rotate = useTransform(progress, [center - 0.35, center, center + 0.35], [6, 0, -6])
  const iconRot = useTransform(progress, [0, 1], [0, 360])
  return (
    <motion.article
      style={{ rotate }}
      data-hover
      className={`group relative flex h-[68vh] max-h-[620px] min-h-[460px] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-[28px] p-7 sm:w-[60vw] md:p-10 lg:w-[34vw] ${tones[s.tone]}`}
    >
      <div className="flex items-start justify-between">
        <span className="font-display text-7xl font-black leading-none tracking-tightest opacity-90 md:text-8xl">{s.n}</span>
        <motion.span style={{ rotate: iconRot }} className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-current">
          <Icon name={s.icon} className="h-8 w-8" />
        </motion.span>
      </div>
      {/* decorative dot matrix */}
      <div className="dot-grid pointer-events-none absolute -right-10 top-1/3 h-48 w-64 opacity-20 transition-transform duration-700 group-hover:translate-x-[-20px]" />
      <div className="relative">
        <h3 className="font-display text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-[2.6rem]">{s.t}</h3>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed opacity-75">{s.d}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {s.tags.map((t) => (
            <span key={t} className="label rounded-full border border-current/30 px-3 py-1.5" style={{ borderColor: 'currentColor' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export default function Services() {
  const ref = useRef(null)
  const track = useRef(null)
  const [dist, setDist] = useState(0)
  useEffect(() => {
    const calc = () => track.current && setDist(track.current.scrollWidth - window.innerWidth)
    calc()
    document.fonts?.ready.then(calc)
    const t = setTimeout(calc, 1200)
    window.addEventListener('resize', calc)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', calc)
    }
  }, [])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })
  const x = useTransform(p, [0, 1], [0, -dist])
  const bar = useTransform(p, [0, 1], ['0%', '100%'])

  return (
    <section id="services" data-section ref={ref} className="relative bg-ink" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex items-center gap-6 pl-5 pr-[10vw] sm:pl-8 md:gap-8 lg:pl-12">
          <div className="flex w-[82vw] shrink-0 flex-col justify-center pr-6 sm:w-[60vw] lg:w-[32vw]">
            <SectionLabel index="03">What we offer</SectionLabel>
            <h2 className="display mt-8 text-6xl md:text-7xl lg:text-[5.4vw]">
              <MaskLines lines={['Everything', 'your tech', <span key="n" className="text-sun">needs.</span>]} />
            </h2>
            <p className="mt-8 max-w-sm leading-relaxed text-white/60">
              Five core services, one trusted partner. Scroll through how we keep your devices — and your people — productive.
            </p>
            <div className="label mt-10 flex items-center gap-3 text-white/40">
              Scroll <span className="inline-block h-px w-16 bg-white/30" /> →
            </div>
          </div>
          {services.map((s, i) => (
            <Card key={s.n} s={s} i={i} progress={p} total={services.length} />
          ))}
        </motion.div>
        <div className="container-x absolute bottom-10 left-0 right-0">
          <div className="h-px w-full bg-white/10">
            <motion.div className="h-px bg-sun" style={{ width: bar }} />
          </div>
        </div>
      </div>
    </section>
  )
}
