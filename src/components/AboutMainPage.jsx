'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Banknote, BedDouble, CalendarDays, Car, Map, Mountain, MountainSnow, Sparkles, Theater, Users, WavesLadder } from 'lucide-react';
import SectionShell from './SectionShell';
import { regionStats } from '../data/siteData';

export default function AboutMainPage({ t }) {
  const [activeTab, setActiveTab] = useState('nature');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const tabs = t.about.tabs.map((tab) => ({
    ...tab,
    Icon: tab.id === 'nature' ? Mountain : tab.id === 'culture' ? Theater : WavesLadder,
  }));

  const statIcons = [Map, Users, MountainSnow, Banknote];
  const tabContent = t.about.tabContent;
  const localizedStats = regionStats.map((item, index) => ({
    ...item,
    label: t.about.regionStatsLabels[index] ?? item.label,
    value: t.about.regionStatsValues[index] ?? item.value,
  }));
  const featureCard = t.about.featureCard ?? {
    titleLine1: 'Жемчужина',
    titleLine2: 'Тянь-Шаня',
    description:
      'Расположенное на высоте 1607 метров над уровнем моря, озеро Иссык-Куль никогда не замерзает благодаря своей уникальной минерализации.',
  };
  const miniStats = t.about.miniStats ?? [
    { value: '6 тыс. км²', label: 'Площадь' },
    { value: '80+ рек', label: 'Притоков' },
    { value: '23°C', label: 'Летом' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <SectionShell
      id="about"
      eyebrow={t.about.section.eyebrow}
      title={t.about.section.title}
      subtitle={t.about.section.subtitle}
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="space-y-8"
      >
        {/* Основная сетка */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Главная карточка */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-7"
          >
            <div className="group relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/40 via-teal-900/30 to-sky-900/40 p-8 backdrop-blur-sm">
              {/* Фоновое изображение */}
              <div className="absolute inset-0 -z-10">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80"
                  alt={t.brand.full}
                  className="h-full w-full object-cover opacity-40 transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
              </div>

              {/* Контент */}
              <div className="relative flex h-full flex-col justify-end">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: '6rem' } : { width: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="mb-4 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"
                />
                <h3 className="text-3xl font-bold text-white sm:text-4xl">
                  {featureCard.titleLine1}<br />{featureCard.titleLine2}
                </h3>
                <p className="mt-4 max-w-xl text-lg text-white/80">
                  {featureCard.description}
                </p>
                
                {/* Мини-статистика */}
                <div className="mt-6 flex gap-6">
                  {miniStats.map((stat, index) => (
                    <motion.div
                      key={stat.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs uppercase tracking-wider text-white/60">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Статистика */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5"
          >
            <div className="grid h-full grid-cols-2 gap-4">
              {localizedStats.map((item, index) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm"
                >
                  <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-colors" />
                  
                  <p className="relative text-xs uppercase tracking-wider text-white/60">{item.label}</p>
                  <p className="relative mt-2 text-3xl font-bold text-white">{item.value}</p>
                  
                  <div className="absolute bottom-2 right-2 opacity-10 group-hover:opacity-30 transition-opacity">
                    {(() => {
                      const Icon = statIcons[index];
                      return Icon ? <Icon className="h-8 w-8 text-white" /> : null;
                    })()}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Интерактивные табы */}
        <motion.div variants={itemVariants} className="rounded-3xl bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex gap-2 border-b border-white/10 pb-4">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-sky-500/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.Icon className="relative h-4 w-4" />
                <span className="relative">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 grid gap-6 md:grid-cols-2"
          >
            <div>
            <h4 className="text-xl font-semibold text-white">
                {tabContent[activeTab].title}
            </h4>

            <p className="mt-2 text-white/70">
                {tabContent[activeTab].description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
                {tabContent[activeTab].highlights.map((item) => (
                <span
                    key={item}
                    className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/80"
                >
                    <span className="inline-flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5" />
                      {item}
                    </span>
                </span>
                ))}
            </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                'https://www.issykkul.biz/portals/0/cholpon-ata.jpg',
                'https://taukomek.kz/wp-content/uploads/2021/05/issyk-kul-nauryz-2-1.jpg',
                'https://static.aviasales.com/psgr-v2/Oblozhka_k_state_1600x980_2_9d19300f67.png'
              ].map((src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square overflow-hidden rounded-lg"
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover transition-transform hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Карта и действия */}
        <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
          <div className="relative h-64 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <iframe
              title={t.about.map.title}
              src="https://www.openstreetmap.org/export/embed.html?bbox=75.6%2C42.1%2C79.9%2C43.4&layer=mapnik&marker=42.45%2C77.28"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-6">
              <h5 className="text-lg font-semibold text-white">{t.about.map.title}</h5>
              <p className="text-sm text-white/70">{t.about.map.subtitle}</p>
            </div>

            <a
              href="https://www.openstreetmap.org/?mlat=42.45&mlon=77.28#map=9/42.45/77.28"
              target="_blank"
              rel="noreferrer"
              className="absolute right-3 top-3 rounded-lg bg-black/60 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm transition hover:bg-black/75 hover:text-white"
            >
              {t.about.map.openMap}
            </a>
          </div>

          <div className="space-y-4">
            <h5 className="text-xl font-semibold text-white">{t.about.travel.title}</h5>
            <p className="text-white/70">{t.about.travel.subtitle}</p>
            
            <div className="grid gap-3">
              {[
                { Icon: CalendarDays, ...t.about.travel.actions[0] },
                { Icon: Car, ...t.about.travel.actions[1] },
                { Icon: BedDouble, ...t.about.travel.actions[2] },
              ].map((item) => (
                <motion.button
                  key={item.text}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 rounded-xl bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
                >
                  <item.Icon className="h-6 w-6 text-white" />
                  <div>
                    <div className="font-medium text-white">{item.text}</div>
                    <div className="text-sm text-white/60">{item.desc}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
}
