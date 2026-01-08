"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { sleep } from "@/lib/utils";

type AnimationVariant =
  | "slide-up"
  | "slide-down"
  | "slide-in"
  | "reveal"
  | "split-reveal";

interface AnimatedTextProps {
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  variant?: AnimationVariant;
  children?: React.ReactNode;
}

const getAnimationClasses = (variant: AnimationVariant, isVisible: boolean) => {
  const baseClasses = "transition-all duration-[var(--duration)]";
  const variants = {
    "slide-up": cn(
      "transform",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-[0.08]", // More dramatic opacity change
      "ease-[cubic-bezier(0.4,0,0.2,1)]" // Smoother easing for opacity
    ),
    "slide-down": cn(
      "transform",
      isVisible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-[0.08]",
      "ease-[cubic-bezier(0.4,0,0.2,1)]"
    ),
    "slide-in": cn(
      "transform",
      isVisible ? "translate-x-0 opacity-100" : "translate-x-3 opacity-[0.08]",
      "ease-[cubic-bezier(0.4,0,0.2,1)]"
    ),
    reveal: cn(
      "relative",
      isVisible
        ? "[clip-path:inset(0_0_0_0)] opacity-100"
        : "[clip-path:inset(0_0_100%_0)] opacity-[0.08]",
      "ease-[cubic-bezier(0.4,0,0.2,1)]"
    ),
    "split-reveal": cn(
      "relative",
      isVisible
        ? "[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] opacity-100"
        : "[clip-path:polygon(0_0,0_0,0_100%,0_100%)] opacity-[0.08]",
      "ease-[cubic-bezier(0.4,0,0.2,1)]"
    )
  };

  return cn(baseClasses, variants[variant]);
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  className = "",
  delay = 0,
  duration = 1800, // Increased duration for more pronounced opacity animation
  once = true,
  variant = "slide-in",
  children
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!once || !hasAnimated) {
            // Add a small delay before starting the animation
            sleep(100).then(() => {
              setIsVisible(true);
              setHasAnimated(true);
            });
          }
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.2, // Increased threshold for earlier trigger
        rootMargin: "0px 0px -5% 0px" // Reduced margin for more precise triggering
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [once, hasAnimated]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div
        className={getAnimationClasses(variant, isVisible)}
        style={
          {
            "--duration": `${duration}ms`,
            "--delay": `${delay}ms`,
            transitionDelay: `${delay}ms`,
            willChange: "transform, opacity, clip-path",
            transitionProperty: "transform, opacity, clip-path",
            transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", // Smoother easing
            opacity: isVisible ? 1 : 0.08, // Explicit opacity control
            transform: isVisible
              ? "none"
              : variant === "slide-up"
              ? "translateY(0.75rem)"
              : variant === "slide-down"
              ? "translateY(-0.75rem)"
              : variant === "slide-in"
              ? "translateX(0.75rem)"
              : "none"
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
};

// Variant for animating multiple lines with staggered reveal
interface AnimatedLinesProps extends AnimatedTextProps {
  lines: string[];
  staggerDelay?: number;
  splitWords?: boolean; // Enable word-by-word animation within lines
}

export const AnimatedLines: React.FC<AnimatedLinesProps> = ({
  lines,
  className = "",
  delay = 0,
  duration = 1200,
  staggerDelay = 200, // Increased stagger for better visual separation
  once = true,
  variant = "slide-up",
  splitWords = false
}) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  if (splitWords) {
    return (
      <div className={cn("space-y-6", className)}>
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} className='flex flex-wrap gap-x-2'>
            {line.split(" ").map((word, wordIndex) => (
              <AnimatedText
                key={wordIndex}
                delay={delay + lineIndex * staggerDelay + wordIndex * 100}
                duration={duration}
                once={once}
                variant={variant}
              >
                {word}
              </AnimatedText>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {lines.map((line, index) => (
        <AnimatedText
          key={index}
          delay={delay + index * staggerDelay}
          duration={duration}
          once={once}
          variant={variant}
        >
          {line}
        </AnimatedText>
      ))}
    </div>
  );
};

// Variant for animating words with smooth reveal
interface AnimatedWordsProps extends AnimatedTextProps {
  words: string[];
  staggerDelay?: number;
  splitChars?: boolean; // Enable character-by-character animation
}

export const AnimatedWords: React.FC<AnimatedWordsProps> = ({
  words,
  className = "",
  delay = 0,
  duration = 1200,
  staggerDelay = 100,
  once = true,
  variant = "slide-up",
  splitChars = false
}) => {
  if (splitChars) {
    return (
      <div className={cn("inline-flex flex-wrap gap-x-1", className)}>
        {words.map((word, wordIndex) => (
          <div key={wordIndex} className='inline-flex'>
            {word.split("").map((char, charIndex) => (
              <AnimatedText
                key={charIndex}
                delay={delay + wordIndex * staggerDelay + charIndex * 50}
                duration={duration}
                once={once}
                variant={variant}
              >
                {char}
              </AnimatedText>
            ))}
            <span className='w-2' /> {/* Space between words */}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("inline-flex flex-wrap gap-x-3", className)}>
      {words.map((word, index) => (
        <AnimatedText
          key={index}
          delay={delay + index * staggerDelay}
          duration={duration}
          once={once}
          variant={variant}
        >
          {word}
        </AnimatedText>
      ))}
    </div>
  );
};
