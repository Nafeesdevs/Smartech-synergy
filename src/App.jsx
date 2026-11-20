import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'
import { Preloader, Hud, Nav, Cursor } from './components/Chrome'
import Hero from './components/Hero'
import MarqueeBand from './components/Marquee'
import About from './components/About'
import Problems from './components/Problems'
import Services from './components/Services'
import Maintenance from './components/Maintenance'
import Products from './components/Products'
import Process from './components/Process'
import Vision from './components/Vision'
import Coverage from './components/Coverage'
import FAQ from './components/FAQ'
import { Contact, Footer } from './components/Contact'
import { marqueeA, marqueeB } from './data/content'

function getPerformanceLiteMode() {
  const limitedCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
  const limitedMemory = navigator.deviceMemory && navigator.deviceMemory <= 4
  const saveData = navigator.connection?.saveData
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  return Boolean(limitedCpu || limitedMemory || saveData || coarsePointer)
}

export default function App() {
  const lenis = useRef(null)
  const lenisFrame = useRef(0)
  const readyRef = useRef(false)
  const [ready, setReady] = useState(false)
  const [performanceLite] = useState(getPerformanceLiteMode)

  const stopLenisLoop = useCallback(() => {
    if (lenisFrame.current) cancelAnimationFrame(lenisFrame.current)
    lenisFrame.current = 0
  }, [])

  const startLenisLoop = useCallback(() => {
    if (lenisFrame.current || document.hidden) return
    const loop = (time) => {
      lenis.current?.raf(time)
      lenisFrame.current = requestAnimationFrame(loop)
    }
    lenisFrame.current = requestAnimationFrame(loop)
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const simplifyScroll = reduceMotion || performanceLite
    const l = new Lenis({
      lerp: simplifyScroll ? 1 : 0.085,
      smoothWheel: !simplifyScroll,
      syncTouch: false,
      wheelMultiplier: 1,
    })
    lenis.current = l
    window.__lenis = l
    l.stop()
    const onVisibilityChange = () => {
      if (document.hidden) stopLenisLoop()
      else if (readyRef.current) startLenisLoop()
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      stopLenisLoop()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      l.destroy()
      lenis.current = null
      delete window.__lenis
    }
  }, [performanceLite, startLenisLoop, stopLenisLoop])

  const onDone = useCallback(() => {
    readyRef.current = true
    setReady(true)
    lenis.current?.start()
    startLenisLoop()
  }, [startLenisLoop])

  return (
    <div className={`grain ${performanceLite ? 'performance-lite' : ''}`}>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[120] -translate-y-24 rounded-full bg-sun px-5 py-3 font-display text-sm font-bold text-ink shadow-xl transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <Preloader onDone={onDone} performanceLite={performanceLite} />
      <Cursor performanceLite={performanceLite} />
      <Hud performanceLite={performanceLite} />
      <Nav lenis={lenis} />
      <main id="main-content" tabIndex="-1">
        <Hero ready={ready} lenis={lenis} performanceLite={performanceLite} />
        <MarqueeBand a={marqueeA} b={marqueeB} performanceLite={performanceLite} />
        <About />
        <Problems />
        <Services />
        <Maintenance />
        <Products />
        <Process />
        <Vision performanceLite={performanceLite} />
        <Coverage />
        <FAQ />
        <Contact />
      </main>
      <Footer lenis={lenis} />
    </div>
  )
}
