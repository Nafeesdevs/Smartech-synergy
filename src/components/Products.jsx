import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { products, brands } from '../data/content'
import Icon from './Icons'
import { SectionLabel, MaskLines, Reveal, ease } from './Motion'
import { VelocityRow } from './Marquee'
import { RingText } from './About'

function Tile({ p, i }) {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 })
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.9, ease, delay: (i % 3) * 0.08 }}
      style={{ perspective: 900 }}
    >
      <motion.div
        data-hover
        onMouseMove={onMove}
        onMouseLeave={() => {
          mx.set(0.5)
          my.set(0.5)
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="group relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-ink/10 transition-colors duration-500 hover:bg-ink hover:text-white"
      >
        <div className="flex items-start justify-between">
          <span className="label text-ink/40 group-hover:text-white/40">P/0{i + 1}</span>
          <Icon name="arrowUR" className="h-5 w-5 -translate-x-2 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-sun group-hover:opacity-100" />
        </div>
        <div style={{ transform: 'translateZ(40px)' }} className="flex h-20 w-20 items-center justify-center rounded-2xl bg-paper text-ink transition-all duration-500 group-hover:scale-110 group-hover:bg-sun">
          <Icon name={p.icon} className="h-10 w-10" />
        </div>
        <h3 className="font-display text-xl font-black uppercase leading-tight tracking-tight md:text-2xl">{p.t}</h3>
      </motion.div>
    </motion.div>
  )
}

export default function Products() {
  return (
    <section id="products" data-section className="relative overflow-hidden bg-paper pb-10 pt-28 text-ink md:pt-40">
      <div className="container-x">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionLabel index="05" dark={false}>Products we sell</SectionLabel>
            <h2 className="display mt-8 text-[13vw] sm:text-7xl lg:text-[6vw]">
              <MaskLines lines={[<span>Quality<span className="inline-block w-[0.25em]" />tech</span>, <span key="s">sourced <span className="text-volt">for you.</span></span>]} />
            </h2>
          </div>
          <div className="flex items-end justify-between gap-6 lg:col-span-4 lg:flex-col lg:items-end">
            <Reveal>
              <p className="max-w-sm leading-relaxed text-ink/70 lg:text-right">
              Equip your team with devices suited to their work and your budget. We supply new and pre-owned laptops, desktops and office essentials, with every unit tested and quality-checked before delivery. Share your requirements to discuss suitable options.
              </p>
            </Reveal>
            <div className="hidden sm:block">
              <RingText dark text="Business Ready • Warrantied • Quality Checked • Trusted • " size={150} speed={-1.2} />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Tile key={p.t} p={p} i={i} />
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col gap-4 rounded-3xl bg-ink p-7 text-white md:flex-row md:items-center md:justify-between md:p-10">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sun text-ink">
              <Icon name="check" className="h-5 w-5" />
            </span>
            <p className="max-w-xl text-white/80">All products are sourced through verified suppliers and fully tested to ensure quality and authenticity before delivery.</p>
          </div>
          <span className="label text-sun">Authenticity guaranteed</span>
        </Reveal>
      </div>

      {/* <div className="mt-20 border-y border-ink/10 py-8">
        <div className="label container-x mb-4 text-ink/50">Brands we carry</div>
        <VelocityRow items={brands} baseVelocity={-1.5} itemClass="font-display text-5xl font-black uppercase tracking-tight text-ink md:text-7xl" sepClass="text-sun" sep="●" />
      </div> */}
    </section>
  )
}
