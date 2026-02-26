import { useEffect, useState } from 'react';
import TopNav from './components/TopNav';
import HeroSection from './components/HeroSection';
import AboutMainPage from './components/AboutMainPage';
import TourismSection from './components/TourismSection';
import NewsSection from './components/NewsSection';
import DepartmentsSection from './components/DepartmentsSection';
import MediaSection from './components/MediaSection';
import SiteFooter from './components/SiteFooter';
import { getDictionary } from './i18n';
import { LoaderCircle, Mountain } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('ru');
  const [heroVideoLoaded, setHeroVideoLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const t = getDictionary(lang);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => {
      setHeroVideoLoaded(true);
    }, 8000);

    return () => window.clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    if (!heroVideoLoaded) {
      document.body.style.overflow = 'hidden';
      return;
    }

    const exitTimer = window.setTimeout(() => {
      setShowPreloader(false);
    }, 450);

    document.body.style.overflow = '';

    return () => {
      window.clearTimeout(exitTimer);
      document.body.style.overflow = '';
    };
  }, [heroVideoLoaded]);

  const navItems = [
    { href: '#about', label: t.nav.about },
    { href: '#tourism', label: t.nav.tourism },
    { href: '#news', label: t.nav.news },
    { href: '#departments', label: t.nav.departments },
    { href: '#media', label: t.nav.media },
    { href: '#contacts', label: t.nav.contacts },
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-white text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(59,182,232,0.10),transparent_42%),radial-gradient(circle_at_88%_8%,rgba(16,185,129,0.09),transparent_38%),radial-gradient(circle_at_50%_120%,rgba(148,163,184,0.08),transparent_55%),linear-gradient(180deg,#ffffff_0%,#f8fbff_48%,#f4f8fc_100%)]" />
        <div className="absolute left-[8%] top-24 h-40 w-40 rounded-full bg-sky-200/40 blur-3xl animate-float" />
        <div className="absolute right-[10%] top-52 h-48 w-48 rounded-full bg-emerald-200/30 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-10 left-1/3 h-52 w-52 rounded-full bg-blue-100/40 blur-3xl animate-float" />
      </div>

      {showPreloader && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-500 ${
            heroVideoLoaded ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
          aria-hidden={heroVideoLoaded}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-slate-200 bg-white shadow-sm">
              <Mountain className="h-7 w-7 text-emerald-500" />
              <div className="absolute -inset-3 rounded-3xl bg-emerald-400/15 blur-xl" />
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <LoaderCircle className="h-4 w-4 animate-spin text-sky-300" />
              <span>{lang === 'en' ? 'Loading...' : lang === 'kg' ? 'Жүктөлүүдө...' : 'Загрузка...'}</span>
            </div>
          </div>
        </div>
      )}

      <TopNav navItems={navItems} lang={lang} setLang={setLang} t={t} />
      <main className={`transition-opacity duration-500 ${heroVideoLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <HeroSection t={t} onVideoLoad={() => setHeroVideoLoaded(true)} />
        <AboutMainPage t={t} />
        <TourismSection t={t} />
        <NewsSection t={t} />
        <DepartmentsSection t={t} />
        <MediaSection t={t} />
      </main>
      <SiteFooter t={t} />
    </div>
  );
}
