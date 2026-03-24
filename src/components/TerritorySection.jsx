import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, MapPin, Trees, Users } from 'lucide-react';
import SectionShell from './SectionShell';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 16, stiffness: 90 } },
};

export default function TerritorySection({ t }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  const section = t?.territory?.section ?? {
    eyebrow: 'Территориальное деление',
    title: 'Районы и города Иссык-Кульской области',
    subtitle: 'Область включает 5 административных районов и 3 города областного значения с общей площадью 43 100 км²',
  };

  const stats = (t?.territory?.stats ?? [
    { value: '5', label: 'Районов' },
    { value: '3', label: 'Города' },
    { value: '43 100 км²', label: 'Площадь' },
    { value: '≈ 500 000', label: 'Население' },
  ]).map((stat, idx) => ({
    ...stat,
    Icon: [MapPin, Building2, Trees, Users][idx] || MapPin,
  }));

  const districts = t?.territory?.districts ?? [
    {
      name: 'Иссык-Кульский район',
      center: 'с. Cholpon-Ata',
      color: 'bg-blue-500',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=70',
    },
    {
      name: 'Джеты-Огузский район',
      center: 'с. Покровка',
      color: 'bg-sky-500',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=70',
    },
    {
      name: 'Тюпский район',
      center: 'г. Тюп',
      color: 'bg-indigo-500',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=70',
    },
    {
      name: 'Тонский район',
      center: 'с. Боконбаево',
      color: 'bg-cyan-500',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=70',
    },
    {
      name: 'Ак-Суйский район',
      center: 'г. Каракол',
      color: 'bg-blue-600',
      image: 'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?auto=format&fit=crop&w=600&q=70',
    },
  ];

  const cities = (t?.territory?.cities ?? [
    { name: 'Каракол', pop: '≈ 75 000', role: 'Областной центр' },
    { name: 'Балыкчы', pop: '≈ 45 000', role: 'Промышленный центр' },
    { name: 'Чолпон-Ата', pop: '≈ 15 000', role: 'Курортный центр' },
  ]).map((city) => ({
    ...city,
    icon: Building2,
  }));

  return (
    <SectionShell
      id="territory"
      eyebrow={section.eyebrow}
      title={section.title}
      subtitle={section.subtitle}
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="space-y-10"
      >
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map(({ value, label, Icon }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-50 to-sky-50">
                <Icon className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-xl font-bold text-slate-900">{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Районы */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-slate-900">{t?.territory?.districtsHeading ?? 'Районы'}</h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {districts.map((d) => (
              <motion.div
                key={d.name}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_32px_rgba(15,23,42,0.10)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="relative h-36 overflow-hidden">
                  <img src={d.image} alt={d.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <span className={`absolute left-3 top-3 h-2.5 w-2.5 rounded-full ${d.color} ring-2 ring-white`} />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-slate-900">{d.name}</h4>
                  <p className="mt-0.5 text-xs text-slate-500">{t?.territory?.centerLabel ?? 'Центр:'} {d.center}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Города */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-slate-900">{t?.territory?.citiesHeading ?? 'Города областного значения'}</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {cities.map((c) => (
              <motion.div
                key={c.name}
                variants={itemVariants}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-sky-500 shadow">
                  <c.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{c.name}</p>
                  <p className="text-xs text-blue-500">{c.role}</p>
                  <p className="text-xs text-slate-500">{c.pop}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
