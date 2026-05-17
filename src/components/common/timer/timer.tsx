"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  duration: number;
  size?: number;
  stroke?: number;
  onCycleEnd?: () => void; 
};

export default function CircleTimer({
  duration,
  size = 30,
  stroke = 4,
  onCycleEnd
}: Props) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);

  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let rafId: number;

    const animate = (now: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = now;
      }

      const elapsed = (now - startTimeRef.current) / 1000;
      const ratio = elapsed / duration;

      if (ratio >= 1) {
        
        onCycleEnd?.();       
        startTimeRef.current = now;
        setProgress(0);
        setTimeLeft(duration);
      } else {
        setProgress(ratio);
        setTimeLeft(Math.ceil(duration - elapsed));
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [duration, onCycleEnd]);

  const offset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={stroke}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

    </div>
  );
}
