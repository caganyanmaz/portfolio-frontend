'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

export default function ScrollAnimation({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.5,
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 50, opacity: 0 };
      case 'down':
        return { y: -50, opacity: 0 };
      case 'left':
        return { x: 50, opacity: 0 };
      case 'right':
        return { x: -50, opacity: 0 };
      default:
        return { y: 50, opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  // Don't render animations during SSR
  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      animate={isVisible ? getAnimatePosition() : getInitialPosition()}
      onViewportEnter={() => setIsVisible(true)}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// Staggered animation for lists
export function StaggeredAnimation({
  children,
  className = '',
  staggerDelay = 0.1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delay?: number;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render animations during SSR
  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delayChildren: delay,
        staggerChildren: staggerDelay,
      }}
    >
      {children}
    </motion.div>
  );
}

// Individual staggered item
export function StaggeredItem({
  children,
  className = '',
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 30, opacity: 0 };
      case 'down':
        return { y: -30, opacity: 0 };
      case 'left':
        return { x: 30, opacity: 0 };
      case 'right':
        return { x: -30, opacity: 0 };
      default:
        return { y: 30, opacity: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      variants={{
        hidden: getInitialPosition(),
        visible: {
          y: 0,
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: 'easeOut',
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
} 