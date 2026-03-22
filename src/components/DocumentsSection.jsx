import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, FileText, Scale, ScrollText } from 'lucide-react';
import SectionShell from './SectionShell';

const categories = [
  { id: 'all', label: 'Все документы' },
  { id: 'regulations', label: 'Нормативные акты' },
  { id: 'orders', label: 'Распоряжения' },
  { id: 'reports', label: 'Отчёты' },
];

const documents = [
  {
    cat: 'regulations',
    title: 'Положение об аппарате полномочного представителя Президента КР в Иссык-Кульской области',
    date: '15.01.2024',
    size: '320 КБ',
    format: 'PDF',
  },
  {
    cat: 'regulations',
    title: 'Регламент работы аппарата полномочного представителя Президента',
    date: '20.02.2024',
    size: '215 КБ',
    format: 'PDF',
  },
  {
    cat: 'regulations',
    title: 'Порядок организации личного приёма граждан',
    date: '05.03.2024',
    size: '180 КБ',
    format: 'DOCX',
  },
  {
    cat: 'orders',
    title: 'Распоряжение № 14 «О мерах по обеспечению пожарной безопасности»',
    date: '12.03.2025',
    size: '95 КБ',
    format: 'PDF',
  },
  {
    cat: 'orders',
    title: 'Распоряжение № 27 «О проведении выездных совещаний в районах»',
    date: '04.06.2025',
    size: '88 КБ',
    format: 'PDF',
  },
  {
    cat: 'orders',
    title: 'Распоряжение № 41 «О координации работы государственных органов»',
    date: '17.09.2025',
    size: '102 КБ',
    format: 'PDF',
  },
  {
    cat: 'reports',
    title: 'Годовой отчёт о социально-экономическом развитии области за 2024 год',
    date: '30.01.2025',
    size: '1.4 МБ',
    format: 'PDF',
  },
  {
    cat: 'reports',
    title: 'Полугодовой отчёт об исполнении государственных программ (I полугодие 2025)',
    date: '15.07.2025',
    size: '860 КБ',
    format: 'PDF',
  },
  {
    cat: 'reports',
    title: 'Отчёт о работе с обращениями граждан за III квартал 2025 года',
    date: '10.10.2025',
    size: '490 КБ',
    format: 'PDF',
  },
];

const catIcon = { regulations: Scale, orders: ScrollText, reports: FileText };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const rowVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 16, stiffness: 100 } },
};

export default function DocumentsSection() {
  const [activeCat, setActiveCat] = useState('all');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  const filtered = activeCat === 'all' ? documents : documents.filter((d) => d.cat === activeCat);

  return (
    <SectionShell
      id="documents"
      eyebrow="Документы"
      title="Нормативные акты, распоряжения и отчёты"
      subtitle="Официальные документы аппарата полномочного представителя Президента Кыргызской Республики в Иссык-Кульской области"
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="space-y-6"
      >
        {/* Фильтры */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCat === c.id
                  ? 'bg-gradient-to-r from-blue-500 to-sky-500 text-white shadow'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Список документов */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {filtered.map((doc, i) => {
            const Icon = catIcon[doc.cat] ?? FileText;
            return (
              <motion.div
                key={doc.title}
                variants={rowVariants}
                className={`flex items-center gap-4 px-5 py-4 transition hover:bg-slate-50 ${
                  i < filtered.length - 1 ? 'border-b border-slate-100' : ''
                }`}
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-50 to-sky-50">
                  <Icon className="h-5 w-5 text-blue-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">{doc.title}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{doc.date} · {doc.size} · {doc.format}</p>
                </div>
                <a
                  href="#"
                  className="flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
                >
                  <Download className="h-3.5 w-3.5" /> Скачать
                </a>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </SectionShell>
  );
}
