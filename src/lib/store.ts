import { writable, type Writable } from 'svelte/store';
import { getAuth, type UserInfo } from 'firebase/auth';
import { getApp } from 'firebase/app';

type AuthStore =
	| { loggedIn: true; user: UserInfo; notebooks: { notebook_id: string }[] | undefined }
	| { loggedIn: false; user: undefined; notebooks: undefined };

export const authStore: Writable<AuthStore> = writable({
	loggedIn: false,
	user: undefined,
	notebooks: undefined
});
