import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion'
import { steps } from '../data/content'
import { SectionLabel, MaskLines, Reveal, ease } from './Motion'

/* The reel's striped "tube" line, drawn by scroll with a dot riding its tip */
const PATH = 'M50 0 C 50 80, 88 110, 88 200 S 12 320, 12 400 S 88 520, 88 600 S 12 720, 12 800 S 50 920, 50 1000'
const scalePath = (w, h) =>
  PATH.replace(/(-?\d+\.?\d*)\s*,?\s*(-?\d+\.?\d*)/g, (_, x, y) => `${((+x / 100) * w).toFixed(1)} ${((+y / 1000) * h).toFixed(1)}`)

export default function Process() {
  const ref = useRef(null)
  const pathRef = useRef(null)
  const dotX = useMotionValue('50%')
  const dotY = useMotionValue(0)
  const [box, setBox] = useState({ w: 1000, h: 1300 })
  const [len, setLen] = useState(1)
  const [active, setActive] = useState(-1)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 70%'] })
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
  const dash = useTransform(p, (v) => 1 - Math.max(0, Math.min(1, v)))

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  useEffect(() => {
    if (!pathRef.current) return
    const nextLen = pathRef.current.getTotalLength()
    const progress = Math.max(0, Math.min(1, p.get()))
    const pt = pathRef.current.getPointAtLength(progress * nextLen)
    setLen(nextLen)
    dotX.set(pt.x)
    dotY.set(pt.y)
  }, [box, dotX, dotY, p])
  const d = scalePath(box.w, box.h)
  useMotionValueEvent(p, 'change', (v) => {
    if (!pathRef.current) return
    const pt = pathRef.current.getPointAtLength(Math.max(0, Math.min(1, v)) * len)
    dotX.set(pt.x)
    dotY.set(pt.y)
    setActive(Math.floor(v * steps.length - 0.15))
  })

  return (
    <section id="process" data-section className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div className="container-x">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
            <SectionLabel index="06">How it works</SectionLabel>
          </div>
          <h2 className="display mt-6 sm:mt-8 text-[11vw] sm:text-6xl md:text-7xl lg:text-[6vw]">
            <MaskLines lines={['Simple. Fast.', <span key="h" className="text-sun">Hassle-free.</span>]} />
          </h2>
          <Reveal>
            <p className="mx-auto mt-4 sm:mt-6 max-w-lg text-sm sm:text-base text-white/60">Know what happens next. We assess your requirements, explain the recommended solution and carry out the work, then test the results before handover. Follow-up support gives you a point of contact once the job is complete.</p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mx-auto mt-14 sm:mt-20 max-w-5xl">
          <svg viewBox={`0 0 ${box.w} ${box.h}`} className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden="true">
            <path ref={pathRef} d={d} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="14" />
            <motion.path d={d} fill="none" stroke="#F4BC21" strokeWidth="14" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" style={{ strokeDashoffset: dash }} />
            <motion.path d={d} fill="none" stroke="#196BE4" strokeWidth="4" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" style={{ strokeDashoffset: dash }} />
          </svg>
          <motion.span
            className="pointer-events-none absolute z-10 h-6 w-6 sm:h-7 sm:w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-ink bg-white shadow-[0_0_0_6px_rgba(244,188,33,.35)]"
            style={{ left: dotX, top: dotY }}
          />

          <ol className="relative space-y-16 sm:space-y-24 md:space-y-32 py-6 sm:py-10">
            {steps.map((s, i) => {
              const right = i % 2 === 1
              const on = active >= i
              return (
                <li key={s.t} className={`flex items-center ${right ? 'justify-end' : 'justify-start'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.9, ease }}
                    style={{ backfaceVisibility: 'hidden', willChange: 'transform, opacity' }}
                    className={`relative w-[84%] sm:w-[48%] md:w-[45%] rounded-3xl border p-6 sm:p-7 md:p-8 backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-500 ease-out ${on ? 'border-sun/60 bg-steel/95 shadow-[0_10px_30px_rgba(244,188,33,0.08)]' : 'border-white/10 bg-coal/85'}`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full font-display text-base sm:text-lg font-black transition-colors duration-500 ${on ? 'bg-sun text-ink' : 'bg-white/10 text-white'}`}>
                        {i + 1}
                      </span>
                      <span className="label text-white/40">Step 0{i + 1}</span>
                    </div>
                    <h3 className="mt-4 sm:mt-5 font-display text-xl sm:text-2xl font-black uppercase tracking-tight md:text-3xl">{s.t}</h3>
                    <p className="mt-2 sm:mt-3 text-sm sm:text-[15px] leading-relaxed text-white/60">
                      {s.before}
                      <span className="font-bold text-white transition-colors duration-300 group-hover:text-white">
                        {s.highlight}
                      </span>
                      {s.after}
                    </p>
                  </motion.div>
                </li>
              )
            })}
          </ol>
        </div>

        <Reveal className="mt-16 text-center">
          <p className="font-display text-2xl font-bold italic text-white/80 md:text-3xl">&ldquo;From first contact to final check, we&rsquo;ve got you covered.&rdquo;</p>
        </Reveal>
      </div>
    </section>
  )
}
