'use client';

import { useInView as useFramerInView } from 'framer-motion';
import { useRef } from 'react';

export function useInView(amount = 0.1) {
  const ref = useRef(null);
  const inView = useFramerInView(ref, { 
    amount, 
    once: true,
    margin: "0px 0px -100px 0px"
  });

  return { ref, inView };
}