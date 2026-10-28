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

export default function App() {
  const lenis = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const l = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 1 })
    lenis.current = l
    window.__lenis = l
    l.stop()
    let raf
    const loop = (t) => {
      l.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      l.destroy()
    }
  }, [])

  const onDone = useCallback(() => {
    setReady(true)
    lenis.current?.start()
  }, [])

  return (
    <div className="grain">
      <Preloader onDone={onDone} />
      <Cursor />
      <Hud />
      <Nav lenis={lenis} />
      <main>
        <Hero ready={ready} lenis={lenis} />
        <MarqueeBand a={marqueeA} b={marqueeB} />
        <About />
        <Problems />
        <Services />
        <Maintenance />
        <Products />
        <Process />
        <Vision />
        <Coverage />
        <FAQ />
        <Contact />
      </main>
      <Footer lenis={lenis} />
    </div>
  )
}
