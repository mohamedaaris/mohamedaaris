import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const publications = [
  {
    id: 'PUB-001',
    title: 'Average distance in cyclic bipartite graphs',
    journal: 'Ain Shams Engineering Journal',
    publisher: 'Elsevier',
    volume: 'Vol. 17, Issue 12 (2026) 104475',
    doi: 'https://doi.org/10.1016/j.asej.2026.104475',
    citation: '\\bibitem{PrAnAa26} S. Prabhu, M. Anitha, P.M. Aaris, M. Arulperumjothi, Average distance in cyclic bipartite graphs, Ain Shams Engineering Journal \\textbf{17}(12) (2026) 104475.',
    status: 'PUBLISHED',
    indexing: [
      { label: 'SCI Indexed', code: 'Science Citation Index' },
      { label: 'Q1 Journal', code: 'Top Tier' },
      { label: 'Impact Factor 6.2', code: 'IF: 6.2' },
    ],
    authors: [
      { name: 'Dr. S. Savari Prabhu', role: 'Co-Author' },
      { name: 'Ms. M. Anitha', role: 'Co-Author' },
      { name: 'P. Mohamed Aaris', role: 'Author (Self)', isUser: true },
      { name: 'Ms. M. Arulperumjothi', role: 'Co-Author' },
    ],
    abstract:
      'The transmission of a vertex u, denoted by T(u), is defined as the sum of the shortest distances from u to all other vertices in the graph, capturing its positional importance within the network. This metric plays a crucial role in analysing the structural efficiency of graphs. In this paper, we discuss the transmission for cyclic bipartite graphs with {4,6}-regularity along with their vertex transitivity. The technique used here avoids exhaustive pairwise computations and gives a layer-based partitioning method; as a result, the value is attainable in linear time with respect to the graph order. The results attained in this paper are valuable input for assessing the structural features of cyclic bipartite graphs, enhancing their applicability in modeling robust and highly symmetric interconnection networks.',
    topics: ['Graph Theory', 'Cyclic Bipartite Graphs', 'Average Distance', 'Network Topology', 'Applied Mathematics'],
    accent: '#00ff88',
    date: '2026',
  }
]

