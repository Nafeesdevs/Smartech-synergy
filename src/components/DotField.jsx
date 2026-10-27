import { useEffect, useRef } from 'react'

/* A perspective dot-plane that ripples like cloth — the reel's dot-wave beat, re-coloured in brand tones.
   Pure canvas, no deps. Reacts to pointer and pauses when off-screen. */
export default function DotField({ className = '', density = 34, accent = '#F4BC21', accent2 = '#196BE4', base = 'rgba(255,255,255,0.55)' }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w = 0, h = 0, raf = 0, visible = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.tx = (e.clientX - r.left) / r.width
      mouse.ty = (e.clientY - r.top) / r.height
    }
    window.addEventListener('pointermove', onMove)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)

    const cols = density
    const rows = Math.round(density * 0.6)
    let t = 0
    const draw = () => {
      raf = requestAnimationFrame(draw)
      if (!visible) return
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
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      io.disconnect()
    }
  }, [density, accent, accent2, base])
  return <canvas ref={ref} className={className} aria-hidden="true" />
}
