import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import TopNav from './components/TopNav';
import HeroSection from './components/HeroSection';
import AboutMainPage from './components/AboutMainPage';
import TourismSection from './components/TourismSection';
import NewsSection from './components/NewsSection';
import DepartmentsSection from './components/DepartmentsSection';
import MediaSection from './components/MediaSection';
import LeadershipSection from './components/LeadershipSection';
import TerritorySection from './components/TerritorySection';
import AppealsSection from './components/AppealsSection';
import DocumentsSection from './components/DocumentsSection';
import TendersSection from './components/TendersSection';
import ProjectsSection from './components/ProjectsSection';
import SiteFooter from './components/SiteFooter';
import NewsDetailsPage from './components/NewsDetailsPage';
import SightDetailsPage from './components/SightDetailsPage';
import ProjectDetailsPage from './components/ProjectDetailsPage';
import { getDictionary } from './i18n';

function HomePage({ t, lang }) {
  return (
    <main className="transition-opacity duration-500 opacity-100">
      <HeroSection t={t} />
      <AboutMainPage t={t} />
      <TourismSection t={t} lang={lang} />
      <DepartmentsSection t={t} lang={lang} />
      <LeadershipSection t={t} lang={lang} />
      <TerritorySection t={t} />
      <NewsSection t={t} lang={lang} />
      <MediaSection t={t} lang={lang} />
      <AppealsSection t={t} />
      <DocumentsSection t={t} lang={lang} />
      <TendersSection t={t} lang={lang} />
      <ProjectsSection t={t} lang={lang} />
    </main>
  );
}

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [lang, setLang] = useState('ru');
  const mountainLayerRef = useRef(null);
  const t = getDictionary(lang);

  useEffect(() => {
    let rafId = 0;

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const y = Math.min((window.scrollY || 0) * 0.12, 180);
        if (mountainLayerRef.current) {
          mountainLayerRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
        }
        rafId = 0;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const sectionPath = (hash) => (isHome ? hash : `/${hash}`);

  const navItems = [
    { href: sectionPath('#hero'), label: t.nav.home },
    { href: sectionPath('#about'), label: t.nav.about },
    { href: sectionPath('#departments'), label: t.nav.apparatus },
    { href: sectionPath('#leadership'), label: t.nav.leadership },
    { href: sectionPath('#territory'), label: t.nav.territory },
    { href: sectionPath('#news'), label: t.nav.press },
    { href: sectionPath('#appeals'), label: t.nav.appeals },
    { href: sectionPath('#documents'), label: t.nav.documents },
    { href: sectionPath('#tenders'), label: t.nav.tenders },
    { href: sectionPath('#projects'), label: t.nav.projects },
    { href: sectionPath('#contacts'), label: t.nav.contacts },
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(59,182,232,0.10),transparent_42%),radial-gradient(circle_at_88%_8%,rgba(37,99,235,0.08),transparent_38%),radial-gradient(circle_at_50%_120%,rgba(148,163,184,0.08),transparent_55%),linear-gradient(180deg,#ffffff_0%,#f8fbff_48%,#f4f8fc_100%)]" />
        <div className="absolute left-[8%] top-24 h-40 w-40 rounded-full bg-sky-200/40 blur-3xl animate-float" />
        <div className="absolute right-[10%] top-52 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-10 left-1/3 h-52 w-52 rounded-full bg-blue-100/40 blur-3xl animate-float" />
        <div
          ref={mountainLayerRef}
          className="absolute inset-0 will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <img
            src="https://images.wallpaperscraft.ru/image/single/gory_pejzazh_priroda_161471_2560x1440.jpg"
            alt=""
            className="h-full w-full object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.74)_0%,rgba(248,251,255,0.72)_28%,rgba(244,248,252,0.82)_58%,rgba(255,255,255,0.9)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_8%,rgba(125,211,252,0.18),transparent_40%),radial-gradient(circle_at_82%_16%,rgba(59,130,246,0.14),transparent_44%),radial-gradient(circle_at_50%_84%,rgba(148,163,184,0.10),transparent_48%)]" />
        </div>
      </div>

      <TopNav navItems={navItems} lang={lang} setLang={setLang} t={t} />

      <Routes>
        <Route path="/" element={<HomePage t={t} lang={lang} />} />
        <Route path="/news/:id" element={<NewsDetailsPage t={t} lang={lang} />} />
        <Route path="/sights/:id" element={<SightDetailsPage lang={lang} />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage t={t} lang={lang} />} />
      </Routes>

      <SiteFooter t={t} linkPrefix={isHome ? '' : '/'} />
    </div>
  );
}
