import { GITHUB_URL, LINKEDIN_URL, RESUME_URL } from './Navbar'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <span><b>P Mohamed Aaris</b>, full-stack developer</span>
      <span>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">Résumé</a>
      </span>
      <span>© {year} · Updated September 2026</span>
    </footer>
  )
}
