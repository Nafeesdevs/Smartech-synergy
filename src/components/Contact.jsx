import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { brand, services } from '../data/content'
import Icon from './Icons'
import { KineticText, SectionLabel, Reveal, Magnetic, ease } from './Motion'
import { Logo } from './Chrome'

const serviceOptions = [
  'Hardware Repair',
  'Software Issues',
  'PC Upgrades / Custom Builds',
  'Office IT Support / Setup',
  'Device Supply',
  'Other',
]
const getInitialForm = () => ({ name: '', company: '', phone: '', need: [], msg: '' })
const phoneErrorMessage = 'Enter a valid phone number using 7 to 15 digits.'
const isValidPhone = (value) => {
  const normalized = value.trim()
  const digits = normalized.replace(/\D/g, '')
  return /^\+?[0-9() .-]+$/.test(normalized) && digits.length >= 7 && digits.length <= 15
}

export function Contact() {
  const [form, setForm] = useState(getInitialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null)
  const [phoneError, setPhoneError] = useState('')
  const [serviceOpen, setServiceOpen] = useState(false)
  const [serviceError, setServiceError] = useState('')
  const submittingRef = useRef(false)
  const serviceTriggerRef = useRef(null)
  useEffect(() => {
    if (!status) return undefined

    const timer = window.setTimeout(() => setStatus(null), 30000)
    return () => window.clearTimeout(timer)
  }, [status])

  const set = (k) => (e) => {
    setForm((current) => ({ ...current, [k]: e.target.value }))
    setStatus(null)
  }
  const toggleService = (service) => {
    setForm((current) => ({
      ...current,
      need: current.need.includes(service)
        ? current.need.filter((item) => item !== service)
        : [...current.need, service],
    }))
    setServiceError('')
    setStatus(null)
  }
  const submit = async (e) => {
    e.preventDefault()

    const formElement = e.currentTarget
    const phoneInput = formElement.elements.namedItem('phone')
    if (form.phone && !isValidPhone(form.phone)) {
      phoneInput?.setCustomValidity(phoneErrorMessage)
      setPhoneError(phoneErrorMessage)
    } else {
      phoneInput?.setCustomValidity('')
      setPhoneError('')
    }
    if (!formElement.checkValidity()) {
      formElement.reportValidity()
      return
    }
    if (!form.need.length) {
      setServiceError('Select at least one service so we can direct your request correctly.')
      setServiceOpen(true)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => serviceTriggerRef.current?.focus())
      })
      return
    }

    if (submittingRef.current) return

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()
    if (!accessKey) {
      setStatus({ type: 'error', message: 'The contact form is not configured yet. Please call, WhatsApp, or email us instead.' })
      return
    }

    submittingRef.current = true
    setIsSubmitting(true)
    setStatus(null)

    const data = new FormData(formElement)
    data.delete('service_options')
    data.set('Services Requested', form.need.join(', '))
    data.set('access_key', accessKey)
    data.set('subject', 'New Website Enquiry - Smartech Synergys')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const result = await response.json().catch(() => null)

      if (!response.ok || result?.success !== true) {
        setStatus({
          type: 'error',
          message: result?.message || 'We could not send your request. Please try again.',
        })
        return
      }

      setForm(getInitialForm())
      setServiceOpen(false)
      setServiceError('')
      formElement.reset()
      setStatus({ type: 'success', message: 'Thank you. Your request has been sent successfully.' })
    } catch {
      setStatus({ type: 'error', message: 'A network error prevented your request from being sent. Please try again.' })
    } finally {
      submittingRef.current = false
      setIsSubmitting(false)
    }
  }
  const serviceSummary = form.need.length
    ? `${form.need.length} selected: ${form.need.join(', ')}`
    : 'Select one or more services'
  const field = 'w-full border-b border-white/20 bg-transparent py-4 text-lg outline-none transition-colors placeholder:text-white/30 focus:border-hot'
  const cards = [
    { icon: 'phoneCall', k: 'Call us', v: brand.phone, href: `tel:${brand.phoneRaw}` },
    { icon: 'whatsapp', k: 'WhatsApp', v: 'Chat with us now', href: brand.whatsapp },
    { icon: 'mail', k: 'Email', v: brand.email, href: `mailto:${brand.email}` },
  ]
  return (
    <section id="contact" data-section className="relative overflow-hidden bg-coal py-28 md:py-40">
      <div className="dot-grid pointer-events-none absolute inset-0 text-white/[0.05]" />
      <div className="container-x relative">
        <SectionLabel index="10">Let&rsquo;s work together</SectionLabel>
        <h2 className="display mt-6 sm:mt-8 text-[12vw] sm:text-6xl md:text-7xl lg:text-[8.5vw]">
          <KineticText text="Let's fix it" className="block" />
          <KineticText text="together." className="block text-hot" delay={0.3} />
        </h2>

        <div className="mt-10 sm:mt-16 grid gap-10 sm:gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-base sm:text-lg leading-relaxed text-white/70">
                Get a <span className="font-bold text-hot">FREE tech consultation</span> for your office today. Share your requirements and we&rsquo;ll recommend the best solution for your business — no obligations.
              </p>
            </Reveal>
            <div className="mt-8 sm:mt-10 space-y-3">
              {cards.map((c, i) => (
                <motion.a
                  key={c.k}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3.5 sm:gap-5 rounded-2xl border border-white/10 bg-ink/50 p-4 sm:p-5 transition-colors duration-300 hover:border-sun hover:bg-sun hover:text-ink"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                >
                  <span className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-white/5 group-hover:bg-ink group-hover:text-sun">
                    <Icon name={c.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="label block text-[10px] sm:text-[11px] text-white/50 group-hover:text-ink/60">{c.k}</span>
                    <span className="block truncate font-display text-base sm:text-lg font-bold">{c.v}</span>
                  </span>
                  <Icon name="arrowUR" className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-500 group-hover:rotate-45" />
                </motion.a>
              ))}
              <Reveal delay={0.25}>
                <div className="flex items-start gap-3.5 sm:gap-5 rounded-2xl border border-white/10 p-4 sm:p-5">
                  <span className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-white/5">
                    <Icon name="pin" className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span>
                    <span className="label block text-[10px] sm:text-[11px] text-white/50">Office</span>
                    <span className="mt-1 block text-sm sm:text-base leading-relaxed text-white/80">{brand.address}</span>
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <form onSubmit={submit} className="relative rounded-[28px] bg-ink p-5 sm:p-7 ring-1 ring-white/10 md:p-12" aria-describedby="consultation-note" aria-busy={isSubmitting}>
              <input type="checkbox" name="botcheck" className="hidden" tabIndex="-1" autoComplete="off" aria-hidden="true" />
              <div className="label mb-4 flex items-center justify-between text-white/50">
                <span>Request a free consultation</span>
                <span className="flex items-center gap-2 text-hot">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-hot" /> Fast response
                </span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-x-8">
                <div><label className="sr-only" htmlFor="consultation-name">Your name</label><input id="consultation-name" name="name" type="text" autoComplete="name" required maxLength={100} className={field} placeholder="Your name" value={form.name} onChange={set('name')} /></div>
                <div className="relative">
                  <label className="sr-only" htmlFor="consultation-company">Company (optional)</label>
                  <input id="consultation-company" name="company" type="text" autoComplete="organization" maxLength={150} className={`${field} pr-20`} placeholder="Company" value={form.company} onChange={set('company')} />
                  <span className="label pointer-events-none absolute right-0 top-[1.35rem] text-[9px] text-white/50" aria-hidden="true">Optional</span>
                </div>
                <div>
                  <label className="sr-only" htmlFor="consultation-phone">Phone or WhatsApp number</label>
                  <input
                    id="consultation-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    maxLength={30}
                    pattern="\+?[0-9\(\) .\-]{7,29}"
                    title={phoneErrorMessage}
                    aria-invalid={phoneError ? 'true' : 'false'}
                    aria-describedby={phoneError ? 'consultation-phone-error' : undefined}
                    className={field}
                    placeholder="Phone / WhatsApp"
                    value={form.phone}
                    onChange={(e) => {
                      e.target.setCustomValidity('')
                      setPhoneError('')
                      set('phone')(e)
                    }}
                    onInvalid={(e) => {
                      if (e.currentTarget.validity.patternMismatch || e.currentTarget.validationMessage === phoneErrorMessage) {
                        setPhoneError(phoneErrorMessage)
                      }
                    }}
                  />
                  {phoneError && <p id="consultation-phone-error" className="mt-2 text-sm text-hot" role="alert">{phoneError}</p>}
                </div>
                <div
                  className="min-w-0"
                  onKeyDown={(e) => {
                    if (e.key === 'Escape' && serviceOpen) {
                      e.preventDefault()
                      setServiceOpen(false)
                      window.requestAnimationFrame(() => {
                        window.requestAnimationFrame(() => serviceTriggerRef.current?.focus())
                      })
                    }
                  }}
                >
                  <button
                    ref={serviceTriggerRef}
                    id="consultation-service-trigger"
                    type="button"
                    className="flex min-h-[64px] w-full items-center justify-between gap-4 border-b border-white/20 py-2 text-left outline-none transition-colors hover:border-white/40 focus-visible:border-hot"
                    aria-expanded={serviceOpen}
                    aria-controls="consultation-services-panel"
                    aria-labelledby="consultation-service-label consultation-service-summary"
                    aria-describedby={serviceError ? 'consultation-service-error' : undefined}
                    aria-invalid={serviceError ? 'true' : 'false'}
                    onClick={() => setServiceOpen((open) => !open)}
                  >
                    <span className="min-w-0">
                      <span id="consultation-service-label" className="block font-display text-base font-extrabold leading-tight tracking-[-0.01em] text-white sm:text-lg">How can we assist you today?</span>
                      <span id="consultation-service-summary" className={`mt-1 block truncate text-sm ${form.need.length ? 'text-sun' : 'text-white/40'}`} aria-live="polite">
                        {serviceSummary}
                      </span>
                    </span>
                    <span className={`shrink-0 text-xl text-hot transition-transform duration-300 ${serviceOpen ? 'rotate-45' : ''}`} aria-hidden="true">+</span>
                  </button>
                  {serviceError && <p id="consultation-service-error" className="mt-2 text-sm text-hot" role="alert">{serviceError}</p>}
                  {serviceOpen && (
                    <fieldset id="consultation-services-panel" className="mt-3 rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/10">
                      <legend className="sr-only">How can we assist you today?</legend>
                      <div className="grid grid-cols-2 gap-2">
                        {serviceOptions.map((service) => {
                          const selected = form.need.includes(service)
                          return (
                            <label key={service} className="block cursor-pointer">
                              <input
                                type="checkbox"
                                name="service_options"
                                value={service}
                                checked={selected}
                                onChange={() => toggleService(service)}
                                className="peer sr-only"
                              />
                              <span className={`flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-semibold leading-tight transition-colors duration-200 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sun ${selected ? 'bg-hot text-white' : 'bg-white/[0.06] text-white/75 hover:bg-white/10 hover:text-white'}`}>
                                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${selected ? 'bg-ink text-sun' : 'ring-1 ring-white/25'}`} aria-hidden="true">{selected ? '✓' : ''}</span>
                                <span>{service}</span>
                              </span>
                            </label>
                          )
                        })}
                      </div>
                    </fieldset>
                  )}
                </div>
              </div>
              <label className="sr-only" htmlFor="consultation-message">Tell us what you need</label>
              <textarea id="consultation-message" name="message" rows={4} maxLength={2000} className={`${field} mt-2 resize-none`} placeholder="Tell us more about your issue..." value={form.msg} onChange={set('msg')} />
              <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                <p id="consultation-note" className="label max-w-[16rem] text-white/50">No obligations. We usually reply within a few hours.</p>
                <Magnetic>
                  <button type="submit" disabled={isSubmitting} className="btn group bg-hot text-white shadow-[0_14px_34px_rgba(255,2,141,0.22)] disabled:cursor-not-allowed disabled:opacity-60">
                    <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send request'}</span>
                    <Icon name="arrow" className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 group-hover:scale-y-100" />
                  </button>
                </Magnetic>
              </div>
              <div aria-live={status?.type === 'error' ? 'assertive' : 'polite'} aria-atomic="true">
                {status && (
                  <p
                    role={status.type === 'error' ? 'alert' : 'status'}
                    className={`fixed bottom-4 left-4 right-4 z-50 rounded-2xl border bg-ink px-5 py-4 text-sm text-white shadow-2xl sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm ${status.type === 'error' ? 'border-hot/60' : 'border-volt/60'}`}
                  >
                    {status.message}
                  </p>
                )}
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
    <footer ref={ref} className="relative overflow-hidden bg-ink pt-16 sm:pt-24">
      <div className="container-x">
        <div className="grid gap-8 sm:gap-10 border-b border-white/10 pb-10 sm:pb-14 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2">
            <Logo className="text-2xl sm:text-3xl" />
            <p className="mt-4 sm:mt-6 max-w-sm text-sm sm:text-base text-white/55 leading-relaxed">Business IT support and device supply across Kuala Lumpur and Selangor. Repairs, upgrades and office setups, with on-site assistance throughout the Klang Valley.</p>
          </div>
          <div>
            <div className="label text-white/60">Services</div>
            <ul className="mt-3 sm:mt-4 space-y-2 text-sm sm:text-base text-white/70">
              {services.map((s) => (
                <li key={s.t}>{s.t}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="label text-white/60">Contact</div>
            <ul className="mt-3 sm:mt-4 space-y-2 text-sm sm:text-base text-white/70">
              <li><a className="hover:text-sun" href={`tel:${brand.phoneRaw}`}>{brand.phone}</a></li>
              <li><a className="break-all hover:text-sun" href={`mailto:${brand.email}`}>{brand.email}</a></li>
              <li><a className="hover:text-sun" href={brand.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            </ul>
            <button onClick={() => lenis?.current?.scrollTo(0, { duration: 2 })} className="label mt-6 sm:mt-8 flex items-center gap-2 text-hot hover:text-white transition-colors">
              Back to top <Icon name="arrow" className="h-3.5 w-3.5 sm:h-4 sm:w-4 -rotate-90" />
            </button>
          </div>
        </div>
      </div>
      <motion.div style={{ y, scale }} className="origin-bottom select-none overflow-hidden">
        <div
          className="font-display font-black uppercase whitespace-nowrap text-center text-[14vw] sm:text-[15.5vw] leading-none text-white tracking-tight -mb-[0.08em]"
          style={{
            fontStretch: '100%',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'geometricPrecision',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        >
          Smartech<span className="ml-[0.005em] inline-block h-[0.26em] w-[0.26em] bg-sun align-[0.08em]" style={{ clipPath: 'polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)' }} aria-hidden="true" />
        </div>
      </motion.div>
      <div className="container-x label flex flex-col justify-between gap-2 py-6 text-white/60 sm:flex-row">
        <span>© {new Date().getFullYear()} Smartech Synergys. All rights reserved.</span>
        <span>PC · Laptop · Phone · Custom Builds · On-site Service</span>
      </div>
    </footer>
  )
}
