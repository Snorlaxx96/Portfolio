import React, { useRef, useState, useCallback, useEffect } from "react"

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  scale?: number
  perspective?: number
  glare?: boolean
  glareOpacity?: number
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  scale = 1.012,
  perspective = 1000,
  glare = true,
  glareOpacity = 0.12,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 })
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const width = rect.width
      const height = rect.height

      // Normalized coordinates: -1 to 1
      const normX = (x / width) * 2 - 1
      const normY = (y / height) * 2 - 1

      // Calculate tilt angles (rotateX is driven by Y coordinate, rotateY by X coordinate)
      const rotateX = -normY * maxTilt
      const rotateY = normX * maxTilt

      setTransform({
        rotateX,
        rotateY,
        scale,
      })

      if (glare) {
        setGlarePos({
          x: (x / width) * 100,
          y: (y / height) * 100,
        })
      }
    },
    [maxTilt, scale, glare, prefersReducedMotion]
  )

  const handlePointerEnter = useCallback(() => {
    if (!prefersReducedMotion) {
      setIsHovered(true)
    }
  }, [prefersReducedMotion])

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false)
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 })
  }, [])

  const cardStyle: React.CSSProperties = prefersReducedMotion
    ? {}
    : {
        transform: isHovered
          ? `perspective(${perspective}px) rotateX(${transform.rotateX.toFixed(2)}deg) rotateY(${transform.rotateY.toFixed(2)}deg) scale3d(${transform.scale}, ${transform.scale}, 1)`
          : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: isHovered
          ? "transform 140ms cubic-bezier(0.16, 1, 0.3, 1)"
          : "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        transformStyle: "preserve-3d",
        willChange: isHovered ? "transform" : "auto",
      }

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={cardStyle}
      className={`relative ${className}`}
      {...props}
    >
      {children}

      {glare && !prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 ease-out"
          style={{
            opacity: isHovered ? glareOpacity : 0,
            background: `radial-gradient(circle 380px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45), transparent 75%)`,
            mixBlendMode: "overlay",
          }}
        />
      )}
    </div>
  )
}
