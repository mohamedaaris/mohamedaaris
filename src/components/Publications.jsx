import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const DOI = 'https://doi.org/10.1016/j.asej.2026.104475'
const CITATION = '\\bibitem{PrAnAa26} S. Prabhu, M. Anitha, P.M. Aaris, M. Arulperumjothi, Average distance in cyclic bipartite graphs, Ain Shams Engineering Journal 17(12) (2026) 104475.'

export default function Publications() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(CITATION)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section className="section" id="research" ref={ref} style={{ paddingTop: '4rem' }}>
      <p className="kicker">Research</p>
      <motion.h2
        className="h-giant"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75 }}
      >
        Peer-reviewed <span className="it">work.</span>
      </motion.h2>

      <motion.article
        className="pub-card"
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.7 }}
      >
        <div className="pub-badges">
          <span className="pill live">Published</span>
          <span className="pill">SCI Indexed</span>
          <span className="pill">Q1 Journal</span>
          <span className="pill">IF 6.2</span>
        </div>
        <h3>
          <a href={DOI} target="_blank" rel="noopener noreferrer">
            Average distance in cyclic bipartite graphs ↗
          </a>
        </h3>
        <p className="pub-meta">Ain Shams Engineering Journal (Elsevier) · Vol. 17, Issue 12 (2026) · 104475</p>
        <div className="authors">
          {['Dr. S. Savari Prabhu', 'Ms. M. Anitha'].map(a => <span key={a} className="author">{a}</span>)}
          <span className="author me">P. Mohamed Aaris</span>
          <span className="author">Ms. M. Arulperumjothi</span>
        </div>
        <p className="pub-abs">
          Defines a layer-based partitioning method for transmission in {`{4,6}`}-regular cyclic bipartite
          graphs — avoiding exhaustive pairwise computation and reaching the value in linear time.
          Directly useful for modelling robust, highly symmetric interconnection networks.
        </p>
        <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
          <a className="btn btn-solid" href={DOI} target="_blank" rel="noopener noreferrer">Read paper</a>
          <button className="btn btn-ghost" onClick={copy}>{copied ? '✓ Copied' : 'Copy citation'}</button>
        </div>
      </motion.article>
    </section>
  )
}
