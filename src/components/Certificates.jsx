import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const issuerColor = {
  Tekbee: '#c8ff2e',
  HackerRank: '#00ff88',
  ADMA: '#b48cff',
  Infosys: '#7aa7ff',
  LinkedIn: '#6ea8ff',
  IBM: '#9db8ff',
  ServiceNow: '#62d84e',
}
const colorFor = (issuer) => Object.entries(issuerColor).find(([k]) => issuer.startsWith(k))?.[1] || '#c8ff2e'
const initialFor = (issuer) => issuer.replace('· Internship', '').trim()[0] || 'C'

const certificates = [
  { title: 'Customer Relationship Management — ERPNext', issuer: 'Tekbee Technologies · Internship', date: '2026', url: 'https://drive.google.com/file/d/1XA2gb8O88K4r7mNBZSg6Yt1FiS2ROWEc/view?usp=sharing', featured: true },
  { title: 'CSS Skills Certification', issuer: 'HackerRank', date: '2025', url: 'https://www.hackerrank.com/certificates/iframe/cd561b525a94' },
  { title: 'ADMA Conference Participation', issuer: 'ADMA', date: '2025', url: 'https://drive.google.com/file/d/1Y4QRqGpvQhGpAp7u5tsr1kZBNEuqluDh/view?usp=sharing' },
  { title: 'Python Foundations', issuer: 'Infosys Springboard', date: '2025', url: 'https://drive.google.com/file/d/1QYLzyIflMP2Bt1QRk9H2bH5IwjsWfJIB/view?usp=sharing' },
  { title: 'Data Science Foundations', issuer: 'LinkedIn Learning', date: '2025', url: 'https://drive.google.com/file/d/1chiPECEk06fEM23nMVGrfOTw9SNCT5Ea/view?usp=sharing' },
  { title: 'Python Flask — Web Development', issuer: 'LinkedIn Learning', date: '2025', url: 'https://drive.google.com/file/d/1AE_SiBG6i5AOxzT0B8g2E4ddo0iXk51K/view?usp=sharing' },
    {
    title: 'IBM SkillsBuild Internship — Edunet Foundation',
    issuer: 'IBM',
    date: '2026',
    skills: ['watsonx AI', 'Machine Learning', 'Cloud', 'Prompt Engineering'],
    url: 'https://drive.google.com/file/d/1XLfc42vhN2yYqDzJqdYxOu5OZThwNXhO/view?usp=sharing',
    summary: 'Hands-on internship on watsonx AI Studio, Orchestrate, Granite models and BOB. Built SmartDesk AI, a natural-language desktop assistant.',
  },
  {
    title: 'Journey to Cloud: Envisioning Your Solution', issuer: 'IBM', date: '2026', url: 'https://drive.google.com/file/d/1mPTWaURvWT4GVTpYDc66Eq08V8di561O/view?usp=sharing' },
  { title: 'Getting Started with Artificial Intelligence', issuer: 'IBM', date: '2026', url: 'https://drive.google.com/file/d/19tr01To1B-RNX69tZ21oK5QH-jxRl5aN/view?usp=sharing' },
  { title: 'Getting Started with Cybersecurity', issuer: 'IBM', date: '2026', url: 'https://drive.google.com/file/d/1zfCZiZh7p6ID6jqy89SohAiBTnd_15pr/view?usp=sharing' },
  { title: 'Welcome to ServiceNow — Micro-Certification', issuer: 'ServiceNow', date: '2026', url: 'https://drive.google.com/file/d/16o-b2WMFQ5tN_xcPCI2os1i-E96qQVc4/view?usp=sharing' },
  { title: 'ServiceNow Virtual Internship', issuer: 'ServiceNow', date: '2026', url: 'https://drive.google.com/file/d/1r5LMQt85uFY2gbMPzCb42-CiglCo2RG4/view?usp=sharing' },
]

const tabs = ['All', 'Internship', 'Assessments', 'IBM', 'ServiceNow', 'Learning']
const matches = (c, t) => {
  if (t === 'All') return true
  if (t === 'Internship') return /internship/i.test(c.title) || /internship/i.test(c.issuer)
  if (t === 'Assessments') return c.issuer.startsWith('HackerRank') || c.issuer.startsWith('ADMA')
  if (t === 'IBM') return c.issuer.startsWith('IBM')
  if (t === 'ServiceNow') return c.issuer.startsWith('ServiceNow')
  return c.issuer.startsWith('Infosys') || c.issuer.startsWith('LinkedIn')
}

export default function Certificates() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [tab, setTab] = useState('All')
  const visible = certificates.filter(c => matches(c, tab))

  return (
    <section className="section" id="credentials" ref={ref} style={{ paddingTop: '4rem' }}>
      <p className="kicker">Credentials</p>
      <motion.h2
        className="h-giant"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75 }}
      >
        Certified, <span className="it">verifiable.</span>
      </motion.h2>
      <p className="section-desc">{certificates.length} credentials — every row links to proof.</p>

      <div className="filter-pills" style={{ marginTop: '1.8rem' }}>
        {tabs.map(t => (
          <button key={t} className={`f-pill ${tab === t ? 'on' : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      <div className="index-table" style={{ marginTop: '1.2rem' }}>
        {visible.map((c, i) => {
          const color = colorFor(c.issuer)
          return (
            <motion.a
              key={c.title}
              className="cred-row"
              href={c.url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.45 }}
            >
              <span className="cred-badge" style={{ borderColor: `${color}55`, background: `${color}10`, color }}>
                {initialFor(c.issuer)}
              </span>
              <div>
                <h4>{c.title}{c.featured && <span className="index-note">FEATURED — INTERNSHIP</span>}</h4>
                <span className="issuer">{c.issuer}</span>
              </div>
              <span className="date">{c.date}</span>
              <span className="verify-link">Verify ↗</span>
            </motion.a>
          )
        })}
      </div>
    </section>
  )
}
