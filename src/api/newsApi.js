const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://ik-backend-780b39b1dc1f.herokuapp.com';

function buildUrl(path, query = {}) {
  const url = new URL(path, API_BASE_URL);

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

function unpackList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}

function parseDateValue(value) {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(`${value}T00:00:00`);
  }

  return new Date(value);
}

export async function fetchNewsList({ lang = 'ru', categoryId, isHot, isMain } = {}) {
  const url = buildUrl('/api/news/', {
    lang,
    category_id: categoryId,
    is_hot: isHot,
    is_main: isMain,
  });

  const payload = await fetchJson(url);
  return unpackList(payload);
}

export async function fetchNewsById(id, { lang = 'ru' } = {}) {
  const url = buildUrl(`/api/news/${id}/`, { lang });
  return fetchJson(url);
}

export async function fetchNewsCategories({ lang = 'ru' } = {}) {
  const url = buildUrl('/api/news-categories/', { lang });
  const payload = await fetchJson(url);
  return unpackList(payload);
}

export async function fetchSightsList({ lang = 'ru' } = {}) {
  const url = buildUrl('/api/sights/', { lang });
  const payload = await fetchJson(url);
  return unpackList(payload);
}

export async function fetchSightById(id, { lang = 'ru' } = {}) {
  const url = buildUrl(`/api/sights/${id}/`, { lang });
  return fetchJson(url);
}

export async function fetchDepartmentsList({ lang = 'ru', categoryId } = {}) {
  const url = buildUrl('/api/departments/', {
    lang,
    category_id: categoryId,
  });

  const payload = await fetchJson(url);
  return unpackList(payload);
}

export async function fetchDepartmentById(id, { lang = 'ru' } = {}) {
  const url = buildUrl(`/api/departments/${id}/`, { lang });
  return fetchJson(url);
}

export async function fetchDepartmentCategories({ lang = 'ru' } = {}) {
  const url = buildUrl('/api/department-categories/', { lang });
  const payload = await fetchJson(url);
  return unpackList(payload);
}

export async function fetchMediaList({ lang = 'ru', categoryId, type } = {}) {
  const url = buildUrl('/api/media/', {
    lang,
    category_id: categoryId,
    type,
  });

  const payload = await fetchJson(url);
  return unpackList(payload);
}

export async function fetchMediaById(id, { lang = 'ru' } = {}) {
  const url = buildUrl(`/api/media/${id}/`, { lang });
  return fetchJson(url);
}

export async function fetchMediaCategories({ lang = 'ru' } = {}) {
  const url = buildUrl('/api/media-categories/', { lang });
  const payload = await fetchJson(url);
  return unpackList(payload);
}

export async function fetchLeadershipMembers({ lang = 'ru' } = {}) {
  const url = buildUrl('/api/leadership-members/', { lang });
  const payload = await fetchJson(url);
  return unpackList(payload);
}

export async function fetchDocuments({ lang = 'ru', category } = {}) {
  const url = buildUrl('/api/documents/', { lang, category });
  const payload = await fetchJson(url);
  return unpackList(payload);
}

export async function fetchProcurementsList({ lang = 'ru', type } = {}) {
  const url = buildUrl('/api/procurements/', { lang, type });
  const payload = await fetchJson(url);
  return unpackList(payload);
}

export async function fetchProjectsList({ lang = 'ru', type } = {}) {
  const url = buildUrl('/api/projects/', { lang, type });
  const payload = await fetchJson(url);
  return unpackList(payload);
}

export async function fetchProjectById(id, { lang = 'ru' } = {}) {
  const url = buildUrl(`/api/projects/${id}/`, { lang });
  return fetchJson(url);
}

function getLocale(lang = 'ru') {
  const localeMap = {
    ru: 'ru-RU',
    en: 'en-US',
    kg: 'ky-KG',
  };

  return localeMap[lang] ?? 'ru-RU';
}

export function formatNewsDate(dateIso, lang = 'ru') {
  if (!dateIso) return '';

  const date = parseDateValue(dateIso);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat(getLocale(lang), {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatShortDate(dateIso, lang = 'ru') {
  if (!dateIso) return '';

  const date = parseDateValue(dateIso);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat(getLocale(lang), {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function formatSomAmount(amount, lang = 'ru') {
  if (amount === undefined || amount === null || amount === '') {
    return '';
  }

  const number = Number(amount);

  if (Number.isNaN(number)) {
    return String(amount);
  }

  return `${new Intl.NumberFormat(getLocale(lang)).format(number)} сом`;
}
