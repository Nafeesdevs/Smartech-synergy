import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Icon from './Icons'
import { MaskLines, ScrollWords, Reveal, SectionLabel, Parallax, ease } from './Motion'

export function RingText({ text, size = 220, className = '', dark = false, speed = 1 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rot = useTransform(scrollYProgress, [0, 1], [0, 360 * speed])
  return (
    <div ref={ref} className={`relative ${className}`} style={{ width: size, height: size }}>
      <motion.svg viewBox="0 0 200 200" className="h-full w-full" style={{ rotate: rot }}>
        <defs>
          <path id="ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className={`font-display font-black uppercase ${dark ? 'fill-ink' : 'fill-white'}`} style={{ fontSize: 15.5, letterSpacing: 3.2 }}>
          <textPath href="#ring">{text}</textPath>
        </text>
      </motion.svg>
      <motion.span
        className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

const points = [
  'Quick & reliable response within 24 hours',
  'On-site service during & after hours',
  'Clear & competitive pricing',
  'IT support across Kuala Lumpur & Selangor',
]

export default function About() {
  return (
    <section id="about" data-section className="relative overflow-hidden bg-paper py-28 text-ink md:py-40">
      <div className="dot-grid pointer-events-none absolute inset-0 text-ink/[0.07]" />
      <div className="container-x relative">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="01" dark={false}>About us</SectionLabel>
            <h2 className="display mt-8 text-[13vw] sm:text-7xl lg:text-[6.4vw]">
              <MaskLines lines={['Your IT team,', 'without the', <span key="o" className="text-volt">overhead.</span>]} />
            </h2>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink/75">
                Smartech Synergys is a Kuala Lumpur and Selangor based IT solutions provider dedicated to keeping your business running smoothly. From emergency repairs to complete office setups, we take care of your technology — so you can stay focused on what you do best.
              </p>
            </Reveal>
            <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {points.map((p, i) => (
                <motion.li
                  key={p}
                  className="group flex items-center gap-4 py-4"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sun transition-colors duration-300 group-hover:bg-volt group-hover:text-white">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <span className="font-display text-base font-bold uppercase tracking-wide">{p}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mt-28 grid items-center gap-16 md:mt-40 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <ScrollWords
              className="font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.6vw]"
              highlight={['luxury', 'exist', 'never', 'skip', 'beat']}
              text="Most businesses don't have the luxury of a full-time IT department. That's exactly why we exist. We step in when you need us, fix what's broken and make sure your operations never skip a beat."
            />
          </div>
          <div className="flex justify-center lg:col-span-3">
            <Parallax speed={0.4}>
              <RingText dark text="24H Response • On-site Service • KL & Selangor • " size={230} speed={1.4} />
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  )
}
