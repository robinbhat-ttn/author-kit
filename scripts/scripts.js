import { loadArea, setConfig } from './ak.js';

const hostnames = ['authorkit.dev'];

const locales = {
  '': { lang: 'en' },
  '/de': { lang: 'de' },
  '/de/de': { lang: 'de' },
  '/at/de': { lang: 'de' },
  '/ch/de': { lang: 'de' },
  '/ch/fr': { lang: 'fr' },
  '/es': { lang: 'es' },
  '/es/es': { lang: 'es' },
  '/mx/es': { lang: 'es' }, 
  '/us/es': { lang: 'es' },
  '/fr': { lang: 'fr' },
  '/ca/fr': { lang: 'fr' },
  '/it/it': { lang: 'it' },
  '/ch/it': { lang: 'it' },
  '/at/it': { lang: 'it' },
  '/hi': { lang: 'hi' },
  '/in/hi': { lang: 'hi' },
  '/ja': { lang: 'ja' },
  '/jp/ja': { lang: 'ja' },
  '/zh': { lang: 'zh' },
  '/cn/zh': { lang: 'zh' },
  '/sg/zh': { lang: 'zh' },
  '/hk/zh': { lang: 'zh' }
};

// Widget patterns to look for
const widgets = [
  { fragment: '/fragments/' },
  { schedule: '/schedules/' },
  { youtube: 'https://www.youtube' },
];

// Blocks with self-managed styles
const components = ['fragment', 'schedule'];

// How to decorate an area before loading it
const decorateArea = ({ area = document }) => {
  const eagerLoad = (parent, selector) => {
    const img = parent.querySelector(selector);
    if (!img) return;
    img.removeAttribute('loading');
    img.fetchPriority = 'high';
  };

  eagerLoad(area, 'img');
};

async function loadPage() {
  setConfig({ hostnames, locales, widgets, components, decorateArea });
  await loadArea();
}
await loadPage();

(function da() {
  const ref = new URL(window.location.href).searchParams.get('dapreview');
  if (ref) import('../tools/da/da.js').then((mod) => mod.default(loadPage));
}());
