import { addDays, dateKey } from './domain.js';

export const categories = [
  { id: 'hair', label: 'Frisørstol', plural: 'Frisørstoler', icon: 'scissors' },
  { id: 'treatment', label: 'Behandlingsrom', plural: 'Behandlingsrom', icon: 'flower' },
  { id: 'nails', label: 'Negleplass', plural: 'Negleplasser', icon: 'sparkles' },
  { id: 'barber', label: 'Barberstol', plural: 'Barberstoler', icon: 'scissors' },
];
export const modes = {
  monthly: { label: 'Fast leie', short: 'Fast leie', unit: '/ mnd', explanation: 'Din egen faste base, med en forutsigbar månedspris.' },
  weekly: { label: 'Faste ukedager', short: 'Faste ukedager', unit: '/ fast ukedag / mnd', explanation: 'De samme dagene hver uke. Pris per valgt ukedag, per måned.' },
  flex: { label: 'Fleksibel leie', short: 'Fleksibel leie', unit: '/ dag', explanation: 'Enkeltdager når du trenger dem. Send ønske om én eller flere datoer.' },
};
export const amenities = [
  { id: 'water', label: 'Vask / vann', icon: 'droplet' },
  { id: 'wifi', label: 'Wi-Fi', icon: 'wifi' },
  { id: 'towels', label: 'Håndklær', icon: 'layers' },
  { id: 'lounge', label: 'Venterom', icon: 'chair' },
  { id: 'storage', label: 'Oppbevaring', icon: 'box' },
  { id: 'coffee', label: 'Kaffe & te', icon: 'coffee' },
  { id: 'cleaning', label: 'Renhold', icon: 'sparkles' },
  { id: 'ventilation', label: 'Punktavsug', icon: 'wind' },
];
export const weekdayLabels = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];
export const weekdayOrder = [1, 2, 3, 4, 5, 6, 0];
export const weekdaysShort = ['Sø', 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø'];
export const statusLabels = { sent: 'Sendt', dialog: 'I dialog', viewing: 'Visning foreslått', confirmed: 'Visning avtalt', closed: 'Avsluttet' };
export const demoPhotos = ['hair.jpg', 'lumina.jpg', 'nails.jpg', 'atelier.jpg', 'bergen.jpg', 'nidaros.jpg', 'barber.jpg', 'treatment.jpg'];

export function makeSeed(now = new Date()) {
  const today = dateKey(now);
  const common = { status: 'published', vat: 'eks. mva.', availableFrom: today, availableWeekdays: [1, 2, 3, 4, 5], blockedDates: [], access: 'Mandag–fredag kl. 07–22. Andre tider etter avtale.', terms: 'Oppstart og endelige leievilkår avtales direkte med utleier.', ownEquipment: 'Egne produkter, forbruksvarer, betalingsløsning og eventuell ansvarsforsikring.', createdAt: now.toISOString() };
  const listings = [
    { id: 'atelier', title: 'En lys frisørplass med rom for deg', salon: 'Atelier Eik', type: 'hair', city: 'Oslo', area: 'Frogner', address: 'Frognerveien 18', size: 12, image: 'atelier.jpg', gallery: ['atelier.jpg', 'hero.jpg', 'hair.jpg'], host: 'Signe Holm', hostRole: 'Frisør og salongeier', avatar: 'SH', ownerId: 'host-signe', prices: { monthly: 7900, weekly: 1900, flex: 650 }, amenities: ['water', 'wifi', 'towels', 'lounge', 'coffee', 'storage'], professions: ['Frisør'], description: 'Store speil, godt dagslys og et varmt fagmiljø. Hos Atelier Eik får du en ferdig utstyrt frisørplass og frihet til å skape din egen arbeidshverdag. Vi er et lite fellesskap med plass til både etablerte frisører og deg som er klar for neste steg.', note: 'Vaskesone og håndklær er inkludert. Du tar med egne farger og produkter.', tag: 'Lyst & sosialt' },
    { id: 'lumina', title: 'Et rolig rom for din egen praksis', salon: 'Atelier Lumina', type: 'treatment', city: 'Oslo', area: 'Majorstuen', address: 'Kirkeveien 24', size: 18, image: 'lumina.jpg', gallery: ['lumina.jpg', 'treatment.jpg', 'bergen.jpg'], host: 'Astrid Lind', hostRole: 'Hudterapeut og daglig leder', avatar: 'AL', hostPhoto: 'host.jpg', ownerId: 'host-astrid', prices: { monthly: 8500, weekly: 2200, flex: 750 }, amenities: ['water', 'wifi', 'towels', 'lounge', 'coffee', 'cleaning'], professions: ['Hudpleie', 'Massasje', 'Vipper & bryn'], description: 'Et skjermet behandlingsrom i en rolig bakgård, med naturlig dagslys og plass til å senke skuldrene. Rommet passer for deg som ønsker en profesjonell ramme rundt din egen praksis, med gode kolleger i nærheten.', note: 'Elektrisk behandlingsbenk, vask og håndkleservice følger med.', tag: 'Rolig bakgård' },
    { id: 'nordic', title: 'Din nye negleplass midt i byen', salon: 'Nordic Glow Studio', type: 'nails', city: 'Bergen', area: 'Sentrum', address: 'Vaskerelven 8', size: 8, image: 'nails.jpg', gallery: ['nails.jpg', 'nidaros.jpg'], host: 'Malin Vester', hostRole: 'Negledesigner og salongeier', avatar: 'MV', ownerId: 'host-malin', prices: { weekly: 1400, flex: 450 }, amenities: ['wifi', 'ventilation', 'coffee', 'storage'], professions: ['Negler', 'Vipper & bryn'], description: 'En innbydende og fullt utstyrt negleplass i et lite, kreativt studio. Her jobber vi selvstendig, men deler inspirasjon, kaffe og et hyggelig miljø. Kort vei til bybane og buss.', note: 'Arbeidsbord med avtrekk og UV-lampe er inkludert.', tag: 'Kreativt fellesskap', vat: 'inkl. mva.' },
    { id: 'balanse', title: 'Frisørstol i et varmt, kreativt studio', salon: 'Studio Balanse', type: 'hair', city: 'Oslo', area: 'Grünerløkka', address: 'Thorvald Meyers gate 36', size: 10, image: 'hair.jpg', gallery: ['hair.jpg', 'hero.jpg'], host: 'Camilla Berg', hostRole: 'Frisør og salongeier', avatar: 'CB', ownerId: 'demo-owner', prices: { monthly: 7200, weekly: 1800, flex: 600 }, amenities: ['water', 'wifi', 'coffee', 'storage', 'lounge'], professions: ['Frisør'], description: 'Studio Balanse er et lite frisørfellesskap med varme farger, god musikk og plass til din egen stil. Vi har en ledig stol ved vinduet og ønsker oss en selvstendig kollega som liker å dele arbeidshverdagen med andre.', note: 'Speilplass, frisørstol og felles vaskesone følger med.', tag: 'Ved vinduet' },
    { id: 'botanique', title: 'Behandlingsrom med plass til å puste', salon: 'Botanique Velvære', type: 'treatment', city: 'Bergen', area: 'Sandviken', address: 'Sandviksveien 12', size: 16, image: 'bergen.jpg', gallery: ['bergen.jpg', 'treatment.jpg'], host: 'Ingrid Sol', hostRole: 'Massør og klinikkeier', avatar: 'IS', ownerId: 'host-ingrid', prices: { monthly: 6800, flex: 550 }, amenities: ['water', 'wifi', 'towels', 'cleaning'], professions: ['Massasje', 'Hudpleie'], description: 'Et lunt behandlingsrom med dempet belysning og god lydskjerming. Rommet ligger i et rolig område med enkel adkomst og passer godt til massasje og hudbehandlinger.', note: 'Justerbar behandlingsbenk og håndklær er tilgjengelig.', tag: 'Lunt & skjermet' },
    { id: 'nidaros', title: 'Negleplass i et lite fagfellesskap', salon: 'Nidaros Studio', type: 'nails', city: 'Trondheim', area: 'Bakklandet', address: 'Nedre Bakklandet 14', size: 9, image: 'nidaros.jpg', gallery: ['nidaros.jpg', 'nails.jpg'], host: 'Elise Dahl', hostRole: 'Negletekniker', avatar: 'ED', ownerId: 'host-elise', prices: { monthly: 5200, weekly: 1400, flex: 450 }, amenities: ['wifi', 'ventilation', 'coffee', 'storage'], professions: ['Negler', 'Vipper & bryn'], availableWeekdays: [2, 4, 5], description: 'Et sosialt studio i historiske omgivelser på Bakklandet. Arbeidsplassen har godt arbeidslys, avtrekk og oppbevaring til produktene dine. Vi ønsker oss en kollega som vil bidra til et hyggelig og faglig miljø.', note: 'Punktavsug og ergonomisk stol er inkludert.', tag: 'Lite fagfellesskap', vat: 'inkl. mva.' },
    { id: 'kamm', title: 'Barberstol med karakter og god plass', salon: 'Kamm & Saks', type: 'barber', city: 'Oslo', area: 'Torshov', address: 'Vogts gate 48', size: 12, image: 'barber.jpg', gallery: ['barber.jpg', 'hair.jpg'], host: 'Nora Bakke', hostRole: 'Barberer og salongeier', avatar: 'NB', ownerId: 'host-nora', prices: { monthly: 6400, flex: 550 }, amenities: ['water', 'wifi', 'coffee', 'lounge'], professions: ['Barber', 'Frisør'], description: 'En god barberstol i en salong med karakter. Vi kombinerer klassisk håndverk med et avslappet miljø og har plass til en selvstendig barberer eller frisør med egne kunder.', note: 'Vaskesone, speilplass og felles venterom følger med.', tag: 'Håndverk & fellesskap' },
    { id: 'rommet', title: 'Et eget rom for hud, bryn og velvære', salon: 'Rommet på Løkka', type: 'treatment', city: 'Oslo', area: 'Grünerløkka', address: 'Markveien 42', size: 14, image: 'treatment.jpg', gallery: ['treatment.jpg', 'lumina.jpg'], host: 'Camilla Berg', hostRole: 'Salongeier', avatar: 'CB', ownerId: 'demo-owner', prices: { weekly: 1700, flex: 600 }, amenities: ['water', 'wifi', 'towels', 'lounge'], professions: ['Hudpleie', 'Vipper & bryn', 'Massasje'], description: 'Et lyst og rolig rom i tilknytning til Studio Balanse. Du har din egen skjermede arbeidsplass og tilgang til venterom, tekjøkken og hyggelige kolleger.', note: 'Behandlingsbenk og vask på rommet følger med.', tag: 'Din egen lille base' },
  ].map((listing, index) => ({ ...common, ...listing, createdAt: addDays(today, -index).toISOString() }));
  const viewingDate = dateKey(addDays(today, 4));
  const requests = [
    { id: 'req-lumina', listingId: 'lumina', renterId: 'demo-renter', renterName: 'Silje Andersen', profession: 'Hudpleie', mode: 'weekly', startDate: dateKey(addDays(today, 14)), weekdays: [2, 4], dates: [], total: 4400, status: 'dialog', createdAt: now.toISOString(), messages: [
      { id: 'm1', author: 'renter', text: 'Hei Astrid! Jeg ser etter et behandlingsrom to dager i uken. Er tirsdag og torsdag en mulighet hos dere?', createdAt: addDays(today, -1).toISOString() },
      { id: 'm2', author: 'host', text: 'Hei Silje, så hyggelig! De dagene kan passe fint. Fortell gjerne litt om behandlingene du tilbyr, så kan vi avtale en visning.', createdAt: now.toISOString() },
    ] },
    { id: 'req-balanse', listingId: 'balanse', renterId: 'demo-incoming', renterName: 'Karianne Moe', profession: 'Frisør', mode: 'monthly', startDate: dateKey(addDays(today, 14)), weekdays: [], dates: [], total: 7200, status: 'sent', createdAt: now.toISOString(), messages: [
      { id: 'm3', author: 'renter', text: 'Hei! Jeg er frisør med egen kundebase og ønsker en fast plass på Løkka. Er det mulig å komme innom og se salongen?', createdAt: now.toISOString() },
    ] },
    { id: 'req-rommet', listingId: 'rommet', renterId: 'demo-other', renterName: 'Lina Sørensen', profession: 'Massasje', mode: 'flex', startDate: viewingDate, weekdays: [], dates: [viewingDate], total: 600, status: 'viewing', viewing: { date: viewingDate, time: '14:00', proposedBy: 'host' }, createdAt: addDays(today, -1).toISOString(), messages: [
      { id: 'm4', author: 'renter', text: 'Hei Camilla! Jeg vil gjerne prøve rommet en dag før jeg vurderer faste dager. Kan vi møtes først?', createdAt: addDays(today, -1).toISOString() },
      { id: 'm5', author: 'host', text: 'Hei Lina! Det høres fint ut. Jeg har foreslått et tidspunkt for visning, så kan vi bli litt kjent.', createdAt: now.toISOString() },
    ] },
  ];
  return { version: 1, role: 'renter', favorites: [], listings, requests, draft: null };
}
