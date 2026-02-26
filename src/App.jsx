import { useState } from 'react';
import TopNav from './components/TopNav';
import HeroSection from './components/HeroSection';
import AboutMainPage from './components/AboutMainPage';
import TourismSection from './components/TourismSection';
import NewsSection from './components/NewsSection';
import DepartmentsSection from './components/DepartmentsSection';
import MediaSection from './components/MediaSection';
import SiteFooter from './components/SiteFooter';
import { getDictionary } from './i18n';

export default function App() {
  const [lang, setLang] = useState('ru');
  const t = getDictionary(lang);

  const navItems = [
    { href: '#about', label: t.nav.about },
    { href: '#tourism', label: t.nav.tourism },
    { href: '#news', label: t.nav.news },
    { href: '#departments', label: t.nav.departments },
    { href: '#media', label: t.nav.media },
    { href: '#contacts', label: t.nav.contacts },
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#061526] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(59,182,232,0.22),transparent_45%),radial-gradient(circle_at_88%_8%,rgba(34,227,192,0.16),transparent_40%),radial-gradient(circle_at_50%_120%,rgba(234,247,255,0.08),transparent_55%),linear-gradient(180deg,#07192c_0%,#061526_45%,#081b31_100%)]" />
        <div className="absolute left-[8%] top-24 h-40 w-40 rounded-full bg-lake/20 blur-3xl animate-float" />
        <div className="absolute right-[10%] top-52 h-48 w-48 rounded-full bg-aqua/15 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-10 left-1/3 h-52 w-52 rounded-full bg-sky/10 blur-3xl animate-float" />
      </div>

      <TopNav navItems={navItems} lang={lang} setLang={setLang} t={t} />
      <main>
        <HeroSection t={t} />
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
