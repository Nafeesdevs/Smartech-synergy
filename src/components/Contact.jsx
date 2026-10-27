import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { brand, services } from '../data/content'
import Icon from './Icons'
import { KineticText, SectionLabel, Reveal, Magnetic, ease } from './Motion'
import { Logo } from './Chrome'

export function Contact() {
  const [form, setForm] = useState({ name: '', company: '', phone: '', need: services[0].t, msg: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const body = `Name: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\nService: ${form.need}\n\n${form.msg}`
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent('Free Tech Consultation Request')}&body=${encodeURIComponent(body)}`
  }
  const field = 'w-full border-b border-white/20 bg-transparent py-4 text-lg outline-none transition-colors placeholder:text-white/30 focus:border-sun'
  const cards = [
    { icon: 'phoneCall', k: 'Call us', v: brand.phone, href: `tel:${brand.phoneRaw}` },
    { icon: 'whatsapp', k: 'WhatsApp', v: 'Chat with us now', href: brand.whatsapp },
    { icon: 'mail', k: 'Email', v: brand.email, href: `mailto:${brand.email}` },
  ]
  return (
    <section id="contact" data-section className="relative overflow-hidden bg-coal py-28 md:py-40">
      <div className="dot-grid pointer-events-none absolute inset-0 text-white/[0.05]" />
      <div className="container-x relative">
        <SectionLabel index="08">Let&rsquo;s work together</SectionLabel>
        <h2 className="display mt-8 text-[14vw] lg:text-[8.5vw]">
          <KineticText text="Let's fix it" className="block" />
          <KineticText text="together." className="block text-sun" delay={0.3} />
        </h2>

        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-lg leading-relaxed text-white/70">
                Get a <span className="font-bold text-white">FREE tech consultation</span> for your office today. Share your requirements and we&rsquo;ll recommend the best solution for your business — no obligations.
              </p>
            </Reveal>
            <div className="mt-10 space-y-3">
              {cards.map((c, i) => (
                <motion.a
                  key={c.k}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-ink/50 p-5 transition-colors duration-300 hover:border-sun hover:bg-sun hover:text-ink"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 group-hover:bg-ink group-hover:text-sun">
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="label block text-white/40 group-hover:text-ink/60">{c.k}</span>
                    <span className="block truncate font-display text-lg font-bold">{c.v}</span>
                  </span>
                  <Icon name="arrowUR" className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
                </motion.a>
              ))}
              <Reveal delay={0.25}>
                <div className="flex items-start gap-5 rounded-2xl border border-white/10 p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5">
                    <Icon name="pin" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="label block text-white/40">Office</span>
                    <span className="mt-1 block leading-relaxed text-white/80">{brand.address}</span>
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <form onSubmit={submit} className="relative rounded-[28px] bg-ink p-7 ring-1 ring-white/10 md:p-12">
              <div className="label mb-4 flex items-center justify-between text-white/40">
                <span>Request a free consultation</span>
                <span className="flex items-center gap-2 text-sun">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sun" /> Fast response
                </span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-x-8">
                <input required className={field} placeholder="Your name" value={form.name} onChange={set('name')} aria-label="Your name" />
                <input className={field} placeholder="Company" value={form.company} onChange={set('company')} aria-label="Company" />
                <input required className={field} placeholder="Phone / WhatsApp" value={form.phone} onChange={set('phone')} aria-label="Phone" />
                <select className={`${field} appearance-none`} value={form.need} onChange={set('need')} aria-label="Service needed">
                  {services.map((s) => (
                    <option key={s.t} className="bg-ink">{s.t}</option>
                  ))}
                  <option className="bg-ink">Buy devices / products</option>
                </select>
              </div>
              <textarea rows={4} className={`${field} mt-2 resize-none`} placeholder="Tell us what you need…" value={form.msg} onChange={set('msg')} aria-label="Message" />
              <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                <p className="label max-w-[16rem] text-white/40">No obligations. We usually reply within a few hours.</p>
                <Magnetic>
                  <button type="submit" className="btn btn-sun group">
                    <span className="relative z-10">Send request</span>
                    <Icon name="arrow" className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-white transition-transform duration-500 group-hover:scale-y-100" />
                  </button>
                </Magnetic>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Footer({ lenis }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['40%', '0%'])
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink pt-24">
      <div className="container-x">
        <div className="grid gap-10 border-b border-white/10 pb-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo className="text-3xl" />
            <p className="mt-6 max-w-sm text-white/55">Professional IT support &amp; tech solutions for businesses across Kuala Lumpur and Selangor.</p>
          </div>
          <div>
            <div className="label text-white/40">Services</div>
            <ul className="mt-4 space-y-2 text-white/70">
              {services.map((s) => (
                <li key={s.t}>{s.t}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="label text-white/40">Contact</div>
            <ul className="mt-4 space-y-2 text-white/70">
              <li><a className="hover:text-sun" href={`tel:${brand.phoneRaw}`}>{brand.phone}</a></li>
              <li><a className="break-all hover:text-sun" href={`mailto:${brand.email}`}>{brand.email}</a></li>
              <li><a className="hover:text-sun" href={brand.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></li>
            </ul>
            <button onClick={() => lenis?.current?.scrollTo(0, { duration: 2 })} className="label mt-8 flex items-center gap-2 text-sun">
              Back to top <Icon name="arrow" className="h-4 w-4 -rotate-90" />
            </button>
          </div>
        </div>
      </div>
      <motion.div style={{ y, scale }} className="origin-bottom select-none">
        <div className="display -mb-[0.12em] whitespace-nowrap text-center text-[17vw] leading-none text-white">
          Smartech<span className="text-sun">.</span>
        </div>
      </motion.div>
      <div className="container-x label flex flex-col justify-between gap-2 py-6 text-white/40 sm:flex-row">
        <span>© {new Date().getFullYear()} Smartech Synergys. All rights reserved.</span>
        <span>PC · Laptop · Phone · Custom Builds · On-site Service</span>
      </div>
    </footer>
  )
}
