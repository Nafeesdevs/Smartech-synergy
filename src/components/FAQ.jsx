import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqs } from '../data/content'
import { KineticText, SectionLabel, Reveal, ease } from './Motion'
import Icon from './Icons'

function FaqItem({ item, index, isOpen, toggle, open }) {
  return (
    <motion.div
      onMouseEnter={open}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.9, ease, delay: index * 0.05 }}
      style={{ backfaceVisibility: 'hidden', willChange: 'transform, opacity' }}
      className={`group relative overflow-hidden rounded-[20px] border bg-coal/55 transition-[border-color,box-shadow] duration-500 ease-out ${
        isOpen
          ? 'border-sun/70 shadow-[0_18px_60px_rgba(0,0,0,0.28)]'
          : 'border-white/10 hover:border-sun/60'
      }`}
    >
      <span
        className={`pointer-events-none absolute inset-0 origin-bottom bg-sun transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
          isOpen ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
        }`}
      />
      <button
        onClick={toggle}
        type="button"
        className="relative z-10 flex w-full items-start gap-4 p-5 text-left sm:gap-6 sm:p-7 md:p-8"
        aria-expanded={isOpen}
      >
        <span className={`font-display text-2xl font-black leading-none transition-colors duration-300 sm:text-3xl ${isOpen ? 'text-ink' : 'text-sun group-hover:text-ink'}`}>
          0{index + 1}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 pt-0.5">
            <span className={`h-1 w-1 rounded-full transition-colors duration-300 ${isOpen ? 'bg-ink/20' : 'bg-white/20 group-hover:bg-ink/20'}`} />
            <span className={`label transition-colors duration-300 ${isOpen ? 'text-ink/60' : 'text-white/40 group-hover:text-ink/60'}`}>{item.tag}</span>
          </div>
          <h3 className={`mt-3 font-display text-base font-bold leading-tight transition-colors duration-300 sm:text-xl md:text-2xl ${isOpen ? 'text-ink' : 'text-white group-hover:text-ink'}`}>
            {item.q}
          </h3>
        </div>

        <span
          className={`ml-auto flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
            isOpen
              ? 'rotate-45 border-ink/40 bg-transparent text-ink'
              : 'border-white/15 bg-white/5 text-white/70 group-hover:border-ink/40 group-hover:bg-transparent group-hover:text-ink'
          }`}
        >
          <Icon name="plus" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0, y: -6 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -4 }}
            transition={{ duration: 0.45, ease }}
            className="relative z-10 overflow-hidden"
          >
            <div className="border-t border-ink/15 px-5 pb-6 pt-4 sm:pb-7 sm:pl-[6.75rem] sm:pr-8 sm:pt-5">
              <p className="text-[14px] leading-relaxed text-ink/70 sm:text-base">
                {item.before}
                <span className="font-semibold text-ink">
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
                <KineticText text="Frequently" className="block" />
                <KineticText text="asked" className="block" delay={0.2} />
                <KineticText text="questions." className="block text-sun" delay={0.4} />
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-6 sm:mt-8 max-w-sm text-sm sm:text-base leading-relaxed text-white/65">
                  Clear answers to key operational questions regarding deployment times, diagnostic policies, enterprise hardware sourcing, and after-hours coverage.
                </p>
              </Reveal>

              <Reveal delay={0.25} className="mt-10 hidden sm:block">
                <div className="border-l-2 border-sun py-1 pl-5">
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
          <div className="flex flex-col gap-3 lg:col-span-6 xl:col-span-7 lg:pt-[3.5rem]">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.q}
                item={faq}
                index={i}
                isOpen={openIndex === i}
                toggle={() => toggle(i)}
                open={() => setOpenIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

