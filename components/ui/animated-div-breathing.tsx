"use client";

type Props = {
    className?: string;
    children: React.ReactNode;
    /** seconds (default 7) */
    durationSec?: number;
    /** max scale at midpoint (default 1.02) */
    maxScale?: number;
    /** min opacity at midpoint (default 0.95) */
    minOpacity?: number;
}

const AnimatedDivBreathing = ({
    className,
    children,
    durationSec = 7,
    maxScale = 1.02,
    minOpacity = 0.95
}: Props) => {
    return (
        <div
        className={className}
        style={{
          animation: `breathing ${durationSec}s ease-in-out infinite`
        }}
      >
        <style jsx>{`
          @keyframes breathing {
            0%,
            100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(${maxScale});
              opacity: ${minOpacity};
            }
          }

          @media (prefers-reduced-motion: reduce) {
            div {
              animation: none !important;
              transform: none !important;
              opacity: 1 !important;
            }
          }
        `}</style>
        {children}
        </div>
    )
}

export default AnimatedDivBreathing;