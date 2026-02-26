import { Instagram, Send, Waves, Youtube } from 'lucide-react';

export default function SiteFooter({ t }) {
  const socials = [
    {
      label: 'Telegram',
      Icon: Send,
      hoverClass:
        'hover:border-sky-400/40 hover:bg-sky-500/10 hover:text-sky-300',
    },
    {
      label: 'Instagram',
      Icon: Instagram,
      hoverClass:
        'hover:border-pink-400/40 hover:bg-pink-500/10 hover:text-pink-300',
    },
    {
      label: 'YouTube',
      Icon: Youtube,
      hoverClass:
        'hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300',
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
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/15 bg-white/5 p-6 shadow-glass backdrop-blur-2xl">
        <div className="grid gap-6 md:grid-cols-[1fr_auto_auto] md:items-start">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-lake to-aqua">
                <Waves className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{t.brand.full}</p>
                <p className="text-xs text-white/60">{t.brand.portal}</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/65">
              {t.footer.description}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/55">{t.footer.linksTitle}</p>
            <div className="mt-3 grid gap-2">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-white/75 transition hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/55">{t.footer.socialTitle}</p>
            <div className="mt-3 flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className={`inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 transition ${social.hoverClass}`}
                >
                  <social.Icon className="h-3.5 w-3.5" />
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-4 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <a href="#" className="transition hover:text-white/80">{t.footer.privacy}</a>
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
