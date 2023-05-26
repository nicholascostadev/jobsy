import { writable } from 'svelte/store';

export const userOwnsProfile = writable<boolean>(false);
