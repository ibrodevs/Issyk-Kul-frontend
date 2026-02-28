'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo, useState } from 'react';
import { Mail, MapPin, Phone, Search, SearchX } from 'lucide-react';
import SectionShell from './SectionShell';
import { fetchDepartmentCategories, fetchDepartmentsList } from '../api/newsApi';

const uiByLang = {
  ru: {
    loading: 'Загрузка департаментов...',
    error: 'Не удалось загрузить департаменты',
  },
  en: {
    loading: 'Loading departments...',
    error: 'Failed to load departments',
  },
  kg: {
    loading: 'Департаменттер жүктөлүүдө...',
    error: 'Департаменттерди жүктөө мүмкүн болгон жок',
  },
};

export default function DepartmentsSection({ t, lang }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [error, setError] = useState('');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const ui = uiByLang[lang] ?? uiByLang.ru;

  useEffect(() => {
    let cancelled = false;

    const loadCategories = async () => {
      setLoadingCategories(true);
      setError('');

      try {
        const list = await fetchDepartmentCategories({ lang });

        if (!cancelled) {
          const sorted = [...list].sort((a, b) => a.order - b.order);
          setCategories(sorted);
          setSelectedCategory('all');
        }
      } catch (err) {
        if (!cancelled) {
          setCategories([]);
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoadingCategories(false);
        }
      }
    };

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, [lang]);

  useEffect(() => {
    let cancelled = false;

    const loadDepartments = async () => {
      setLoadingDepartments(true);
      setError('');

      try {
        const list = await fetchDepartmentsList({
          lang,
          categoryId: selectedCategory === 'all' ? undefined : selectedCategory,
        });

        if (!cancelled) {
          const sorted = [...list].sort((a, b) => a.order - b.order);
          setDepartments(sorted);
          setSelectedDepartment(null);
        }
      } catch (err) {
        if (!cancelled) {
          setDepartments([]);
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoadingDepartments(false);
        }
      }
    };

    loadDepartments();

    return () => {
      cancelled = true;
    };
  }, [lang, selectedCategory]);

  const filteredDepartments = useMemo(
    () =>
      departments.filter((dept) => {
        const token = searchTerm.toLowerCase();
        if (!token) return true;

        return (
          dept.title?.toLowerCase().includes(token) ||
          dept.leader?.full_name?.toLowerCase().includes(token) ||
          dept.category?.name?.toLowerCase().includes(token)
        );
      }),
    [departments, searchTerm],
  );

  const categoryFilters = useMemo(
    () => [{ id: 'all', name: t.departments.filters[0] }, ...categories],
    [categories, t.departments.filters],
  );

  const isLoading = loadingCategories || loadingDepartments;

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
      id="departments"
      eyebrow={t.departments.section.eyebrow}
      title={t.departments.section.title}
      subtitle={t.departments.section.subtitle}
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="space-y-8"
      >
        {isLoading && <p className="text-sm text-slate-600">{ui.loading}</p>}
        {!isLoading && error && <p className="text-sm text-red-600">{ui.error}</p>}

        <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder={t.departments.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
          </div>

          <div className="flex gap-3 text-sm">
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-700">
              <span className="font-semibold text-blue-500">{filteredDepartments.length}</span> {t.departments.statDepartmentsSuffix}
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-700">
              <span className="font-semibold text-sky-500">{t.departments.supportValue}</span> {t.departments.supportLabel}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
          {categoryFilters.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(String(cat.id))}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                String(selectedCategory) === String(cat.id)
                  ? 'bg-gradient-to-r from-blue-500 to-sky-500 text-white'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </motion.button>
          ))}
        </motion.div>

        <motion.div variants={containerVariants} className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredDepartments.map((dept, index) => (
            <motion.article
              key={dept.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onHoverStart={() => setSelectedDepartment(index)}
              onHoverEnd={() => setSelectedDepartment(null)}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_26px_rgba(15,23,42,0.05)]"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-sky-500/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: selectedDepartment === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative p-6 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50">
                    {dept.icon ? (
                      <img src={dept.icon} alt="" className="h-8 w-8 object-contain" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-blue-100" />
                    )}
                  </div>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                    {dept.category?.name}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-900">{dept.title}</h3>

                {dept.short_description && (
                  <div
                    className="mt-2 text-sm text-slate-600 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: dept.short_description }}
                  />
                )}
              </div>

              <div className="relative border-t border-slate-100 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-sky-500">
                      {dept.leader?.photo ? (
                        <img src={dept.leader.photo} alt={dept.leader.full_name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white">
                          {dept.leader?.full_name?.charAt(0) ?? '?'}
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-blue-400 ring-2 ring-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{t.departments.leaderLabel}</p>
                    <p className="text-sm font-medium text-slate-900">{dept.leader?.full_name}</p>
                    <p className="text-xs text-slate-500">{dept.leader?.position || 'Director'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 px-6 py-4">
                {dept.leader?.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <a href={`tel:${dept.leader.phone}`} className="text-slate-700 transition-colors hover:text-blue-500">
                      {dept.leader.phone}
                    </a>
                  </div>
                )}
                {dept.leader?.email && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <a href={`mailto:${dept.leader.email}`} className="truncate text-slate-700 transition-colors hover:text-blue-500">
                      {dept.leader.email}
                    </a>
                  </div>
                )}
                {dept.leader?.address && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span className="truncate text-slate-600">{dept.leader.address}</span>
                  </div>
                )}
              </div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{ x: selectedDepartment === index ? '100%' : '-100%' }}
                transition={{ duration: 0.8 }}
              />
            </motion.article>
          ))}
        </motion.div>

        {!isLoading && !error && filteredDepartments.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center"
          >
            <SearchX className="mb-4 h-14 w-14 text-slate-400" />
            <h3 className="text-xl font-semibold text-slate-900">{t.departments.noResultsTitle}</h3>
            <p className="mt-2 text-slate-600">{t.departments.noResultsText}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-6 py-2 text-slate-800"
            >
              {t.departments.resetFilter}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </SectionShell>
  );
}
