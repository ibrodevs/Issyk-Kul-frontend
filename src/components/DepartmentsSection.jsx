'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { ChartColumn, Mail, MapPin, Mountain, Phone, Search, Theater, SearchX } from 'lucide-react';
import SectionShell from './SectionShell';
import { departments } from '../data/siteData';

export default function DepartmentsSection({ t }) {
  const departmentIcons = {
    mountain: Mountain,
    theater: Theater,
    chart: ChartColumn,
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const localizedDepartments = departments.map((dept, index) => ({
    ...dept,
    ...(t.departments.items[index] ?? {}),
  }));

  // Фильтрация департаментов
  const filteredDepartments = localizedDepartments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.category.toLowerCase().includes(searchTerm.toLowerCase())
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
        {/* Поиск и статистика */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder={t.departments.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl bg-white/10 px-4 py-3 pl-11 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-white/40" />
          </div>
          
          <div className="flex gap-3 text-sm">
            <div className="rounded-lg bg-white/10 px-4 py-2 text-white/80">
              <span className="font-semibold text-emerald-400">{filteredDepartments.length}</span> {t.departments.statDepartmentsSuffix}
            </div>
            <div className="rounded-lg bg-white/10 px-4 py-2 text-white/80">
              <span className="font-semibold text-sky-400">{t.departments.supportValue}</span> {t.departments.supportLabel}
            </div>
          </div>
        </motion.div>

        {/* Категории (быстрые фильтры) */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
          {t.departments.filters.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchTerm(cat === t.departments.filters[0] ? '' : cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                (cat === t.departments.filters[0] && searchTerm === '') || searchTerm === cat
                  ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Сетка департаментов */}
        <motion.div
          variants={containerVariants}
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {filteredDepartments.map((dept, index) => (
            <motion.article
              key={dept.name}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onHoverStart={() => setSelectedDepartment(index)}
              onHoverEnd={() => setSelectedDepartment(null)}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm"
            >
              {/* Декоративный фон */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-sky-500/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: selectedDepartment === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Верхняя часть с иконкой и категорией */}
              <div className="relative p-6 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-sky-500/20 text-white">
                    {(() => {
                      const Icon = departmentIcons[dept.icon] || Mountain;
                      return <Icon className="h-7 w-7" />;
                    })()}
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/60">
                    {dept.category}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-white">{dept.name}</h3>
                
                {dept.description && (
                  <p className="mt-2 text-sm text-white/50 line-clamp-2">{dept.description}</p>
                )}
              </div>

              {/* Информация о руководителе */}
              <div className="relative border-t border-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-emerald-500 to-sky-500">
                      {dept.headImage ? (
                        <img src={dept.headImage} alt={dept.head} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white">
                          {dept.head.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-gray-900" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">{t.departments.leaderLabel}</p>
                    <p className="text-sm font-medium text-white">{dept.head}</p>
                    <p className="text-xs text-white/40">{dept.headTitle || 'Director'}</p>
                  </div>
                </div>
              </div>

              {/* Контакты */}
              <div className="space-y-2 px-6 py-4">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-white/40" />
                  <a href={`tel:${dept.phone}`} className="text-white/80 hover:text-emerald-400 transition-colors">
                    {dept.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-white/40" />
                  <a href={`mailto:${dept.email}`} className="text-white/80 hover:text-emerald-400 transition-colors truncate">
                    {dept.email}
                  </a>
                </div>
                {dept.address && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-white/40" />
                    <span className="text-white/60 truncate">{dept.address}</span>
                  </div>
                )}
              </div>

              {/* Блик при наведении */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{ x: selectedDepartment === index ? '100%' : '-100%' }}
                transition={{ duration: 0.8 }}
              />
            </motion.article>
          ))}
        </motion.div>

        {/* Если ничего не найдено */}
        {filteredDepartments.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center rounded-2xl bg-white/5 p-12 text-center"
          >
            <SearchX className="mb-4 h-14 w-14 text-white/40" />
            <h3 className="text-xl font-semibold text-white">{t.departments.noResultsTitle}</h3>
            <p className="mt-2 text-white/60">{t.departments.noResultsText}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchTerm('')}
              className="mt-4 rounded-xl bg-white/10 px-6 py-2 text-white"
            >
              {t.departments.resetFilter}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </SectionShell>
  );
}