export default function Publications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyCitation = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section className="section" id="publications" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        🔬 RESEARCH & PUBLICATIONS
      </motion.div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Journal Publications
      </motion.h2>

      <motion.p
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.7rem',
          color: '#4a5568',
          letterSpacing: '3px',
          marginBottom: '2.5rem',
          marginTop: '-1.5rem',
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
      >
        {'[ PEER-REVIEWED SCIENTIFIC PAPERS ]'}
      </motion.p>

      {/* Publications Grid / Showcase */}
      <div style={{ width: '100%', maxWidth: '920px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {publications.map((pub, idx) => (
          <motion.div
            key={pub.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + idx * 0.2, duration: 0.7 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              position: 'relative',
              background: 'linear-gradient(145deg, rgba(10,10,26,0.95) 0%, rgba(15,25,45,0.8) 100%)',
              border: `1px solid ${hovered ? pub.accent + '60' : 'rgba(0, 245, 255, 0.12)'}`,
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: hovered
                ? `0 20px 50px rgba(0,0,0,0.6), 0 0 30px ${pub.accent}20`
                : '0 10px 30px rgba(0,0,0,0.4)',
              transition: 'all 0.4s ease',
              overflow: 'hidden',
            }}
          >
            {/* Background glowing accent */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '300px',
                height: '300px',
                background: `radial-gradient(circle, ${pub.accent}10 0%, transparent 70%)`,
                pointerEvents: 'none',
              }}
            />

            {/* Top row badges */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: '0.6rem',
                    color: pub.accent,
                    letterSpacing: '2px',
                    padding: '0.25rem 0.6rem',
                    background: `${pub.accent}15`,
                    border: `1px solid ${pub.accent}40`,
                    borderRadius: '4px',
                  }}
                >
                  {pub.id}
                </span>
                <span
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '0.55rem',
                    fontWeight: 700,
                    color: '#00ff88',
                    letterSpacing: '1px',
                    padding: '0.25rem 0.6rem',
                    background: 'rgba(0, 255, 136, 0.1)',
                    border: '1px solid rgba(0, 255, 136, 0.3)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#00ff88',
                      boxShadow: '0 0 8px #00ff88',
                      animation: 'pulse-text 1.5s infinite',
                    }}
                  />
                  {pub.status}
                </span>
              </div>

              {/* Journal Metrics Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {pub.indexing.map((item, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '0.55rem',
                      color: i === 0 ? '#00f5ff' : i === 1 ? '#b946ff' : '#00ff88',
                      letterSpacing: '1px',
                      padding: '0.25rem 0.6rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${i === 0 ? '#00f5ff40' : i === 1 ? '#b946ff40' : '#00ff8840'}`,
                      borderRadius: '4px',
                      boxShadow: `0 0 10px ${i === 0 ? '#00f5ff15' : i === 1 ? '#b946ff15' : '#00ff8815'}`,
                    }}
                  >
                    ✦ {item.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Paper Title with direct link */}
            <motion.h3
              whileHover={{ color: '#00f5ff', x: 4 }}
              onClick={() => window.open(pub.doi, '_blank')}
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '1.35rem',
                fontWeight: 700,
                color: '#e0e8ff',
                letterSpacing: '1px',
                lineHeight: 1.4,
                marginBottom: '0.75rem',
                textShadow: hovered ? `0 0 15px ${pub.accent}40` : 'none',
                transition: 'all 0.3s',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              “{pub.title}” <span style={{ fontSize: '0.9rem', color: pub.accent }}>↗</span>
            </motion.h3>

            {/* Journal, Publisher & Citation Info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem',
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '1.05rem',
                fontWeight: 600,
                color: pub.accent,
                marginBottom: '1.25rem',
              }}
            >
              <a
                href={pub.doi}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: pub.accent, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                🏛️ {pub.journal}
              </a>
              <span style={{ color: '#4a5568' }}>•</span>
              <span style={{ color: '#8892b0' }}>{pub.publisher}</span>
              {pub.volume && (
                <>
                  <span style={{ color: '#4a5568' }}>•</span>
                  <span style={{ color: '#00f5ff', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.8rem' }}>
                    {pub.volume}
                  </span>
                </>
              )}
            </div>

            {/* Authors List */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '0.5rem',
                  color: '#4a5568',
                  letterSpacing: '2px',
                  marginBottom: '0.5rem',
                }}
              >
                AUTHOR LINKS & CONTRIBUTORS
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {pub.authors.map((author, aIdx) => (
                  <motion.div
                    key={aIdx}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      background: author.isUser ? 'rgba(0, 245, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: author.isUser ? '1px solid #00f5ff' : '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: author.isUser ? '0 0 15px rgba(0, 245, 255, 0.25)' : 'none',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: author.isUser ? 700 : 500,
                        fontSize: '0.85rem',
                        color: author.isUser ? '#00f5ff' : '#e0e8ff',
                      }}
                    >
                      {author.name}
                    </span>
                    {author.isUser && (
                      <span
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: '0.45rem',
                          color: '#00f5ff',
                          background: 'rgba(0,245,255,0.2)',
                          padding: '0.1rem 0.3rem',
                          borderRadius: '2px',
                          letterSpacing: '1px',
                        }}
                      >
                        YOU
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Abstract */}
            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '0.95rem',
                color: '#8892b0',
                lineHeight: 1.6,
                marginBottom: '1.25rem',
              }}
            >
              {pub.abstract}
            </p>

            {/* Tags / Topics */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {pub.topics.map((topic, tIdx) => (
                <span
                  key={tIdx}
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: '0.55rem',
                    padding: '0.2rem 0.5rem',
                    border: '1px solid rgba(0, 245, 255, 0.2)',
                    borderRadius: '2px',
                    color: '#8892b0',
                    background: 'rgba(0, 245, 255, 0.03)',
                  }}
                >
                  #{topic}
                </span>
              ))}
            </div>

            {/* Action Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '1rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(pub.doi, '_blank')}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(0, 245, 255, 0.15)',
                    border: '1px solid #00f5ff',
                    borderRadius: '6px',
                    color: '#00f5ff',
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '0.55rem',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.3s',
                  }}
                >
                  🔗 VIEW PAPER (DOI) ↗
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: `0 0 15px ${pub.accent}40` }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopyCitation(pub.citation)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: `${pub.accent}15`,
                    border: `1px solid ${pub.accent}60`,
                    borderRadius: '6px',
                    color: pub.accent,
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '0.55rem',
                    fontWeight: 600,
                    letterSpacing: '2px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.3s',
                  }}
                >
                  {copied ? '✓ CITATION COPIED' : '📋 COPY BIBITEM CITATION'}
                </motion.button>
              </div>

              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '0.5rem',
                  color: '#4a5568',
                  letterSpacing: '2px',
                }}
              >
                ELSEVIER SCI JOURNAL • Q1 IMPACT FACTOR 6.2
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
