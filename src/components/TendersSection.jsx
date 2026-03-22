import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BadgeCheck, Calendar, DollarSign, ExternalLink, ShoppingCart } from 'lucide-react';
import SectionShell from './SectionShell';

const tabs = [
  { id: 'procurement', label: 'Государственные закупки' },
  { id: 'tenders', label: 'Тендеры' },
];

const procurements = [
  {
    id: 'ZK-2026-001',
    title: 'Закупка компьютерного оборудования для нужд аппарата',
    budget: '850 000 сом',
    deadline: '30.03.2026',
    status: 'Открыт',
    statusColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'ZK-2026-002',
    title: 'Поставка офисной мебели для районных администраций',
    budget: '1 200 000 сом',
    deadline: '15.04.2026',
    status: 'Открыт',
    statusColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'ZK-2026-003',
    title: 'Услуги по охране зданий государственных органов',
    budget: '3 500 000 сом',
    deadline: '01.04.2026',
    status: 'Открыт',
    statusColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'ZK-2025-018',
    title: 'Реконструкция административного здания с. Боконбаево',
    budget: '12 400 000 сом',
    deadline: '10.12.2025',
    status: 'Завершён',
    statusColor: 'bg-slate-100 text-slate-500',
  },
  {
    id: 'ZK-2025-021',
    title: 'Приобретение служебных автомобилей',
    budget: '5 700 000 сом',
    deadline: '20.12.2025',
    status: 'Завершён',
    statusColor: 'bg-slate-100 text-slate-500',
  },
];

const tenders = [
  {
    id: 'T-2026-01',
    title: 'Строительство пешеходного моста через р. Джергалан',
    budget: '28 000 000 сом',
    deadline: '05.04.2026',
    type: 'Строительство',
    status: 'Приём заявок',
    statusColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'T-2026-02',
    title: 'Ремонт автодороги Каракол — Джети-Огуз (участок 12 км)',
    budget: '45 000 000 сом',
    deadline: '20.04.2026',
    type: 'Дорожные работы',
    status: 'Приём заявок',
    statusColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'T-2026-03',
    title: 'Установка системы видеонаблюдения в г. Балыкчы',
    budget: '7 200 000 сом',
    deadline: '10.04.2026',
    type: 'ИТ-инфраструктура',
    status: 'На рассмотрении',
    statusColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'T-2025-14',
    title: 'Благоустройство набережной г. Чолпон-Ата',
    budget: '18 500 000 сом',
    deadline: '15.09.2025',
    type: 'Благоустройство',
    status: 'Завершён',
    statusColor: 'bg-slate-100 text-slate-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const rowVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 16, stiffness: 100 } },
};

export default function TendersSection() {
  const [activeTab, setActiveTab] = useState('procurement');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  const items = activeTab === 'procurement' ? procurements : tenders;

  return (
    <SectionShell
      id="tenders"
      eyebrow="Тендеры и закупки"
      title="Государственные закупки и тендеры"
      subtitle="Открытые конкурсные процедуры для поставщиков товаров, работ и услуг в Иссык-Кульской области"
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="space-y-6"
      >
        {/* Статистика */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: '8', label: 'Активных процедур', Icon: ShoppingCart },
            { value: '3', label: 'Тендеров открыто', Icon: BadgeCheck },
            { value: '156 млн сом', label: 'Общий бюджет 2026', Icon: DollarSign },
          ].map(({ value, label, Icon }) => (
            <motion.div
              key={label}
              variants={rowVariants}
              className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
            >
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-50 to-sky-50">
                <Icon className="h-4.5 w-4.5 text-blue-500" />
              </div>
              <p className="text-lg font-bold text-slate-900">{value}</p>
              <p className="text-xs text-slate-500 leading-4">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Табы */}
        <div className="flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTab === t.id
                  ? 'bg-gradient-to-r from-blue-500 to-sky-500 text-white shadow'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Список */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              variants={rowVariants}
              className={`flex flex-col gap-3 px-5 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center ${
                i < items.length - 1 ? 'border-b border-slate-100' : ''
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">{item.id}</span>
                  {item.type && (
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-500">{item.type}</span>
                  )}
                </div>
                <p className="mt-1 text-sm font-medium text-slate-800">{item.title}</p>
                <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-slate-400">
                  <span><DollarSign className="mr-0.5 inline h-3 w-3" />{item.budget}</span>
                  <span><Calendar className="mr-0.5 inline h-3 w-3" />До {item.deadline}</span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.statusColor}`}>
                  {item.status}
                </span>
                <a href="#" className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100">
                  <ExternalLink className="h-3.5 w-3.5" /> Детали
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionShell>
  );
}
