import { useRef } from 'react'
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { SectionLabel, Reveal, Brackets, KineticText } from './Motion'

export default function Vision() {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const sectionInView = useInView(ref, { margin: '180px 0px', amount: 0.08 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 95, damping: 30, mass: 0.22, restDelta: 0.0005 })
  const x1 = useTransform(smoothScroll, [0, 1], ['-20%', '5%'])
  const x2 = useTransform(smoothScroll, [0, 1], ['5%', '-25%'])
  const clip = useTransform(smoothScroll, [0.1, 0.4], ['inset(18% 14% 18% 14% round 48px)', 'inset(0% 0% 0% 0% round 0px)'])
  const artworkY = useTransform(smoothScroll, [0, 1], reduceMotion ? [0, 0] : [24, -24])
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const smoothTiltX = useSpring(tiltX, { stiffness: 150, damping: 22, mass: 0.45 })
  const smoothTiltY = useSpring(tiltY, { stiffness: 150, damping: 22, mass: 0.45 })

  const handleArtworkMove = (event) => {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    tiltX.set(y * -6)
    tiltY.set(x * 8)
  }

  const resetArtworkTilt = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <section ref={ref} data-section className="relative bg-ink">
      <motion.div
        style={{ clipPath: clip, willChange: 'clip-path' }}
        className="relative transform-gpu overflow-hidden bg-gradient-to-br from-sun via-sun to-hot py-28 text-ink [contain:layout_paint] md:py-40"
      >
        <motion.div
          style={{ x: x1 }}
          className="display pointer-events-none whitespace-nowrap text-[20vw] text-ink/[0.07] will-change-transform [backface-visibility:hidden]"
        >
          Trusted · Fast · Reliable · Trusted
        </motion.div>

        <div className="container-x relative -mt-[12vw]">
          <SectionLabel index="07" dark={false}>Vision &amp; Mission</SectionLabel>
          <div className="mt-10 grid items-center gap-10 sm:mt-14 sm:gap-12 lg:grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)] lg:gap-14 xl:gap-20">
            <motion.div
              style={{ y: artworkY }}
              className="relative mx-auto flex w-full max-w-[44rem] items-center justify-center will-change-transform [backface-visibility:hidden] lg:mx-0"
            >
              <motion.div
                className="relative w-full"
                initial={reduceMotion ? false : { opacity: 0, y: 35, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reduceMotion ? 0 : 1.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="relative w-full [transform-style:preserve-3d]"
                  style={{ rotateX: smoothTiltX, rotateY: smoothTiltY, transformPerspective: 1200 }}
                  onPointerMove={handleArtworkMove}
                  onPointerLeave={resetArtworkTilt}
                >
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-[12%] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(255,198,40,.42) 0%, rgba(255,2,141,.16) 44%, transparent 72%)' }}
                    animate={!reduceMotion && sectionInView
                      ? { opacity: [0.55, 0.82, 0.55], scale: [0.96, 1.04, 0.96] }
                      : { opacity: 0.68, scale: 1 }}
                    transition={!reduceMotion && sectionInView
                      ? { duration: 7, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.25 }}
                  />
                  <motion.div
                    className="relative z-10 w-full will-change-transform"
                    animate={!reduceMotion && sectionInView ? { y: [0, -10, 0] } : { y: 0 }}
                    transition={!reduceMotion && sectionInView
                      ? { duration: 6.5, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.25 }}
                  >
                    <img
                      src="/images/vision-collaboration.png"
                      alt="Three technology specialists working together to drive business growth"
                      className="block h-auto w-full select-none object-contain"
                      width="1254"
                      height="1254"
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            <div className="flex w-full flex-col gap-8 sm:gap-10">
              <Reveal className="w-full">
                <div className="relative rounded-[28px] border-t-4 border-hot bg-ink p-6 sm:p-8 text-white md:p-12">
                  <Brackets size={18} color="#F4BC21" className="m-3 sm:m-4" />
                  <div className="label text-sun">Our vision</div>
                  <p className="mt-4 sm:mt-6 font-display text-xl sm:text-2xl font-bold leading-snug tracking-tight md:text-[2rem]">
                    To be the most trusted, go-to tech solutions provider for businesses across Kuala Lumpur and Selangor delivering quality, speed and reliability every time.
                  </p>
                </div>
              </Reveal>
              <Reveal className="w-full" delay={0.15}>
                <div className="relative rounded-[28px] bg-volt p-6 sm:p-8 text-white md:p-12">
                  <Brackets size={18} color="#FF028D" className="m-3 sm:m-4" />
                  <div className="label text-hot">Our mission</div>
                  <p className="mt-4 sm:mt-6 font-display text-xl sm:text-2xl font-bold leading-snug tracking-tight md:text-[2rem]">
                    To deliver reliable IT support and quality technology solutions that help businesses stay productive, connected and running without disruption.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <motion.div
          style={{ x: x2 }}
          className="display text-outline pointer-events-none mt-16 whitespace-nowrap text-[16vw] text-ink/25 will-change-transform [backface-visibility:hidden] sm:mt-20"
        >
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
