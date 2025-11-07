import { fail } from '@sveltejs/kit';
import { authPocketBaseInstanceWithPassword } from '$lib/server/pocketbase/pocketbase.js';

export const actions = {
    signUp: async ({ request }) => {
        // need to write the logic to sign up the user
    }
};