import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import DotField from './DotField'
import Icon from './Icons'
import { KineticText, Brackets, Magnetic, ease } from './Motion'
import { brand, highlights } from '../data/content'

export default function Hero({ ready, lenis }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const yText = useTransform(scrollYProgress, [0, 1], [0, 180])
  const stripeA = useTransform(scrollYProgress, [0, 1], [0, -320])
  const stripeB = useTransform(scrollYProgress, [0, 1], [0, -160])
  const dotsY = useTransform(scrollYProgress, [0, 1], [0, 220])

  const go = (e) => {
    e.preventDefault()
    lenis?.current?.scrollTo('#contact', { duration: 1.8 })
  }

  return (
    <section ref={ref} id="top" data-section className="relative min-h-[100svh] overflow-hidden bg-ink">
      <motion.div style={{ scale, opacity }} className="relative origin-top">
        {/* dot wave */}
        <motion.div style={{ y: dotsY }} className="absolute inset-x-0 bottom-0 top-[30%]">
          <DotField className="h-full w-full" />
        </motion.div>

        {/* PDF-cover diagonal stripes, parallaxed */}
        <motion.div
          style={{ y: stripeA, skewX: -34 }}
          initial={{ x: 400, opacity: 0 }}
          animate={ready ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1.6, ease, delay: 0.2 }}
          className="pointer-events-none absolute -right-[10%] top-[20%] h-[24vh] w-[44vw] opacity-60 md:opacity-100 bg-gradient-to-r from-sun/0 via-sun/80 to-sun"
        />
        <motion.div
          style={{ y: stripeB, skewX: -34 }}
          initial={{ x: 500, opacity: 0 }}
          animate={ready ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1.6, ease, delay: 0.35 }}
          className="pointer-events-none absolute -right-[16%] top-[56%] h-[14vh] w-[50vw] opacity-60 md:opacity-100 bg-gradient-to-r from-volt/0 via-volt/80 to-volt"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#09090B_0%,rgba(9,9,11,.85)_35%,rgba(9,9,11,0)_70%)]" />

        <motion.div style={{ y: yText }} className="container-x relative z-10 flex min-h-[100svh] flex-col justify-center pb-10 pt-32">
          <motion.div
            className="label mb-8 flex flex-wrap items-center gap-3 text-white/60"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <span className="rounded-full border border-white/20 px-3 py-1.5 text-white">IT Support · Tech Solutions</span>
            <span>Kuala Lumpur &amp; Selangor</span>
          </motion.div>

          {ready && (
            <h1 className="display text-[15vw] sm:text-[12vw] lg:text-[9.4vw]">
              <KineticText text="Tech that" className="block" delay={0.1} />
              <span className="relative inline-block px-[0.12em] text-sun">
                <KineticText text="never skips" delay={0.35} chaos={1.4} />
                <Brackets size={22} color="#F4BC21" />
              </span>
              <KineticText text="a beat." className="block" delay={0.7} />
            </h1>
          )}

          <motion.div
            className="mt-10 flex max-w-2xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:max-w-none"
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease, delay: 1.2 }}
          >
            <p className="max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
              {brand.tagline}. Fast repairs, upgrades, office setups and on-site support — so you can focus on running your business, not your devices.
            </p>
            <div className="flex flex-wrap gap-3">
              <Magnetic>
                <a href="#contact" onClick={go} className="btn btn-sun group">
                  <span className="relative z-10">Get a free consultation</span>
                  <Icon name="arrow" className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-white transition-transform duration-500 group-hover:scale-y-100" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={brand.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp
                </a>
              </Magnetic>
            </div>
          </motion.div>
        {/* highlight ticker */}
        <div className="mt-14 hidden md:block">
          <div className="grid grid-cols-4 border-t border-white/10">
            {highlights.map((h, i) => (
              <motion.div
                key={h.k}
                className="border-r border-white/10 py-5 pr-6 last:border-r-0 [&:not(:first-child)]:pl-6"
                initial={{ opacity: 0, y: 20 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease, delay: 1.4 + i * 0.08 }}
              >
                <div className="font-display text-2xl font-black uppercase">{h.k}</div>
                <div className="label mt-1 text-white/50">{h.v}</div>
              </motion.div>
            ))}
          </div>
        </div>
        </motion.div>

      </motion.div>
    </section>
  )
}
