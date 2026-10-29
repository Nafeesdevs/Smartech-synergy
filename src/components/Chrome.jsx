import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useMotionValueEvent } from 'framer-motion'
import { ease } from './Motion'
import { brand, nav } from '../data/content'
import Icon from './Icons'

const navScrollEase = (t) =>
  t < 0.5 ? 8 * t ** 4 : 1 - ((-2 * t + 2) ** 4) / 2

export function Logo({ className = '', dark = false }) {
  return (
    <span className={`inline-flex items-center select-none ${className}`}>
      <img
        src={dark ? '/logo-dark.png' : '/logo.png'}
        alt="Smartech"
        className="h-[1.45em] w-auto max-w-none object-contain"
        draggable={false}
      />
    </span>
  )
}

/* Intro: dot → orbiting dots → rotating square → wordmark (mirrors the reel's opening & closing beats) */
export function Preloader({ onDone }) {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 450), setTimeout(() => setPhase(2), 1150), setTimeout(() => setPhase(3), 1750), setTimeout(() => setPhase(4), 2900)]
    return () => t.forEach(clearTimeout)
  }, [])
  useEffect(() => {
    if (phase === 4) onDone?.()
  }, [phase, onDone])

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
        >
          <div className="label absolute left-6 top-6 text-white/50">Smartech Synergys · IT Solutions</div>
          <div className="label absolute right-6 top-6 text-white/50">KL · SEL · 24H</div>
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
              <motion.div initial={{ opacity: 0, letterSpacing: '0.4em', filter: 'blur(12px)' }} animate={{ opacity: 1, letterSpacing: '0em', filter: 'blur(0px)' }} transition={{ duration: 0.9, ease }}>
                <Logo className="text-5xl sm:text-7xl" />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
  const { idx, total } = useSectionIndex()
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
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
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(v > prev && v > 200 && !open)
    setScrolled(v > 40)
  })
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
        <div className={`container-x mt-4 flex items-center justify-between rounded-full py-3 transition-all duration-500 md:mt-6 ${scrolled ? 'bg-ink/70 backdrop-blur-xl ring-1 ring-white/10 md:!px-6' : ''}`}>
          <a href="#top" onClick={(e) => go(e, '#top')} aria-label="Smartech Synergys home" className="flex items-center">
            <Logo className="text-2xl sm:text-3xl" />
          </a>
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
            <button onClick={() => setOpen((o) => !o)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 lg:hidden" aria-label="Menu">
              <Icon name={open ? 'x' : 'bolt'} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div
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
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    document.body.classList.add('has-cursor')
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHover(!!e.target.closest('a,button,[data-hover]'))
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
      className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full bg-sun mix-blend-difference"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: hover ? 56 : 12, height: hover ? 56 : 12 }}
      transition={{ duration: 0.3, ease }}
    />
  )
}
