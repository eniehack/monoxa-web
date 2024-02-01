import { writable, type Writable } from 'svelte/store';
import type { UserInfo } from 'firebase/auth';

type AuthStore = { loggedIn: true; user: UserInfo } | { loggedIn: false; user: null };

export const authStore: Writable<AuthStore> = writable({ loggedIn: false, user: null });
