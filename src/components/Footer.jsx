import { GITHUB_URL, LINKEDIN_URL, RESUME_URL } from './Navbar'

export default function Footer() {
  const now = new Date()
  const year = now.getFullYear()
  const monthYear = now.toLocaleString('en-US', { month: 'long', year: 'numeric' })
  return (
    <footer className="footer">
      <span><b>P Mohamed Aaris</b>, full-stack developer</span>
      <span>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">Résumé</a>
      </span>
      <span>© {year} · Updated {monthYear}</span>
    </footer>
  )
}
