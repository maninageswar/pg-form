import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    register: async ({ locals, request }) => {
        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        if (password !== confirmPassword) {
            return fail(400, { passwordsDonNotMatch: 'passwords do not match', email, password, confirmPassword } );
        }
        try {
            const record = await locals.pb.collection('users').create({
                name,
                email,
                password,
                passwordConfirm: confirmPassword
            });
        } catch (error) {
            return fail(error.status, { error: error.message, errorResponse: error.response, name, email, password, confirmPassword } );
        }
        // throw redirect(307, '/auth/login');
        // when the above line is used it is throwing this error 
        // SvelteKitError: POST method not allowed. No form actions exist for the page at /auth/login
        // it is important to use which code you use the info is avaliable in https://svelte.dev/docs/kit/@sveltejs-kit#redirect

        throw redirect(303, '/auth/login?accountCreated=true');
    },

    continueWithGoogle: async ({ locals, url, cookies }) => {
       const redirectUrl = `${url.origin}/api/oauth/google/callback`;
       const methods = await locals.pb.collection('users').listAuthMethods();
       const google = methods.oauth2.providers.find((p) => p.name === 'google');
       if (!google) {
           return fail(400, { error: 'google oauth not configured' });
       }
       cookies.set('provider', JSON.stringify(google), { httpOnly : true, path : '/api/oauth/google/callback'})
       throw redirect(303, `${google.authUrl}${encodeURIComponent(redirectUrl)}`);
    }
};