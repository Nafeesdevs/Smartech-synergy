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
  const lastCardRef = useRef(null)
  const [dist, setDist] = useState(0)

  useEffect(() => {
    const calc = () => {
      if (track.current && lastCardRef.current) {
        // Measure exact distance to bring the last card completely into center/full view
        const trackRect = track.current.getBoundingClientRect()
        const lastCardRect = lastCardRef.current.getBoundingClientRect()
        // Current position of last card right edge relative to track start
        const lastCardEndRelativeToTrack = lastCardRect.right - trackRect.left
        // Target: last card is centered or has ample margin from viewport right edge
        const viewportWidth = window.innerWidth
        const targetMargin = Math.max(32, (viewportWidth - lastCardRect.width) / 2)
        const travel = lastCardEndRelativeToTrack - viewportWidth + targetMargin
        setDist(Math.max(0, travel))
      } else if (track.current) {
        setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 120))
      }
    }

    calc()
    document.fonts?.ready.then(calc)
    const t1 = setTimeout(calc, 250)
    const t2 = setTimeout(calc, 800)

    const ro = new ResizeObserver(calc)
    if (track.current) ro.observe(track.current)

    window.addEventListener('resize', calc)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      ro.disconnect()
      window.removeEventListener('resize', calc)
    }
  }, [])

  // Use a longer scroll distance multiplier for a luxurious, buttery-smooth scroll
  const scrollDistance = Math.round(dist * 1.35)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 65, damping: 20, mass: 0.15, restDelta: 0.0001 })
  const x = useTransform(p, [0, 1], [0, -dist])
  const bar = useTransform(p, [0, 1], ['0%', '100%'])

  return (
    <section id="services" data-section ref={ref} className="relative bg-ink" style={{ height: `calc(100vh + ${scrollDistance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex items-center gap-6 pl-5 pr-12 sm:pl-8 sm:pr-16 md:gap-8 lg:pl-12 lg:pr-24">
          <div className="flex w-[85vw] shrink-0 flex-col justify-center pr-6 sm:w-[60vw] md:w-[48vw] lg:w-[35vw] xl:w-[32vw]">
            <SectionLabel index="03">What we offer</SectionLabel>
            <h2 className="display mt-8 text-4xl sm:text-5xl md:text-5xl lg:text-[4.2vw] xl:text-[4.0vw]">
              <MaskLines lines={['Everything', 'your', 'tech', <span key="n" className="text-sun">needs.</span>]} />
            </h2>
            <p className="mt-8 max-w-sm leading-relaxed text-white/60">
            Device repairs, performance upgrades, office setups, custom PC builds and on-site support. Our five core services address the practical needs of your workplace, whether you are resolving an immediate fault or preparing for your next stage of growth.
            </p>
            <div className="label mt-10 flex items-center gap-3 text-white/40">
              Scroll <span className="inline-block h-px w-16 bg-white/30" /> →
            </div>
          </div>
          {services.map((s, i) => (
            <div key={s.n} ref={i === services.length - 1 ? lastCardRef : null} className="shrink-0">
              <Card s={s} i={i} progress={p} total={services.length} />
            </div>
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
