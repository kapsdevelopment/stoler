import { makeSeed, categories, modes, amenities, weekdayLabels, weekdayOrder, weekdaysShort, statusLabels, demoPhotos } from './data.js';
import { STORAGE_KEY, money, escapeHtml as esc, dateKey, dateLabel, addDays, calculatePrice, filterListings, validateSelection, requestSummary, loadState, availableOn } from './domain.js';

const paths = {
  chair: '<path d="M8 13V6a4 4 0 0 1 8 0v7M4 11v7h16v-7M7 14h10M12 18v4M7 22h10"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  back: '<path d="M20 12H4m6-6-6 6 6 6"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  scissors: '<circle cx="5" cy="6" r="3"/><circle cx="5" cy="18" r="3"/><path d="m8 8 13 13M8 16 21 3M14 12l-3-3"/>',
  flower: '<path d="M12 21c-4.5 0-9-3.5-9-9 3 0 5 1 7 3M12 21c4.5 0 9-3.5 9-9-3 0-5 1-7 3M12 20S6 12 12 3c6 9 0 17 0 17Z"/>',
  sparkles: '<path d="m12 3 2.7 6.3L21 12l-6.3 2.7L12 21l-2.7-6.3L3 12l6.3-2.7L12 3ZM21 2v4M19 4h4"/>',
  wifi: '<path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 16a5.5 5.5 0 0 1 7 0"/><circle cx="12" cy="20" r=".8" fill="currentColor"/>',
  droplet: '<path d="M12 2S4 10 4 15a8 8 0 0 0 16 0c0-5-8-13-8-13Z"/><path d="M8 15a4 4 0 0 0 4 4"/>',
  coffee: '<path d="M4 8h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8ZM17 9h2a3 3 0 0 1 0 6h-2M3 23h17M7 2v3M12 2v3"/>',
  layers: '<path d="m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5"/>',
  box: '<path d="m3 6 9-4 9 4v12l-9 4-9-4V6Zm0 0 9 5 9-5M12 11v11M7 4l10 5"/>',
  wind: '<path d="M3 8h12a3 3 0 1 0-3-3M2 12h17a3 3 0 1 1-3 3M4 17h5a3 3 0 1 1-3 3"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 2v6M17 2v6M3 11h18M8 15h2M14 15h2M8 18h2"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  message: '<path d="M21 11a9 9 0 0 1-9 9H4l-3 3V11a10 10 0 0 1 20 0Z"/><path d="M6 9h10M6 13h6"/>',
  store: '<path d="M3 10v11h18V10M2 10l2-7h16l2 7M2 10c0 4 5 4 5 0 0 4 5 4 5 0 0 4 5 4 5 0 0 4 5 4 5 0M9 21v-7h6v7"/>',
  user: '<circle cx="12" cy="7" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/>',
  users: '<circle cx="9" cy="7" r="4"/><path d="M2 22v-3a7 7 0 0 1 14 0v3M17 3a4 4 0 0 1 0 8M19 15a6 6 0 0 1 3 5"/>',
  tune: '<path d="M3 6h5m4 0h9M3 12h11m4 0h3M3 18h2m4 0h12"/><circle cx="10" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="7" cy="18" r="2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/>',
  edit: '<path d="m16 3 5 5L8 21l-6 1 1-6L16 3ZM13 6l5 5"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z"/><circle cx="12" cy="12" r="3"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  play: '<path d="m8 4 12 8-12 8V4Z"/>',
  send: '<path d="m22 2-7 20-4-9L2 9l20-7ZM11 13 22 2"/>',
  reset: '<path d="M3 9a9 9 0 1 1 0 7M3 3v6h6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.1"/>',
  upload: '<path d="M12 16V2m-5 5 5-5 5 5M3 14v7h18v-7"/>',
  home: '<path d="m2 11 10-9 10 9M5 9v13h14V9M9 22v-8h6v8"/>',
  share: '<path d="M12 16V2m-5 5 5-5 5 5M5 12v9h14v-9"/>',
};
const icon = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.flower}</svg>`;
const asset = name => name?.startsWith('data:image/') ? name : `assets/${name || 'hair.jpg'}`;
const image = (name, alt, extra = '') => `<img src="${esc(asset(name))}" alt="${esc(alt)}" ${extra} />`;
const categoryOf = listing => categories.find(category => category.id === listing.type) || categories[0];
const avatar = (name, initials, photo, large = false) => `<span class="avatar${large ? ' large' : ''}" aria-label="${esc(name)}">${photo ? image(photo, name) : esc(initials)}</span>`;
const link = (url, text, classes = 'button', symbol = '') => `<a href="${url}" class="${classes}">${text}${symbol ? icon(symbol) : ''}</a>`;
const today = () => dateKey();
let storageOK = true;
let state;
try { state = loadState(localStorage, makeSeed); } catch { state = makeSeed(); storageOK = false; }
state.ownerId ||= 'demo-owner';
let currentRoute = { name: 'home' };
let filters = { q: '', type: '', mode: '', date: '', maxPrice: '', amenities: [], days: [], sort: 'relevance' };
let homeMode = 'monthly';
let selection = null;
let wizard = null;
let wizardStep = 1;
let requestTab = 'active';
let calendarOffset = 0;
let lastFocusedElement = null;
let toastTimer;

function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); storageOK = true; return true; }
  catch { storageOK = false; toast('Nettleseren kunne ikke lagre endringen. Demoen virker videre i denne økten.'); return false; }
}
function toast(message) {
  const el = document.querySelector('#toast'); el.textContent = message; el.classList.add('visible');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('visible'), 4500);
}
function navigate(hash) {
  if (location.hash === hash) render(); else location.hash = hash;
}
function ownerListings() { return state.listings.filter(listing => listing.ownerId === state.ownerId); }
function ownerProfile() {
  const listing = ownerListings()[0];
  return listing ? { name: listing.host, salon: listing.ownerId === 'demo-owner' ? 'Studio Balanse' : listing.salon, avatar: listing.avatar, photo: listing.hostPhoto } : { name: 'Camilla Berg', salon: 'Min salong', avatar: 'CB' };
}
function visibleRequests() {
  const ids = new Set(ownerListings().map(listing => listing.id));
  return state.requests.filter(request => state.role === 'owner' ? ids.has(request.listingId) : request.renterId === 'demo-renter');
}
function changeRole(role, ownerId) {
  state.role = role; if (ownerId) state.ownerId = ownerId; persist();
}
function header() {
  const active = currentRoute.name;
  const isOwner = state.role === 'owner';
  const person = isOwner ? ownerProfile() : { name: 'Silje Andersen', avatar: 'SA' };
  const count = visibleRequests().filter(request => request.status !== 'closed').length;
  return `<div class="demo-bar"><div class="container"><span><span class="demo-dot"></span>Interaktiv prototype <span class="demo-desktop">· Fiktive annonser og lokale demodata</span></span><button data-action="demo-settings" aria-label="Åpne demoinnstillinger og bytt rolle">${icon('tune')}Demo: ${isOwner ? 'utleier' : 'leietaker'} ${icon('down')}</button></div></div>
    <header class="site-header"><div class="container header-inner"><a href="#/" class="brand" aria-label="Stolleie, forside"><span class="brand-mark">${icon('chair')}</span><span><span class="wordmark">Stolleie</span><span class="brand-tagline" style="display:block">Rom for det du kan</span></span></a>
    <nav class="desktop-nav" aria-label="Hovedmeny"><a href="#/sok" class="${['home', 'search', 'listing'].includes(active) ? 'active' : ''}">Finn arbeidsplass</a><a href="#/foresporsler" class="${['requests', 'conversation'].includes(active) ? 'active' : ''}">Forespørsler${count ? `<span class="nav-number">${count}</span>` : ''}</a><a href="#/favoritter" class="${active === 'favorites' ? 'active' : ''}">Favoritter</a></nav>
    <div class="header-actions"><button data-action="open-owner" class="button ${isOwner ? 'secondary' : ''}">${icon('store')}${isOwner ? 'Min salong' : 'Lei ut arbeidsplass'}</button><button data-action="demo-settings" class="icon-button" aria-label="Demoprofil: ${esc(person.name)}">${avatar(person.name, person.avatar, person.photo)}</button></div></div></header>
    ${!storageOK ? '<div class="storage-warning" role="status">Lokal lagring er utilgjengelig. Endringer beholdes bare i denne økten.</div>' : ''}`;
}
function mobileNav() {
  const active = currentRoute.name;
  return `<nav class="mobile-nav" aria-label="Mobilmeny">${[
    ['#/', 'home', 'Utforsk', ['home']], ['#/sok', 'search', 'Søk', ['search', 'listing']], ['#/foresporsler', 'message', 'Forespørsler', ['requests', 'conversation']], ['#/favoritter', 'heart', 'Lagrede', ['favorites']], ['#/utleier', 'store', 'Utleier', ['owner', 'wizard']],
  ].map(([url, symbol, label, pages]) => `<a href="${url}" class="${pages.includes(active) ? 'active' : ''}" ${pages.includes(active) ? 'aria-current="page"' : ''}>${icon(symbol)}<span>${label}</span></a>`).join('')}</nav>`;
}
function footer() {
  return `<footer class="site-footer"><div class="container footer-inner"><div class="brand"><span class="brand-mark">${icon('chair')}</span><span class="wordmark">Stolleie</span></div><p class="footer-note">Rom for selvstendige fagpersoner.<br>Demoannonser og priser er illustrerende. Ingen ekte forespørsler sendes.</p><div class="footer-links"><button class="text-button" data-action="about">Om prototypen</button><button class="text-button" data-action="demo-settings">Bytt demorolle</button></div></div></footer>`;
}
function render() {
  closeDialog(false);
  const previousRoute = currentRoute;
  const [rawPath, rawQuery = ''] = (location.hash.slice(1) || '/').split('?');
  const parts = rawPath.split('/').filter(Boolean);
  const query = new URLSearchParams(rawQuery);
  if (!parts.length) currentRoute = { name: 'home' };
  else if (parts[0] === 'sok') {
    currentRoute = { name: 'search' };
    filters = { q: query.get('q') || '', type: query.get('type') || '', mode: modes[query.get('mode')] ? query.get('mode') : '', date: query.get('date') || '', maxPrice: query.get('maxPrice') || '', amenities: (query.get('amenities') || '').split(',').filter(Boolean), days: (query.get('days') || '').split(',').filter(Boolean).map(Number), sort: query.get('sort') || 'relevance' };
  } else if (parts[0] === 'annonse') currentRoute = { name: 'listing', id: parts[1] };
  else if (parts[0] === 'favoritter') currentRoute = { name: 'favorites' };
  else if (parts[0] === 'foresporsler') currentRoute = parts[1] ? { name: 'conversation', id: parts[1] } : { name: 'requests' };
  else if (parts[0] === 'utleier') {
    if (state.role !== 'owner') changeRole('owner');
    if (parts[1] === 'ny' || parts[1] === 'rediger') {
      currentRoute = { name: 'wizard', id: parts[2] || null };
      if (!wizard || previousRoute.name !== 'wizard' || previousRoute.id !== currentRoute.id) initWizard(currentRoute.id);
    } else currentRoute = { name: 'owner' };
  } else currentRoute = { name: '404' };
  document.body.classList.toggle('has-rent-dock', currentRoute.name === 'listing');
  const views = { home: renderHome, search: renderSearch, listing: renderListing, favorites: renderFavorites, requests: renderRequests, conversation: renderConversation, owner: renderOwner, wizard: renderWizard };
  document.querySelector('#app').innerHTML = `${header()}<main id="main" tabindex="-1">${views[currentRoute.name]?.() || renderNotFound()}</main>${footer()}${mobileNav()}`;
  document.title = `${({ home: 'Rom for det du kan', search: 'Finn arbeidsplass', listing: state.listings.find(l => l.id === currentRoute.id)?.salon || 'Arbeidsplass', favorites: 'Lagrede arbeidsplasser', requests: 'Mine forespørsler', conversation: 'Samtale', owner: 'Utleieroversikt', wizard: 'Opprett annonse' })[currentRoute.name] || 'Stolleie'} — Stolleie`;
  if (previousRoute.name !== currentRoute.name || previousRoute.id !== currentRoute.id) window.scrollTo(0, 0);
  if (currentRoute.name === 'conversation') scrollMessages();
}
function renderCard(listing, preferredMode = '') {
  const mode = Object.hasOwn(listing.prices, preferredMode) ? preferredMode : Object.keys(listing.prices)[0];
  const cat = categoryOf(listing);
  const saved = state.favorites.includes(listing.id);
  return `<article class="listing-card"><div class="card-image"><a href="#/annonse/${listing.id}" tabindex="-1" aria-hidden="true">${image(listing.image, `${cat.label} hos ${listing.salon}`, 'loading="lazy"')}</a><span class="badge white type-tag">${icon(cat.icon)}${cat.label}</span><button class="icon-button heart-button${saved ? ' is-saved' : ''}" data-action="favorite" data-id="${listing.id}" aria-label="${saved ? 'Fjern' : 'Lagre'} ${esc(listing.salon)} ${saved ? 'fra' : 'som'} favoritt" aria-pressed="${saved}">${icon('heart')}</button></div>
    <div class="card-content"><p class="card-location">${icon('pin')}${esc(listing.area)}, ${esc(listing.city)}</p><h3><a href="#/annonse/${listing.id}">${esc(listing.salon)}</a></h3><p class="card-title">${esc(listing.title)}</p><div class="card-amenities">${listing.amenities.slice(0, 3).map(id => { const item = amenities.find(a => a.id === id); return item ? `<span>${icon(item.icon)}${item.label}</span>` : ''; }).join('')}</div>
    <div class="card-bottom"><div><p class="card-mode">${modes[mode].label}${mode === 'weekly' ? ' · per ukedag' : ''}</p><p class="card-price">${money(listing.prices[mode])} kr <small>${mode === 'flex' ? '/ dag' : '/ mnd'}</small></p><p class="card-tax">${esc(listing.vat)}${Object.keys(listing.prices).length > 1 ? ' · flere leieformer' : ''}</p></div><a href="#/annonse/${listing.id}" class="card-link" aria-label="Se arbeidsplassen hos ${esc(listing.salon)}"><span>Se arbeidsplassen</span>${icon('arrow')}</a></div></div></article>`;
}
function renderHome() {
  const featured = ['atelier', 'lumina', 'nordic'].map(id => state.listings.find(l => l.id === id)).filter(l => l?.status === 'published');
  return `<div class="container"><section class="home-hero"><div class="hero-copy"><span class="eyebrow">${icon('flower')}Et nytt rom for din arbeidshverdag</span><h1>Rom for deg.<br><em>Plass til å vokse.</em></h1><p>Finn en frisørstol, negleplass eller et behandlingsrom der du kan drive for deg selv — og høre til.</p><div class="hero-caption"><span class="icon-ring">${icon('users')}</span>Din virksomhet. Et inspirerende fellesskap.</div></div><div class="hero-visual">${image('hero.jpg', 'Et varmt salongmiljø med dagslys, store speil og lyse frisørstoler', 'class="hero-photo" fetchpriority="high"')}<span class="hero-flower">${icon('flower')}</span><span class="hero-label">${icon('sparkles')}Finn din egen lille base</span><div class="hero-note"><p class="serif">En plass som føles riktig.</p><p class="muted small">Fast, noen dager i uken eller når du trenger det.</p></div></div></section>
    <form id="home-search" class="hero-search" aria-label="Søk etter arbeidsplass"><div class="search-tabs" role="group" aria-label="Velg leieform">${Object.entries(modes).map(([id, mode]) => `<button type="button" class="search-tab${homeMode === id ? ' active' : ''}" data-action="home-mode" data-mode="${id}" aria-pressed="${homeMode === id}">${icon(id === 'monthly' ? 'chair' : 'calendar')}${mode.label}</button>`).join('')}</div><div class="search-fields"><div class="field"><label for="home-location">Hvor vil du jobbe?</label><div class="input-icon">${icon('pin')}<input id="home-location" name="q" placeholder="By, bydel eller salong" autocomplete="off" /></div></div><div class="field"><label for="home-type">Hva ser du etter?</label><select id="home-type" name="type"><option value="">Alle arbeidsplasser</option>${categories.map(c => `<option value="${c.id}">${c.label}</option>`).join('')}</select></div><div class="field" id="home-date-field">${renderHomeDate()}</div><button class="button" type="submit">${icon('search')}Finn arbeidsplass</button></div></form>
    <div class="home-categories"><span class="muted">En plass til ditt fag</span>${categories.map(c => `<a class="category-link" href="#/sok?type=${c.id}"><span class="category-icon">${icon(c.icon)}</span>${c.label}</a>`).join('')}</div>
    <section class="section home-featured"><div class="section-heading"><div><span class="eyebrow">Finn noe som passer deg</span><h2>Her kan du høre til</h2><p>Ulike fag. Ulike steder. Rom for din egen vei.</p></div>${link('#/sok', 'Se alle plasser', 'text-button', 'arrow')}</div><div class="listing-grid">${featured.map(l => renderCard(l)).join('')}</div></section>
    <section class="how-section" aria-labelledby="how-title"><div><span class="eyebrow">Fra nysgjerrig til på plass</span><h2 id="how-title">En enklere vei<br>til din egen base.</h2></div><div class="how-steps"><div><p class="step-number">01</p><h3>Finn din plass</h3><p>Utforsk arbeidsplasser og se hva som er inkludert, hva det koster og hvem du deler med.</p></div><div><p class="step-number">02</p><h3>Bli litt kjent</h3><p>Send en uforpliktende forespørsel. Still spørsmål og avtal en visning direkte med utleier.</p></div><div><p class="step-number">03</p><h3>Avtal det sammen</h3><p>Når det føles riktig, avtaler dere leie og vilkår direkte. Du får frihet til å drive på din måte.</p></div></div></section>
    <section class="host-invite"><div><span class="eyebrow" style="margin-bottom:10px">Har du rom for en til?</span><h3>La en ledig plass bli en ny mulighet.</h3><p>Vis frem salongen din og møt selvstendige fagpersoner som passer inn.</p></div><button class="button outline" data-action="new-listing">Lei ut en arbeidsplass${icon('arrow')}</button></section></div>`;
}
function renderHomeDate() {
  if (homeMode === 'weekly') return `<label for="home-days">Ønskede ukedager</label><select id="home-days" name="days"><option value="">Åpen for forslag</option><option value="1">Mandager</option><option value="2">Tirsdager</option><option value="3">Onsdager</option><option value="4">Torsdager</option><option value="5">Fredager</option><option value="1,3">Mandag og onsdag</option><option value="2,4">Tirsdag og torsdag</option></select>`;
  return `<label for="home-date">${homeMode === 'flex' ? 'Ønsket dato' : 'Ønsket oppstart'}</label><input id="home-date" name="date" type="date" min="${today()}" aria-label="${homeMode === 'flex' ? 'Ønsket dato' : 'Ønsket oppstart'}" />`;
}
function searchHash(next) {
  const params = new URLSearchParams();
  Object.entries(next).forEach(([key, value]) => { if (Array.isArray(value)) { if (value.length) params.set(key, value.join(',')); } else if (value && value !== 'relevance') params.set(key, value); });
  return `#/sok${params.size ? '?' + params : ''}`;
}
function filterFields() {
  return `<fieldset class="filter-group"><legend>Type arbeidsplass</legend><select name="type" aria-label="Type arbeidsplass"><option value="">Alle typer</option>${categories.map(c => `<option value="${c.id}" ${filters.type === c.id ? 'selected' : ''}>${c.label}</option>`).join('')}</select></fieldset>
  <fieldset class="filter-group"><legend>Leieform</legend>${[['', 'Alle leieformer'], ...Object.entries(modes).map(([id, m]) => [id, m.label])].map(([id, label]) => `<label class="check-label"><input type="radio" name="mode" value="${id}" ${filters.mode === id ? 'checked' : ''}/>${label}</label>`).join('')}</fieldset>
  <div class="filter-group" id="filter-price-field">${filterPriceField(filters.mode)}</div>
  <div class="filter-group"><label class="field-label" for="filter-date">Ønsket ${filters.mode === 'flex' ? 'dato' : 'oppstart'}</label><input id="filter-date" name="date" type="date" min="${today()}" value="${esc(filters.date)}" /></div>
  <fieldset class="filter-group"><legend>Inkludert i leien</legend>${amenities.filter(a => ['water', 'towels', 'storage', 'ventilation'].includes(a.id)).map(a => `<label class="check-label"><input type="checkbox" name="amenities" value="${a.id}" ${filters.amenities.includes(a.id) ? 'checked' : ''} />${a.label}</label>`).join('')}</fieldset><button type="submit" class="button filter-apply">Vis arbeidsplasser${icon('arrow')}</button><button type="button" class="text-button full" data-action="reset-filters">Nullstill filtre</button>`;
}
function filterPriceField(mode, value = filters.maxPrice) {
  return mode ? `<label class="field-label" for="filter-max-price">${mode === 'flex' ? 'Makspris per dag' : mode === 'weekly' ? 'Makspris per fast ukedag / mnd' : 'Makspris per måned'}</label><input id="filter-max-price" name="maxPrice" type="number" min="0" step="50" placeholder="Ingen makspris" value="${esc(value)}"/><p class="filter-note">Prisene sammenlignes for valgt leieform.</p>` : '<span class="field-label">Pris</span><p class="filter-note">Velg leieform for å sammenligne priser med samme enhet.</p>';
}
function activeFilterChips() {
  const items = [];
  if (filters.q) items.push(['q', filters.q]);
  if (filters.type) items.push(['type', categories.find(c => c.id === filters.type)?.label]);
  if (filters.mode) items.push(['mode', modes[filters.mode].label]);
  if (filters.maxPrice && filters.mode) items.push(['maxPrice', `Maks ${money(filters.maxPrice)} kr ${filters.mode === 'flex' ? '/ dag' : filters.mode === 'weekly' ? '/ ukedag / mnd' : '/ mnd'}`]);
  if (filters.date) items.push(['date', dateLabel(filters.date)]);
  if (filters.days.length) items.push(['days', filters.days.map(d => weekdaysShort[d]).join(' + ')]);
  if (filters.amenities.length) items.push(['amenities', `${filters.amenities.length} fasiliteter`]);
  return items.length ? `<div class="active-filters">${items.map(([key, label]) => `<button class="filter-chip" data-action="remove-filter" data-key="${key}" aria-label="Fjern filter ${esc(label)}">${esc(label)}${icon('close')}</button>`).join('')}</div>` : '';
}
function renderSearch() {
  const results = filterListings(state.listings, filters);
  return `<div class="container"><div class="page-intro"><span class="eyebrow">Et sted for ditt neste steg</span><h1>Finn din arbeidsplass</h1><p>Se hva som passer ditt fag, din hverdag og måten du vil jobbe på.</p><form id="results-search" class="results-search"><div class="input-icon">${icon('search')}<input name="q" value="${esc(filters.q)}" placeholder="Søk by, bydel eller salong" aria-label="Søk by, bydel eller salong" /></div><button type="submit" class="button">Søk</button></form>${activeFilterChips()}</div><div class="results-layout"><aside class="desktop-filters"><form id="desktop-filters" class="filters"><h3>${icon('tune')}Tilpass søket</h3>${filterFields()}</form></aside><section aria-label="Søkeresultater"><div class="results-toolbar"><div class="row"><span class="count">${results.length} ${results.length === 1 ? 'arbeidsplass' : 'arbeidsplasser'}</span><button data-action="open-filters" class="button outline mobile-filter-button">${icon('tune')}Filtrer</button></div><div class="row"><label class="muted sort-label" for="sort-results">Sorter:</label><select id="sort-results" aria-label="Sorter søkeresultater"><option value="relevance" ${filters.sort === 'relevance' ? 'selected' : ''}>Anbefalte</option><option value="newest" ${filters.sort === 'newest' ? 'selected' : ''}>Nyeste først</option>${filters.mode ? `<option value="price" ${filters.sort === 'price' ? 'selected' : ''}>Lavest pris først</option>` : ''}</select></div></div>${results.length ? `<div class="listing-grid results-grid">${results.map(l => renderCard(l, filters.mode)).join('')}</div><p class="results-footnote">Du har sett alle ${results.length} treff. Tilgjengelighet bekreftes av utleier.</p>` : emptyState('search', 'Ingen plasser akkurat her', 'Prøv et annet sted, en annen leieform eller færre filtre. Kanskje din neste base er litt nærmere enn du tror.', '<button class="button" data-action="reset-filters">Vis alle arbeidsplasser</button>')}</section></div></div>`;
}
function emptyState(symbol, title, text, action = '') { return `<div class="empty-state"><span class="empty-icon">${icon(symbol)}</span><h2>${title}</h2><p>${text}</p>${action}</div>`; }
function renderFavorites() {
  const listings = state.listings.filter(l => state.favorites.includes(l.id) && l.status === 'published');
  return `<div class="container"><div class="page-intro"><span class="eyebrow">Plasser du vil se igjen</span><h1>Lagret med en god følelse</h1><p>Samle favorittene dine og finn tilbake når du er klar for neste steg.</p></div>${listings.length ? `<div class="listing-grid">${listings.map(l => renderCard(l)).join('')}</div>` : emptyState('heart', 'En plass til favorittene dine', 'Trykk på hjertet ved en arbeidsplass du liker. Da finner du den igjen her.', link('#/sok', 'Utforsk arbeidsplasser', 'button', 'arrow'))}</div>`;
}
function initSelection(listing) {
  const mode = Object.hasOwn(listing.prices, filters.mode) ? filters.mode : Object.keys(listing.prices)[0];
  const startDate = filters.date && filters.date >= today() && filters.date >= listing.availableFrom ? filters.date : listing.availableFrom > today() ? listing.availableFrom : today();
  selection = { listingId: listing.id, mode, startDate, weekdays: filters.days.filter(d => listing.availableWeekdays.includes(d)), dates: mode === 'flex' && availableOn(listing, startDate) ? [startDate] : [], error: '' };
  calendarOffset = 0;
}
function renderListing() {
  const listing = state.listings.find(l => l.id === currentRoute.id);
  if (!listing) return renderNotFound();
  if (listing.status !== 'published' && !(state.role === 'owner' && listing.ownerId === state.ownerId)) return `<div class="container section">${emptyState('chair', 'Denne plassen tar en liten pause', 'Utleier tar ikke imot nye forespørsler akkurat nå. Utforsk gjerne andre arbeidsplasser.', link('#/sok', 'Se andre arbeidsplasser'))}</div>`;
  if (selection?.listingId !== listing.id) initSelection(listing);
  const cat = categoryOf(listing);
  const photos = listing.gallery?.length ? listing.gallery : [listing.image];
  return `<div class="container"><div class="detail-top"><div class="breadcrumb"><a href="${searchHash(filters)}">Arbeidsplasser</a>${icon('chevron')}<span>${esc(listing.city)}</span>${icon('chevron')}<span>${esc(listing.salon)}</span></div><div class="row"><button class="icon-button bordered${state.favorites.includes(listing.id) ? ' text-rose' : ''}" data-action="favorite" data-id="${listing.id}" aria-label="${state.favorites.includes(listing.id) ? 'Fjern fra' : 'Lagre som'} favoritt" aria-pressed="${state.favorites.includes(listing.id)}">${icon('heart')}</button><button class="icon-button bordered" data-action="share" aria-label="Kopier lenke til annonsen">${icon('share')}</button></div></div>
  ${listing.status !== 'published' ? '<div class="draft-banner"><span>Du ser en annonse som ikke er publisert.</span><a class="text-button" href="#/utleier">Til utleieroversikt</a></div>' : ''}
  <div class="gallery${photos.length === 1 ? ' single' : ''}"><button data-action="gallery" data-index="0" aria-label="Åpne bildegalleri">${image(photos[0], `${cat.label} hos ${listing.salon}`, 'fetchpriority="high"')}</button>${photos.length > 1 ? `<div class="gallery-side">${[1, 2].map((index) => `<button data-action="gallery" data-index="${index % photos.length}" aria-label="Se bilde ${index + 1}">${image(photos[index % photos.length], `Interiør hos ${listing.salon}`)}</button>`).join('')}</div>` : ''}<span class="badge white gallery-label">${icon(cat.icon)}${cat.label} · ${photos.length} ${photos.length === 1 ? 'bilde' : 'bilder'}</span></div>
  <div class="detail-layout"><article class="detail-copy"><span class="eyebrow">${esc(listing.salon)}</span><h1>${esc(listing.title)}</h1><div class="detail-meta"><span>${icon('pin')}${esc(listing.area)}, ${esc(listing.city)}</span><span>${icon('home')}${esc(listing.size)} m²</span><span>${icon('users')}${esc(listing.tag || 'Selvstendig i fellesskap')}</span></div><div class="profession-chips">${listing.professions.map(p => `<span class="badge">${esc(p)}</span>`).join('')}</div>
  <section class="detail-section"><h2>Et lite innblikk i hverdagen her</h2><p>${esc(listing.description)}</p></section>
  <section class="detail-section"><h2>Dette følger med</h2><div class="amenity-grid">${listing.amenities.map(id => { const a = amenities.find(a => a.id === id); return a ? `<div class="amenity-item"><span class="amenity-icon">${icon(a.icon)}</span>${a.label}</div>` : ''; }).join('')}</div>${listing.note ? `<div class="info-box" style="margin-top:23px">${icon('info')}<span>${esc(listing.note)}</span></div>` : ''}</section>
  <section class="detail-section"><h2>Greit å vite før du spør</h2><div class="stack"><div><p class="field-label">Tilgang</p><p class="muted small" style="margin-top:6px">${esc(listing.access)}</p></div><div><p class="field-label">Dette ordner du selv</p><p class="muted small" style="margin-top:6px">${esc(listing.ownEquipment)}</p></div><div><p class="field-label">Leievilkår</p><p class="muted small" style="margin-top:6px">${esc(listing.terms)}</p></div></div></section>
  <section class="detail-section"><h2>Hils på utleieren</h2><div class="host-box">${avatar(listing.host, listing.avatar, listing.hostPhoto, true)}<div><h3>${esc(listing.host)}</h3><p class="muted">${esc(listing.hostRole)} · ${esc(listing.salon)}</p></div></div><button data-action="inquire" data-intent="question" class="text-button" style="margin-top:13px">${icon('message')}Still et spørsmål</button></section>
  <section class="detail-section"><h2>Her finner du plassen</h2><p>${esc(listing.address)}, ${esc(listing.area)}, ${esc(listing.city)}</p><div class="location-box" aria-label="Illustrasjon av beliggenheten, ikke et interaktivt kart"><span class="map-pin">${icon(cat.icon)}</span><span class="map-caption">Illustrert beliggenhet · demo</span></div></section></article>
  <aside class="rent-panel" id="rent-panel" aria-label="Velg leieform og send forespørsel">${renderRentPanel(listing)}</aside></div></div><div class="mobile-rent-dock" id="mobile-rent-dock">${renderRentDock(listing)}</div>`;
}
function renderRentPanel(listing) {
  const total = calculatePrice(listing, selection);
  return `<h2>Finn din rytme</h2><p>Velg hvordan du vil bruke plassen.</p><div class="rent-models" role="group" aria-label="Leieform">${Object.entries(listing.prices).map(([id, price]) => `<button class="rent-model${selection.mode === id ? ' selected' : ''}" data-action="rent-mode" data-mode="${id}" aria-pressed="${selection.mode === id}"><span class="radio-circle"></span><span class="grow"><span class="rent-model-name">${modes[id].label}</span><span class="rent-model-desc" style="display:block">${id === 'monthly' ? 'Din faste base' : id === 'weekly' ? 'De samme dagene hver uke' : 'Dager etter ditt behov'}</span></span><span class="rent-model-price">${money(price)} kr<small>${modes[id].unit}</small></span></button>`).join('')}</div>
  <div class="rent-options">${selection.mode === 'flex' ? `<div><div class="field-label" style="margin-bottom:12px">Hvilke dager ønsker du?</div>${renderCalendar(listing)}<p class="filter-note">Illustrerende tilgjengelighet. Utleier bekrefter datoene.</p><div class="selected-dates">${selection.dates.slice().sort().map(date => `<button data-action="select-date" data-date="${date}" aria-label="Fjern ${dateLabel(date)}">${dateLabel(date)}${icon('close')}</button>`).join('')}</div></div>` : `${selection.mode === 'weekly' ? `<div><span class="field-label">Velg faste ukedager</span><div class="weekday-picker">${weekdayOrder.map(day => `<button class="day-button${selection.weekdays.includes(day) ? ' selected' : ''}" data-action="select-weekday" data-day="${day}" ${!listing.availableWeekdays.includes(day) ? 'disabled' : ''} aria-label="${weekdayLabels[day]}" aria-pressed="${selection.weekdays.includes(day)}">${weekdaysShort[day]}</button>`).join('')}</div><p class="filter-note">${selection.weekdays.length ? `${selection.weekdays.length} ${selection.weekdays.length === 1 ? 'ukedag' : 'ukedager'} hver uke` : 'Velg én eller flere dager'} · fast månedspris</p></div>` : ''}<div class="field"><label for="rental-start">Ønsket oppstart</label><input type="date" id="rental-start" min="${listing.availableFrom > today() ? listing.availableFrom : today()}" value="${esc(selection.startDate)}" /></div>`}</div>
  <div class="rent-summary"><span>${selection.mode === 'weekly' ? 'Din månedspris' : selection.mode === 'flex' ? `For ${selection.dates.length} ${selection.dates.length === 1 ? 'ønsket dag' : 'ønskede dager'}` : 'Månedspris'}</span><span><strong>${money(total)} kr</strong>${selection.mode !== 'flex' ? '<small> / mnd</small>' : ''}</span></div><p class="muted tiny" style="margin-top:4px;text-align:right">${esc(listing.vat)}</p>${selection.error ? `<p class="selection-error" role="alert">${esc(selection.error)}</p>` : ''}
  <button class="button full" data-action="inquire" ${listing.status !== 'published' ? 'disabled' : ''}>Send forespørsel${icon('arrow')}</button><p class="rent-disclaimer">${icon('message')}Uforpliktende dialog. Utleier bekrefter tilgjengelighet.<br>Avtale og betaling ordnes direkte mellom dere.</p>`;
}
function renderCalendar(listing) {
  const now = new Date(); const first = new Date(now.getFullYear(), now.getMonth() + calendarOffset, 1, 12); const month = first.toLocaleDateString('nb-NO', { month: 'long', year: 'numeric' });
  const padding = (first.getDay() + 6) % 7; const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  return `<div class="calendar-heading"><button class="icon-button" data-action="calendar-prev" ${calendarOffset === 0 ? 'disabled' : ''} aria-label="Forrige måned">${icon('back')}</button><span style="text-transform:capitalize">${month}</span><button class="icon-button" data-action="calendar-next" ${calendarOffset >= 5 ? 'disabled' : ''} aria-label="Neste måned">${icon('arrow')}</button></div><div class="calendar-grid">${weekdayOrder.map(day => `<span class="calendar-weekday">${weekdaysShort[day]}</span>`).join('')}${'<span></span>'.repeat(padding)}${Array.from({ length: days }, (_, i) => { const date = dateKey(new Date(first.getFullYear(), first.getMonth(), i + 1, 12)); const disabled = date < today() || !availableOn(listing, date); return `<button class="calendar-day${selection.dates.includes(date) ? ' selected' : ''}" data-action="select-date" data-date="${date}" ${disabled ? 'disabled' : ''} aria-label="${dateLabel(date, { month: 'long', year: 'numeric' })}" aria-pressed="${selection.dates.includes(date)}">${i + 1}</button>`; }).join('')}</div>`;
}
function renderRentDock(listing) {
  const total = calculatePrice(listing, selection); const ready = !validateSelection(listing, selection);
  const description = selection.mode === 'flex' ? `${selection.dates.length} ${selection.dates.length === 1 ? 'ønsket dag' : 'ønskede dager'}` : selection.mode === 'weekly' ? `${selection.weekdays.length} faste ukedager / mnd` : 'per måned';
  return `<div><strong>${money(total)} kr</strong><small>${description} · ${esc(listing.vat)}</small></div><button class="button" data-action="${ready ? 'inquire' : 'scroll-rent'}" ${listing.status !== 'published' ? 'disabled' : ''}>${ready ? 'Send forespørsel' : selection.mode === 'flex' ? 'Velg datoer' : 'Velg ukedager'}${icon('arrow')}</button>`;
}
function updateRentPanel() {
  const listing = state.listings.find(l => l.id === selection?.listingId); if (!listing) return;
  const focused = document.activeElement?.closest('[data-action]');
  const focusedData = focused ? { ...focused.dataset } : null;
  document.querySelector('#rent-panel').innerHTML = renderRentPanel(listing);
  document.querySelector('#mobile-rent-dock').innerHTML = renderRentDock(listing);
  if (focusedData) [...document.querySelectorAll('#rent-panel [data-action]')].find(el => Object.entries(focusedData).every(([key, value]) => el.dataset[key] === value))?.focus({ preventScroll: true });
}

