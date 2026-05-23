import { useMemo } from 'react'

export default function AnimatedBackground() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${2 + Math.random() * 3}px`,
      duration: `${8 + Math.random() * 12}s`,
      delay: `${Math.random() * 10}s`,
      opacity: 0.2 + Math.random() * 0.4,
    })), [])

  return (
    <div className="auth-bg">
      <div className="orb" />
      <div className="orb" />
      <div className="orb" />
      <div className="grid-overlay" />
      <div className="particles">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>
    </div>
  )
}
