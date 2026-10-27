import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { problems } from '../data/content'
import { KineticText, SectionLabel, Reveal, ease } from './Motion'

export default function Problems() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bigX = useTransform(scrollYProgress, [0, 1], ['10%', '-40%'])

  return (
    <section ref={ref} data-section className="relative overflow-hidden bg-ink py-28 md:py-40">
      <motion.div style={{ x: bigX }} className="display text-outline pointer-events-none absolute top-10 whitespace-nowrap text-[22vw] text-white/[0.06]">
        Productivity · Downtime · Productivity
      </motion.div>

      <div className="container-x relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index="02">Problems we solve</SectionLabel>
            <h2 className="display mt-8 text-5xl sm:text-6xl lg:text-[4.6vw]">
              <KineticText text="Are your" className="block" />
              <KineticText text="devices" className="block text-sun" delay={0.2} />
              <KineticText text="slowing you" className="block" delay={0.4} />
              <KineticText text="down?" className="block" delay={0.6} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md leading-relaxed text-white/65">
                Technology is the backbone of every operation. A slow PC wastes hours, a crashed system halts work and a faulty device means missed deadlines. Without a dedicated IT team, these problems pile up fast — costing you time, money and productivity.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="label mb-6 text-white/40">We understand your challenges</div>
          <ul className="border-t border-white/10">
            {problems.map((p, i) => (
              <motion.li
                key={p.t}
                data-hover
                className="group relative overflow-hidden border-b border-white/10"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.9, ease, delay: i * 0.05 }}
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-sun transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" />
                <div className="relative flex items-start gap-6 px-2 py-8 transition-colors duration-300 group-hover:text-ink md:gap-10 md:py-10">
                  <span className="label pt-2 text-white/40 group-hover:text-ink/60">0{i + 1}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-black uppercase tracking-tight md:text-4xl">{p.t}</h3>
                    <p className="mt-3 max-w-lg text-white/55 transition-colors group-hover:text-ink/70">{p.d}</p>
                  </div>
                  <span className="mt-2 hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-ink md:flex">
                    +
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
          <Reveal>
            <p className="mt-10 font-display text-xl font-bold uppercase tracking-tight text-white/80 md:text-2xl">
              Fast, professional, cost-effective IT support — <span className="text-sun">without hiring a full IT team.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
