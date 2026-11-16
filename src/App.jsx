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
  const [ready, setReady] = useState(false)
  const [performanceLite] = useState(getPerformanceLiteMode)

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
    let raf = 0
    const loop = (t) => {
      l.raf(t)
      raf = requestAnimationFrame(loop)
    }
    const startLoop = () => {
      if (!raf && !document.hidden) raf = requestAnimationFrame(loop)
    }
    const stopLoop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }
    const onVisibilityChange = () => (document.hidden ? stopLoop() : startLoop())

    startLoop()
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      stopLoop()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      l.destroy()
      delete window.__lenis
    }
  }, [performanceLite])

  const onDone = useCallback(() => {
    setReady(true)
    lenis.current?.start()
  }, [])

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
        <Hero ready={ready} lenis={lenis} />
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
