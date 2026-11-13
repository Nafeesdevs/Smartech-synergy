import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { ease } from './Motion'
import { brand, nav } from '../data/content'
import Icon from './Icons'

const navScrollEase = (t) =>
  t < 0.5 ? 8 * t ** 4 : 1 - ((-2 * t + 2) ** 4) / 2

export function Logo({ className = '', dark = false, priority = false }) {
  return (
    <span className={`inline-flex items-center select-none ${className}`}>
      <img
        src={dark ? '/logo-dark.png' : '/logo.png'}
        alt="Smartech Synergys"
        width="268"
        height="90"
        className="h-[1.45em] w-auto max-w-none object-contain"
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        draggable={false}
      />
    </span>
  )
}

/* Intro: dot → orbiting dots → rotating square → wordmark (mirrors the reel's opening & closing beats) */
export function Preloader({ onDone }) {
  const [phase, setPhase] = useState(0)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    if (reduceMotion) {
      setPhase(4)
      return undefined
    }
    const t = [setTimeout(() => setPhase(1), 180), setTimeout(() => setPhase(2), 500), setTimeout(() => setPhase(3), 820), setTimeout(() => setPhase(4), 1350)]
    return () => t.forEach(clearTimeout)
  }, [reduceMotion])
  useEffect(() => {
    if (phase === 4) onDone?.()
  }, [phase, onDone])

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      animate={phase < 4
        ? { clipPath: 'inset(0 0 0% 0)', visibility: 'visible' }
        : { clipPath: 'inset(0 0 100% 0)', transitionEnd: { visibility: 'hidden' } }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.76, 0, 0.24, 1] }}
      style={{ pointerEvents: phase < 4 ? 'auto' : 'none' }}
    >
          <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-white/50 sm:inset-x-6 sm:top-6 sm:text-[10px] sm:tracking-wider">
            <span className="whitespace-nowrap">Smartech Synergys · IT Solutions</span>
            <span className="whitespace-nowrap text-right">KL · SEL · 24H</span>
          </div>
          <div className="label absolute bottom-6 right-6 text-white/50">Loading {Math.min(phase * 33, 100)}%</div>

          <div className="relative flex h-40 w-40 items-center justify-center">
            {phase <= 1 &&
              [0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="absolute h-4 w-4 rounded-full bg-sun"
                  initial={{ scale: 0 }}
                  animate={
                    phase === 0
                      ? { scale: i === 0 ? 1 : 0, x: 0, y: 0 }
                      : { scale: 1, x: Math.cos((i * Math.PI) / 2) * 48, y: Math.sin((i * Math.PI) / 2) * 48 }
                  }
                  transition={{ duration: 0.6, ease }}
                />
              ))}
            {phase === 1 && (
              <motion.div
                className="absolute h-[96px] w-[96px] rounded-full border border-white/15"
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: 180, opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            )}
            {phase === 2 && (
              <motion.div
                className="absolute h-24 w-24 rounded-[22px] bg-volt"
                initial={{ scale: 0.2, rotate: -90, borderRadius: '50%' }}
                animate={{ scale: 1, rotate: 25, borderRadius: '22px' }}
                transition={{ duration: 0.7, ease }}
              >
                <span className="label absolute -right-24 -top-5 whitespace-nowrap text-[9px] text-white/50">ROT 25.0° / SHAPE SQ</span>
              </motion.div>
            )}
            {phase === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, ease }}
              >
                <Logo className="text-5xl sm:text-6xl" />
              </motion.div>
            )}
          </div>
    </motion.div>
  )
}

function useSectionIndex() {
  const [idx, setIdx] = useState(1)
  const [total, setTotal] = useState(10)
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-section]')]
    if (els.length) setTotal(els.length)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setIdx(els.indexOf(e.target) + 1)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return { idx, total }
}

/* Fixed viewfinder HUD with scroll-driven timecode */
export function Hud() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [tc, setTc] = useState('00:00:00:00')
  const lastHudUpdate = useRef(0)
  const { idx, total } = useSectionIndex()
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const now = performance.now()
    if (now - lastHudUpdate.current < 70 && v > 0 && v < 1) return
    lastHudUpdate.current = now
    const frames = Math.round(v * 60 * 24)
    const s = Math.floor(frames / 24)
    const f = frames % 24
    setTc(`00:00:${String(s).padStart(2, '0')}:${String(f).padStart(2, '0')}`)
  })
  const corner = 'absolute h-4 w-4 border-white/40'
  return (
    <div className="pointer-events-none fixed inset-3 z-40 hidden mix-blend-difference md:block">
      <span className={`${corner} left-0 top-0 border-l border-t`} />
      <span className={`${corner} right-0 top-0 border-r border-t`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
      <div className="label absolute bottom-2 left-7 flex items-center gap-3 text-white/70">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
        REC · On-site ready
      </div>
      <div className="label absolute bottom-2 right-7 flex items-center gap-4 text-white/70">
        <span>SEC {String(idx).padStart(2, '0')}/{String(total).padStart(2, '0')}</span>
        <span className="tabular-nums">{tc}</span>
      </div>
      <motion.div className="absolute bottom-0 left-6 right-6 h-px origin-left bg-white/60" style={{ scaleX: smooth }} />
    </div>
  )
}

