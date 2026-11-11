import { useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { brand, problems } from '../data/content'
import Icon from './Icons'
import { ease, SectionLabel } from './Motion'

const cardVariants = {
  hidden: { opacity: 0, y: 64, scale: 0.972, filter: 'blur(10px)' },
  visible: ({ index, reduceMotion }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 0.95, delay: 0.12 + index * 0.085, ease },
  }),
}

const laptopKeys = Array.from({ length: 54 })

function LaptopObject({ reduceMotion }) {
  return (
    <motion.div
      className="laptop-scene"
      animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="laptop-object">
        <div className="laptop-display">
          <span className="laptop-camera" />
          <div className="laptop-screen">
            <div className="laptop-diagnostics">
              <span className="laptop-diagnostic-core">
                <Icon name="upgrade" />
                <i />
              </span>
              <div className="laptop-diagnostic-row">
                {['upgrade', 'chip', 'x', 'laptop', 'repair'].map((icon, index) => (
                  <span key={icon} style={{ '--diagnostic-index': index }}>
                    <Icon name={icon} />
                  </span>
                ))}
              </div>
              <span className="laptop-scan-line" />
            </div>
            <span className="laptop-screen-glow" />
          </div>
        </div>
        <span className="laptop-hinge" />
        <div className="laptop-base">
          <div className="laptop-keyboard">
            {laptopKeys.map((_, key) => <span key={key} />)}
          </div>
          <span className="laptop-trackpad" />
        </div>
        <span className="laptop-front-lip" />
      </div>
    </motion.div>
  )
}

function HardwareObject() {
  return (
    <div className="hardware-object">
      <div className="broken-tower">
        <span className="broken-tower__top" />
        <span className="broken-tower__side"><i /><i /><i /></span>
        <div className="broken-tower__front">
          <span className="broken-tower__power" />
          <span className="broken-tower__drive" />
          <span className="broken-tower__fan"><i /><i /><i /><i /></span>
          <span className="broken-tower__vents" />
        </div>
        <span className="broken-tower__fault"><Icon name="bolt" /></span>
        <span className="broken-tower__spark broken-tower__spark--one" />
        <span className="broken-tower__spark broken-tower__spark--two" />
      </div>
    </div>
  )
}

function SoftwareObject() {
  return (
    <div className="software-object">
      <div className="software-stage">
        {[0, 1, 2].map((window) => (
          <div key={window} className={`error-window error-window--${window + 1}`}>
            <span className="error-window__bar"><i /><i /><i /></span>
            <span className="error-window__symbol"><Icon name="x" /></span>
            <span className="error-window__line" />
            <span className="error-window__line error-window__line--short" />
          </div>
        ))}
      </div>
    </div>
  )
}

function SupplyObject() {
  return (
    <div className="supply-object">
      <div className="supply-box">
        <span className="supply-box__top" />
        <span className="supply-box__front"><Icon name="check" /></span>
        <span className="supply-box__side" />
      </div>
      <div className="supply-monitor"><Icon name="monitor" /></div>
      <div className="supply-phone"><Icon name="phone" /></div>
    </div>
  )
}

function SupportObject() {
  return (
    <div className="support-object">
      <div className="support-orbit"><i /><i /><i /></div>
      <div className="headset">
        <span className="headset-band" />
        <span className="headset-cup headset-cup--left" />
        <span className="headset-cup headset-cup--right" />
        <span className="headset-mic"><i /></span>
        <span className="headset-core"><Icon name="repair" /></span>
      </div>
    </div>
  )
}

