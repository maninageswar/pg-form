import PocketBase from "pocketbase";
import { PUBLIC_POCKETBASE_SERVER_URL } from "$env/static/public";

export const handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_SERVER_URL)

    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        // Refresh the auth model (if valid)
        if (event.locals.pb.authStore.isValid) {
            await event.locals.pb.collection('users').authRefresh();
        }
    } catch (_) {
        // Invalid token, clear it
        event.locals.pb.authStore.clear();
    }

    // Expose the logged-in user for server-side rendering
    event.locals.user = event.locals.pb.authStore.model;
    const response = await resolve(event);
    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({ httpOnly: false }));

    return response;
};