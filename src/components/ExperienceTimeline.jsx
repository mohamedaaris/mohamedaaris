import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const miles = [
  { n: '01', cat: 'HTML · CSS', flap: 'FIRST', title: 'First websites', body: 'Static pages and CSS experiments — where the obsession with layout started.', img: '/assets/miraisync1.jpg' },
  { n: '02', cat: 'Python · DSA', flap: 'LEARN', title: 'Python and problem solving', body: 'Scripting, automation and daily DSA practice that still pays off in every build.', img: '/assets/python.jpg' },
  { n: '03', cat: 'SIH 2025', flap: 'TEAM', title: 'Hackathon round', body: 'Smart India Hackathon internal round. Learned scoping, teamwork and demo-driven shipping.', img: '/assets/sih%201.jpg' },
  { n: '04', cat: 'ERPNext · Frappe', flap: 'WORK', title: 'Internship at Tekbee', body: 'CRM lead tracker plus a prompt-based AI chatbot performing real ERP tasks.', img: '/assets/tekbee.png' },
  { n: '05', cat: 'Graph Theory', flap: 'MEET', title: 'ICGTA conference', body: 'International Conference on Graph Theory and Its Applications (ICGTA-2025) at Amrita — current trends and open questions in the field.', img: '/assets/ICGTA%20conference%20cochin.jpeg' },
  { n: '06', cat: 'Elsevier · Q1', flap: 'PROOF', title: 'Published researcher', body: 'Average distance in cyclic bipartite graphs — Ain Shams Engineering Journal, IF 6.2.', img: '/assets/research.png' },
  { n: '07', cat: 'ISRO · SHAR', flap: 'SPACE', title: 'ISRO educational visit', body: 'Launch-pad fuel systems, propellant handling and safety protocols at SDSC SHAR with Scientist E Mr. Vijayakumar.', img: '/assets/ISRO.jpeg' },
  { n: '08', cat: 'ServiceNow', flap: 'ADMIN', title: 'ServiceNow virtual internship', body: 'SmartBridge × ServiceNow University × AICTE program — fundamentals, Agentic AI, Administration, Flows, ATF, Reports and CSA prep.', img: '/assets/servicenow.jpg' },
  { n: '09', cat: 'IBM SkillsBuild', flap: 'GENAI', title: 'IBM SkillsBuild internship', body: 'Edunet Foundation program — watsonx AI Studio, Orchestrate, Granite models and BOB. Built SmartDesk AI, a natural-language desktop assistant.', img: '/assets/ibm.png' },
  { n: '10', cat: 'React · AI', flap: 'SHIP', title: 'Realtime and AI products', body: 'ResuMatch AI, FlowLink, research agents — live, demoable, used.', img: '/assets/resumatch1.jpeg' },
  { n: '11', cat: 'ICODMATH 2026', flap: 'STAGE', title: 'Two papers on stage', body: 'Presented “Number of 3-step Pairs in Fractal Cubic Network” and “Average Distance in {3,5}-Regular Cyclic Bipartite Graphs” at ICODMATH2026, REC.', img: '/assets/ICODMATH.jpg' },
]

function SplitFlap({ text }) {
  return (
    <span className="splitflap" aria-hidden>
      {text.split('').map((c, i) => (
        <AnimatePresence mode="wait" key={i}>
          <motion.span
            key={c + text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18, delay: i * 0.03 }}
          >
            {c}
          </motion.span>
        </AnimatePresence>
      ))}
    </span>
  )
}

export default function ExperienceTimeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const n = miles.length

  const go = (d) => {
    setDir(d)
    setIdx(i => (i + d + n) % n)
  }

  const m = miles[idx]

  return (
    <section className="section" id="journey" ref={ref}>
      <div className="flip-grid">
        <div>
          <p className="kicker">Journey</p>
          <motion.h2
            className="h-giant"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75 }}
          >
            How I got<br /><span className="it">here</span>
          </motion.h2>
          <p className="section-desc">From static pages to realtime platforms.</p>
          <div style={{ marginTop: '1.8rem' }}>
            <SplitFlap text={m.flap} />
          </div>
          <p className="flip-count">{String(idx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</p>
        </div>

        <div className="flip-stage">
          {miles.map((t, i) => {
            const rel = (i - idx + n) % n
            if (rel > 4) return null
            return (
              <motion.div
                key={t.n}
                className="flip-card"
                onClick={() => go(1)}
                animate={{
                  x: rel * 26,
                  rotate: rel * 6,
                  scale: 1 - rel * 0.045,
                  opacity: 1 - rel * 0.22,
                  zIndex: 60 - rel,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 24 }}
                drag={rel === 0 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1)
                  else if (info.offset.x > 70) go(-1)
                }}
                whileHover={rel === 0 ? { scale: 1.015 } : {}}
                style={{ cursor: 'pointer' }}
              >
                <span className="flip-num">{t.n}</span>
                <div className="flip-img">
                  <img src={t.img} alt="" loading="lazy" />
                </div>
                <div className="flip-text">
                  <p className="flip-cat">{t.cat}</p>
                  <h4>{t.title}</h4>
                  <p className="flip-body">{t.body}</p>
                </div>
              </motion.div>
            )
          })}
          <AnimatePresence mode="wait">
            <motion.span
              key={idx}
              className="flip-ghost"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </AnimatePresence>
        </div>
      </div>
      <p className="flip-hint">Drag or click the card to flip through {n} milestones</p>
      <div className="flip-dots">
        {miles.map((t, i) => (
          <button
            key={t.n}
            aria-label={`Go to milestone ${i + 1}`}
            className={`flip-dot ${i === idx ? 'on' : ''}`}
            onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i) }}
          />
        ))}
      </div>
    </section>
  )
}
