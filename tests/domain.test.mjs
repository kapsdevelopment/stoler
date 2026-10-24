import test from 'node:test';
import assert from 'node:assert/strict';
import { makeSeed } from '../data.js';
import { STORAGE_KEY, availableOn, calculatePrice, dateKey, filterListings, loadState, validateSelection } from '../domain.js';

const seed = () => makeSeed(new Date('2026-10-24T12:00:00'));
const find = id => seed().listings.find(listing => listing.id === id);

test('combines city, type, weekly availability, price and included equipment', () => {
  const result = filterListings(seed().listings, { q: 'Oslo', type: 'hair', mode: 'weekly', days: [2, 4], maxPrice: 2000, amenities: ['towels'] });
  assert.deepEqual(result.map(listing => listing.id), ['atelier']);
});
test('sorts only comparable prices for the selected rental mode', () => {
  const result = filterListings(seed().listings, { mode: 'monthly', sort: 'price' });
  assert.ok(result.every(listing => Object.hasOwn(listing.prices, 'monthly')));
  assert.deepEqual(result.map(listing => listing.prices.monthly), [5200, 6400, 6800, 7200, 7900, 8500]);
  assert.equal(filterListings(seed().listings, { maxPrice: 1 }).length, seed().listings.length);
});
test('search tolerates Norwegian characters and multiple search words', () => {
  assert.deepEqual(filterListings(seed().listings, { q: 'Oslo Grunerlokka' }).map(l => l.id), ['balanse', 'rommet']);
});
test('paused listings disappear from public search', () => {
  const listings = seed().listings; listings[0].status = 'paused';
  assert.ok(!filterListings(listings).some(listing => listing.id === 'atelier'));
});
test('weekly and flexible pricing counts distinct selected days', () => {
  const listing = find('lumina');
  assert.equal(calculatePrice(listing, { mode: 'weekly', weekdays: [1, 2, 4] }), 6600);
  assert.equal(calculatePrice(listing, { mode: 'weekly', weekdays: [1, 1] }), 2200);
  assert.equal(calculatePrice(listing, { mode: 'flex', dates: ['2026-10-26', '2026-10-27'] }), 1500);
  assert.equal(calculatePrice(listing, { mode: 'monthly' }), 8500);
});
test('availability excludes blocked days and dates before opening', () => {
  const listing = find('lumina'); listing.blockedDates = ['2026-10-26'];
  assert.equal(availableOn(listing, '2026-10-25'), false);
  assert.equal(availableOn(listing, '2026-10-26'), false);
  assert.equal(availableOn(listing, '2026-10-27'), true);
  listing.availableFrom = '2026-11-01';
  assert.equal(availableOn(listing, '2026-10-27'), false);
});
test('a request requires a valid selection and rejects unsupported modes or unavailable dates', () => {
  const listing = find('lumina');
  assert.ok(validateSelection(listing, { mode: 'weekly', startDate: '2026-10-26', weekdays: [] }, '2026-10-24'));
  assert.ok(validateSelection(listing, { mode: 'weekly', startDate: '2026-10-26', weekdays: [0] }, '2026-10-24'));
  assert.equal(validateSelection(listing, { mode: 'weekly', startDate: '2026-10-26', weekdays: [2, 4] }, '2026-10-24'), '');
  assert.ok(validateSelection(listing, { mode: 'flex', dates: ['2026-10-25'] }, '2026-10-24'));
  assert.equal(validateSelection(listing, { mode: 'flex', dates: ['2026-10-26'] }, '2026-10-24'), '');
  assert.ok(validateSelection(listing, { mode: 'monthly', startDate: '2026-02-31' }, '2026-01-01'));
  assert.ok(validateSelection(find('nordic'), { mode: 'monthly', startDate: '2026-10-26' }, '2026-10-24'));
});
test('filters respect a requested flexible date and all requested weekdays', () => {
  assert.equal(filterListings(seed().listings, { mode: 'flex', date: '2026-10-25' }).length, 0);
  assert.ok(!filterListings(seed().listings, { mode: 'weekly', days: [1, 2] }).some(l => l.id === 'nidaros'));
});
test('local state restores requests and falls back safely when storage is damaged or unavailable', () => {
  const state = seed(); state.requests[0].status = 'confirmed';
  const storage = { getItem: key => key === STORAGE_KEY ? JSON.stringify(state) : null };
  assert.equal(loadState(storage, seed).requests[0].status, 'confirmed');
  assert.equal(loadState({ getItem: () => '{broken' }, seed).listings.length, 8);
  assert.equal(loadState({ getItem: () => { throw new Error('Unavailable'); } }, seed).role, 'renter');
  assert.equal(dateKey('2026-10-26'), '2026-10-26');
});
