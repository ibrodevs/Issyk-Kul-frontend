'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Mountain, X } from 'lucide-react';

export default function TopNav({ navItems, lang, setLang, t }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null);

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
    const sections = navItems.map(item => item.href.replace('#', ''));
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

  // Блокировка скролла body при открытом мобильном меню
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 200
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 200
      }
    }
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
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
      <header
        className={`sticky top-0 z-40 px-4 pt-4 transition-all duration-500 sm:px-6 ${
          scrolled ? 'pt-2' : 'pt-4'
        }`}
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', damping: 20 }}
          className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border border-white/20 px-4 py-3 shadow-glass backdrop-blur-2xl transition-all duration-500 ${
            scrolled 
              ? 'bg-white/15 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.2)]' 
              : 'bg-white/10'
          }`}
        >
          {/* Логотип с улучшенной анимацией */}
          <motion.div 
            className="flex items-center gap-3 group cursor-pointer"
            whileHover="hover"
            initial="initial"
          >
            <motion.div 
              variants={logoGlowVariants}
              className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-sky-400 shadow-lg transition-all group-hover:shadow-[0_0_30px_rgba(52,211,153,0.7)]"
            >
              <Mountain className="h-5 w-5 text-white transform transition-transform group-hover:rotate-12" />
            </motion.div>
            <div>
              <motion.p 
                className="text-xs uppercase tracking-[0.2em] text-white/60"
                animate={{ opacity: scrolled ? 0.8 : 1 }}
              >
                {t.brand.short}
              </motion.p>
              <motion.p 
                className="text-sm font-semibold text-white"
                animate={{ opacity: scrolled ? 0.9 : 1 }}
              >
                {t.brand.full}
              </motion.p>
            </div>
          </motion.div>

          {/* Десктопное меню с улучшенными анимациями */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onHoverStart={() => setHoveredItem(index)}
                onHoverEnd={() => setHoveredItem(null)}
                className="relative rounded-xl px-4 py-2 text-sm font-medium transition-all"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <span className={`relative z-10 transition-colors ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-white'
                    : 'text-white/80 hover:text-white'
                }`}>
                  {item.label}
                </span>
                
                {/* Индикатор активной секции */}
                {activeSection === item.href.replace('#', '') && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-sky-500/20 border border-emerald-400/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                {/* Эффект при наведении */}
                {hoveredItem === index && activeSection !== item.href.replace('#', '') && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layoutId="hoverEffect"
                  />
                )}
              </motion.a>
            ))}
          </nav>

          {/* Правая часть: языки + мобильное меню */}
          <div className="flex items-center gap-2">
            {/* Переключатель языков */}
            <div className="hidden sm:flex items-center gap-1 rounded-xl border border-white/20 bg-white/5 p-1 backdrop-blur-sm">
              {['ru', 'kg', 'en'].map((code) => (
                <motion.button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] transition-all overflow-hidden ${
                    lang === code
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                  aria-pressed={lang === code}
                >
                  {lang === code && (
                    <motion.div
                      layoutId="activeLang"
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10">{code}</span>
                </motion.button>
              ))}
            </div>

            {/* Кнопка гамбургера (мобильная) */}
            <motion.button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
              aria-label={t.topNav.openMenu}
            >
              <motion.span
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center"
              >
                <Menu className="h-5 w-5" />
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* Мобильное боковое меню (сайдбар) с улучшенными анимациями */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-end"
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Оверлей */}
            <motion.div
              variants={overlayVariants}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Панель меню */}
            <motion.nav
              variants={menuVariants}
              className="relative flex w-80 transform flex-col gap-4 bg-gradient-to-b from-gray-900/95 to-gray-950/95 p-8 shadow-2xl backdrop-blur-xl border-l border-white/10"
            >
              <motion.button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="self-end rounded-full p-2 text-white/80 hover:bg-white/10"
                aria-label={t.topNav.closeMenu}
              >
                <X className="h-5 w-5" />
              </motion.button>

              {/* Логотип в мобильном меню */}
              <motion.div 
                className="flex items-center gap-3 mb-6"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-sky-400">
                  <Mountain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">{t.brand.short}</p>
                  <p className="text-sm font-semibold text-white">{t.brand.full}</p>
                </div>
              </motion.div>

              {/* Навигационные ссылки с анимацией */}
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative overflow-hidden rounded-xl"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`px-4 py-4 text-base font-medium transition-all ${
                    activeSection === item.href.replace('#', '')
                      ? 'bg-gradient-to-r from-emerald-500/20 to-sky-500/20 text-white border-l-4 border-emerald-400 pl-3'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}>
                    {item.label}
                  </div>
                  
                  {/* Эффект пульсации для активного пункта */}
                  {activeSection === item.href.replace('#', '') && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-transparent"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  )}
                </motion.a>
              ))}

              {/* Языки в мобильном меню */}
              <motion.div 
                className="mt-8 grid grid-cols-3 gap-2 border-t border-white/10 pt-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {['ru', 'kg', 'en'].map((code, index) => (
                  <motion.button
                    key={code}
                    type="button"
                    onClick={() => {
                      setLang(code);
                      setMobileMenuOpen(false);
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative overflow-hidden rounded-xl py-3 text-sm font-semibold uppercase transition-all ${
                      lang === code
                        ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.45 + index * 0.05 }}
                  >
                    {code}
                  </motion.button>
                ))}
              </motion.div>

              {/* Декоративный элемент */}
              <motion.div
                className="absolute bottom-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
