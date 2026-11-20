import { useEffect, useLayoutEffect, useRef, useMemo, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  useMotionValueEvent,
} from 'framer-motion'

export const ease = [0.16, 1, 0.3, 1]

/* Letters fly in from scattered, rotated, blurred positions — the "EVERY FRAME" move from the reel */
export function KineticText({ text, className = '', separatorClassName = '', delay = 0, stagger = 0.035, as = 'span', chaos = 1 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const [visibilityFallback, setVisibilityFallback] = useState(false)
  useEffect(() => {
    if (inView || visibilityFallback) return undefined
    const timeout = window.setTimeout(() => {
      const rect = ref.current?.getBoundingClientRect()
      const visibleHeight = Math.min(window.visualViewport?.height || window.innerHeight, 1200)
      if (rect && rect.bottom > 0 && rect.top < visibleHeight) setVisibilityFallback(true)
    }, 2500)
    return () => window.clearTimeout(timeout)
  }, [inView, visibilityFallback])
  const visible = inView || visibilityFallback
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
  const Tag = as
  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {text.split(' ').map((word, wi, arr) => {
        const offset = arr.slice(0, wi).join(' ').length + (wi ? 1 : 0)
        return (
          <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
            {word.split('').map((ch, ci) => {
              const L = letters[offset + ci]
              return (
                <span
                  key={ci}
                  className={`kinetic-letter ${visible ? 'kinetic-letter--visible' : ''}`}
                  style={{
                    '--kinetic-x': `${L.x * 120 * chaos}px`,
                    '--kinetic-y': `${-60 * chaos + L.y * 140 * chaos}px`,
                    '--kinetic-r': `${L.r * 70 * chaos}deg`,
                    '--kinetic-delay': `${delay + (offset + ci) * stagger}s`,
                  }}
                >
                  {ch}
                </span>
              )
            })}
            {wi < arr.length - 1 && <span className={`inline-block ${separatorClassName}`}>&nbsp;</span>}
          </span>
        )
      })}
    </Tag>
  )
}

/* Lines slide up out of a mask */
export function MaskLines({ lines, className = '', lineClass = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-96px 0px' })
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
  const wordRefs = useRef([])
  const lastValues = useRef([])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')

  const renderProgress = (progress) => {
    for (let i = 0; i < words.length; i++) {
      const element = wordRefs.current[i]
      if (!element) continue
      const localProgress = Math.max(0, Math.min(1, progress * words.length - i))
      const opacity = 0.12 + localProgress * 0.88
      const y = (1 - localProgress) * 8
      const signature = `${opacity.toFixed(3)}:${y.toFixed(2)}`
      if (lastValues.current[i] === signature) continue
      lastValues.current[i] = signature
      element.style.opacity = opacity
      element.style.transform = `translate3d(0, ${y}px, 0)`
      element.style.willChange = localProgress > 0 && localProgress < 1 ? 'opacity, transform' : 'auto'
    }
  }

  useLayoutEffect(() => {
    renderProgress(scrollYProgress.get())
  })
  useMotionValueEvent(scrollYProgress, 'change', renderProgress)

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          ref={(element) => { wordRefs.current[i] = element }}
          className={`mr-[0.25em] inline-block ${highlight.includes(word.replace(/[^\w-]/g, '')) ? 'text-sun' : ''}`}
        >
          {word}
        </span>
      ))}
    </p>
  )
}

/* Simple fade-up reveal */
export function Reveal({ children, className = '', delay = 0, y = 40 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px 0px' }}
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

export function SectionLabel({ index, children, dark = true, dotClass = 'bg-hot shadow-[0_0_12px_rgba(255,2,141,0.55)]' }) {
  return (
    <div className={`label flex items-center gap-3 ${dark ? 'text-white/60' : 'text-ink/60'}`}>
      <span className={`inline-block h-2 w-2 rounded-full ${dotClass}`} />
      <span>{index}</span>
      <span className={`h-px w-10 ${dark ? 'bg-white/25' : 'bg-ink/25'}`} />
      <span>{children}</span>
    </div>
  )
}
