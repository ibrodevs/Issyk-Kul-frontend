'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mountain } from 'lucide-react';

const getSectionIdFromHref = (href) => {
  if (!href) return '';
  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) return '';
  return href.slice(hashIndex + 1);
};

export default function TopNav({ navItems, lang, setLang, t }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const handleNavClick = (e, href) => {
    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return;
    const id = href.slice(hashIndex + 1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setMobileMenuOpen(false);
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 10);
  };

  // Отслеживаем скролл для изменения фона навбара
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Активная секция при скролле
  useEffect(() => {
    const sections = navItems.map((item) => getSectionIdFromHref(item.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -12,
      scale: 0.97,
      transition: { duration: 0.2, ease: 'easeIn' }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', damping: 22, stiffness: 260 }
    }
  };

  const logoGlowVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      boxShadow: '0 0 30px rgba(34, 197, 94, 0.6)',
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      {/* Оверлей */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30"
            onClick={() => setMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <header
        className={`sticky top-0 z-40 px-4 transition-all duration-500 sm:px-6 ${
          scrolled ? 'pt-2' : 'pt-4'
        }`}
      >
        <div className="relative mx-auto max-w-7xl">
        {/* Пилюля навбара — фиксированная высота, не меняется */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', damping: 20 }}
          className={`rounded-2xl border ring-1 transition-all duration-500 ${
            mobileMenuOpen
              ? 'rounded-b-none border-b-transparent'
              : ''
          } ${
            scrolled
              ? 'border-white/70 bg-white/55 ring-white/60 shadow-[0_14px_40px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl backdrop-saturate-[180%]'
              : 'border-white/60 bg-white/45 ring-white/50 shadow-[0_10px_30px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-2xl backdrop-saturate-[170%]'
          }`}
          style={{
            WebkitBackdropFilter: scrolled ? 'blur(22px) saturate(1.8)' : 'blur(20px) saturate(1.7)',
            backdropFilter: scrolled ? 'blur(22px) saturate(1.8)' : 'blur(20px) saturate(1.7)',
            backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.42) 100%)',
          }}
        >
          <div className={`flex items-center justify-between gap-3 px-4 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
            {/* Логотип */}
            <motion.div
              className="flex items-center gap-3 group cursor-pointer"
              whileHover="hover"
              initial="initial"
            >
              <motion.div
                variants={logoGlowVariants}
                className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-400 to-sky-400 shadow-lg transition-all group-hover:shadow-[0_0_30px_rgba(59,130,246,0.55)]"
              >
                <Mountain className="h-5 w-5 text-white transform transition-transform group-hover:rotate-12" />
              </motion.div>
              <div>
                <motion.p
                  className="text-xs uppercase tracking-[0.2em] text-slate-500"
                  animate={{ opacity: scrolled ? 0.8 : 1 }}
                >
                  {t.brand.short}
                </motion.p>
                <motion.p
                  className="text-sm font-semibold text-slate-900"
                  animate={{ opacity: scrolled ? 0.9 : 1 }}
                >
                  {t.brand.full}
                </motion.p>
              </div>
            </motion.div>

            {/* Языки + бургер */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shrink-0">
                {['ru', 'kg', 'en'].map((code) => (
                  <motion.button
                    key={code}
                    type="button"
                    onClick={() => setLang(code)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] transition-all overflow-hidden ${
                      lang === code ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                    aria-pressed={lang === code}
                  >
                    {lang === code && (
                      <motion.div
                        layoutId="activeLang"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span className="relative z-10">{code}</span>
                  </motion.button>
                ))}
              </div>

              <motion.button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
                aria-label={mobileMenuOpen ? t.topNav.closeMenu : t.topNav.openMenu}
                aria-expanded={mobileMenuOpen}
              >
                <span className="relative flex h-5 w-5 flex-col items-center justify-center gap-[5px]">
                  <motion.span
                    animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="block h-[2px] w-5 rounded-full bg-slate-700 origin-center"
                  />
                  <motion.span
                    animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="block h-[2px] w-5 rounded-full bg-slate-700 origin-center"
                  />
                  <motion.span
                    animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="block h-[2px] w-5 rounded-full bg-slate-700 origin-center"
                  />
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Меню — абсолютно позиционирован под пилюлей, не влияет на высоту header */}
        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.div
              key="nav-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute inset-x-0 top-full z-50 overflow-hidden rounded-b-2xl border border-t-0 border-white/60 ring-1 ring-white/50 shadow-[0_14px_40px_rgba(15,23,42,0.14)]"
              style={{
                WebkitBackdropFilter: 'blur(22px) saturate(1.8)',
                backdropFilter: 'blur(22px) saturate(1.8)',
                backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0.50) 100%)',
              }}
            >
              <nav className="grid grid-cols-2 gap-0.5 px-4 pb-2 pt-2 sm:grid-cols-3 lg:grid-cols-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02, type: 'spring', damping: 20, stiffness: 220 }}
                    className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                      activeSection === getSectionIdFromHref(item.href)
                        ? 'bg-white/60 text-blue-600 shadow-sm ring-1 ring-blue-100/60'
                        : 'text-slate-700 hover:bg-white/50 hover:text-slate-900'
                    }`}
                  >
                    {activeSection === getSectionIdFromHref(item.href) && (
                      <span className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-blue-400" />
                    )}
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              {/* Переключатель языков — только на мобильных (на десктопе есть в навбаре) */}
              <div className="flex items-center gap-3 border-t border-white/40 px-5 py-3 sm:hidden">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Язык</span>
                <div className="flex gap-1.5">
                  {['ru', 'kg', 'en'].map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setLang(code)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all ${
                        lang === code
                          ? 'bg-gradient-to-r from-blue-500 to-sky-500 text-white shadow'
                          : 'bg-white/60 text-slate-600 ring-1 ring-slate-200 hover:bg-white/80'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </header>
    </>
  );
}