function statusBadge(request) {
  return `<span class="badge ${request.status === 'confirmed' ? 'green' : request.status === 'closed' ? 'neutral' : request.status === 'viewing' ? 'peach' : ''}">${request.status === 'confirmed' ? icon('check') : ''}${statusLabels[request.status] || 'Sendt'}</span>`;
}
function requestCard(request) {
  const listing = state.listings.find(l => l.id === request.listingId); if (!listing) return '';
  const last = request.messages.at(-1);
  return `<article class="request-card">${image(listing.image, listing.salon)}<div class="grow"><div class="row between wrap">${statusBadge(request)}<span class="muted tiny">${dateLabel(request.createdAt)}</span></div><h3><a href="#/foresporsler/${request.id}">${esc(state.role === 'owner' ? request.renterName : listing.salon)}</a></h3><p class="small muted">${state.role === 'owner' ? `${esc(listing.salon)} · ` : ''}${modes[request.mode].label} · ${esc(requestSummary(request))}</p><p class="request-snippet">${last ? esc(last.text) : 'Ingen meldinger ennå'}</p></div><div class="request-card-action"><strong class="text-rose small">${money(request.total)} kr ${request.mode === 'flex' ? 'totalt' : '/ mnd'}</strong>${link(`#/foresporsler/${request.id}`, 'Åpne dialog', 'button secondary small', 'arrow')}</div></article>`;
}
function renderRequests() {
  const all = visibleRequests().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const visible = all.filter(request => requestTab === 'closed' ? request.status === 'closed' : requestTab === 'all' || request.status !== 'closed');
  return `<div class="container section" style="padding-top:36px"><div class="page-actions"><div><span class="eyebrow">Gode plasser begynner med en samtale</span><h1>${state.role === 'owner' ? 'Dine leieforespørsler' : 'Mine forespørsler'}</h1><p>${state.role === 'owner' ? 'Bli kjent med fagpersonene som er nysgjerrige på salongen din.' : 'Følg dialogen med utleier og finn ut om plassen passer for deg.'}</p></div><span class="role-pill">${icon(state.role === 'owner' ? 'store' : 'user')}${state.role === 'owner' ? `Utleier: ${esc(ownerProfile().name)}` : 'Leietaker: Silje'}</span></div><div class="tabs" role="group" aria-label="Filtrer forespørsler">${[['active', 'Aktive'], ['closed', 'Avsluttede'], ['all', 'Alle']].map(([id, label]) => `<button class="tab-link${requestTab === id ? ' active' : ''}" data-action="request-tab" data-tab="${id}" aria-pressed="${requestTab === id}">${label} (${all.filter(r => id === 'all' || (id === 'active' ? r.status !== 'closed' : r.status === 'closed')).length})</button>`).join('')}</div>${visible.length ? `<div class="request-list">${visible.map(requestCard).join('')}</div>` : emptyState('message', requestTab === 'closed' ? 'Ingen avsluttede dialoger' : 'Her begynner neste kapittel', state.role === 'owner' ? 'Når noen sender en forespørsel om en av plassene dine, dukker den opp her.' : 'Når du sender en forespørsel, samler vi dialogen og leieønsket ditt her.', state.role === 'owner' ? link('#/utleier', 'Se mine annonser', 'button', 'arrow') : link('#/sok', 'Finn en arbeidsplass', 'button', 'arrow'))}<div class="info-box" style="margin-top:27px">${icon('info')}<span>En forespørsel starter en dialog. Visning, pris og leievilkår avklares mellom partene. Ingen leieavtale inngås i prototypen.</span></div></div>`;
}
function renderConversation() {
  const request = visibleRequests().find(r => r.id === currentRoute.id);
  if (!request) return `<div class="container section">${emptyState('message', 'Denne dialogen tilhører en annen demorolle', 'Bytt demorolle for å se andre samtaler, eller gå tilbake til forespørslene dine.', '<button class="button" data-action="demo-settings">Bytt demorolle</button>' + link('#/foresporsler', 'Mine forespørsler', 'button outline'))}</div>`;
  const listing = state.listings.find(l => l.id === request.listingId);
  if (!listing) return renderNotFound();
  const isOwner = state.role === 'owner';
  const person = isOwner ? request.renterName : listing.host;
  const personAvatar = isOwner ? request.renterName.split(' ').map(n => n[0]).slice(0, 2).join('') : listing.avatar;
  return `<div class="container section" style="padding-top:28px"><div class="breadcrumb"><a href="#/foresporsler">Forespørsler</a>${icon('chevron')}<span>${esc(listing.salon)}</span></div><div class="page-actions"><div><span class="eyebrow">Bli kjent før du bestemmer deg</span><h1>En god start</h1></div>${request.renterId === 'demo-renter' ? `<button class="button outline small" data-action="switch-conversation-role" data-id="${request.id}">${icon('users')}Prøv som ${isOwner ? 'leietaker' : 'utleier'}</button>` : ''}</div><div class="conversation-layout"><section class="conversation" aria-label="Samtale med ${esc(person)}"><div class="conversation-header">${avatar(person, personAvatar, isOwner ? null : listing.hostPhoto)}<div class="grow"><h2>${esc(person)}</h2><p class="muted">${isOwner ? esc(request.profession) : esc(listing.salon)} · Demodialog</p></div>${statusBadge(request)}</div><div class="conversation-messages" id="conversation-messages" role="log" aria-label="Meldingshistorikk" aria-live="polite">${request.messages.map(message => renderMessage(message, request, listing)).join('')}</div>${request.viewing && request.status !== 'closed' ? renderViewing(request) : ''}${request.status === 'closed' ? `<div class="closed-notice">Denne dialogen er avsluttet. <button class="text-button" data-action="reopen-request" data-id="${request.id}">Åpne dialogen igjen</button></div>` : `<form class="message-form" id="message-form" data-id="${request.id}"><label for="message-text" class="field-label" style="margin-bottom:8px">Din melding til ${esc(person.split(' ')[0])}</label><div class="row"><textarea id="message-text" name="message" rows="2" maxlength="2000" placeholder="Spør om plassen, fortell om deg selv eller avtal en visning…" required></textarea><button type="submit" class="button" aria-label="Send demomelding">${icon('send')}</button></div><div class="message-note">Meldinger lagres bare i denne nettleseren.${!isOwner ? ` <button type="button" class="text-button" style="font-size:9px;padding:4px" data-action="simulate-reply" data-id="${request.id}">Vis et demosvar fra utleier</button>` : ''}</div></form>`}</section>
    <aside class="request-aside">${image(listing.image, listing.salon)}<div class="request-aside-body"><span class="badge">${categoryOf(listing).label}</span><h3>${esc(listing.salon)}</h3><p class="small muted">${esc(listing.area)}, ${esc(listing.city)}</p><div class="summary-lines"><div><span class="muted">Leieform</span><strong>${modes[request.mode].label}</strong></div><div><span class="muted">Ønsket</span><strong>${esc(requestSummary(request))}</strong></div><div><span class="muted">Pris${request.mode === 'flex' ? ' totalt' : ' / mnd'}</span><strong>${money(request.total)} kr</strong></div><div><span class="muted">Mva.</span><strong>${esc(listing.vat)}</strong></div></div><a href="#/annonse/${listing.id}" class="text-button" style="margin-top:12px">Se arbeidsplassen${icon('arrow')}</a>${request.status !== 'closed' ? `<div class="host-actions">${isOwner ? `<button class="button full" data-action="propose-viewing" data-id="${request.id}">${icon('calendar')}${request.viewing ? 'Foreslå nytt tidspunkt' : 'Foreslå visning'}</button>` : ''}<button class="button outline full" data-action="close-request" data-id="${request.id}">Avslutt forespørsel</button></div>` : ''}<hr class="divider"><div class="info-box" style="padding:13px;font-size:9px">${icon('info')}<span>En avtalt visning er et møte for å bli kjent. Selve leieavtalen inngås direkte mellom dere.</span></div></div></aside></div></div>`;
}
function renderMessage(message, request, listing) {
  const mine = message.author === (state.role === 'owner' ? 'host' : 'renter');
  const author = message.author === 'host' ? listing.host : request.renterName;
  const timestamp = new Date(message.createdAt).toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' });
  return `<div class="message${mine ? ' mine' : ''}"><p class="message-name">${mine ? 'Du' : esc(author.split(' ')[0])}${message.simulated ? ' · demosvar' : ''}</p><div class="message-bubble">${esc(message.text)}</div><p class="message-time">${dateLabel(message.createdAt)} · ${timestamp}</p></div>`;
}
function renderViewing(request) {
  const confirmed = request.status === 'confirmed';
  return `<div class="viewing-card"><span class="eyebrow">${icon(confirmed ? 'check' : 'calendar')}${confirmed ? 'Visning avtalt' : 'La oss møtes'}</span><h3>${dateLabel(request.viewing.date, { weekday: 'long', month: 'long' })} kl. ${esc(request.viewing.time)}</h3><p>${confirmed ? 'Tidspunktet er bekreftet i demoen. Dere møtes for å se plassen og bli kjent.' : state.role === 'owner' ? 'Forslaget ditt ligger klart for leietakeren. Prøv leietakerrollen for å bekrefte tidspunktet.' : 'Utleier har foreslått dette tidspunktet. Passer det for deg?'}</p>${!confirmed && state.role === 'renter' ? `<div class="row"><button class="button small" data-action="confirm-viewing" data-id="${request.id}">${icon('check')}Bekreft visning</button><button class="text-button" data-action="suggest-other-time">Foreslå noe annet</button></div>` : ''}</div>`;
}
function scrollMessages() { requestAnimationFrame(() => { const el = document.querySelector('#conversation-messages'); if (el) el.scrollTop = el.scrollHeight; }); }
function renderOwner() {
  const profile = ownerProfile();
  const listings = ownerListings();
  const requests = visibleRequests().filter(r => r.status !== 'closed');
  const incoming = requests.filter(r => r.status === 'sent');
  const viewings = requests.filter(r => r.status === 'viewing' || r.status === 'confirmed');
  return `<div class="container section" style="padding-top:34px"><div class="dashboard-intro"><div><span class="eyebrow">${icon('store')}Utleieroversikt</span><h1>Hei, ${esc(profile.name.split(' ')[0])}.</h1><p>Her gir du ledige plasser nye muligheter.<br>${esc(profile.salon)} · ${esc(profile.name)}</p></div><button class="button" data-action="new-listing">${icon('plus')}Opprett annonse</button></div><div class="dashboard-stats"><div class="stat-card"><span class="stat-icon">${icon('chair')}</span><div><p class="stat-number">${listings.filter(l => l.status === 'published').length}</p><p class="stat-label">Publiserte annonser</p></div></div><div class="stat-card"><span class="stat-icon">${icon('message')}</span><div><p class="stat-number">${incoming.length}</p><p class="stat-label">Nye forespørsler</p></div></div><div class="stat-card"><span class="stat-icon">${icon('calendar')}</span><div><p class="stat-number">${viewings.length}</p><p class="stat-label">Visninger i dialog</p></div></div></div>
  ${state.draft?.ownerId === state.ownerId ? `<div class="draft-banner"><span>${icon('edit')} Du har et lagret annonseutkast.</span><a class="text-button" href="#/utleier/ny">Fortsett på utkastet${icon('arrow')}</a></div>` : ''}
  <section class="dashboard-section"><div class="section-heading"><div><span class="eyebrow">Bli kjent med din neste kollega</span><h2>Forespørsler å følge opp</h2></div>${link('#/foresporsler', 'Se alle', 'text-button', 'arrow')}</div>${requests.length ? `<div class="request-list">${[...requests].sort((a, b) => (a.status === 'sent' ? -1 : 1) - (b.status === 'sent' ? -1 : 1)).slice(0, 3).map(requestCard).join('')}</div>` : emptyState('message', 'Plass til nye samtaler', 'Forespørsler om dine publiserte arbeidsplasser vises her. Du kan også prøve leietakerrollen og sende en demoforespørsel.', '<button class="button outline" data-action="become-renter">Prøv som leietaker</button>')}</section>
  <section class="dashboard-section"><div class="section-heading"><div><span class="eyebrow">Dine arbeidsplasser</span><h2>Mine annonser</h2></div><span class="muted small">${listings.length} ${listings.length === 1 ? 'annonse' : 'annonser'}</span></div>${listings.map(renderOwnerListing).join('') || emptyState('chair', 'Din første annonse begynner her', 'Vis frem arbeidsplassen din og hva som gjør salongen til et godt sted å jobbe.', '<button class="button" data-action="new-listing">Opprett annonse</button>')}</section><div class="dashboard-tip">${icon('flower')}<div><h3>En god annonse handler om mer enn en ledig stol.</h3><p>Fortell om menneskene, rytmen og hva som følger med. Det hjelper riktig fagperson å kjenne seg igjen.</p></div></div></div>`;
}
function renderOwnerListing(listing) {
  const count = state.requests.filter(r => r.listingId === listing.id && r.status !== 'closed').length;
  const mode = Object.keys(listing.prices)[0];
  return `<article class="owner-listing">${image(listing.image, listing.salon)}<div><div class="row"><span class="badge ${listing.status === 'published' ? 'green' : 'neutral'}">${listing.status === 'published' ? 'Publisert' : listing.status === 'paused' ? 'Pauset' : 'Utkast'}</span><span class="muted tiny">${categoryOf(listing).label}</span></div><h3>${esc(listing.title)}</h3><p class="small muted">${esc(listing.area)}, ${esc(listing.city)} · ${money(listing.prices[mode])} kr ${modes[mode].unit}${count ? ` · ${count} ${count === 1 ? 'forespørsel' : 'forespørsler'}` : ''}</p></div><div class="owner-listing-actions">${link(`#/annonse/${listing.id}`, 'Se annonse', 'button outline small', 'eye')}${link(`#/utleier/rediger/${listing.id}`, 'Rediger', 'button secondary small', 'edit')}<button class="button outline small" data-action="toggle-listing" data-id="${listing.id}">${icon(listing.status === 'published' ? 'pause' : 'play')}${listing.status === 'published' ? 'Pause' : 'Publiser'}</button></div></article>`;
}
function blankWizard() {
  const profile = ownerProfile();
  return { id: null, ownerId: state.ownerId, type: 'hair', salon: profile.salon, title: '', city: 'Oslo', area: '', address: '', size: '', description: '', image: 'hair.jpg', amenities: ['wifi', 'coffee'], professions: '', note: '', prices: { monthly: 7500 }, availableFrom: today(), availableWeekdays: [1, 2, 3, 4, 5], vat: 'eks. mva.', access: 'Mandag–fredag kl. 07–22. Andre tider etter avtale.', terms: 'Oppstart, oppsigelsestid og øvrige leievilkår avtales direkte med utleier.', ownEquipment: 'Egne produkter, forbruksvarer og betalingsløsning.', agreed: false };
}
function initWizard(id) {
  const listing = id ? state.listings.find(l => l.id === id && l.ownerId === state.ownerId) : null;
  wizard = listing ? { ...structuredClone(listing), professions: listing.professions.join(', '), agreed: false } : !id && state.draft?.ownerId === state.ownerId ? structuredClone(state.draft) : blankWizard();
  if (id && !listing) wizard = null;
  wizardStep = 1;
}
function renderWizard() {
  if (!wizard) return renderNotFound();
  return `<div class="narrow"><div class="wizard-top"><div class="breadcrumb"><a href="#/utleier">Min salong</a>${icon('chevron')}<span>${wizard.id ? 'Rediger annonse' : 'Ny annonse'}</span></div><div class="wizard-heading"><div><span class="eyebrow">Gi plassen din en god introduksjon</span><h1>${wizard.id ? 'Gjør annonsen enda bedre' : 'Rom for en ny kollega'}</h1><p>Fire små steg fra ledig plass til en god annonse.</p></div><button class="text-button" data-action="save-draft">${icon('edit')}Lagre utkast</button></div><div class="wizard-progress" aria-label="Fremdrift">${['Arbeidsplassen', 'Bilder & fasiliteter', 'Leie & pris', 'Se over & publiser'].map((label, i) => `<button class="wizard-step ${wizardStep === i + 1 ? 'active' : wizardStep > i + 1 ? 'done' : ''}" data-action="wizard-step" data-step="${i + 1}" ${i + 1 > wizardStep ? 'disabled' : ''} ${wizardStep === i + 1 ? 'aria-current="step"' : ''}><span>${wizardStep > i + 1 ? '✓' : i + 1}</span><span>${label}</span></button>`).join('')}</div></div><form id="wizard-form" novalidate><div class="wizard-form">${[null, wizardPlace, wizardPhotos, wizardPricing, wizardPreview][wizardStep]()}<div id="wizard-error" class="form-error" role="alert"></div></div><div class="wizard-actions">${wizardStep > 1 ? '<button type="button" class="button outline" data-action="wizard-back">' + icon('back') + 'Tilbake</button>' : link('#/utleier', 'Avbryt', 'button outline')}<button type="submit" class="button">${wizardStep === 4 ? (wizard.id ? 'Lagre og publiser' : 'Publiser annonse') : 'Neste steg'}${icon(wizardStep === 4 ? 'check' : 'arrow')}</button></div></form></div>`;
}
function wizardPlace() {
  return `<h2>Hva slags plass har du?</h2><p class="muted">La fagpersonen se for seg arbeidshverdagen hos deg.</p><div class="form-grid"><div class="field span-2"><span class="field-label">Type arbeidsplass</span><div class="choice-grid">${categories.map(c => `<button type="button" class="choice-card${wizard.type === c.id ? ' selected' : ''}" data-action="wizard-type" data-type="${c.id}" aria-pressed="${wizard.type === c.id}">${icon(c.icon)}${c.label}</button>`).join('')}</div></div><div class="field"><label for="listing-salon">Navn på salong / klinikk *</label><input id="listing-salon" name="salon" value="${esc(wizard.salon)}" maxlength="80" required /></div><div class="field"><label for="listing-title">En beskrivende overskrift *</label><input id="listing-title" name="title" placeholder="Lys frisørstol i et varmt fagmiljø" value="${esc(wizard.title)}" maxlength="100" required /></div><div class="field"><label for="listing-city">By *</label><select id="listing-city" name="city"><option ${wizard.city === 'Oslo' ? 'selected' : ''}>Oslo</option><option ${wizard.city === 'Bergen' ? 'selected' : ''}>Bergen</option><option ${wizard.city === 'Trondheim' ? 'selected' : ''}>Trondheim</option></select></div><div class="field"><label for="listing-area">Bydel / område *</label><input id="listing-area" name="area" value="${esc(wizard.area)}" placeholder="F.eks. Grünerløkka" maxlength="60" required /></div><div class="field"><label for="listing-address">Adresse *</label><input id="listing-address" name="address" value="${esc(wizard.address)}" placeholder="Gate og husnummer" maxlength="100" required /></div><div class="field"><label for="listing-size">Størrelse på plassen (m²) *</label><input id="listing-size" name="size" type="number" min="1" max="500" value="${esc(wizard.size)}" required /></div><div class="field span-2"><label for="listing-professions">Hvilke fag passer plassen for? *</label><input id="listing-professions" name="professions" placeholder="F.eks. Frisør, barber eller hudpleie, massasje" value="${esc(wizard.professions)}" maxlength="150" required /><span class="field-help">Skill gjerne flere fag med komma.</span></div><div class="field span-2"><label for="listing-description">Fortell om plassen og miljøet *</label><textarea id="listing-description" name="description" rows="5" maxlength="2000" placeholder="Hva er spesielt med salongen? Hvem jobber her, og hvordan er hverdagen?" required>${esc(wizard.description)}</textarea><span class="field-help">Skriv minst 30 tegn. Vær konkret og personlig.</span></div></div>`;
}
function wizardPhotos() {
  return `<h2>La plassen komme til sin rett</h2><p class="muted">Velg et bilde fra demobiblioteket, eller prøv et eget bilde.</p><span class="field-label">Velg forsidebilde</span><div class="photo-picker">${demoPhotos.map((photo, i) => `<button type="button" class="photo-option${wizard.image === photo ? ' selected' : ''}" data-action="wizard-photo" data-photo="${photo}" aria-label="Velg demobilde ${i + 1}" aria-pressed="${wizard.image === photo}">${image(photo, `Demobilde av ${['frisørsalong', 'behandlingsrom', 'neglesalong', 'frisørplass', 'velværerom', 'negleplass', 'barbersalong', 'behandlingsrom'][i]}`)}${wizard.image === photo ? `<span class="photo-check">${icon('check')}</span>` : ''}</button>`).join('')}</div>${wizard.image.startsWith('data:') ? `<div class="row" style="margin-top:16px">${image(wizard.image, 'Ditt valgte bilde', 'style="width:90px;height:70px;border-radius:12px"')}<span class="small text-rose">Ditt bilde er valgt</span></div>` : ''}<div class="upload-area"><label for="listing-upload">${icon('upload')}Prøv med et eget bilde</label><p class="muted">Bildet behandles og lagres bare i denne nettleseren. JPG, PNG eller WebP, inntil 5 MB.</p><input id="listing-upload" type="file" accept="image/jpeg,image/png,image/webp" /></div><hr class="divider"><div class="field"><span class="field-label">Dette følger med</span><div class="amenity-checkboxes">${amenities.map(a => `<label>${icon(a.icon)}${a.label}<input type="checkbox" name="amenities" value="${a.id}" ${wizard.amenities.includes(a.id) ? 'checked' : ''}/></label>`).join('')}</div></div><div class="field" style="margin-top:23px"><label for="listing-note">Utstyr og andre detaljer (valgfritt)</label><textarea id="listing-note" name="note" rows="3" maxlength="500" placeholder="F.eks. hev/senk-benk, felles vaskesone eller lagringsplass til farger.">${esc(wizard.note)}</textarea></div>`;
}
function wizardPricing() {
  return `<h2>Finn en leieform som passer</h2><p class="muted">Du kan tilby flere leieformer. Pris og tilgjengelighet vises tydelig i annonsen.</p><div>${Object.entries(modes).map(([id, mode]) => { const enabled = Object.hasOwn(wizard.prices, id); return `<div class="pricing-option${enabled ? ' active' : ''}"><label class="check-label"><input type="checkbox" name="enabledModes" value="${id}" ${enabled ? 'checked' : ''}/>Tilby ${mode.label.toLocaleLowerCase('nb-NO')}</label><p>${mode.explanation}</p><div class="price-input"><input type="number" name="price-${id}" aria-label="Pris for ${mode.label.toLowerCase()}" min="1" max="100000" step="1" value="${enabled ? wizard.prices[id] : id === 'monthly' ? 7500 : id === 'weekly' ? 1800 : 600}" ${enabled ? '' : 'disabled'}/><span>kr ${mode.unit}</span></div></div>`; }).join('')}</div><hr class="divider"><div class="form-grid"><div class="field"><label for="listing-vat">Hvordan oppgis prisen?</label><select name="vat" id="listing-vat">${['eks. mva.', 'inkl. mva.', 'mva. ikke aktuelt'].map(v => `<option ${wizard.vat === v ? 'selected' : ''}>${v}</option>`).join('')}</select></div><div class="field"><label for="listing-available">Tilgjengelig fra *</label><input type="date" name="availableFrom" id="listing-available" min="${today()}" value="${wizard.availableFrom < today() ? today() : wizard.availableFrom}" required /></div><div class="field span-2"><span class="field-label">Dager plassen kan brukes</span><div class="weekday-picker">${weekdayOrder.map(day => `<button type="button" class="day-button${wizard.availableWeekdays.includes(day) ? ' selected' : ''}" data-action="wizard-weekday" data-day="${day}" aria-label="${weekdayLabels[day]}" aria-pressed="${wizard.availableWeekdays.includes(day)}">${weekdaysShort[day]}</button>`).join('')}</div><span class="field-help">Brukes til valg av faste ukedager og fleksible dager.</span></div><div class="field span-2"><label for="listing-access">Tilgangstider *</label><input id="listing-access" name="access" value="${esc(wizard.access)}" maxlength="250" required /></div><div class="field span-2"><label for="listing-terms">Sentrale leievilkår *</label><textarea id="listing-terms" name="terms" rows="3" maxlength="1000" required>${esc(wizard.terms)}</textarea></div><div class="field span-2"><label for="listing-own">Hva må leietakeren ordne selv?</label><textarea id="listing-own" name="ownEquipment" rows="2" maxlength="500">${esc(wizard.ownEquipment)}</textarea></div></div>`;
}
function wizardPreview() {
  return `<h2>Ser dette ut som din plass?</h2><p class="muted">Ta en siste titt før du viser den frem i demomarkedsplassen.</p><div class="wizard-preview">${image(wizard.image, wizard.salon)}<div><span class="badge">${categories.find(c => c.id === wizard.type)?.label}</span><h3>${esc(wizard.salon)}</h3><p>${esc(wizard.title)}</p><p style="margin-top:10px">${icon('pin')}${esc(wizard.area)}, ${esc(wizard.city)} · ${esc(wizard.size)} m²</p><div class="preview-price-list">${Object.entries(wizard.prices).map(([id, price]) => `<div><span>${modes[id].label}</span><strong>${money(price)} kr ${modes[id].unit}</strong></div>`).join('')}</div><p class="tiny" style="margin-top:9px">${esc(wizard.vat)}</p></div></div><p class="preview-description">${esc(wizard.description)}</p><div class="profession-chips">${wizard.amenities.map(id => `<span class="badge">${amenities.find(a => a.id === id)?.label || ''}</span>`).join('')}</div><div class="info-box" style="margin-top:20px">${icon('info')}<span>Publisering legger annonsen til i din lokale demo. Ingen annonse publiseres på internett, og ingen blir kontaktet.</span></div><label class="publish-check"><input type="checkbox" name="agreed" ${wizard.agreed ? 'checked' : ''}/><span>Jeg har sett over opplysningene og vil legge annonsen til i demomarkedsplassen.</span></label>`;
}
function captureWizard() {
  const form = document.querySelector('#wizard-form'); if (!form || !wizard) return;
  const fd = new FormData(form);
  const fields = wizardStep === 1 ? ['salon', 'title', 'city', 'area', 'address', 'size', 'description', 'professions'] : wizardStep === 2 ? ['note'] : wizardStep === 3 ? ['availableFrom', 'vat', 'access', 'terms', 'ownEquipment'] : [];
  fields.forEach(key => { if (fd.has(key)) wizard[key] = String(fd.get(key)).trim(); });
  if (wizardStep === 2) wizard.amenities = fd.getAll('amenities');
  if (wizardStep === 3) wizard.prices = Object.fromEntries(fd.getAll('enabledModes').map(id => [id, Number(fd.get(`price-${id}`))]));
  if (wizardStep === 4) wizard.agreed = fd.has('agreed');
}
function validateWizardStep(step) {
  if (step === 1) {
    if (['salon', 'title', 'city', 'area', 'address', 'professions'].some(key => !wizard[key])) return 'Fyll inn navn, overskrift, by, bydel, adresse og fagområde.';
    if (Number(wizard.size) < 1 || Number(wizard.size) > 500 || !Number.isFinite(Number(wizard.size))) return 'Oppgi en størrelse mellom 1 og 500 m².';
    if (wizard.description.length < 30) return 'Fortell litt mer om arbeidsplassen. Beskrivelsen må ha minst 30 tegn.';
  }
  if (step === 3) {
    if (!Object.keys(wizard.prices).length) return 'Velg minst én leieform.';
    if (Object.values(wizard.prices).some(price => !Number.isFinite(price) || price < 1 || price > 100000)) return 'Oppgi en pris mellom 1 og 100 000 kr for hver valgt leieform.';
    if (!wizard.availableFrom || wizard.availableFrom < today()) return 'Velg en tilgjengelighetsdato fra og med i dag.';
    if (!wizard.availableWeekdays.length) return 'Velg minst én dag plassen kan brukes.';
    if (!wizard.access || !wizard.terms) return 'Fyll inn tilgangstider og sentrale leievilkår.';
  }
  if (step === 4 && !wizard.agreed) return 'Bekreft at du har sett over opplysningene før du publiserer demoannonsen.';
  return '';
}
function refreshWizard() {
  const scroll = window.scrollY;
  document.querySelector('#main').innerHTML = renderWizard();
  window.scrollTo(0, scroll);
}
function renderNotFound() { return `<div class="container section">${emptyState('flower', 'Vi fant ikke denne siden', 'Kanskje neste mulighet ligger et annet sted. Gå tilbake til arbeidsplassene.', link('#/sok', 'Finn arbeidsplass', 'button', 'arrow'))}</div>`; }

