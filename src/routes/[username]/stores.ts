import type { Certificate, Experience, ProfileLink } from '@prisma/client';
import { writable } from 'svelte/store';

export type UserData = {
    id?: string;
    name?: string;
    bio?: string | null;
    email?: string;
    certificates?: Certificate[];
    experiences?: Experience[];
    profile_links?: ProfileLink[];
    thumbnailColor?: string;
    username?: string;
};

export const pageUser = writable<UserData>();

export function setupPageUser(userData: UserData) {
    pageUser.set(userData);
}
