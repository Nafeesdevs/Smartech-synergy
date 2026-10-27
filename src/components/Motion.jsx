import { useRef, useMemo } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
} from 'framer-motion'

export const ease = [0.16, 1, 0.3, 1]

/* Letters fly in from scattered, rotated, blurred positions — the "EVERY FRAME" move from the reel */
export function KineticText({ text, className = '', delay = 0, stagger = 0.035, as = 'span', chaos = 1 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const letters = useMemo(
    () =>
      text.split('').map((ch, i) => ({
        ch,
        x: (Math.sin(i * 12.9898) * 43758.5453) % 1,
        y: (Math.cos(i * 78.233) * 12345.678) % 1,
        r: (Math.sin(i * 3.1) * 999) % 1,
      })),
    [text]
  )
  const Tag = motion[as]
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((word, wi, arr) => {
        const offset = arr.slice(0, wi).join(' ').length + (wi ? 1 : 0)
        return (
          <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
            {word.split('').map((ch, ci) => {
              const L = letters[offset + ci]
              return (
                <motion.span
                  key={ci}
                  className="inline-block will-change-transform"
                  initial={{
                    opacity: 0,
                    x: L.x * 120 * chaos,
                    y: -60 * chaos + L.y * 140 * chaos,
                    rotate: L.r * 70 * chaos,
                    filter: 'blur(10px)',
                  }}
                  animate={inView ? { opacity: 1, x: 0, y: 0, rotate: 0, filter: 'blur(0px)' } : {}}
                  transition={{ duration: 1.1, ease, delay: delay + (offset + ci) * stagger }}
                >
                  {ch}
                </motion.span>
              )
            })}
            {wi < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        )
      })}
    </Tag>
  )
}

/* Lines slide up out of a mask */
export function MaskLines({ lines, className = '', lineClass = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  return (
    <span ref={ref} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className={`block ${lineClass}`}
            initial={{ y: '105%', rotate: 3 }}
            animate={inView ? { y: '0%', rotate: 0 } : {}}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.09 }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* Word-by-word opacity tied to scroll position */
export function ScrollWords({ text, className = '', highlight = [] }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} hot={highlight.includes(w.replace(/[^\w-]/g, ''))}>
            {w}
          </Word>
        )
      })}
    </p>
  )
}
function Word({ children, progress, range, hot }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <motion.span style={{ opacity, y }} className={`mr-[0.25em] inline-block ${hot ? 'text-sun' : ''}`}>
      {children}
    </motion.span>
  )
}

/* Simple fade-up reveal */
export function Reveal({ children, className = '', delay = 0, y = 40 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

/* Parallax wrapper: moves children by `speed` * 100px across its scroll range */
export function Parallax({ children, speed = 0.3, className = '', rotate = 0 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [speed * 160, -speed * 160])
  const r = useTransform(scrollYProgress, [0, 1], [-rotate, rotate])
  return (
    <motion.div ref={ref} style={{ y, rotate: r }} className={className}>
      {children}
    </motion.div>
  )
}

/* Magnetic hover for buttons */
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x: sx, y: sy }} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  )
}

/* Viewfinder corner brackets, as framed in the reference reel */
export function Brackets({ className = '', size = 14, color = 'currentColor', animate = true }) {
  const s = `${size}px`
  const common = { position: 'absolute', width: s, height: s, borderColor: color }
  const corners = [
    { top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2, x: -12, y: -12 },
    { top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2, x: 12, y: -12 },
    { bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2, x: -12, y: 12 },
    { bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2, x: 12, y: 12 },
  ]
  return (
    <span className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {corners.map(({ x, y, ...c }, i) => (
        <motion.span
          key={i}
          style={{ ...common, ...c }}
          initial={animate ? { opacity: 0, x, y } : false}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.4 + i * 0.05 }}
        />
      ))}
    </span>
  )
}

export function SectionLabel({ index, children, dark = true }) {
  return (
    <div className={`label flex items-center gap-3 ${dark ? 'text-white/60' : 'text-ink/60'}`}>
      <span className="inline-block h-2 w-2 rounded-full bg-sun" />
      <span>{index}</span>
      <span className={`h-px w-10 ${dark ? 'bg-white/25' : 'bg-ink/25'}`} />
      <span>{children}</span>
    </div>
  )
}
