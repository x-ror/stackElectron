import { writable } from 'svelte/store';

export const token = writable('');
export const expires = writable(0);
export const currentLocation = writable('/');