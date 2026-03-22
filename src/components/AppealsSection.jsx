import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ClipboardList, Clock, HelpCircle, Mail, MessageSquare, Send } from 'lucide-react';
import SectionShell from './SectionShell';

const steps = [
  { num: '01', title: 'Подача обращения', text: 'Заполните электронную форму или направьте письменное обращение. Укажите ваши контактные данные и суть вопроса.' },
  { num: '02', title: 'Регистрация', text: 'Обращение регистрируется в течение 3 рабочих дней. Вам направляется уведомление с регистрационным номером.' },
  { num: '03', title: 'Рассмотрение', text: 'Уполномоченное должностное лицо рассматривает обращение в срок до 30 рабочих дней с момента регистрации.' },
  { num: '04', title: 'Ответ', text: 'Ответ направляется на указанный в обращении адрес в письменной или электронной форме.' },
];

const faqs = [
  {
    q: 'Какой срок рассмотрения обращения?',
    a: 'Обращения граждан рассматриваются в течение 30 рабочих дней с момента их регистрации. В особых случаях срок может быть продлён с обязательным уведомлением заявителя.',
  },
  {
    q: 'В какое время работает электронная приёмная?',
    a: 'Электронная приёмная принимает обращения круглосуточно. Рабочие часы сотрудников аппарата: понедельник – пятница, 9:00–18:00.',
  },
  {
    q: 'Как узнать о статусе рассмотрения обращения?',
    a: 'Вы можете уточнить статус по регистрационному номеру, позвонив по телефону +996 (3922) 2-12-34 или написав на официальный e-mail аппарата.',
  },
  {
    q: 'Анонимные обращения рассматриваются?',
    a: 'Обращения без указания фамилии и адреса не рассматриваются. Однако ваши персональные данные охраняются и не подлежат разглашению третьим лицам.',
  },
  {
    q: 'Можно ли подать коллективное обращение?',
    a: 'Да, коллективные обращения принимаются и рассматриваются в том же порядке, что и индивидуальные. Требуется подпись первого заявителя.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 15, stiffness: 90 } },
};

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <button
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex items-center gap-3 text-sm font-semibold text-slate-800">
          <HelpCircle className="h-4 w-4 shrink-0 text-blue-400" />
          {q}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="border-t border-slate-100 px-5 py-4 text-sm leading-6 text-slate-600">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AppealsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [sent, setSent] = useState(false);

  return (
    <SectionShell
      id="appeals"
      eyebrow="Обращения граждан"
      title="Электронная приёмная"
      subtitle="Каждый гражданин вправе обратиться к Полномочному представителю Президента. Мы рассматриваем обращения о нарушениях прав, вопросах государственного управления и региональных проблемах."
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="space-y-12"
      >
        {/* Форма + Порядок рассмотрения */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Форма */}
          <motion.div variants={itemVariants} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
            <h3 className="mb-1 flex items-center gap-2 text-lg font-bold text-slate-900">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              Отправить обращение
            </h3>
            <p className="mb-5 text-xs text-slate-500">Заполните форму — ответ придёт на указанный e-mail</p>

            {sent ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg">
                  <Send className="h-6 w-6 text-white" />
                </div>
                <p className="font-bold text-slate-900">Обращение отправлено</p>
                <p className="text-sm text-slate-500">В течение 3 рабочих дней вам будет направлен регистрационный номер</p>
                <button onClick={() => setSent(false)} className="mt-2 rounded-xl border border-slate-200 px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 transition">
                  Новое обращение
                </button>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">ФИО *</label>
                    <input required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition" placeholder="Иванов Иван Иванович" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">E-mail *</label>
                    <input required type="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition" placeholder="example@mail.com" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Тема обращения *</label>
                  <input required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition" placeholder="Кратко опишите вопрос" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Текст обращения *</label>
                  <textarea required rows={4} className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition" placeholder="Подробно изложите суть вашего обращения..." />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow transition hover:opacity-90"
                >
                  <Send className="h-4 w-4" /> Отправить обращение
                </button>
              </form>
            )}
          </motion.div>

          {/* Порядок рассмотрения */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <ClipboardList className="h-5 w-5 text-blue-500" />
              Порядок рассмотрения
            </h3>
            <div className="relative space-y-0">
              {steps.map((step, i) => (
                <div key={step.num} className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-sky-500 text-xs font-bold text-white shadow">
                      {step.num}
                    </div>
                    {i < steps.length - 1 && <div className="mt-1 w-px flex-1 bg-slate-200" />}
                  </div>
                  <div className={`pb-6 ${i === steps.length - 1 ? 'pb-0' : ''}`}>
                    <p className="font-semibold text-slate-900">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
              <Clock className="h-5 w-5 shrink-0 text-blue-500" />
              <p className="text-sm text-blue-700">Приём граждан: Пн–Пт, 9:00–13:00 и 14:00–17:00</p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <Mail className="h-5 w-5 shrink-0 text-slate-400" />
              <p className="text-sm text-slate-600">issykkul-oblast@gov.kg</p>
            </div>
          </motion.div>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900">
            <HelpCircle className="h-5 w-5 text-blue-500" />
            Часто задаваемые вопросы
          </h3>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
