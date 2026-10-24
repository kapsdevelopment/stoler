export const STORAGE_KEY = 'stolleie-prototype-v1';
export const money = value => new Intl.NumberFormat('nb-NO', { maximumFractionDigits: 0 }).format(Number(value) || 0);
export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
export const normalize = value => String(value || '').toLocaleLowerCase('nb-NO').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ø/g, 'o').replace(/æ/g, 'ae').trim();
export function dateKey(date = new Date()) {
  const d = typeof date === 'string' ? new Date(`${date.slice(0, 10)}T12:00:00`) : date;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
export function addDays(date, count) {
  const d = typeof date === 'string' ? new Date(`${date.slice(0, 10)}T12:00:00`) : new Date(date);
  d.setDate(d.getDate() + count); return d;
}
export function dateLabel(value, options = {}) {
  if (!value) return 'Etter avtale';
  return new Date(`${value.slice(0, 10)}T12:00:00`).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short', ...options });
}
export function isValidDate(value) { return /^\d{4}-\d{2}-\d{2}$/.test(value || '') && !Number.isNaN(new Date(`${value}T12:00:00`).getTime()) && dateKey(value) === value; }
export function availableOn(listing, date) {
  return isValidDate(date) && date >= listing.availableFrom && !listing.blockedDates.includes(date) && listing.availableWeekdays.includes(new Date(`${date}T12:00:00`).getDay());
}
export function calculatePrice(listing, selection) {
  const rate = Number(listing.prices[selection.mode]) || 0;
  if (selection.mode === 'weekly') return rate * new Set(selection.weekdays || []).size;
  if (selection.mode === 'flex') return rate * new Set(selection.dates || []).size;
  return rate;
}
export function filterListings(listings, filters = {}) {
  let result = listings.filter(listing => {
    if (listing.status !== 'published') return false;
    const searchable = normalize([listing.city, listing.area, listing.salon, listing.title, ...listing.professions].join(' '));
    if (normalize(filters.q) && !normalize(filters.q).split(/[\s,]+/).every(word => searchable.includes(word))) return false;
    if (filters.type && listing.type !== filters.type) return false;
    if (filters.mode && !Object.hasOwn(listing.prices, filters.mode)) return false;
    if (filters.mode && filters.maxPrice && listing.prices[filters.mode] > Number(filters.maxPrice)) return false;
    if ((filters.amenities || []).some(amenity => !listing.amenities.includes(amenity))) return false;
    if (filters.date && filters.date < listing.availableFrom) return false;
    if (filters.date && filters.mode === 'flex' && !availableOn(listing, filters.date)) return false;
    if ((filters.days || []).length && !filters.days.every(day => listing.availableWeekdays.includes(Number(day)))) return false;
    return true;
  });
  if (filters.sort === 'price' && filters.mode) result.sort((a, b) => a.prices[filters.mode] - b.prices[filters.mode]);
  if (filters.sort === 'newest') result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return result;
}
export function validateSelection(listing, selection, today = dateKey()) {
  if (listing.status !== 'published') return 'Denne annonsen er ikke tilgjengelig for nye forespørsler.';
  if (!Object.hasOwn(listing.prices, selection.mode)) return 'Velg en leieform som tilbys i annonsen.';
  if (selection.mode === 'flex') {
    if (!selection.dates?.length) return 'Velg minst én ønsket dato.';
    if (selection.dates.some(date => date < today || !availableOn(listing, date))) return 'Velg tilgjengelige datoer fra og med i dag.';
  } else {
    if (!isValidDate(selection.startDate) || selection.startDate < today || selection.startDate < listing.availableFrom) return 'Velg en oppstartsdato fra og med første tilgjengelige dato.';
    if (selection.mode === 'weekly' && (!selection.weekdays?.length || selection.weekdays.some(day => !listing.availableWeekdays.includes(Number(day))))) return 'Velg minst én av de tilgjengelige ukedagene.';
  }
  return '';
}
export function requestSummary(request) {
  if (request.mode === 'flex') return [...request.dates].sort().map(date => dateLabel(date)).join(', ');
  if (request.mode === 'weekly') {
    const names = ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø'];
    return `${request.weekdays.map(day => names[day]).join(' + ')} · fra ${dateLabel(request.startDate)}`;
  }
  return `Fra ${dateLabel(request.startDate)}`;
}
export function loadState(storage, fallback) {
  try {
    const data = JSON.parse(storage.getItem(STORAGE_KEY));
    if (data?.version === 1 && Array.isArray(data.listings) && Array.isArray(data.requests) && Array.isArray(data.favorites) && ['renter', 'owner'].includes(data.role)) return data;
  } catch { /* A fresh demo is safe when browser storage is unavailable or damaged. */ }
  return fallback();
}
