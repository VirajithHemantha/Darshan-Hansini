import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { Music, VolumeX, Heart } from 'lucide-react';
import { Toaster } from 'sonner';

import { EnvelopeOpening } from './components/EnvelopeOpening';
import { Hero } from './components/Hero';
import { AdminPage } from './components/AdminPage';
import { isMobileDevice } from './utils/device';

const CoupleDetails = lazy(() => import('./components/CoupleDetails').then((m) => ({ default: m.CoupleDetails })));
const CeremonyDetails = lazy(() => import('./components/CeremonyDetails').then((m) => ({ default: m.CeremonyDetails })));
const Location = lazy(() => import('./components/Location').then((m) => ({ default: m.Location })));
const Timeline = lazy(() => import('./components/Timeline').then((m) => ({ default: m.Timeline })));
const Countdown = lazy(() => import('./components/Countdown').then((m) => ({ default: m.Countdown })));
const RSVPForm = lazy(() => import('./components/RSVPForm').then((m) => ({ default: m.RSVPForm })));
const WishesSection = lazy(() => import('./components/WishesSection').then((m) => ({ default: m.WishesSection })));

function SectionFallback() {
  return <div className="min-h-[40vh]" aria-hidden="true" />;
}

export default function App() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
      setIsAdmin(true);
    }
  }, []);

  const ensureAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio('/Datha_Dara_Dhanith_Sri_Sarigama_lk.mp3');
      audio.loop = true;
      audio.volume = 0.3;
      audio.preload = 'none';
      audioRef.current = audio;
    }
    return audioRef.current;
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleMusicStart = () => {
    setIsMusicPlaying(true);
    const audio = ensureAudio();
    audio.preload = 'auto';
    audio.play().catch(console.error);
  };

  const toggleMusic = () => {
    const audio = ensureAudio();
    if (isMusicPlaying) {
      audio.pause();
    } else {
      audio.preload = 'auto';
      audio.play().catch(console.error);
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  // Parse custom parameters
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('to') || '';
  const inviteMessage = params.get('msg') || '';

  if (isAdmin) {
    return (
      <div className="font-sans text-stone-800 bg-brand-ivory min-h-screen">
        <Toaster position="top-center" />
        <AdminPage />
      </div>
    );
  }

  if (!showInvitation) {
    return (
      <EnvelopeOpening
        onComplete={() => setShowInvitation(true)}
        onMusicStart={handleMusicStart}
        guestName={guestName}
        inviteMessage={inviteMessage}
      />
    );
  }

  // Set the wedding date for the countdown
  const weddingDate = new Date("2026-06-17T09:00:00");

  return (
    <div className="font-sans text-stone-800 bg-brand-ivory selection:bg-brand-beige-deep/20">
      <Toaster position="top-center" />
      
      {/* Premium Floating Music Toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 w-12 sm:w-14 h-12 sm:h-14 bg-white/70 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(176,137,104,0.15)] flex items-center justify-center border border-brand-beige/50 text-brand-beige-deep hover:scale-105 transition-all duration-300"
      >
        {isMusicPlaying ? <Music className="w-5 h-5 sm:w-6 sm:h-6" /> : <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />}
      </motion.button>

      <Hero guestName={guestName} inviteMessage={inviteMessage} />

      <Suspense fallback={<SectionFallback />}>
        <div className="py-24 sm:py-32 bg-gradient-to-b from-brand-ivory via-white to-brand-ivory relative">
          <CoupleDetails />
        </div>

        <div className="py-24 sm:py-32 bg-white relative">
          <CeremonyDetails />
        </div>

        <div className="py-24 sm:py-32 bg-gradient-to-b from-white via-brand-champagne/30 to-brand-ivory relative">
          <Location loadMapImmediately={!isMobileDevice()} />
        </div>

        <div className="py-24 sm:py-32 bg-brand-ivory relative">
          <Timeline />
        </div>

        <div className="py-24 sm:py-32 bg-gradient-to-b from-white to-brand-ivory relative">
          <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
            <span className="text-brand-beige-deep uppercase tracking-[0.4em] text-[10px] sm:text-[11px] font-bold drop-shadow-sm">
              The Wait Is Almost Over
            </span>
          </div>
          <Countdown targetDate={weddingDate} />
        </div>

        <div className="py-24 sm:py-32 bg-brand-ivory relative">
          <RSVPForm />
        </div>

        <div className="py-24 sm:py-32 bg-gradient-to-b from-brand-ivory to-white relative mt-10">
          <WishesSection />
        </div>
      </Suspense>

      {/* Elegant Footer Signature */}
      <footer className="py-12 bg-white border-t border-brand-beige/20 text-center relative overflow-hidden mt-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-beige/10 blur-[80px] rounded-full pointer-events-none" />
        <Heart className="w-6 h-6 mx-auto mb-6 text-brand-beige-deep fill-brand-beige/20" />
        <p className="font-display text-4xl sm:text-5xl text-stone-800 mb-2">Darshan & Hansini</p>
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-sans text-stone-400 font-semibold block mb-8">
          June 17, 2026
        </span>

      </footer>
    </div>
  );
}