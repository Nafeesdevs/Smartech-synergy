import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionLabel, Reveal, Brackets, KineticText } from './Motion'

export default function Vision() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['-20%', '5%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['5%', '-25%'])
  const clip = useTransform(scrollYProgress, [0.1, 0.4], ['inset(18% 14% 18% 14% round 48px)', 'inset(0% 0% 0% 0% round 0px)'])

  return (
    <section ref={ref} data-section className="relative bg-ink">
      <motion.div style={{ clipPath: clip }} className="relative overflow-hidden bg-sun py-28 text-ink md:py-40">
        <motion.div style={{ x: x1 }} className="display pointer-events-none whitespace-nowrap text-[20vw] text-ink/[0.07]">
          Trusted · Fast · Reliable · Trusted
        </motion.div>

        <div className="container-x relative -mt-[12vw]">
          <SectionLabel index="07" dark={false}>Vision &amp; Mission</SectionLabel>
          <div className="mt-10 sm:mt-14 grid gap-8 sm:gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative rounded-[28px] bg-ink p-6 sm:p-8 text-white md:p-12">
                <Brackets size={18} color="#F4BC21" className="m-3 sm:m-4" />
                <div className="label text-sun">Our vision</div>
                <p className="mt-4 sm:mt-6 font-display text-xl sm:text-2xl font-bold leading-snug tracking-tight md:text-[2rem]">
                  To be the most trusted, go-to tech solutions provider for businesses across Kuala Lumpur and Selangor delivering quality, speed and reliability every time.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative rounded-[28px] bg-volt p-6 sm:p-8 text-white md:p-12 lg:mt-24">
                <Brackets size={18} color="#fff" className="m-3 sm:m-4" />
                <div className="label text-white/70">Our mission</div>
                <p className="mt-4 sm:mt-6 font-display text-xl sm:text-2xl font-bold leading-snug tracking-tight md:text-[2rem]">
                  To deliver reliable IT support and quality technology solutions that help businesses stay productive, connected and running without disruption.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <motion.div style={{ x: x2 }} className="display text-outline pointer-events-none mt-16 sm:mt-20 whitespace-nowrap text-[16vw] text-ink/25">
          Quality · Speed · Reliability
        </motion.div>
        <div className="container-x">
          <h3 className="display mt-4 text-3xl sm:text-4xl md:text-6xl">
            <KineticText text="Every fix, on purpose." />
          </h3>
        </div>
      </motion.div>
    </section>
  )
}
