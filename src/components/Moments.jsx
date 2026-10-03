import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useMotionTemplate, useMotionValueEvent } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

// Swap any entry's img for your own photo (drop it in public/assets and update the path).
// Keep it to 5–6 captioned moments: event + your role + outcome reads as professional.
const moments = [
  {
    img: '/assets/sih%201.jpg',
    tag: 'Hackathon',
    short: 'Squad',
    title: 'SIH 2025 squad',
    caption: 'Building through the night with the team — scoping, dividing work, shipping the demo.',
  },
  {
    img: '/assets/sih.jpg',
    tag: 'Hackathon',
    short: 'Work pic',
    title: 'SIH 26 work pic',
    caption: 'Heads-down during SIH 2026 — building, debugging and shipping with the team.',
  },
  {
    // Drop your photo in as public/assets/prize1.jpg — the card appears automatically.
    img: '/assets/prize1.jpg',
    tag: 'Award',
    short: 'Prize',
    title: '2nd place — Design Thinking',
    caption: 'FlowLink took 2nd place at the Design Thinking Contest in my college.',
  },
  {
    img: '/assets/ICGTA%20conference%20cochin.jpeg',
    tag: 'Conference',
    short: 'ICGTA',
    title: 'ICGTA-2025 circle',
    caption: 'With researchers and mentors in graph theory — where the publication journey started.',
  },
  {
    img: '/assets/ISRO.jpeg',
    tag: 'Field visit',
    short: 'ISRO',
    title: 'SDSC SHAR, Sriharikota',
    caption: 'Learning launch-pad systems first-hand with ISRO scientists and engineers.',
  },
  {
    img: '/assets/ICODMATH.jpg',
    tag: 'On stage',
    short: 'Stage',
    title: 'ICODMATH 2026',
    caption: 'Presenting two papers at REC — the most memorable stage so far.',
  },
]

const SPEED = 0.24 // rad per second — one full swirl ≈ 26s
const FRONT = Math.PI / 2 // bottom-center of the ellipse reads as "front"

function Lightbox({ m, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <motion.div className="modal-backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.figure
        className="moment-light"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 20 }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <img src={m.img} alt={m.title} onError={(e) => { e.currentTarget.style.display = 'none' }} />
        <figcaption><b>{m.title}</b><span>{m.caption}</span></figcaption>
      </motion.figure>
    </motion.div>,
    document.body
  )
}

/* ── One photo riding the orbit ── */
function OrbitCard({ mv, i, n, m, geom, onOpen, onHold, onRelease }) {
  const step = (Math.PI * 2) / n
  const depth = (v) => (Math.sin(v + i * step) + 1) / 2
  const x = useTransform(mv, v => geom.cx + geom.rx * Math.cos(v + i * step))
  const y = useTransform(mv, v => geom.cy + geom.ry * Math.sin(v + i * step))
  const sc = useTransform(mv, v => 0.7 + 0.34 * depth(v))
  const rt = useTransform(mv, v => Math.cos(v + i * step) * 9)
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0) scale(${sc}) rotate(${rt}deg)`
  const opacity = useTransform(mv, v => 0.4 + 0.6 * depth(v))
  const zIndex = useTransform(mv, v => Math.round(depth(v) * 50))
  const filter = useTransform(mv, v => `brightness(${0.45 + 0.55 * depth(v)})`)

  return (
    <motion.div
      className="orbit-card"
      style={{ transform, opacity, zIndex, filter }}
    >
      <div
        className="orbit-card-hit-area"
        onClick={() => onOpen(m)}
        onMouseEnter={onHold}
        onMouseLeave={onRelease}
      >
        <img src={m.img} alt={m.title} loading="lazy" draggable={false} onError={(e) => { e.currentTarget.style.display = 'none' }} />
        <div className="fan-card-shade" style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(5,5,6,0.88))' }} />
        <div className="fan-card-body">
          <p className="fan-cat" style={{ margin: 0 }}>{m.tag}</p>
          <h4>{m.title}</h4>
        </div>
      </div>
    </motion.div>
  )
}

/* ── DNA-style orbit: continuous swirl, freezes on hover ── */
function OrbitDeck({ onOpen }) {
  const stageRef = useRef(null)
  const [geom, setGeom] = useState({ cx: 220, rx: 200, cy: 110, ry: 140 })
  const [front, setFront] = useState(0)
  const mv = useMotionValue(0)
  const paused = useRef(false)
  const snap = useRef(null)
  const n = moments.length
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const measure = () => {
      if (!stageRef.current) return
      const w = stageRef.current.clientWidth
      const rx = Math.max(Math.min(w / 2 - 175, 250), 90)
      setGeom({ cx: w / 2 - 150, rx, cy: 110, ry: 140 })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    let raf
    let last = performance.now()
    const loop = (t) => {
      const dt = Math.min((t - last) / 1000, 0.05)
      last = t
      if (reduced.current) {
        // static fan, no motion
      } else if (snap.current != null) {
        const cur = mv.get()
        const diff = snap.current - cur
        mv.set(cur + diff * Math.min(1, dt * 3.2))
        if (Math.abs(diff) < 0.002) snap.current = null
      } else if (!paused.current) {
        mv.set(mv.get() + dt * SPEED)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [mv])

  // Left panel follows whichever photo swings to the front
  useMotionValueEvent(mv, 'change', (v) => {
    const step = (Math.PI * 2) / n
    let best = 0
    let bestScore = -2
    for (let i = 0; i < n; i++) {
      const s = Math.sin(v + i * step)
      if (s > bestScore) { bestScore = s; best = i }
    }
    setFront(prev => (prev === best ? prev : best))
  })

  const bringToFront = (i) => {
    const step = (Math.PI * 2) / n
    const cur = mv.get()
    // nearest angle that puts card i at FRONT
    const k = Math.round((cur - (FRONT - i * step)) / (Math.PI * 2))
    snap.current = FRONT - i * step + k * Math.PI * 2
    setFront(i)
  }

  const m = moments[front]

  return (
    <div
      className="fan moments-fan"
    >
      <div className="fan-left">
        <p className="kicker">Beyond the build</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="fan-cat">{m.tag}</p>
            <h3 className="fan-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{m.title}</h3>
            <p className="fan-desc">{m.caption}</p>
            <div style={{ marginTop: '1.4rem' }}>
              <button className="btn btn-ghost" onClick={() => onOpen(m)}>View photo</button>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="fan-tabs">
          {moments.map((t, i) => (
            <button
              key={t.title}
              className={`fan-tab ${i === front ? 'on' : ''}`}
              onClick={bringToFront.bind(null, i)}
            >
              {t.short}
            </button>
          ))}
        </div>
      </div>

      <div className="orbit-stage" ref={stageRef}>
        {moments.map((t, i) => (
          <OrbitCard
            key={t.title} mv={mv} i={i} n={n} m={t} geom={geom} onOpen={onOpen}
            onHold={() => { paused.current = true }}
            onRelease={() => { paused.current = false }}
          />
        ))}
      </div>

      <p className="fan-hint">Hover a photo to freeze it — the orbit keeps swirling everywhere else. Click to view large.</p>
    </div>
  )
}

export default function Moments() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [open, setOpen] = useState(null)

  return (
    <section className="section" id="moments" ref={ref}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
        <OrbitDeck onOpen={setOpen} />
      </motion.div>

      <AnimatePresence>
        {open && <Lightbox m={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}
