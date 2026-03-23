import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, BarChart2, Calendar, DollarSign, Layers, Target } from 'lucide-react';
import SectionShell from './SectionShell';

const tabs = [
  { id: 'investment', label: 'Инвестиционные проекты' },
  { id: 'state', label: 'Государственные программы' },
];

export const investmentProjects = [
  {
    title: 'Развитие туристической инфраструктуры северного берега',
    description: 'Строительство многофункционального туристического комплекса с гостиницами, аквапарком и конгресс-залом на территории Чолпон-Ата.',
    budget: '$ 24 млн',
    period: '2025–2027',
    status: 'В реализации',
    statusColor: 'bg-green-100 text-green-700',
    tags: ['Туризм', 'Инфраструктура', 'Частный капитал'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=70',
  },
  {
    title: 'Горнолыжный курорт «Каракол Альпен»',
    description: 'Расширение горнолыжного курорта: новые трассы, канатная дорога, квадропарк и всесезонная инфраструктура.',
    budget: '$ 18 млн',
    period: '2024–2026',
    status: 'В реализации',
    statusColor: 'bg-green-100 text-green-700',
    tags: ['Туризм', 'Спорт', 'Горный кластер'],
    image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=600&q=70',
  },
  {
    title: 'Модернизация водоснабжения г. Каракол',
    description: 'Реконструкция водопроводных сетей, строительство новых очистных станций и обеспечение питьевой водой отдалённых сёл района.',
    budget: '$ 6 млн',
    period: '2025–2026',
    status: 'В реализации',
    statusColor: 'bg-green-100 text-green-700',
    tags: ['КЖ сфера', 'ГЧП', 'Инфраструктура'],
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=70',
  },
  {
    title: 'Технопарк «Иссык-Куль Digital»',
    description: 'Создание IT-парка для привлечения технологических компаний, подготовки кадров и развития цифровой экономики в регионе.',
    budget: '$ 11 млн',
    period: '2026–2028',
    status: 'Планируется',
    statusColor: 'bg-amber-100 text-amber-700',
    tags: ['Цифровизация', 'Образование', 'Экономика'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=70',
  },
];

const statePrograms = [
  {
    title: 'Программа «Туристический Иссык-Куль 2024–2028»',
    description: 'Комплексная государственная программа по развитию туристической отрасли, привлечению инвестиций и повышению качества туристических услуг в регионе.',
    approved: 'Постановление ПКР № 124 от 12.03.2024',
    progress: 38,
    period: '2024–2028',
    tasks: 14,
    completed: 5,
  },
  {
    title: 'Государственная программа «Чистая вода»',
    description: 'Обеспечение населённых пунктов области качественной питьевой водой. Охватывает более 90 сёл и 3 города.',
    approved: 'Постановление ПКР № 87 от 05.02.2023',
    progress: 64,
    period: '2023–2026',
    tasks: 22,
    completed: 14,
  },
  {
    title: 'Программа «Цифровой регион»',
    description: 'Перевод государственных услуг в электронный формат, внедрение цифрового документооборота и развитие интернет-инфраструктуры в отдалённых районах.',
    approved: 'Постановление ПКР № 201 от 18.07.2024',
    progress: 22,
    period: '2024–2027',
    tasks: 18,
    completed: 4,
  },
  {
    title: 'Программа поддержки малого и среднего бизнеса',
    description: 'Субсидии, льготные кредиты, обучение предпринимателей и снятие административных барьеров для бизнеса в туристической и сельскохозяйственной сферах.',
    approved: 'Постановление ПКР № 55 от 20.01.2025',
    progress: 45,
    period: '2025–2027',
    tasks: 10,
    completed: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 16, stiffness: 90 } },
};

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState('investment');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });

  return (
    <SectionShell
      id="projects"
      eyebrow="Проекты и программы"
      title="Инвестиции и государственные программы"
      subtitle="Стратегические проекты и государственные программы, реализуемые в Иссык-Кульской области для устойчивого развития региона"
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="space-y-8"
      >
        {/* Табы */}
        <div className="flex flex-wrap gap-2">
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

        {/* Инвестиционные проекты */}
        {activeTab === 'investment' && (
          <div className="grid gap-6 sm:grid-cols-2">
            {investmentProjects.map((p) => (
              <motion.article
                key={p.title}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.10)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 to-transparent" />
                  <span className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${p.statusColor}`}>
                    {p.status}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5 text-blue-400" />{p.budget}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-blue-400" />{p.period}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] text-slate-500">{t}</span>
                    ))}
                  </div>
                  <Link to={`/projects/${investmentProjects.indexOf(p)}`} className="mt-4 flex items-center gap-1.5 text-xs font-medium text-blue-500 hover:text-blue-700 transition-colors">
                    Подробнее <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Государственные программы */}
        {activeTab === 'state' && (
          <div className="space-y-5">
            {statePrograms.map((p) => (
              <motion.div
                key={p.title}
                variants={itemVariants}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-sky-500">
                        <Layers className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{p.title}</h3>
                        <p className="mt-1 text-xs text-slate-400">{p.approved}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{p.description}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-slate-500">{p.period}</p>
                    <div className="mt-1 flex items-center gap-1.5 justify-end text-xs text-slate-500">
                      <Target className="h-3.5 w-3.5 text-blue-400" />
                      {p.completed}/{p.tasks} задач
                    </div>
                  </div>
                </div>

                {/* Прогресс */}
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-xs text-slate-500">
                    <span>Исполнение</span>
                    <span className="font-semibold text-blue-500">{p.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-sky-400"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${p.progress}%` } : { width: 0 }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    />
                  </div>
                </div>

                <button className="mt-3 flex items-center gap-1.5 text-xs font-medium text-blue-500 hover:text-blue-700 transition-colors">
                  <BarChart2 className="h-3.5 w-3.5" /> Отчёт о ходе реализации
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </SectionShell>
  );
}
