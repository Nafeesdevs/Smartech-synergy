import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqs } from '../data/content'
import { SectionLabel, MaskLines, Reveal, ease } from './Motion'
import Icon from './Icons'

function FaqItem({ item, index, isOpen, toggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.8, ease, delay: index * 0.06 }}
      className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 ${
        isOpen
          ? 'border-sun/60 bg-steel/90 shadow-[0_12px_40px_rgba(0,0,0,0.4)]'
          : 'border-white/10 bg-coal/70 hover:border-white/20 hover:bg-coal/90'
      }`}
    >
      <button
        onClick={toggle}
        type="button"
        className="flex w-full items-start justify-between gap-4 p-5 text-left sm:gap-6 sm:p-8"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col gap-2.5 sm:gap-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-widest text-sun sm:text-xs">
              0{index + 1}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span className="label text-white/40">{item.tag}</span>
          </div>
          <h3 className="font-display text-base font-bold text-white transition-colors duration-300 group-hover:text-white sm:text-xl md:text-2xl">
            {item.q}
          </h3>
        </div>

        <span
          className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
            isOpen
              ? 'border-sun bg-sun text-ink rotate-45'
              : 'border-white/15 bg-white/5 text-white/70 group-hover:border-white/40 group-hover:text-white'
          }`}
        >
          <Icon name="plus" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 px-5 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-5">
              <p className="text-[14px] leading-relaxed text-white/70 sm:text-base">
                {item.before}
                <span className="font-semibold text-white">
                  {item.highlight}
                </span>
                {item.after}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? -1 : i)
  }

  return (
    <section id="faq" data-section className="relative overflow-hidden bg-ink py-28 md:py-40">
      {/* Background dot matrix echoing theme */}
      <div className="dot-grid pointer-events-none absolute inset-0 text-white/[0.04]" />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14 xl:gap-16">
          {/* Left Column: Heading & Sticky Context */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionLabel index="09">Clarity & Assurance</SectionLabel>
              <h2 className="display mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-[4.6vw] xl:text-[4.3vw] tracking-tight">
                <MaskLines
                  lines={[
                    'Frequently',
                    <span>
                      asked <span className="text-sun">questions.</span>
                    </span>,
                  ]}
                />
              </h2>
              <Reveal delay={0.15}>
                <p className="mt-6 sm:mt-8 max-w-sm text-sm sm:text-base leading-relaxed text-white/65">
                  Clear answers to key operational questions regarding deployment times, diagnostic policies, enterprise hardware sourcing, and after-hours coverage.
                </p>
              </Reveal>

              <Reveal delay={0.25} className="mt-10 hidden sm:block">
                <div className="rounded-2xl border border-white/10 bg-coal/60 p-6 backdrop-blur-sm">
                  <div className="label text-white/40">Need direct answers?</div>
                  <p className="mt-2 text-sm text-white/75">
                    Have a unique infrastructure challenge or urgent request?
                  </p>
                  <a
                    href="#contact"
                    className="label mt-4 inline-flex items-center gap-2 text-sun hover:text-white transition-colors"
                  >
                    Speak with an engineer <Icon name="arrow" className="h-3.5 w-3.5" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="flex flex-col gap-4 lg:col-span-6 xl:col-span-7 lg:pt-[3.5rem]">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.q}
                item={faq}
                index={i}
                isOpen={openIndex === i}
                toggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

