import { Instagram, Send, Waves, Youtube } from 'lucide-react';

export default function SiteFooter({ t }) {
  const socials = [
    {
      label: 'Telegram',
      Icon: Send,
      hoverClass:
        'hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700',
    },
    {
      label: 'Instagram',
      Icon: Instagram,
      hoverClass:
        'hover:border-pink-300 hover:bg-pink-50 hover:text-pink-700',
    },
    {
      label: 'YouTube',
      Icon: Youtube,
      hoverClass:
        'hover:border-red-300 hover:bg-red-50 hover:text-red-700',
    },
  ];

  const links = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.tourism, href: '#tourism' },
    { label: t.nav.news, href: '#news' },
    { label: t.nav.departments, href: '#departments' },
    { label: t.nav.contacts, href: '#contacts' },
  ];

  return (
    <footer className="px-4 pb-8 pt-6 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
        <div className="grid gap-6 md:grid-cols-[1fr_auto_auto] md:items-start">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-lake to-aqua">
                <Waves className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{t.brand.full}</p>
                <p className="text-xs text-slate-500">{t.brand.portal}</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
              {t.footer.description}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{t.footer.linksTitle}</p>
            <div className="mt-3 grid gap-2">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-slate-600 transition hover:text-slate-900">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{t.footer.socialTitle}</p>
            <div className="mt-3 flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className={`inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 transition ${social.hoverClass}`}
                >
                  <social.Icon className="h-3.5 w-3.5" />
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <a href="#" className="transition hover:text-slate-700">{t.footer.privacy}</a>
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
