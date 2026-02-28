'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Flame,
  Mountain,
  Newspaper,
  PartyPopper,
  Theater,
  ChartColumn,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionShell from './SectionShell';
import { fetchNewsCategories, fetchNewsList, formatNewsDate } from '../api/newsApi';

const uiByLang = {
  ru: {
    loading: 'Загрузка новостей...',
    error: 'Не удалось загрузить новости',
    empty: 'Новостей пока нет',
  },
  en: {
    loading: 'Loading news...',
    error: 'Failed to load news',
    empty: 'No news yet',
  },
  kg: {
    loading: 'Жаңылыктар жүктөлүүдө...',
    error: 'Жаңылыктарды жүктөө мүмкүн болгон жок',
    empty: 'Азырынча жаңылык жок',
  },
};

function getCategoryIcon(slug = '', name = '') {
  const token = `${slug} ${name}`.toLowerCase();

  if (token.includes('event') || token.includes('собы') || token.includes('иш-чара')) return PartyPopper;
  if (token.includes('tour') || token.includes('тур')) return Mountain;
  if (token.includes('culture') || token.includes('культ') || token.includes('маданият')) return Theater;
  if (token.includes('econ') || token.includes('эконом')) return ChartColumn;

  return Newspaper;
}

export default function NewsSection({ t, lang }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredNews, setHoveredNews] = useState(null);
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const sliderRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const ui = uiByLang[lang] ?? uiByLang.ru;

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const [newsList, categoryList] = await Promise.all([
          fetchNewsList({ lang }),
          fetchNewsCategories({ lang }),
        ]);

        if (!cancelled) {
          setNews(newsList);
          setCategories(categoryList.sort((a, b) => a.order - b.order));
          setSelectedCategory('all');
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setNews([]);
          setCategories([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [lang]);

  const sortedNews = useMemo(
    () => [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [news],
  );

  const featuredNews = useMemo(() => sortedNews.filter((item) => item.is_main), [sortedNews]);

  const latestNews = useMemo(
    () =>
      sortedNews.filter((item) => {
        if (item.is_main) return false;
        if (selectedCategory === 'all') return true;
        return String(item.category?.id) === String(selectedCategory);
      }),
    [selectedCategory, sortedNews],
  );

  const categoryOptions = useMemo(
    () => [
      { id: 'all', label: t.news.filters.all, Icon: Newspaper, count: sortedNews.filter((item) => !item.is_main).length },
      ...categories.map((category) => ({
        id: String(category.id),
        label: category.name,
        Icon: getCategoryIcon(category.slug, category.name),
        count: sortedNews.filter((item) => !item.is_main && item.category?.id === category.id).length,
      })),
    ],
    [categories, sortedNews, t.news.filters.all],
  );

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

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === 'left' ? -400 : 400,
      behavior: 'smooth',
    });
  };

  return (
    <SectionShell id="news" eyebrow={t.news.section.eyebrow} title={t.news.section.title} subtitle={t.news.section.subtitle}>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="space-y-10"
      >
        {loading && <p className="text-sm text-slate-600">{ui.loading}</p>}
        {!loading && error && <p className="text-sm text-red-600">{ui.error}</p>}

        {!loading && !error && (
          <>
            {featuredNews.length > 0 && (
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

                <div
                  ref={sliderRef}
                  className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {featuredNews.map((newsItem, index) => {
                    const CategoryIcon = getCategoryIcon(newsItem.category?.slug, newsItem.category?.name);

                    return (
                      <motion.div
                        key={newsItem.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.1 }}
                        className="relative min-w-[350px] flex-shrink-0 snap-start md:min-w-[450px]"
                        onHoverStart={() => setHoveredNews(newsItem.id)}
                        onHoverEnd={() => setHoveredNews(null)}
                      >
                        <div className="group relative h-80 overflow-hidden rounded-2xl">
                          <motion.img
                            src={newsItem.image}
                            alt={newsItem.title}
                            className="h-full w-full object-cover"
                            animate={{ scale: hoveredNews === newsItem.id ? 1.1 : 1 }}
                            transition={{ duration: 0.4 }}
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="mb-3 flex items-center gap-2">
                              {newsItem.is_hot && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                                  <Flame className="h-3.5 w-3.5" />
                                  {t.news.hot}
                                </span>
                              )}
                              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur-sm">
                                <CategoryIcon className="h-3.5 w-3.5" />
                                {newsItem.category?.name}
                              </span>
                            </div>

                            <h4 className="text-xl font-bold text-white line-clamp-2">{newsItem.title}</h4>

                            <div
                              className="mt-2 text-sm text-white/70 line-clamp-2"
                              dangerouslySetInnerHTML={{ __html: newsItem.short_description ?? '' }}
                            />

                            <div className="mt-4 flex items-center justify-between">
                              <span className="inline-flex items-center gap-1 text-xs text-white/50">
                                <Calendar className="h-3.5 w-3.5" />
                                {formatNewsDate(newsItem.date, lang)}
                              </span>

                              <Link
                                to={`/news/${newsItem.id}`}
                                className="inline-flex items-center gap-1 text-sm font-semibold text-white"
                              >
                                {t.news.read}
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {categoryOptions.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    selectedCategory === category.id ? 'text-white' : 'text-slate-600 hover:text-slate-900'
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
                    <span className="rounded-full bg-slate-200/80 px-2 py-0.5 text-xs text-slate-700">{category.count}</span>
                  </span>
                </motion.button>
              ))}
            </motion.div>

            {latestNews.length === 0 ? (
              <motion.p variants={itemVariants} className="text-sm text-slate-600">
                {ui.empty}
              </motion.p>
            ) : (
              <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {latestNews.map((newsItem) => {
                  const CategoryIcon = getCategoryIcon(newsItem.category?.slug, newsItem.category?.name);

                  return (
                    <motion.article
                      key={newsItem.id}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={newsItem.image}
                          alt={newsItem.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        <div className="absolute left-3 top-3">
                          <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
                            <CategoryIcon className="h-3.5 w-3.5" />
                            {newsItem.category?.name}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatNewsDate(newsItem.date, lang)}
                        </span>

                        <h4 className="mt-2 text-lg font-semibold text-slate-900 line-clamp-2">{newsItem.title}</h4>

                        <div
                          className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: newsItem.short_description ?? '' }}
                        />

                        <Link
                          to={`/news/${newsItem.id}`}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-500"
                        >
                          {t.news.more}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </SectionShell>
  );
}
