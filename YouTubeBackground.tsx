'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Play } from 'lucide-react'
import { Button } from './ui/button'
import { verifyVideoIntegrity } from './constants/videoUrls'

type OverlayProp = boolean | string

interface YouTubeBackgroundProps {
  videoUrl?: string
  videoId: string
  fallbackImage: string
  className?: string
  overlay?: OverlayProp
  children?: React.ReactNode
}

function ensureYouTubeParams(url: string | undefined, id: string) {
  if (!url || !url.length) url = `https://www.youtube.com/embed/${id}`
  const u = new URL(url)
  const p = u.searchParams
  if (!p.has('autoplay')) p.set('autoplay', '1')
  if (!p.has('mute')) p.set('mute', '1')
  if (!p.has('loop')) p.set('loop', '1')
  if (!p.has('playlist')) p.set('playlist', id)
  if (!p.has('controls')) p.set('controls', '0')
  if (!p.has('modestbranding')) p.set('modestbranding', '1')
  if (!p.has('playsinline')) p.set('playsinline', '1')
  if (!p.has('rel')) p.set('rel', '0')
  return u.toString()
}

export function YouTubeBackground({
  videoUrl,
  videoId,
  fallbackImage,
  className = '',
  overlay = true,
  children,
}: YouTubeBackgroundProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showFallback, setShowFallback] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const src = ensureYouTubeParams(videoUrl, videoId)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    const check = () => {
      const currentSrc = iframe.src
      const currentId = iframe.getAttribute('data-video-id') || ''
      const wantSrc = ensureYouTubeParams(videoUrl, videoId)
      if (!verifyVideoIntegrity(currentSrc, currentId, wantSrc, videoId)) {
        iframe.src = wantSrc
        iframe.setAttribute('data-video-id', videoId)
      }
    }
    const t = setTimeout(check, 100)
    const i = setInterval(check, 30000)
    return () => { clearTimeout(t); clearInterval(i) }
  }, [videoUrl, videoId])

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (!isMobile) return
    const test = document.createElement('video')
    test.muted = true
    test.autoplay = true
    test.playsInline = true
    test.src = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMWlzb21tcDQx'
    const p = test.play()
    if (p) p.catch(() => setShowFallback(true))
  }, [])

  return (
    <div
      className={`relative w-full overflow-hidden aspect-video ${className}`}
      style={{ backgroundColor: 'black' }}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${fallbackImage})`,
          filter: showFallback ? 'none' : 'blur(16px)',
          opacity: isLoading || showFallback ? 1 : 0,
          transition: 'opacity 0.6s ease, filter 0.6s ease',
        }}
      />

      {!showFallback && (
        <iframe
          ref={iframeRef}
          src={src}
          data-video-id={videoId}
          title="Background Video"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="eager"
          onLoad={() => setIsLoading(false)}
          onError={() => { setIsLoading(false); setShowFallback(true) }}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            objectFit: 'cover',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.6s ease',
          }}
        />
      )}

      {overlay && (
        typeof overlay === 'string'
          ? <div className={`absolute inset-0 z-0 pointer-events-none ${overlay}`} />
          : <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-black/45 via-black/25 to-black/45" />
      )}

      {showFallback && (
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Button
            onClick={() => setShowFallback(false)}
            size="lg"
            className="group bg-black/50 text-white border-white/30 hover:bg-black/70 backdrop-blur-sm"
          >
            <Play className="h-8 w-8 mr-3 group-hover:scale-110 transition-transform" />
            Play Video
          </Button>
        </motion.div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  )
}
