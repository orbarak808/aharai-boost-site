"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextSwitcherProps {
  texts: string[];
  timeout?: number;
  animationDuration?: number;
  className?: string;
  loop?: boolean;
}

const DEFAULT_TIMEOUT = 3000;
const DEFAULT_ANIMATION_DURATION = 500;

export function AnimatedTextSwitcher({
  texts,
  timeout = DEFAULT_TIMEOUT,
  animationDuration = DEFAULT_ANIMATION_DURATION,
  className,
  loop = true
}: AnimatedTextSwitcherProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // For the inner timeout

  useEffect(() => {
    const clearTimers = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // --- Reset state and clear timers on prop changes ---
    clearTimers();
    setCurrentIndex(0);
    setIsVisible(true);

    // --- Guard against invalid inputs or single text ---
    if (
      !texts ||
      texts.length <= 1 || // No switching needed for 0 or 1 text
      timeout <= 0 ||
      animationDuration < 0
    ) {
      // If only one text, ensure it's displayed and return
      if (texts && texts.length === 1) {
        setCurrentIndex(0);
        setIsVisible(true);
      }
      return;
    }

    // --- Main Interval Logic ---
    intervalRef.current = setInterval(() => {
      // 1. Trigger Fade Out

      setIsVisible(false);

      // 2. Schedule Index Update and Fade In (after animation duration)
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          // Stop or loop based on the 'loop' prop
          if (!loop && nextIndex >= texts.length) {
            clearTimers(); // Stop everything
            return prevIndex; // Stay on the last index
          }
          return nextIndex % texts.length; // Loop or move to next
        });
        setIsVisible(true); // Trigger fade-in
      }, animationDuration);
    }, timeout + animationDuration); // Interval starts after text is shown + faded in

    // --- Initial Cleanup ---
    return clearTimers;
  }, [texts, timeout, animationDuration, loop]); // Rerun effect if these change

  // --- Render Logic ---
  if (!texts || texts.length === 0) {
    return null; // Render nothing if no texts
  }

  return (
    <div className={cn("inline-block", className)}>
      <span
        className={cn(
          "transition-opacity ease-in-out",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ transitionDuration: `${animationDuration}ms` }}
      >
        {/* Ensure currentIndex is valid before accessing texts */}
        {texts[currentIndex % texts.length] ?? ""}
      </span>
    </div>
  );
}
