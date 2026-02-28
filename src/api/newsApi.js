const API_BASE_URL = 'https://ik-backend-780b39b1dc1f.herokuapp.com';

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

export function formatNewsDate(dateIso, lang = 'ru') {
  if (!dateIso) return '';

  const localeMap = {
    ru: 'ru-RU',
    en: 'en-US',
    kg: 'ky-KG',
  };

  const date = new Date(dateIso);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat(localeMap[lang] ?? 'ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
