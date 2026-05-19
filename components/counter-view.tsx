'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, ExternalLink, ShieldAlert } from 'lucide-react';

interface CounterViewProps {
  lastAttackDateString: string;
  incidentUrl: string;
  incidentName: string;
}

export default function CounterView({ lastAttackDateString, incidentUrl, incidentName }: CounterViewProps) {
  const [mounted, setMounted] = useState(false);
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const lastAttackDate = new Date(lastAttackDateString);
    
    const calculateDays = () => {
      const now = new Date();
      const differenceMs = now.getTime() - lastAttackDate.getTime();
      const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
      setDays(Math.max(0, differenceDays));
    };

    calculateDays();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    const interval = setInterval(calculateDays, 1000 * 60 * 60); 
    return () => clearInterval(interval);
  }, [lastAttackDateString]); // Recalculate if date changes

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 sm:px-12 selection:bg-orange-500/30">
      
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 bg-zinc-950"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full text-center space-y-12"
      >
        <div className="space-y-4">
          <div className="text-orange-500 font-mono tracking-[0.3em] text-xs sm:text-sm mb-6 uppercase flex justify-center items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            <span>GLOBAL ECOSYSTEM MONITOR</span>
          </div>
          
          <div className="mt-4 flex flex-col items-center">
            <h1 className="text-2xl sm:text-4xl font-light tracking-tight text-zinc-400 uppercase text-center">
              Days since last supply chain attack
            </h1>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="px-3 py-1 bg-zinc-800 text-xs sm:text-sm font-bold rounded border border-zinc-700 uppercase tracking-widest text-zinc-100">NPM</span>
              <span className="px-3 py-1 bg-zinc-800 text-xs sm:text-sm font-bold rounded border border-zinc-700 uppercase tracking-widest text-zinc-100">PYPI</span>
              <span className="px-3 py-1 bg-zinc-800 text-xs sm:text-sm font-bold rounded border border-zinc-700 uppercase tracking-widest text-zinc-100">RUBYGEMS</span>
            </div>
          </div>
        </div>

        <div className="relative py-12">
           <AnimatePresence mode="popLayout">
             {mounted && days !== null ? (
               <motion.div
                  key="number"
                  initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ type: "spring", bounce: 0.4, duration: 1 }}
                  className="text-[12rem] sm:text-[16rem] md:text-[220px] leading-none font-black tracking-tighter text-white"
                  style={{ fontFamily: "var(--font-sans)" }}
               >
                 {days}
               </motion.div>
             ) : (
               <motion.div
                  key="placeholder"
                  className="text-[12rem] sm:text-[16rem] md:text-[220px] leading-none font-black tracking-tighter text-zinc-800 mix-blend-overlay"
                  style={{ fontFamily: "var(--font-sans)" }}
               >
                 00
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="w-full max-w-5xl mx-auto mt-12 grid gap-6 sm:grid-cols-2 text-left"
        >
          <div className="max-w-md">
            <p className="text-xs font-mono text-zinc-500 mb-2 uppercase tracking-widest flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> MOST RECENT DETECTION</p>
            <a href={incidentUrl} target="_blank" rel="noopener noreferrer" className="block p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors group">
              <h3 className="text-sm font-bold text-zinc-200 uppercase flex items-center gap-2">
                 <span className="line-clamp-1">{incidentName}</span>
                 <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Detected on {lastAttackDateString.split('T')[0]}
              </p>
            </a>
          </div>

          <div className="flex flex-col sm:items-end gap-4 max-w-md sm:ml-auto">
            <div className="flex gap-4">
              <div className="text-left sm:text-right">
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Service Status</p>
                <p className="text-xs text-green-400 flex items-center gap-1 sm:justify-end">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  OPERATIONAL
                </p>
              </div>
              <div className="text-left sm:text-right pl-4 border-l border-zinc-800">
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Source</p>
                <p className="text-xs text-zinc-300">GitHub Advisories</p>
              </div>
            </div>
            <a 
              href="https://vercel.com/new" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-md font-bold text-sm hover:bg-zinc-200 w-max"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>
              DEPLOY TO VERCEL
            </a>
          </div>
        </motion.div>
      </motion.div>
      
      <div className="absolute bottom-6 text-center w-full text-zinc-600 text-sm">
        <p>A friendly public service announcement.</p>
        <p className="opacity-60 text-xs mt-1">Not affiliated with npm, Github, or PyPI in any way.</p>
      </div>

    </main>
  );
}
