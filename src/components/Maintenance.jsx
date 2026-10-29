import { motion } from 'framer-motion'
import { maintenanceServices } from '../data/content'
import Icon from './Icons'
import { KineticText, SectionLabel, Reveal, ease } from './Motion'

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
                <KineticText text="Preventive" className="block" />
                <KineticText text="care &" className="block" delay={0.2} />
                <KineticText text="hardware" className="block" delay={0.4} />
                <KineticText text="tuning." className="block text-sun" delay={0.6} />
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-6 sm:mt-8 max-w-md text-sm sm:text-base leading-relaxed text-white/65">
                  Scheduled servicing and targeted hardware upgrades extend machine lifespan, eliminate heat bottlenecks, and prevent sudden operational downtime. Every upgrade and repair is thoroughly stress-tested before handover.
                </p>
              </Reveal>

              <Reveal delay={0.25} className="mt-8 sm:mt-10">
                <div className="group relative overflow-hidden rounded-3xl border border-sun/30 bg-coal/80 p-5 sm:p-7 shadow-xl md:backdrop-blur transition-all duration-500 hover:border-sun/60">
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

          {/* Right Column: Scannable Maintenance Service Directory */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between border-y border-white/10 py-4">
              <span className="label text-white/45">Complete service directory</span>
              <span className="font-mono text-xs font-bold tracking-widest text-sun">09 services</span>
            </div>

            <div>
              {maintenanceServices.map((item, i) => (
                <motion.article
                  key={item.n}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.9, ease, delay: i * 0.05 }}
                  style={{ backfaceVisibility: 'hidden', willChange: 'transform, opacity' }}
                  className="group relative overflow-hidden border-b border-white/10"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-sun transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100" />

                  <div className="relative grid grid-cols-[auto_1fr_auto] gap-x-4 px-2 py-6 sm:gap-x-6 sm:px-4 sm:py-8">
                    <span className="font-display text-2xl font-black leading-none text-sun transition-colors duration-300 group-hover:text-ink sm:text-3xl">
                      {item.n}
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="h-1 w-1 rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-ink/20" />
                        <span className="label text-white/40 transition-colors duration-300 group-hover:text-ink/55">
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-xl font-bold uppercase leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-ink sm:text-2xl">
                        {item.t}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-ink/70 sm:text-[15px]">
                        {item.d}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-wider">
                        <span className="text-white/35 transition-colors duration-300 group-hover:text-ink/55">On-site / In-shop</span>
                        <span className="text-sun/80 transition-colors duration-300 group-hover:text-ink">Quality guaranteed</span>
                      </div>
                    </div>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all duration-500 group-hover:rotate-6 group-hover:border-ink/25 group-hover:bg-ink group-hover:text-sun sm:h-11 sm:w-11">
                      <Icon name={item.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

