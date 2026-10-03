import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'

function RevealWords({ text, dark = '#f4f4f5', light = 'rgba(244,244,245,0.13)', accents = {}, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <W key={i} progress={scrollYProgress} n={words.length} i={i} dark={dark} light={light} accent={accents[w]}>{w}</W>
      ))}
    </p>
  )
}

function W({ children, progress, n, i, dark, light, accent }) {
  const opacity = useTransform(progress, [i / n, Math.min((i + 1.2) / n, 1)], [0.12, 1])
  return (
    <motion.span style={{ opacity, color: accent || dark }}>
      {children}{' '}
    </motion.span>
  )
}

function FadeCol({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const y = useTransform(progress, range, [24, 0])
  return <motion.div style={{ opacity, y }}>{children}</motion.div>
}

function BioBlock() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] })
  return (
    <div ref={ref} className="cream-bio">
      <FadeCol progress={scrollYProgress} range={[0, 0.45]}>
        <p>
          Currently pursuing my B.E. in Computer Science and Engineering at Rajalakshmi Engineering College, graduating in 2028 — a web and
          full-stack developer with hands-on experience across <b>front-end and back-end
          technologies.</b> I build web apps, realtime systems and interfaces that feel right.
        </p>
      </FadeCol>
      <FadeCol progress={scrollYProgress} range={[0.4, 0.9]}>
        <p>
          Passionate about crafting visually stunning, highly functional digital experiences
          that push the boundaries of web technology — from Flask backends and Socket.IO rooms
           to a published graph-theory paper. <a href="#contact">Contact me →</a>
        </p>
      </FadeCol>
    </div>
  )
}

export default function AboutPortrait() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="cream" ref={ref}>
      <span className="cream-giant" aria-hidden>ABOUT</span>
      <div className="cream-inner">
        <motion.div
          className="cream-photo"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <img src="/assets/aaris.jpeg" alt="P Mohamed Aaris" />
          <svg className="spin-badge" viewBox="0 0 120 120" aria-hidden>
            <defs>
              <path id="circ" d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
            </defs>
            <circle cx="60" cy="60" r="58" fill="#0a0a0a" />
            <text>
              <textPath href="#circ" textLength="272" lengthAdjust="spacingAndGlyphs">READ MY STORY • AARIS • CHENNAI •</textPath>
            </text>
            <text x="60" y="68" textAnchor="middle" className="badge-star">✦</text>
          </svg>
        </motion.div>

        <div>
          <RevealWords
            className="cream-quote"
            text="Engineering is how a product works. Design is how it feels. I care about both, and I finish what I start."
            accents={{ both: '#c8ff2e', start: '#c8ff2e' }}
          />
          <p className="cream-byline">— P MOHAMED AARIS, FULL-STACK DEVELOPER</p>
          <BioBlock />
          <div className="cream-facts">
            <div><span>Studying</span><b>CSE, Rajalakshmi Engineering College '28</b></div>
            <div><span>Involved in</span><b>ERPNext internship · SIH · Research</b></div>
            <div><span>Based in</span><b>Chennai, India</b></div>
          </div>
        </div>
      </div>
    </section>
  )
}
