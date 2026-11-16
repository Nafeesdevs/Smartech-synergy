import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { brand, problems } from '../data/content'
import Icon from './Icons'
import { ease, SectionLabel } from './Motion'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])

  return matches
}

function useLowPowerMode() {
  const [lowPower] = useState(() => {
    const limitedCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
    const limitedMemory = navigator.deviceMemory && navigator.deviceMemory <= 4
    return Boolean(limitedCpu || limitedMemory || navigator.connection?.saveData)
  })
  return lowPower
}

const laptopKeys = Array.from({ length: 54 })

function LaptopObject({ reduceMotion, compositorMotion }) {
  const Scene = compositorMotion ? 'div' : motion.div

  return (
    <Scene
      className="laptop-scene"
      {...(!compositorMotion && {
        animate: reduceMotion ? { y: 0 } : { y: [0, -5, 0] },
        transition: reduceMotion ? { duration: 0.2 } : { duration: 6, repeat: Infinity, ease: 'easeInOut' },
      })}
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
    </Scene>
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

function ProblemObject({ id, compact = false, compositorMotion }) {
  // Keep the detailed 3D composition static while scrolling; card hover and selection effects remain interactive.
  let object

  switch (id) {
    case 'slow-computers':
      object = <LaptopObject reduceMotion compositorMotion={compositorMotion} />
      break
    case 'hardware-breakdowns':
      object = <HardwareObject />
      break
    case 'software-errors':
      object = <SoftwareObject />
      break
    case 'device-supplier':
      object = <SupplyObject />
      break
    case 'it-support':
      object = <SupportObject />
      break
    default:
      object = null
  }

  return (
    <div className={`problem-object problem-object--${id} ${compact ? 'problem-object--compact' : ''} ${compositorMotion ? 'problem-object--compositor-motion' : ''}`}>
      {object}
    </div>
  )
}

function ProblemCard({ problem, featured = false, active = false, onSelect, reduceMotion, compositorMotion }) {
  const Card = featured ? motion.article : motion.button

  return (
    <Card
      {...(!featured && {
        type: 'button',
        onClick: () => onSelect(problem.id),
      })}
      aria-label={featured ? `${problem.t}. ${problem.symptom}` : `Show ${problem.t}. ${problem.symptom}`}
      whileHover={reduceMotion ? undefined : { y: -6, transition: { duration: 0.22, ease } }}
      className={`problem-card group ${featured ? 'problem-card--featured' : 'problem-card--selectable'} ${active ? 'problem-card--active' : ''} ${problem.accent ? 'problem-card--accent' : ''}`}
    >
      {active && (
        <div className="problem-card__active-badge" aria-hidden="true">
          <span /> Active diagnosis
        </div>
      )}

      <motion.div
        key={`copy-${problem.id}`}
        className="relative z-10"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.38, ease }}
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

      {featured && (
        <motion.div
          key={`object-${problem.id}`}
          className="problem-photo-wrap problem-photo-wrap--object"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.48, ease }}
        >
          <motion.span
            className={`problem-object-ground-shadow problem-object-ground-shadow--${problem.id}`}
            initial={reduceMotion ? false : { opacity: 0, scaleX: 0.65 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.18, ease }}
          />
          <ProblemObject id={problem.id} compositorMotion={compositorMotion} />
        </motion.div>
      )}

      {!featured && (
        <div className={`problem-card__object problem-card__object--${problem.id}`} aria-hidden="true">
          <ProblemObject id={problem.id} compact compositorMotion={compositorMotion} />
        </div>
      )}

      <div className="problem-card__answer">
        <motion.div
          key={`answer-${problem.id}`}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.36, delay: featured && !reduceMotion ? 0.06 : 0, ease }}
        >
          {featured ? (
            <>
              <p className="problem-card__help">Spot the signs early</p>
              <div className="problem-card__diagnosis-grid">
                <div>
                  <span>01 / You may notice</span>
                  <p>{problem.symptom}</p>
                </div>
                <div>
                  <span>02 / Why it matters</span>
                  <p>{problem.impact}</p>
                </div>
                <div className="is-solution">
                  <span>03 / Our next step</span>
                  <p>{problem.solution}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="problem-card__help">Common warning sign</p>
              <p className="problem-card__description">{problem.symptom}</p>
            </>
          )}
        </motion.div>
      </div>
      {!featured && <span className="problem-card__select" aria-hidden="true">Explore <b>↗</b></span>}
    </Card>
  )
}