function ProblemObject({ id, compact = false, reduceMotion }) {
  const objects = {
    'slow-computers': <LaptopObject reduceMotion={reduceMotion} />,
    'hardware-breakdowns': <HardwareObject />,
    'software-errors': <SoftwareObject />,
    'device-supplier': <SupplyObject />,
    'it-support': <SupportObject />,
  }
  const objectMotion = id === 'device-supplier'
    ? { y: [0, -4, 0] }
    : { y: [0, -5, 0], rotateY: [-2, 3, -2] }

  return (
    <motion.div
      className={`problem-object problem-object--${id} ${compact ? 'problem-object--compact' : ''}`}
      animate={reduceMotion || id === 'slow-computers' ? undefined : objectMotion}
      transition={{ duration: id === 'device-supplier' ? 7 : 5.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {objects[id]}
    </motion.div>
  )
}

function ProblemCard({ problem, index, featured = false, onSelect, reduceMotion }) {
  const Card = featured ? motion.article : motion.button

  return (
    <Card
      {...(!featured && {
        type: 'button',
        onClick: () => onSelect(problem.id),
      })}
      aria-label={featured ? `${problem.t}. ${problem.symptom}` : `Show ${problem.t}. ${problem.symptom}`}
      layout="position"
      custom={{ index, reduceMotion }}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
      whileHover={reduceMotion ? undefined : { y: -6, scale: 1.006 }}
      transition={{ layout: { duration: 0.55, ease }, type: 'spring', stiffness: 280, damping: 24 }}
      className={`problem-card group ${featured ? 'problem-card--featured' : 'problem-card--selectable'} ${problem.accent ? 'problem-card--accent' : ''}`}
    >
      <motion.span
        className="problem-card__reveal-line"
        aria-hidden="true"
        initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
        whileInView={reduceMotion ? undefined : { scaleX: [0, 1, 1], opacity: [0, 0.8, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 1.05, delay: 0.22 + index * 0.085, times: [0, 0.58, 1], ease }}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`copy-${problem.id}`}
          className="relative z-10"
          initial={reduceMotion ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -12, filter: 'blur(4px)' }}
          transition={{ duration: reduceMotion ? 0 : 0.52, ease }}
        >
          <p className="problem-card__eyebrow">
            <span>{problem.n}</span>
            <span aria-hidden="true">/</span>
            <span>{problem.category}</span>
          </p>
          <h3 className={featured ? 'problem-card__title problem-card__title--featured' : 'problem-card__title'}>
            {problem.t}
          </h3>
        </motion.div>
      </AnimatePresence>

      {featured && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`object-${problem.id}`}
            className="problem-photo-wrap problem-photo-wrap--object"
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, clipPath: 'inset(0 0 100% 0 round .55rem)' }}
            animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0 round .55rem)' }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 1.025, clipPath: 'inset(100% 0 0 0 round .55rem)' }}
            transition={{ duration: reduceMotion ? 0 : 0.78, ease }}
          >
            <motion.span
              className={`problem-object-ground-shadow problem-object-ground-shadow--${problem.id}`}
              initial={reduceMotion ? false : { opacity: 0, scaleX: 0.65 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.18, ease }}
            />
            <ProblemObject id={problem.id} reduceMotion={reduceMotion} />
          </motion.div>
        </AnimatePresence>
      )}

      {!featured && (
        <div className={`problem-card__object problem-card__object--${problem.id}`} aria-hidden="true">
          <ProblemObject id={problem.id} compact reduceMotion={reduceMotion} />
        </div>
      )}

      <div className="problem-card__answer">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`answer-${problem.id}`}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.48, delay: featured && !reduceMotion ? 0.12 : 0, ease }}
          >
            <p className="problem-card__help">Problem &amp; how we help</p>
            <p className="problem-card__description">{problem.d}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      {!featured && <span className="problem-card__select" aria-hidden="true">↗</span>}
    </Card>
  )
}

export default function Problems() {
  const ref = useRef(null)
  const activeCardRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const [activeId, setActiveId] = useState(problems[0].id)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-8%', '10%'])
  const headingY = useTransform(scrollYProgress, [0.08, 0.5], [32, 0])
  const activeProblem = problems.find((problem) => problem.id === activeId) ?? problems[0]
  const otherProblems = problems.filter((problem) => problem.id !== activeProblem.id)

  const selectProblem = (problemId) => {
    setActiveId(problemId)

    if (!window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches) return

    requestAnimationFrame(() => {
      const target = activeCardRef.current
      if (!target) return

      if (window.__lenis) {
        window.__lenis.scrollTo(target, {
          offset: -72,
          duration: reduceMotion ? 0 : 0.75,
        })
      } else {
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
      }
    })
  }

  return (
    <section ref={ref} id="problems" data-section className="problems-section">
      <motion.div style={{ y: backgroundY }} className="problems-section__halo" aria-hidden="true" />

      <div className="container-x relative z-10">
        <motion.div
          style={{ y: headingY }}
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease }}
          className="problems-heading"
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: reduceMotion ? 0 : 0.7, ease }}
          >
            <SectionLabel index="02">Problems we solve</SectionLabel>
          </motion.div>

          <motion.h2
            className="display"
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.08, ease }}
          >
            Are your <span>devices</span> slowing you down?
          </motion.h2>

          <motion.p
            className="problems-subtitle"
            initial={reduceMotion ? false : { opacity: 0, y: 22, filter: 'blur(7px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.28, ease }}
          >
            A slow workstation delays everyday tasks. A failed device interrupts an entire working day. When these issues recur, replacing equipment is not always the answer. We help identify what needs repairing, upgrading or replacing, so you can make informed decisions about your business technology.
          </motion.p>
        </motion.div>

        <div className="problems-desktop-explorer">
          <LayoutGroup id="problems-layout">
            <div className="problems-layout">
              <div ref={activeCardRef} aria-live="polite" className="h-full">
                <ProblemCard problem={activeProblem} index={0} featured reduceMotion={reduceMotion} />
              </div>
              <div className="problems-grid" aria-label="Choose a problem to explore">
                {otherProblems.map((problem, index) => (
                  <ProblemCard
                    key={problem.id}
                    problem={problem}
                    index={index + 1}
                    onSelect={selectProblem}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>
            </div>
          </LayoutGroup>
        </div>

        <div className="problems-mobile-list" aria-label="Problems we solve">
          {problems.map((problem, index) => (
            <ProblemCard
              key={`mobile-${problem.id}`}
              problem={problem}
              index={index}
              featured
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <motion.div
          className="problems-footer"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.2, ease }}
        >
          <p className="problems-location">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.1 7-13a7 7 0 1 0-14 0c0 6.9 7 13 7 13Zm0-9.5A3.5 3.5 0 1 1 12 5a3.5 3.5 0 0 1 0 7.5Z" /></svg>
            Kuala Lumpur &amp; Selangor
          </p>
          <motion.a
            href={brand.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="problems-cta"
            data-hover
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.98 }}
          >
            Discuss your IT needs <span aria-hidden="true">↗</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
