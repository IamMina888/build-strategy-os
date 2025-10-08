'use client'

import React from 'react'

export default function HeroSection() {
  // Smooth scroll with sticky header offset
  const scrollWithOffset = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const el = document.getElementById(targetId)
    if (!el) return
    const STICKY_OFFSET = 112
    const y = el.getBoundingClientRect().top + window.pageYOffset - STICKY_OFFSET
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] w-full overflow-hidden"
      role="region"
      aria-label="Hero section with background video"
    >
      {/* Background video — cover the viewport (no letterboxing) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <iframe
          title="Creative Operations, Unfiltered"
          src="https://www.youtube-nocookie.com/embed/a4YRm8SsEOE?autoplay=1&mute=1&loop=1&playlist=a4YRm8SsEOE&controls=0&modestbranding=1&rel=0&playsinline=1"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          frameBorder={0}
          /* Magic sizes so the 16:9 video always covers without black bars */
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                     h-[56.25vw] w-[177.78vh] min-h-full min-w-full"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[92vh] flex-col items-center justify-center text-center text-white px-6">
        {/* Top label */}
        <h1
          className="text-gold"
          style={{
            fontFamily: 'Marcellus SC, serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            lineHeight: 1.1,
            textShadow: '0 2px 6px rgba(0,0,0,.35)',
            marginBottom: '0.75rem',
          }}
        >
          Mina
        </h1>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'Marcellus SC, serif',
            fontSize: 'clamp(1.9rem, 4.6vw, 3.1rem)',
            lineHeight: 1.15,
            textShadow: '0 3px 8px rgba(0,0,0,.35)',
          }}
          className="mb-4 text-white/95"
        >
          <span className="block">
  Creative Operations & Branding <span className="whitespace-nowrap">Solutions</span>
</span>
<span className="block text-gold" style={{ marginTop: '0.35rem' }}>
  That Work as Hard as You Do
</span>
     </h2>

        {/* Tagline — centered between headline and pill */}
        <p
  className="mx-auto mt-3 mb-5 max-w-[720px] px-2 text-[15.5px]"
  style={{ color: '#f1efe9', textShadow: '0 1px 3px rgba(0,0,0,.35)' }}
>
  Helping entrepreneurs, executives, and real estate professionals streamline operations,
  elevate their branding, and reclaim time for what matters most.
</p>
        {/* Pill */}
        <div
          className="surface-soft rounded-2xl px-5 py-3 mb-6"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.10))',
            border: '1px solid rgba(207,174,77,.45)',
          }}
        >
          <div className="text-[12px] tracking-[0.2em] text-white/90" style={{ fontWeight: 800 }}>
            FROM VISION TO BUILD
          </div>
          <div
            className="mt-1"
            style={{ fontFamily: 'Marcellus SC, serif', color: 'var(--brand-gold, #cfae4d)' }}
          >
            Creative Operations, Unfiltered
          </div>
          <div className="mx-auto mt-2 h-[2px] w-9 bg-[color:var(--brand-gold,#cfae4d)] rounded" />
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
          <a
            href="#work"
            className="btn btn-secondary"
            style={{ background: 'var(--brand-gold,#cfae4d)', color: 'var(--brand-deep,#1e5945)' }}
            onClick={(e) => scrollWithOffset(e, 'work')}
          >
            View Case Studies
          </a>
          <a
            href="#contact"
            className="btn btn-primary"
            style={{ background: 'var(--brand-deep,#1e5945)', color: 'var(--brand-white,#fff)' }}
            onClick={(e) => scrollWithOffset(e, 'contact')}
          >
            Start a Project
          </a>
        </div>
      </div>
    </section>
  )
}