function openDialog(content, label, wide = false) {
  lastFocusedElement = document.activeElement;
  document.querySelector('#overlay-root').innerHTML = `<div class="overlay" data-overlay><section class="dialog${wide ? ' wide' : ''}" role="dialog" aria-modal="true" aria-label="${esc(label)}" tabindex="-1"><button class="icon-button close-dialog" data-action="close-dialog" aria-label="Lukk dialog">${icon('close')}</button>${content}</section></div>`;
  document.body.classList.add('modal-open');
  document.querySelector('#app').inert = true;
  requestAnimationFrame(() => { const dialog = document.querySelector('[role=dialog]'); (dialog.querySelector('[autofocus]') || dialog).focus(); });
}
function closeDialog(restoreFocus = true) {
  const root = document.querySelector('#overlay-root');
  if (!root?.children.length) return;
  root.innerHTML = ''; document.body.classList.remove('modal-open');
  document.querySelector('#app').inert = false;
  if (restoreFocus && lastFocusedElement?.isConnected) lastFocusedElement.focus({ preventScroll: true });
}
function showDemoSettings() {
  const owners = [...new Map(state.listings.map(listing => [listing.ownerId, listing])).values()];
  openDialog(`<span class="eyebrow">En prototype du kan utforske</span><h2>Prøv begge sider.</h2><p class="intro">Bytt mellom leietaker og utleier. Forespørsler, meldinger og annonser henger sammen i denne nettleseren.</p><div class="demo-role-options"><button class="demo-role${state.role === 'renter' ? ' selected' : ''}" data-action="set-role" data-role="renter">${icon('user')}<strong>Silje · leietaker</strong><p>Finn en plass, send en forespørsel og avtal visning.</p></button><button class="demo-role${state.role === 'owner' ? ' selected' : ''}" data-action="set-role" data-role="owner">${icon('store')}<strong>${esc(ownerProfile().name.split(' ')[0])} · utleier</strong><p>Vis frem en plass og svar på leieforespørsler.</p></button></div><div class="field"><label for="demo-owner">Hvilken utleier vil du prøve?</label><select id="demo-owner">${owners.map(owner => `<option value="${owner.ownerId}" ${state.ownerId === owner.ownerId ? 'selected' : ''}>${esc(owner.host)} · ${esc(owner.ownerId === 'demo-owner' ? 'Studio Balanse' : owner.salon)}</option>`).join('')}</select><span class="field-help">Når du sender en forespørsel, velges riktig utleier automatisk her.</span></div><hr class="divider"><div class="info-box">${icon('info')}<span>Alt er fiktivt og lagres bare lokalt. Andre nettlesere og enheter har sine egne demodata. Ingen meldinger, avtaler eller annonser sendes ut.</span></div><button class="text-button" data-action="reset-demo" style="margin-top:20px">${icon('reset')}Nullstill demo og start på nytt</button>`, 'Demoinnstillinger');
}
function showInquiry() {
  const listing = state.listings.find(l => l.id === selection?.listingId); if (!listing) return;
  const error = validateSelection(listing, selection);
  if (error) { selection.error = error; updateRentPanel(); document.querySelector('#rent-panel').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
  selection.error = '';
  const total = calculatePrice(listing, selection);
  openDialog(`<span class="eyebrow">En uforpliktende start</span><h2>Hils på ${esc(listing.host.split(' ')[0])}.</h2><p class="intro">Fortell litt om deg selv og hva du ser etter. Utleier bekrefter tilgjengelighet og vilkår i dialogen.</p><div class="dialog-summary">${image(listing.image, listing.salon)}<div><h3>${esc(listing.salon)}</h3><p>${modes[selection.mode].label} · ${esc(requestSummary(selection))}</p><strong>${money(total)} kr ${selection.mode === 'flex' ? 'totalt' : '/ mnd'} · ${esc(listing.vat)}</strong></div></div><form id="inquiry-form" novalidate><div class="form-grid"><div class="field"><label for="inquiry-name">Navnet ditt *</label><input id="inquiry-name" name="name" value="Silje Andersen" maxlength="80" required /></div><div class="field"><label for="inquiry-profession">Ditt fagområde *</label><select id="inquiry-profession" name="profession">${['Frisør', 'Hudpleie', 'Massasje', 'Negler', 'Vipper & bryn', 'Barber', 'Annet'].map(p => `<option ${p === listing.professions[0] ? 'selected' : ''}>${p}</option>`).join('')}</select></div><div class="field span-2"><label for="inquiry-message">En liten introduksjon *</label><textarea id="inquiry-message" name="message" rows="4" maxlength="2000" minlength="10" required placeholder="Fortell om faget ditt, kundene dine og hva du ønsker deg i en arbeidsplass…" autofocus></textarea><span class="field-help">Minst 10 tegn. Du sender som leietaker i demoen.</span></div></div><div id="inquiry-error" class="form-error" role="alert"></div><button class="button full" type="submit" style="margin-top:20px">Send forespørsel${icon('arrow')}</button><p class="rent-disclaimer">Dette er en demonstrasjon. Ingen ekte melding sendes.</p></form>`, 'Send leieforespørsel');
}
function submitInquiry(form) {
  const listing = state.listings.find(l => l.id === selection?.listingId); if (!listing) return;
  const fd = new FormData(form); const name = String(fd.get('name') || '').trim(); const profession = String(fd.get('profession') || '').trim(); const message = String(fd.get('message') || '').trim();
  const error = validateSelection(listing, selection) || (name.length < 2 ? 'Skriv inn navnet ditt.' : !profession ? 'Velg fagområde.' : message.length < 10 ? 'Fortell litt mer om deg selv. Meldingen må ha minst 10 tegn.' : '');
  if (error) { document.querySelector('#inquiry-error').textContent = error; return; }
  const id = `req-${crypto.randomUUID()}`; const now = new Date().toISOString();
  const request = { id, listingId: listing.id, renterId: 'demo-renter', renterName: name, profession, mode: selection.mode, startDate: selection.mode === 'flex' ? [...selection.dates].sort()[0] : selection.startDate, weekdays: [...selection.weekdays], dates: [...selection.dates].sort(), total: calculatePrice(listing, selection), status: 'sent', createdAt: now, messages: [{ id: crypto.randomUUID(), author: 'renter', text: message, createdAt: now }] };
  state.requests.unshift(request); state.ownerId = listing.ownerId; state.role = 'renter'; persist(); render();
  openDialog(`<span class="success-icon">${icon('check')}</span><span class="eyebrow">Det første steget er tatt</span><h2>Forespørselen er sendt.</h2><p class="intro">I demoen ligger den nå klar hos ${esc(listing.host.split(' ')[0])}. Neste steg er å bli kjent og avklare tilgjengelighet.</p><div class="success-summary"><h3>${esc(listing.salon)}</h3><p class="small muted" style="margin-top:8px">${modes[request.mode].label} · ${esc(requestSummary(request))}</p><p class="small text-rose" style="margin-top:8px">${money(request.total)} kr ${request.mode === 'flex' ? 'totalt' : '/ mnd'} · ${esc(listing.vat)}</p></div><div class="stack" style="gap:10px">${link(`#/foresporsler/${id}`, 'Åpne dialogen', 'button full', 'message')}<button class="button outline full" data-action="view-as-owner" data-id="${id}">Prøv å svare som utleier${icon('arrow')}</button></div><p class="rent-disclaimer">Forespørselen er lagret lokalt. Ingen ekte melding er sendt.</p>`, 'Forespørselen er sendt');
}
function showViewingDialog(id) {
  const request = visibleRequests().find(r => r.id === id); if (!request || state.role !== 'owner') return;
  openDialog(`<span class="eyebrow">Et møte for å bli kjent</span><h2>Inviter til visning.</h2><p class="intro">Foreslå et tidspunkt for ${esc(request.renterName.split(' ')[0])}. Leietakeren kan bekrefte det i dialogen.</p><form id="viewing-form" data-id="${id}"><div class="form-grid"><div class="field"><label for="viewing-date">Dato *</label><input type="date" id="viewing-date" name="date" min="${today()}" value="${request.viewing?.date >= today() ? request.viewing.date : dateKey(addDays(today(), 2))}" required /></div><div class="field"><label for="viewing-time">Klokkeslett *</label><input type="time" id="viewing-time" name="time" value="${esc(request.viewing?.time || '14:00')}" required /></div><div class="field span-2"><label for="viewing-message">En liten beskjed</label><textarea id="viewing-message" name="message" rows="3" maxlength="1000">Så hyggelig at du er interessert! Kom gjerne innom, så kan du se plassen og hilse på oss.</textarea></div></div><p id="viewing-error" class="form-error" role="alert"></p><button type="submit" class="button full" style="margin-top:20px">Foreslå tidspunkt${icon('calendar')}</button></form>`, 'Foreslå visning');
}
function submitViewing(form) {
  const request = visibleRequests().find(r => r.id === form.dataset.id); if (!request || state.role !== 'owner') return;
  const fd = new FormData(form); const date = String(fd.get('date')); const time = String(fd.get('time'));
  const scheduled = new Date(`${date}T${time}`);
  if (!Number.isFinite(scheduled.getTime()) || scheduled <= new Date()) { document.querySelector('#viewing-error').textContent = 'Velg et tidspunkt frem i tid.'; return; }
  request.viewing = { date, time, proposedBy: 'host' }; request.status = 'viewing';
  const text = `${String(fd.get('message') || '').trim()}\nForslag til visning: ${dateLabel(date, { weekday: 'long', month: 'long' })} kl. ${time}.`;
  request.messages.push({ id: crypto.randomUUID(), author: 'host', text, createdAt: new Date().toISOString() });
  persist(); closeDialog(); render(); toast('Forslag til visning er lagt til i dialogen.');
}
function publishListing() {
  const profile = ownerProfile(); const original = state.listings.find(l => l.id === wizard.id);
  const listing = { ...structuredClone(wizard), id: wizard.id || `plass-${crypto.randomUUID()}`, ownerId: state.ownerId, host: profile.name, avatar: profile.avatar, hostPhoto: profile.photo, hostRole: 'Salongeier', size: Number(wizard.size), professions: wizard.professions.split(',').map(p => p.trim()).filter(Boolean), status: 'published', image: wizard.image, gallery: [wizard.image], tag: 'Ny mulighet', blockedDates: original?.blockedDates || [], createdAt: original?.createdAt || new Date().toISOString() };
  delete listing.agreed;
  const index = state.listings.findIndex(l => l.id === listing.id);
  if (index >= 0) state.listings[index] = listing; else state.listings.unshift(listing);
  state.draft = null; persist(); wizard = null; navigate('#/utleier');
  setTimeout(() => openDialog(`<span class="success-icon">${icon('check')}</span><span class="eyebrow">Rom for nye muligheter</span><h2>Plassen din er synlig.</h2><p class="intro">${esc(listing.salon)} ligger nå i den lokale demomarkedsplassen. Du kan finne annonsen i søket og sende en forespørsel som leietaker.</p><div class="dialog-summary">${image(listing.image, listing.salon)}<div><h3>${esc(listing.salon)}</h3><p>${esc(listing.title)}</p></div></div><div class="stack" style="gap:10px">${link(`#/annonse/${listing.id}`, 'Se annonsen', 'button full', 'arrow')}<button class="button outline full" data-action="try-new-listing" data-id="${listing.id}">Prøv annonsen som leietaker</button></div><p class="rent-disclaimer">Annonsen er bare publisert i denne nettleserens demo.</p>`, 'Demoannonsen er publisert'), 80);
}
function showGallery(index = 0) {
  const listing = state.listings.find(l => l.id === currentRoute.id); if (!listing) return;
  const photos = listing.gallery?.length ? listing.gallery : [listing.image];
  const selected = ((index % photos.length) + photos.length) % photos.length;
  openDialog(`<div class="lightbox">${image(photos[selected], `${listing.salon}, bilde ${selected + 1}`)}<div class="row"><button class="icon-button" data-action="gallery-prev" data-index="${selected}" aria-label="Forrige bilde">${icon('back')}</button><span class="small muted">${selected + 1} / ${photos.length} · ${esc(listing.salon)}</span><button class="icon-button" data-action="gallery-next" data-index="${selected}" aria-label="Neste bilde">${icon('arrow')}</button></div></div>`, 'Bildegalleri', true);
}
async function handleUpload(file) {
  if (!file) return;
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) { toast('Velg et JPG-, PNG- eller WebP-bilde på inntil 5 MB.'); return; }
  captureWizard();
  try {
    const bitmap = await createImageBitmap(file);
    const factor = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas'); canvas.width = Math.round(bitmap.width * factor); canvas.height = Math.round(bitmap.height * factor);
    const ctx = canvas.getContext('2d'); ctx.fillStyle = '#fcf8f5'; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height); bitmap.close();
    wizard.image = canvas.toDataURL('image/jpeg', .82); refreshWizard(); toast('Bildet er valgt. Det blir bare lagret i din lokale demo.');
  } catch { toast('Vi kunne ikke lese bildet. Prøv et annet JPG-, PNG- eller WebP-bilde.'); }
}

document.addEventListener('click', async event => {
  if (event.target.closest('.skip-link')) { event.preventDefault(); document.querySelector('#main').focus(); document.querySelector('#main').scrollIntoView(); return; }
  const button = event.target.closest('[data-action]');
  if (!button) { if (event.target.matches('[data-overlay]')) closeDialog(); return; }
  const action = button.dataset.action; const id = button.dataset.id;
  if (button.disabled) return;
  if (action === 'close-dialog') return closeDialog();
  if (action === 'demo-settings') return showDemoSettings();
  if (action === 'about') return openDialog(`<span class="eyebrow">Fra idé til noe du kan prøve</span><h2>En plass å utforske ideen.</h2><p class="intro">Stolleie er en prototype for å koble salonger med selvstendige fagpersoner som trenger en arbeidsplass.</p><div class="stack"><div class="info-box">${icon('user')}<span>Prøv søk, leieformer, forespørsler og meldinger som leietaker.</span></div><div class="info-box">${icon('store')}<span>Bytt til utleier for å opprette annonser, svare og foreslå visning.</span></div><p class="muted small">Alle personer, annonser og priser er demoinnhold. Alt lagres lokalt i nettleseren. Ingen ekte meldinger eller annonser sendes ut. Kontrakter og betaling er utenfor denne prototypen.</p></div><button class="button full" data-action="demo-settings" style="margin-top:25px">Velg demorolle</button>`, 'Om prototypen');
  if (action === 'set-role') { changeRole(button.dataset.role); closeDialog(); navigate(state.role === 'owner' ? '#/utleier' : '#/'); return; }
  if (action === 'open-owner') { changeRole('owner'); return navigate('#/utleier'); }
  if (action === 'become-renter') { changeRole('renter'); return navigate('#/sok'); }
  if (action === 'new-listing') { changeRole('owner'); wizard = null; navigate('#/utleier/ny'); return; }
  if (action === 'home-mode') {
    homeMode = button.dataset.mode;
    document.querySelectorAll('[data-action=home-mode]').forEach(tab => { const active = tab.dataset.mode === homeMode; tab.classList.toggle('active', active); tab.setAttribute('aria-pressed', active); });
    document.querySelector('#home-date-field').innerHTML = renderHomeDate(); return;
  }
  if (action === 'favorite') {
    const saved = state.favorites.includes(id);
    state.favorites = saved ? state.favorites.filter(value => value !== id) : [...state.favorites, id]; persist();
    if (currentRoute.name === 'favorites') render();
    else { document.querySelectorAll('[data-action=favorite]').forEach(b => { if (b.dataset.id === id || !b.dataset.id && currentRoute.name === 'listing') { b.classList.toggle('is-saved', !saved); b.classList.toggle('text-rose', !saved); b.setAttribute('aria-pressed', !saved); b.setAttribute('aria-label', saved ? 'Lagre som favoritt' : 'Fjern fra favoritter'); } }); }
    toast(saved ? 'Arbeidsplassen er fjernet fra favoritter.' : 'Lagret blant favorittene dine.'); return;
  }
  if (action === 'open-filters') {
    const fields = filterFields().replaceAll('id="filter-', 'id="dialog-filter-').replaceAll('for="filter-', 'for="dialog-filter-');
    openDialog(`<h2>Finn din match.</h2><p class="intro">Velg det som betyr mest i din arbeidshverdag.</p><form class="filters" id="dialog-filters">${fields}</form>`, 'Filtrer arbeidsplasser'); return;
  }
  if (action === 'reset-filters') { closeDialog(); return navigate('#/sok'); }
  if (action === 'remove-filter') {
    const key = button.dataset.key; const next = { ...filters, [key]: ['amenities', 'days'].includes(key) ? [] : '' };
    if (key === 'mode') { next.maxPrice = ''; next.sort = 'relevance'; }
    return navigate(searchHash(next));
  }
  if (action === 'rent-mode') { selection.mode = button.dataset.mode; selection.error = ''; return updateRentPanel(); }
  if (action === 'select-weekday') { const day = Number(button.dataset.day); selection.weekdays = selection.weekdays.includes(day) ? selection.weekdays.filter(d => d !== day) : weekdayOrder.filter(d => [...selection.weekdays, day].includes(d)); selection.error = ''; return updateRentPanel(); }
  if (action === 'select-date') { const date = button.dataset.date; selection.dates = selection.dates.includes(date) ? selection.dates.filter(d => d !== date) : [...selection.dates, date]; selection.error = ''; return updateRentPanel(); }
  if (action === 'calendar-next' || action === 'calendar-prev') { calendarOffset += action === 'calendar-next' ? 1 : -1; return updateRentPanel(); }
  if (action === 'scroll-rent') { document.querySelector('#rent-panel').scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
  if (action === 'inquire') return showInquiry();
  if (action === 'gallery') return showGallery(Number(button.dataset.index));
  if (action === 'gallery-next') return showGallery(Number(button.dataset.index) + 1);
  if (action === 'gallery-prev') return showGallery(Number(button.dataset.index) - 1);
  if (action === 'share') {
    try { await navigator.clipboard.writeText(location.href); toast('Lenken er kopiert. Demoannonsen er bare tilgjengelig i denne lokale prototypen.'); }
    catch { toast('Du kan kopiere lenken fra adressefeltet.'); }
    return;
  }
  if (action === 'request-tab') { requestTab = button.dataset.tab; return render(); }
  if (action === 'view-as-owner' || action === 'switch-conversation-role') {
    const request = state.requests.find(r => r.id === id); const listing = state.listings.find(l => l.id === request?.listingId); if (!listing) return;
    changeRole(action === 'view-as-owner' || state.role === 'renter' ? 'owner' : 'renter', listing.ownerId); closeDialog(); navigate(`#/foresporsler/${id}`); return;
  }
  if (action === 'try-new-listing') { changeRole('renter'); closeDialog(); selection = null; return navigate(`#/annonse/${id}`); }
  if (action === 'simulate-reply') {
    const request = visibleRequests().find(r => r.id === id); if (!request || request.status === 'closed' || state.role !== 'renter') return;
    const alreadyReplied = request.messages.some(m => m.simulated);
    request.messages.push({ id: crypto.randomUUID(), author: 'host', text: alreadyReplied ? 'Det høres fint ut. Vi kan gjerne ta en prat om det når du kommer på visning. Prøv utleierrollen for å foreslå et tidspunkt som passer.' : 'Hei, så hyggelig at du tar kontakt! Fortell gjerne litt om arbeidshverdagen din. Vi kan avtale en visning, så du får se plassen og hilse på oss.', simulated: true, createdAt: new Date().toISOString() });
    if (request.status === 'sent') request.status = 'dialog'; persist(); render(); return;
  }
  if (action === 'propose-viewing') return showViewingDialog(id);
  if (action === 'confirm-viewing') {
    const request = visibleRequests().find(r => r.id === id); if (!request?.viewing || request.status !== 'viewing' || state.role !== 'renter') return;
    request.status = 'confirmed'; request.messages.push({ id: crypto.randomUUID(), author: 'renter', text: `Takk! Jeg bekrefter visningen ${dateLabel(request.viewing.date)} kl. ${request.viewing.time}. Gleder meg til å se plassen.`, createdAt: new Date().toISOString() }); persist(); render(); toast('Visningen er avtalt i demoen.'); return;
  }
  if (action === 'suggest-other-time') { document.querySelector('#message-text').value = 'Takk for invitasjonen! Kan vi finne et annet tidspunkt som passer?'; document.querySelector('#message-text').focus(); return; }
  if (action === 'close-request') {
    openDialog(`<span class="eyebrow">Rydd plass til neste mulighet</span><h2>Avslutte dialogen?</h2><p class="intro">Den flyttes til «Avsluttede». Meldingshistorikken beholdes, og du kan åpne dialogen igjen senere.</p><div class="row wrap"><button class="button outline" data-action="close-dialog">Fortsett dialogen</button><button class="button" data-action="confirm-close-request" data-id="${id}">Avslutt forespørsel</button></div>`, 'Avslutt forespørsel'); return;
  }
  if (action === 'confirm-close-request' || action === 'reopen-request') {
    const request = visibleRequests().find(r => r.id === id); if (!request) return;
    request.status = action === 'reopen-request' ? 'dialog' : 'closed'; request.viewing = null; persist(); closeDialog(); render(); toast(action === 'reopen-request' ? 'Dialogen er åpnet igjen.' : 'Forespørselen er avsluttet.'); return;
  }
  if (action === 'toggle-listing') {
    const listing = ownerListings().find(l => l.id === id); if (!listing) return;
    listing.status = listing.status === 'published' ? 'paused' : 'published'; persist(); render(); toast(listing.status === 'paused' ? 'Annonsen er pauset og skjult fra søket.' : 'Annonsen er synlig i demomarkedsplassen igjen.'); return;
  }
  if (action === 'wizard-type') { captureWizard(); wizard.type = button.dataset.type; return refreshWizard(); }
  if (action === 'wizard-photo') { captureWizard(); wizard.image = button.dataset.photo; return refreshWizard(); }
  if (action === 'wizard-weekday') { captureWizard(); const day = Number(button.dataset.day); wizard.availableWeekdays = wizard.availableWeekdays.includes(day) ? wizard.availableWeekdays.filter(d => d !== day) : weekdayOrder.filter(d => [...wizard.availableWeekdays, day].includes(d)); return refreshWizard(); }
  if (action === 'wizard-back' || action === 'wizard-step') { captureWizard(); wizardStep = action === 'wizard-back' ? Math.max(1, wizardStep - 1) : Number(button.dataset.step); refreshWizard(); document.querySelector('.wizard-top').scrollIntoView({ behavior: 'smooth' }); return; }
  if (action === 'save-draft') {
    captureWizard(); state.draft = { ...structuredClone(wizard), ownerId: state.ownerId }; persist(); toast('Utkastet er lagret. Du kan fortsette fra utleieroversikten.'); return;
  }
  if (action === 'reset-demo') return openDialog(`<span class="eyebrow">En ny start</span><h2>Nullstille demoen?</h2><p class="intro">Dine lokale demoannonser, forespørsler, favoritter og meldinger erstattes med de opprinnelige demodataene.</p><div class="row wrap"><button class="button outline" data-action="close-dialog">Behold demoen</button><button class="button" data-action="confirm-reset-demo">${icon('reset')}Nullstill demo</button></div>`, 'Nullstill demodata');
  if (action === 'confirm-reset-demo') {
    state = makeSeed(); state.ownerId = 'demo-owner'; filters = { q: '', type: '', mode: '', date: '', maxPrice: '', amenities: [], days: [], sort: 'relevance' }; selection = null; wizard = null; wizardStep = 1; homeMode = 'monthly'; calendarOffset = 0; requestTab = 'active'; persist(); closeDialog(); navigate('#/'); toast('Demoen er nullstilt. Klar for en ny runde.'); return;
  }
});

document.addEventListener('submit', event => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  event.preventDefault();
  const fd = new FormData(form);
  if (form.id === 'home-search') { return navigate(searchHash({ q: String(fd.get('q') || '').trim(), type: fd.get('type'), mode: homeMode, date: fd.get('date'), days: (fd.get('days') || '').split(',').filter(Boolean) })); }
  if (form.id === 'results-search') return navigate(searchHash({ ...filters, q: String(fd.get('q') || '').trim() }));
  if (form.id === 'desktop-filters' || form.id === 'dialog-filters') {
    const mode = String(fd.get('mode') || ''); const next = { ...filters, mode, type: fd.get('type'), date: fd.get('date'), days: mode === 'weekly' ? filters.days : [], amenities: fd.getAll('amenities'), maxPrice: mode ? fd.get('maxPrice') || '' : '', sort: mode ? filters.sort : 'relevance' };
    closeDialog(); return navigate(searchHash(next));
  }
  if (form.id === 'inquiry-form') return submitInquiry(form);
  if (form.id === 'viewing-form') return submitViewing(form);
  if (form.id === 'message-form') {
    const request = visibleRequests().find(r => r.id === form.dataset.id); const text = String(fd.get('message') || '').trim();
    if (!request || !text || request.status === 'closed') return;
    request.messages.push({ id: crypto.randomUUID(), author: state.role === 'owner' ? 'host' : 'renter', text, createdAt: new Date().toISOString() });
    if (request.status === 'sent') request.status = 'dialog'; persist(); render(); document.querySelector('#message-text')?.focus({ preventScroll: true }); return;
  }
  if (form.id === 'wizard-form') {
    captureWizard(); const error = validateWizardStep(wizardStep);
    if (error) { const el = document.querySelector('#wizard-error'); el.textContent = error; el.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    if (wizardStep < 4) { wizardStep++; refreshWizard(); document.querySelector('.wizard-top').scrollIntoView({ behavior: 'smooth' }); }
    else {
      const earlierError = [1, 3].map(step => validateWizardStep(step)).find(Boolean);
      if (earlierError) { document.querySelector('#wizard-error').textContent = earlierError; return; }
      publishListing();
    }
  }
});

document.addEventListener('change', event => {
  const target = event.target;
  if (target.id === 'sort-results') return navigate(searchHash({ ...filters, sort: target.value }));
  if (target.name === 'mode' && target.closest('form')?.classList.contains('filters')) {
    const form = target.closest('form'); const field = form.querySelector('[id$="price-field"]');
    const prefix = form.id === 'dialog-filters' ? 'dialog-filter' : 'filter';
    field.innerHTML = filterPriceField(target.value, '').replaceAll('id="filter-', `id="${prefix}-`).replaceAll('for="filter-', `for="${prefix}-`);
    form.querySelector(`label[for="${prefix}-date"]`).textContent = target.value === 'flex' ? 'Ønsket dato' : 'Ønsket oppstart'; return;
  }
  if (target.id === 'rental-start' && selection) { selection.startDate = target.value; selection.error = ''; return; }
  if (target.id === 'demo-owner') { state.ownerId = target.value; persist(); if (state.role === 'owner') { closeDialog(); navigate('#/utleier'); } else showDemoSettings(); return; }
  if (target.id === 'listing-upload') return handleUpload(target.files[0]);
  if (target.name === 'enabledModes') { const block = target.closest('.pricing-option'); block.classList.toggle('active', target.checked); block.querySelector('input[type=number]').disabled = !target.checked; captureWizard(); }
});

document.addEventListener('keydown', event => {
  const dialog = document.querySelector('[role=dialog]'); if (!dialog) return;
  if (event.key === 'Escape') { event.preventDefault(); closeDialog(); }
  if (event.key === 'Tab') {
    const items = [...dialog.querySelectorAll('a[href],button,input,select,textarea,[tabindex="0"]')].filter(el => !el.disabled && el.getClientRects().length);
    if (!items.length) { event.preventDefault(); dialog.focus(); return; }
    const first = items[0]; const last = items.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog)) { event.preventDefault(); first.focus(); }
  }
});

window.addEventListener('hashchange', render);
render();
