import { atom } from 'recoil';

export const encodeURI = (decodedUri: string) =>
  window.encodeURI(decodedUri.replace(/ /gi, '+'));

export const decodeURI = (encodedUri: string) =>
  window.decodeURI(encodedUri.replace(/[+]/gi, ' '));

export const countriesQueryState = atom({
  key: 'countriesQuery',
  default: 'Whole world',
});

export const orderingQueryState = atom({
  key: 'orderingQuery',
  default: 'Recent',
});
