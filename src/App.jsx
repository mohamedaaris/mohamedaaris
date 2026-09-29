import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EntrySequence from './components/EntrySequence'
import NeuralBackground from './components/NeuralBackground'
import Navbar from './components/Navbar'
import CoreIdentity from './components/CoreIdentity'
import SkillMatrix from './components/SkillMatrix'
import ProjectHub from './components/ProjectHub'
import Publications from './components/Publications'
import Certificates from './components/Certificates'
import ExperienceTimeline from './components/ExperienceTimeline'
import ContactPortal from './components/ContactPortal'
import Footer from './components/Footer'

/* ─── Custom Cursor with Glow + Trail ─── */
function CustomCursor() {
  const cursorRef = useRef(null)
  const glowRef = useRef(null)
  const trailRefs = useRef([])
  const pos = useRef({ x: 0, y: 0 })
  const trailPos = useRef(Array.from({ length: 5 }, () => ({ x: 0, y: 0 })))
  const rafId = useRef(null)
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const handleMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    const handleDown = () => setClicking(true)
    const handleUp = () => setClicking(false)

    const handleHoverDetect = (e) => {
      const target = e.target
      const isHoverable = target.closest('a, button, .skill-node, .project-node, .nav-link, .mobile-nav-link, .transmit-btn, .project-link, [role="button"]')
      setHovering(!!isHoverable)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)
    window.addEventListener('mouseover', handleHoverDetect)

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }

      // Trail with delay
      trailPos.current.forEach((tp, i) => {
        const prev = i === 0 ? pos.current : trailPos.current[i - 1]
        tp.x += (prev.x - tp.x) * (0.25 - i * 0.03)
        tp.y += (prev.y - tp.y) * (0.25 - i * 0.03)
        if (trailRefs.current[i]) {
          trailRefs.current[i].style.transform = `translate(${tp.x}px, ${tp.y}px)`
        }
      })

      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('mouseover', handleHoverDetect)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      {/* Trail dots — larger and more distinct */}
      {trailPos.current.map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={el => trailRefs.current[i] = el}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${10 - i * 1.5}px`,
            height: `${10 - i * 1.5}px`,
            marginLeft: `${-(10 - i * 1.5) / 2}px`,
            marginTop: `${-(10 - i * 1.5) / 2}px`,
            borderRadius: '50%',
            background: i % 2 === 0 ? '#00f5ff' : '#b946ff',
            opacity: 0.6 - i * 0.1,
            pointerEvents: 'none',
            zIndex: 9998,
            willChange: 'transform',
            boxShadow: `0 0 ${12 - i * 2}px ${i % 2 === 0 ? '#00f5ff' : '#b946ff'}, 0 0 ${20 - i * 3}px ${i % 2 === 0 ? '#00f5ff50' : '#b946ff50'}`,
          }}
        />
      ))}

      {/* Main cursor — ring + bright core, clearly distinct */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: clicking ? '8px' : hovering ? '22px' : '12px',
          height: clicking ? '8px' : hovering ? '22px' : '12px',
          marginLeft: clicking ? '-4px' : hovering ? '-11px' : '-6px',
          marginTop: clicking ? '-4px' : hovering ? '-11px' : '-6px',
          borderRadius: '50%',
          background: hovering
            ? 'transparent'
            : 'radial-gradient(circle, #ffffff 0%, #00f5ff 50%, transparent 70%)',
          border: hovering ? '2px solid #00f5ff' : '1.5px solid rgba(0,245,255,0.6)',
          pointerEvents: 'none',
          zIndex: 10000,
          willChange: 'transform',
          transition: 'width 0.2s, height 0.2s, margin 0.2s, background 0.2s, border 0.2s',
          boxShadow: clicking
            ? '0 0 25px #00f5ff, 0 0 50px #b946ff, 0 0 8px #fff'
            : hovering
            ? '0 0 20px #00f5ff80, 0 0 40px #b946ff40, 0 0 6px #fff'
            : '0 0 15px #00f5ff, 0 0 30px #00f5ff60, 0 0 5px #fff',
        }}
      />

      {/* Outer glow aura — larger */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: hovering ? '80px' : '55px',
          height: hovering ? '80px' : '55px',
          marginLeft: hovering ? '-40px' : '-27.5px',
          marginTop: hovering ? '-40px' : '-27.5px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,245,255,0.1) 0%, rgba(185,70,255,0.04) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9997,
          willChange: 'transform',
          transition: 'width 0.3s, height 0.3s, margin 0.3s',
          border: '1px solid rgba(0,245,255,0.06)',
        }}
      />
    </>
  )
}

/* ─── Mouse-reactive Ambient Glow ─── */
function AmbientGlow() {
  const [pos, setPos] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMove = (e) => {
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(0,245,255,0.04), rgba(185,70,255,0.02), transparent 60%)`,
        transition: 'background 0.3s ease',
      }}
    />
  )
}

/* ─── Glitch Flicker Effect ─── */
function GlitchOverlay() {
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const triggerGlitch = () => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 150)
    }
    const interval = setInterval(() => {
      if (Math.random() > 0.7) triggerGlitch()
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  if (!glitch) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 98,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.03) 2px, rgba(0,245,255,0.03) 4px)',
        mixBlendMode: 'overlay',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: `${Math.random() * 80}%`,
          left: 0,
          right: 0,
          height: `${2 + Math.random() * 8}px`,
          background: 'rgba(0,245,255,0.08)',
          transform: `translateX(${(Math.random() - 0.5) * 10}px)`,
        }}
      />
    </div>
  )
}

/* ─── Floating Data Particles (Canvas-based) ─── */
function DataParticlesOverlay() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.5 - 0.1,
      opacity: Math.random() * 0.5 + 0.1,
      hue: Math.random() > 0.5 ? 185 : 275, // cyan or violet
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.opacity})`
        ctx.shadowBlur = 8
        ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, 0.5)`
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw some connections between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  )
}

function App() {
  const [entryComplete, setEntryComplete] = useState(false)

  const handleEntryComplete = useCallback(() => {
    setEntryComplete(true)
  }, [])

  // Hide default cursor when app is loaded
  useEffect(() => {
    if (entryComplete) {
      document.body.style.cursor = 'none'
      // Also hide cursor on all interactive elements
      const style = document.createElement('style')
      style.textContent = '*, *::before, *::after { cursor: none !important; }'
      document.head.appendChild(style)
      return () => document.head.removeChild(style)
    }
  }, [entryComplete])

  return (
    <>
      {/* Entry Sequence */}
      <AnimatePresence>
        {!entryComplete && <EntrySequence onComplete={handleEntryComplete} />}
      </AnimatePresence>

      {/* Custom Cursor */}
      {entryComplete && <CustomCursor />}

      {/* Three.js Neural Background */}
      {entryComplete && <NeuralBackground />}

      {/* Canvas Data Particles */}
      {entryComplete && <DataParticlesOverlay />}

      {/* Mouse-reactive ambient glow */}
      {entryComplete && <AmbientGlow />}

      {/* Grid Overlay */}
      {entryComplete && <div className="grid-overlay" />}

      {/* Scan Line */}
      {entryComplete && <div className="scan-line-effect" />}

      {/* Glitch Effect */}
      {entryComplete && <GlitchOverlay />}

      {/* Main Content */}
      {entryComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ position: 'relative', zIndex: 3 }}
        >
          <Navbar />

          <main>
            <CoreIdentity />
            <SkillMatrix />
            <ProjectHub />
            <Publications />
            <Certificates />
            <ExperienceTimeline />
            <ContactPortal />
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  )
}

export default App
