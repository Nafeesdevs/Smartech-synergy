import { useEffect, useRef } from 'react'

/* A perspective dot-plane that ripples like cloth — the reel's dot-wave beat, re-coloured in brand tones.
   Pure canvas, no deps. Reacts to pointer and pauses when off-screen. */
export default function DotField({ className = '', density = 34, accent = '#F4BC21', accent2 = '#196BE4', base = 'rgba(255,255,255,0.55)' }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w = 0, h = 0, raf = 0, visible = false, lastPaint = 0
    const lowPower = window.matchMedia('(pointer: coarse)').matches ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      (navigator.deviceMemory && navigator.deviceMemory <= 4)
    const dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1.25 : 1.75)
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const onMove = (e) => {
      if (!visible) return
      mouse.tx = e.clientX / window.innerWidth
      mouse.ty = e.clientY / window.innerHeight
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const cols = lowPower ? Math.min(density, 26) : density
    const rows = Math.round(cols * 0.6)
    let t = 0
    const draw = (now = 0) => {
      raf = 0
      if (!visible || document.hidden) return
      if (lowPower && now - lastPaint < 32) {
        raf = requestAnimationFrame(draw)
        return
      }
      lastPaint = now
      t += reduce ? 0 : 0.012
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      ctx.clearRect(0, 0, w, h)
      const fov = 520
      const camY = -170
      const horizon = h * 0.36
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const u = i / (cols - 1) - 0.5
          const v = j / (rows - 1)
          const X = u * 1500
          const Z = 120 + v * 1100
          const dx = u - (mouse.x - 0.5)
          const dz = v - mouse.y
          const dist = Math.sqrt(dx * dx + dz * dz)
          const Y =
            Math.sin(u * 6 + t * 2) * 34 +
            Math.cos(v * 7 - t * 1.6) * 30 +
            Math.sin(dist * 14 - t * 4) * 46 * Math.exp(-dist * 2.4)
          const s = fov / Z
          const px = w / 2 + X * s
          const py = horizon + (Y - camY) * s
          if (px < -10 || px > w + 10 || py < -10 || py > h + 10) continue
          const size = Math.max(0.6, 2.6 * s)
          const wave = Math.sin(u * 5 - v * 3 + t * 2.2)
          let fill = base
          if (wave > 0.86) fill = accent
          else if (wave < -0.93) fill = accent2
          ctx.globalAlpha = Math.min(1, 0.15 + (1 - v) * 0.15 + s * 0.6)
          ctx.fillStyle = fill
          ctx.beginPath()
          ctx.arc(px, py, size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    const start = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(draw)
    }
    const stop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    }, { rootMargin: '120px 0px' })
    const onVisibilityChange = () => (document.hidden ? stop() : start())
    io.observe(canvas)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      stop()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      io.disconnect()
    }
  }, [density, accent, accent2, base])
  return <canvas ref={ref} className={className} aria-hidden="true" />
}