export function Nav({ lenis }) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [logoTurns, setLogoTurns] = useState(0)
  const menuButtonRef = useRef(null)
  const menuRef = useRef(null)
  const hiddenRef = useRef(false)
  const scrolledRef = useRef(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    const nextHidden = v > prev && v > 200 && !open
    const nextScrolled = v > 40
    if (nextHidden !== hiddenRef.current) {
      hiddenRef.current = nextHidden
      setHidden(nextHidden)
    }
    if (nextScrolled !== scrolledRef.current) {
      scrolledRef.current = nextScrolled
      setScrolled(nextScrolled)
    }
  })
  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lenis?.current?.stop()
    requestAnimationFrame(() => menuRef.current?.querySelector('a')?.focus())
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab') return
      const focusable = [...menuRef.current.querySelectorAll('a[href], button:not([disabled])')]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      lenis?.current?.start()
      menuButtonRef.current?.focus()
    }
  }, [open, lenis])
  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    lenis?.current
      ? lenis.current.scrollTo(href, { offset: -20, duration: 2.8, easing: navScrollEase })
      : document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className={`container-x mt-4 flex items-center justify-between rounded-full py-3 transition-all duration-500 md:mt-6 ${scrolled ? 'bg-ink/95 ring-1 ring-white/10 md:bg-ink/70 md:backdrop-blur-xl md:!px-6' : ''}`}>
          <motion.a
            href="#top"
            onClick={(e) => {
              setLogoTurns((turns) => turns + 1)
              go(e, '#top')
            }}
            aria-label="Smartech Synergys home"
            className="flex items-center"
            animate={{ rotateY: logoTurns * 360 }}
            whileTap={{ rotateX: -10, scale: 0.92 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformPerspective: 800, transformStyle: 'preserve-3d' }}
          >
            <Logo className="text-2xl sm:text-3xl" priority />
          </motion.a>
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)} className="group relative font-display text-sm font-semibold uppercase tracking-wider text-white/75 hover:text-white">
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-sun transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" onClick={(e) => go(e, '#contact')} className="btn btn-sun hidden !py-3 sm:inline-flex">
              Free Consultation <Icon name="arrowUR" className="h-4 w-4" />
            </a>
            <button
              ref={menuButtonRef}
              onClick={() => setOpen((o) => !o)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 lg:hidden"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <Icon name={open ? 'x' : 'bolt'} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-sun p-6 pb-10 pt-24 text-ink lg:hidden"
            initial={{ clipPath: 'circle(0% at 92% 6%)' }}
            animate={{ clipPath: 'circle(150% at 92% 6%)' }}
            exit={{ clipPath: 'circle(0% at 92% 6%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex flex-col">
              {[...nav, { label: 'Contact', href: '#contact' }].map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={(e) => go(e, n.href)}
                  className="display border-b border-ink/15 py-2.5 sm:py-3 text-3xl sm:text-4xl md:text-5xl tracking-tight"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.5, ease }}
                >
                  {n.label}
                </motion.a>
              ))}
            </div>
            <div className="label mt-8 pt-4 border-t border-ink/15 flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <span>{brand.phone}</span>
              <span>·</span>
              <span className="break-all">{brand.email}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40 })
  const sy = useSpring(y, { stiffness: 500, damping: 40 })
  const [hover, setHover] = useState(false)
  const [cursorTone, setCursorTone] = useState('default')
  const [enabled, setEnabled] = useState(false)
  const hoverRef = useRef(false)
  const toneRef = useRef('default')
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    document.body.classList.add('has-cursor')
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const nextHover = !!e.target.closest('a,button,[data-hover]')
      const nextTone = e.target.closest('[data-cursor]')?.dataset.cursor || 'default'
      if (nextHover !== hoverRef.current) {
        hoverRef.current = nextHover
        setHover(nextHover)
      }
      if (nextTone !== toneRef.current) {
        toneRef.current = nextTone
        setCursorTone(nextTone)
      }
    }
    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      document.body.classList.remove('has-cursor')
    }
  }, [x, y])
  if (!enabled) return null
  return (
    <motion.div
      className={`pointer-events-none fixed left-0 top-0 z-[90] rounded-full ${cursorTone === 'pink' ? 'bg-hot/60 ring-2 ring-hot shadow-[0_0_18px_rgba(255,2,141,0.35)]' : 'bg-sun mix-blend-difference'}`}
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: hover ? 56 : 12, height: hover ? 56 : 12 }}
      transition={{ duration: 0.3, ease }}
    />
  )
}
