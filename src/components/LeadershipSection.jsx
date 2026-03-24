import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import SectionShell from './SectionShell';

const leaders = [
  {
    role: 'Полномочный представитель',
    name: 'Абдиев Марат Кемелович',
    since: 'С 2023 года',
    bio: 'Имеет высшее юридическое образование. Более 20 лет государственного стажа. Ранее занимал должности в Администрации Президента и Правительстве Кыргызской Республики. Удостоен ряда государственных наград.',
    tags: ['Государственное управление', 'Право', 'Региональное развитие'],
    accent: 'from-blue-500 to-sky-500',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    role: 'Первый заместитель',
    name: 'Токтосунов Бакыт Эркинович',
    since: 'С 2024 года',
    bio: 'Специалист в сфере экономики и государственного управления. Курирует вопросы инвестиций, экономического развития и реализации государственных программ в регионе.',
    tags: ['Экономика', 'Инвестиции', 'Программы развития'],
    accent: 'from-sky-500 to-cyan-500',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    role: 'Заместитель по социальным вопросам',
    name: 'Джумабаева Айгуль Сапаровна',
    since: 'С 2023 года',
    bio: 'Опытный специалист в сферах здравоохранения, образования и социальной защиты. Координирует реализацию социальных программ и проектов для населения области.',
    tags: ['Социальная политика', 'Здравоохранение', 'Образование'],
    accent: 'from-indigo-500 to-blue-500',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 15, stiffness: 90 } },
};

export default function LeadershipSection({ t }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const section = t?.leadership?.section ?? {
    eyebrow: 'Руководство',
    title: 'Полномочный представитель и заместители',
    subtitle:
      'Руководящий состав аппарата полномочного представителя Президента Кыргызской Республики в Иссык-Кульской области',
  };

  const leaders = t?.leadership?.leaders ?? [];

  return (
    <SectionShell id="leadership" eyebrow={section.eyebrow} title={section.title} subtitle={section.subtitle}>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {leaders.map((leader) => (
          <motion.div
            key={leader.name}
            variants={cardVariants}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)] hover:-translate-y-1"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={leader.photo}
                alt={leader.name}
                className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
            </div>

            <div className="px-5 py-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-500">{leader.role}</p>
              <h3 className="text-lg font-bold text-slate-900">{leader.name}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
}
