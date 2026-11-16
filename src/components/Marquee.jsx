import { useRef } from 'react'
import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame, useInView, useReducedMotion } from 'framer-motion'

const wrap = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

/* Scroll-velocity-reactive marquee — speeds up and skews as you scroll, like the reel's kinetic type bands */
export function VelocityRow({ items, baseVelocity = 3, className = '', itemClass = '', sep = '•', sepClass = 'text-sun', performanceLite = false }) {
  const row = useRef(null)
  const inView = useInView(row, { margin: '200px 0px' })
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const { scrollY } = useScroll()
  const vel = useVelocity(scrollY)
  const smooth = useSpring(vel, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [-1500, 0, 1500], [-5, 0, 5], { clamp: false })
  const skew = useTransform(smooth, [-2000, 0, 2000], [8, 0, -8])
  const dir = useRef(1)
  const lastFrame = useRef(0)
  const pendingDelta = useRef(0)
  const pos = useTransform(x, (v) => `${wrap(-25, 0, v)}%`)

  useAnimationFrame((time, delta) => {
    if (reduceMotion || !inView || document.hidden) return
    pendingDelta.current += delta
    if (performanceLite && time - lastFrame.current < 32) return
    lastFrame.current = time
    const frameDelta = pendingDelta.current
    pendingDelta.current = 0
    let move = dir.current * baseVelocity * (frameDelta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * move * f
    x.set(x.get() + move)
  })

  const line = (
    <>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className={itemClass}>{t}</span>
          <span className={`mx-[0.45em] ${sepClass}`}>{sep}</span>
        </span>
      ))}
    </>
  )
  return (
    <div ref={row} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="flex w-max flex-nowrap" style={{ x: pos, skewX: skew }}>
        {[0, 1, 2, 3].map((k) => (
          <div key={k} className="flex shrink-0">
            {line}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function MarqueeBand({ a, performanceLite = false }) {
  return (
    <section className="relative overflow-hidden bg-ink py-10 md:py-16" aria-label="What we do">
      <div className="-rotate-2 bg-sun py-4 text-ink md:py-6">
        <VelocityRow items={a} baseVelocity={1.75} itemClass="display text-5xl md:text-8xl" sepClass="text-ink" sep="✦" performanceLite={performanceLite} />
      </div>
    </section>
  )
}
