import { useEffect, useRef } from 'react';

export default function HeroSection({ t, onVideoLoad }) {
  const iframeRef = useRef(null);
  const didNotifyRef = useRef(false);

  useEffect(() => {
    const handleMessage = (event) => {
      if (!event.origin.includes('vimeo.com')) return;

      let payload;
      try {
        payload = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }

      if (!payload || payload.player_id !== 'hero-vimeo') return;

      if (payload.event === 'ready' && iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ method: 'addEventListener', value: 'play' }),
          '*'
        );
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ method: 'addEventListener', value: 'playing' }),
          '*'
        );
      }

      if ((payload.event === 'play' || payload.event === 'playing') && !didNotifyRef.current) {
        didNotifyRef.current = true;
        onVideoLoad?.();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onVideoLoad]);

  return (
    <section className="relative h-screen w-full overflow-hidden -mt-[var(--nav-height,80px)]">
      {/* Видео фон */}
      <div className="absolute inset-0">
        <iframe
          ref={iframeRef}
          id="hero-vimeo"
          src="https://player.vimeo.com/video/185290450?background=1&autoplay=1&muted=1&loop=1&transparent=0&api=1&player_id=hero-vimeo"
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.77777778vh] min-w-full -translate-x-1/2 -translate-y-1/2"
          style={{ 
            pointerEvents: 'none',
            filter: 'brightness(0.7) saturate(1.2)'
          }}
          allow="autoplay; fullscreen"
          title="Issyk-Kul"
        />
        
        {/* Градиентный оверлей для читаемости текста */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-sky-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Контент */}
      <div className="relative z-10 flex h-full items-end justify-start p-8 sm:p-12 lg:p-16">
        <div className="max-w-3xl">
          {/* Бейдж */}
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
              {t.hero.badge}
            </span>
          </div>

          {/* Главный заголовок */}
          <h1 className="animate-fade-in-up animate-delay-100 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">
            {t.hero.titleLine1}
            <span className="relative mt-2 block">
              {t.hero.titleLine2}
              <span className="absolute -left-2 -top-2 h-12 w-12 rounded-full bg-blue-400/20 blur-xl" />
            </span>
            <span className="block bg-gradient-to-r from-blue-300 via-sky-300 to-blue-300 bg-clip-text text-transparent">
              {t.hero.titleLine3}
            </span>
          </h1>

          {/* Динамическая линия */}
          <div className="mt-4 h-1 w-24 animate-expand-line rounded-full bg-gradient-to-r from-blue-400 via-sky-400 to-blue-400" />


          {/* Кнопка действия */}
          <div className="mt-6 animate-fade-in-up animate-delay-300">
            <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-sky-500 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25">
              <span className="relative z-10 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
                {t.hero.cta}
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-blue-600 to-sky-600 transition-transform duration-300 group-hover:translate-y-0" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expand-line {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 6rem;
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }

        .animate-delay-100 {
          animation-delay: 0.1s;
        }

        .animate-delay-200 {
          animation-delay: 0.2s;
        }

        .animate-delay-300 {
          animation-delay: 0.3s;
        }

        .animate-expand-line {
          animation: expand-line 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
          width: 0;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
