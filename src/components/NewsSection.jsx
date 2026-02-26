'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useRef } from 'react';
import { ArrowRight, Calendar, ChartColumn, ChevronLeft, ChevronRight, Eye, Flame, Mountain, Newspaper, PartyPopper, Theater } from 'lucide-react';
import SectionShell from './SectionShell';
import { newsData } from '../data/siteData';

export default function NewsSection({ t }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredNews, setHoveredNews] = useState(null);
  const sliderRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const localizedNews = newsData.map((item) => ({
    ...item,
    ...(t.news.items[item.id] ?? {}),
  }));

  const categories = [
    { id: 'all', label: t.news.filters.all, Icon: Newspaper, count: localizedNews.length },
    { id: 'events', label: t.news.filters.events, Icon: PartyPopper, count: localizedNews.filter(n => n.category === 'events').length },
    { id: 'tourism', label: t.news.filters.tourism, Icon: Mountain, count: localizedNews.filter(n => n.category === 'tourism').length },
    { id: 'culture', label: t.news.filters.culture, Icon: Theater, count: localizedNews.filter(n => n.category === 'culture').length },
    { id: 'economy', label: t.news.filters.economy, Icon: ChartColumn, count: localizedNews.filter(n => n.category === 'economy').length },
  ];

  const getCategoryMeta = (category) => {
    if (category === 'events') return { Icon: PartyPopper, label: t.news.categoryLabels.events };
    if (category === 'tourism') return { Icon: Mountain, label: t.news.categoryLabels.tourism };
    if (category === 'culture') return { Icon: Theater, label: t.news.categoryLabels.culture };
    return { Icon: ChartColumn, label: t.news.categoryLabels.economy };
  };

  const featuredNews = localizedNews.filter(news => news.isFeatured);
  const latestNews = localizedNews.filter(news => !news.isFeatured);

const scrollSlider = (direction) => {
  if (sliderRef.current) {
    const scrollAmount = direction === 'left' ? -400 : 400;

    sliderRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }
};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
      id="news"
      eyebrow={t.news.section.eyebrow}
      title={t.news.section.title}
      subtitle={t.news.section.subtitle}
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="space-y-10"
      >
        {/* Featured слайдер */}
        <motion.div variants={itemVariants} className="relative">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
                {t.news.featuredTitle}
              </span>
            </h3>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scrollSlider('left')}
                className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              >
                <ChevronLeft className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scrollSlider('right')}
                className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              >
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>

          {/* Слайдер */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="relative min-w-[350px] flex-shrink-0 snap-start md:min-w-[450px]"
                onHoverStart={() => setHoveredNews(news.id)}
                onHoverEnd={() => setHoveredNews(null)}
              >
                <div className="group relative h-80 overflow-hidden rounded-2xl">
                  {/* Изображение */}
                  <motion.img
                    src={news.image}
                    alt={news.title}
                    className="h-full w-full object-cover"
                    animate={{ scale: hoveredNews === news.id ? 1.1 : 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Градиент */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* Контент */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Метки */}
                    <div className="mb-3 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                        <Flame className="h-3.5 w-3.5" />
                        {t.news.hot}
                      </span>
                      {(() => {
                        const { Icon, label } = getCategoryMeta(news.category);
                        return (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur-sm">
                            <Icon className="h-3.5 w-3.5" />
                            {label}
                          </span>
                        );
                      })()}
                    </div>
                    
                    {/* Заголовок */}
                    <h4 className="text-xl font-bold text-white line-clamp-2">
                      {news.title}
                    </h4>
                    
                    {/* Описание */}
                    <p className="mt-2 text-sm text-white/70 line-clamp-2">
                      {news.description}
                    </p>
                    
                    {/* Мета-информация */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-white/50">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {news.date}
                        </span>
                      </div>
                      
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="text-sm font-semibold text-white"
                      >
                        <span className="inline-flex items-center gap-1">
                          {t.news.read}
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Блик при наведении */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: hoveredNews === news.id ? '100%' : '-100%' }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Категории */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'text-slate-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-sky-500"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <category.Icon className="h-4 w-4" />
                <span>{category.label}</span>
                <span className="rounded-full bg-slate-200/80 px-2 py-0.5 text-xs">
                  {category.count}
                </span>
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Сетка новостей */}
        <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestNews
            .filter(news => selectedCategory === 'all' || news.category === selectedCategory)
            .map((news, index) => (
              <motion.article
                key={news.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
              >
                {/* Изображение */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Категория */}
                  <div className="absolute left-3 top-3">
                    {(() => {
                      const { Icon, label } = getCategoryMeta(news.category);
                      return (
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
                          <Icon className="h-3.5 w-3.5" />
                          {label}
                        </span>
                      );
                    })()}
                  </div>
                </div>

                {/* Контент */}
                <div className="p-5">
                  {/* Дата и просмотры */}
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {news.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      {news.views}
                    </span>
                  </div>

                  {/* Заголовок */}
                  <h4 className="mt-2 text-lg font-semibold text-slate-900 line-clamp-2">
                    {news.title}
                  </h4>

                  {/* Описание */}
                  <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">
                    {news.description}
                  </p>

                  {/* Теги */}
                  {news.tags && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {news.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-500"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Кнопка */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-400"
                  >
                    {t.news.more}
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </motion.button>
                </div>
              </motion.article>
            ))}
        </motion.div>

        {/* Пагинация */}
        <motion.div variants={itemVariants} className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <motion.button
              key={page}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`h-10 w-10 rounded-lg ${
                page === 1
                  ? 'bg-gradient-to-r from-blue-500 to-sky-500 text-white'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {page}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </SectionShell>
  );
}