export default function Problems() {
  const ref = useRef(null)
  const activeCardRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const lowPower = useLowPowerMode()
  const simplifiedMotion = reduceMotion || lowPower
  const [activeId, setActiveId] = useState(problems[0].id)
  const activeProblem = problems.find((problem) => problem.id === activeId) ?? problems[0]
  const activeIndex = Math.max(0, problems.findIndex((problem) => problem.id === activeProblem.id))
  const otherProblems = problems.filter((problem) => problem.id !== activeProblem.id)

  const selectProblem = useCallback((problemId) => {
    setActiveId((currentId) => currentId === problemId ? currentId : problemId)

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
  }, [reduceMotion])

  return (
    <section ref={ref} id="problems" data-section className={`problems-section ${lowPower ? 'problems-section--lite' : ''}`}>
      <div className="problems-section__halo" aria-hidden="true" />

      <div className="container-x relative z-10">
        <motion.div
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
            Is slow tech <span>holding you back?</span>
          </motion.h2>

          <motion.p
            className="problems-subtitle"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.28, ease }}
          >
            Choose the problem affecting your PC, laptop, or device. We check the cause and recommend the right next step: repair, upgrade, replacement, or on-site support.
          </motion.p>
        </motion.div>

        {!isMobile && <div className="problems-desktop-explorer">
          <div className="problems-console">
            <div className="problems-console__status">
              <div className="problems-console__live"><span /> Diagnostic desk online</div>
              <div className="problems-console__readout">Business technology risk scan</div>
              <div className="problems-console__count">Active signal <strong>{String(activeIndex + 1).padStart(2, '0')}</strong> / 05</div>
            </div>

            <div className="problems-console__nav" role="tablist" aria-label="Select a technology problem">
              {problems.map((problem) => {
                const selected = problem.id === activeProblem.id
                return (
                  <button
                    key={`signal-${problem.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    className={selected ? 'is-active' : ''}
                    onClick={() => selectProblem(problem.id)}
                  >
                    <span>{problem.n}</span>
                    <em>{problem.category}</em>
                  </button>
                )
              })}
            </div>

            <div className="problems-layout">
              <div ref={activeCardRef} aria-live="polite" className="h-full">
                <ProblemCard problem={activeProblem} featured active reduceMotion={simplifiedMotion} compositorMotion />
              </div>
              <div className="problems-grid" aria-label="Choose a problem to explore">
                {otherProblems.map((problem) => (
                  <ProblemCard
                    key={problem.id}
                    problem={problem}
                    onSelect={selectProblem}
                    reduceMotion={simplifiedMotion}
                    compositorMotion
                  />
                ))}
              </div>
            </div>

            <div className="problems-console__hint" aria-hidden="true">
              <span>Select a signal to inspect</span>
              <i />
              <span>Diagnosis → practical next step</span>
            </div>
          </div>
        </div>}

        {isMobile && <div className="problems-mobile-list" aria-label="Problems we solve">
          {problems.map((problem) => (
            <ProblemCard
              key={`mobile-${problem.id}`}
              problem={problem}
              featured
              reduceMotion={simplifiedMotion}
              compositorMotion={false}
            />
          ))}
        </div>}

        <div className="problems-footer">
          <div className="problems-footer__copy">
            <p className="problems-footer__eyebrow"><span /> Recognise one of these signs?</p>
            <h3>You do not need to diagnose it yourself.</h3>
            <p>Tell us what your PC, laptop, or device is doing. We will help you understand the problem and the most practical next step.</p>
            <p className="problems-location">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.1 7-13a7 7 0 1 0-14 0c0 6.9 7 13 7 13Zm0-9.5A3.5 3.5 0 1 1 12 5a3.5 3.5 0 0 1 0 7.5Z" /></svg>
              Kuala Lumpur &amp; Selangor
            </p>
          </div>
          <div className="problems-footer__actions">
            <motion.a
              href={brand.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="problems-cta"
              data-hover
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.98 }}
            >
              Describe your problem <span aria-hidden="true">↗</span>
            </motion.a>
            <a className="problems-call" href={brand.whatsapp} target="_blank" rel="noopener noreferrer" data-hover>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
