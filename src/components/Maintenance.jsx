import { motion } from 'framer-motion'
import { maintenanceServices } from '../data/content'
import Icon from './Icons'
import { SectionLabel, MaskLines, Reveal, ease } from './Motion'

export default function Maintenance() {
  return (
    <section id="maintenance" data-section className="relative overflow-hidden bg-ink py-28 md:py-40">
      {/* Background dot matrix */}
      <div className="dot-grid pointer-events-none absolute inset-0 text-white/[0.04]" />

      <div className="container-x relative">
        {/* Full-width header row — matching site alignment */}
        <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <SectionLabel index="04">Maintenance Services</SectionLabel>
          <span className="label text-white/40">Preventive Care &amp; Performance Upgrades</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14 xl:gap-16">
          {/* Left Column: Heading & Service Assurance */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <h2 className="display text-3xl sm:text-4xl md:text-5xl lg:text-[4.2vw] tracking-tight">
                <MaskLines
                  lines={[
                    'Preventive',
                    'care &',
                    <span>hardware <span className="text-sun">tuning.</span></span>,
                  ]}
                />
              </h2>
              <Reveal delay={0.15}>
                <p className="mt-6 sm:mt-8 max-w-md text-sm sm:text-base leading-relaxed text-white/65">
                  Scheduled servicing and targeted hardware upgrades extend machine lifespan, eliminate heat bottlenecks, and prevent sudden operational downtime. Every upgrade and repair is thoroughly stress-tested before handover.
                </p>
              </Reveal>

              <Reveal delay={0.25} className="mt-8 sm:mt-10">
                <div className="group relative overflow-hidden rounded-3xl border border-sun/30 bg-coal/80 p-5 sm:p-7 shadow-xl backdrop-blur transition-all duration-500 hover:border-sun/60">
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-2xl bg-sun text-ink shadow-md">
                      <Icon name="check" className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    <div>
                      <div className="label text-sun">Service Assurance</div>
                      <p className="mt-2 font-display text-sm sm:text-base font-bold uppercase tracking-tight text-white sm:text-lg">
                        * Warranty provided for selected repairs and replacement parts.
                      </p>
                      <p className="mt-1 text-xs text-white/50 leading-relaxed">
                        Genuine parts and certified components sourced through verified suppliers with rigorous diagnostic checks.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="label text-white/40">KL &amp; Selangor</span>
                    <a
                      href="#contact"
                      className="label inline-flex items-center gap-2 text-sun transition-colors hover:text-white"
                    >
                      Book Maintenance <Icon name="arrowUR" className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: 9 Maintenance Services Grid */}
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {maintenanceServices.map((item, i) => (
                <motion.div
                  key={item.n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-6%' }}
                  transition={{ duration: 0.6, ease, delay: i * 0.04 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-coal/70 p-6 transition-all duration-500 hover:border-sun/60 hover:bg-steel/90 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold tracking-wider text-sun">
                          {item.n}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-white/20" />
                        <span className="label text-white/40 transition-colors group-hover:text-white/60">
                          {item.tag}
                        </span>
                      </div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition-all duration-500 group-hover:border-sun/40 group-hover:bg-sun group-hover:text-ink">
                        <Icon name={item.icon} className="h-4 w-4" />
                      </span>
                    </div>

                    <h3 className="font-display mt-5 text-xl font-bold uppercase tracking-tight text-white transition-colors group-hover:text-white sm:text-[1.3rem]">
                      {item.t}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60 transition-colors group-hover:text-white/80">
                      {item.d}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-[11px] font-mono uppercase tracking-wider text-white/35">
                    <span>On-site / In-shop</span>
                    <span className="text-sun/80 transition-colors group-hover:text-sun">Quality Guaranteed</span>
                  </div>
                </motion.div>
              ))}

              {/* Bottom Warranty Banner inside the grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: 0.3 }}
                className="mt-2 flex flex-col gap-4 rounded-2xl border border-sun/30 bg-sun/10 p-5 backdrop-blur-sm sm:col-span-2 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-sun animate-pulse" />
                  <span className="font-display text-sm font-bold uppercase tracking-wide text-sun sm:text-base">
                    Warranty provided for selected repairs and replacement parts.
                  </span>
                </div>
                <span className="label text-white/60 shrink-0">Authentic Parts</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

