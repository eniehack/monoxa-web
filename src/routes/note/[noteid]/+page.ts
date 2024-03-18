import { PUBLIC_BACKEND_HOSTNAME } from '$env/static/public';
import { error } from '@sveltejs/kit';
import { getAuth } from 'firebase/auth';
import { z } from 'zod';
import type { PageLoad } from './$types';

const responseSchema = z.object({
	meta: z.object({
		name: z.string(),
		shout_id: z.string()
	}),
	shouts: z.array(z.string()) // TODO: serverに合わせる
});
type Response = z.infer<typeof responseSchema>;

export const load: PageLoad = async ({ params }) => {
	const endpoint = new URL(`/api/v1/notebook/${params.noteid}`, PUBLIC_BACKEND_HOSTNAME);
	const resp = await fetch(endpoint, {
		credentials: 'include',
		headers: {
			Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`
		}
	});
	if (!resp.ok) {
		error(400, resp.status.toString());
	}
	const json = await responseSchema.safeParseAsync(resp.json());
	if (!json.success) {
		error(400, json.error);
	}
	return json.data;
};
