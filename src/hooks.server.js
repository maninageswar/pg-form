import PocketBase from "pocketbase";
import { PUBLIC_POCKETBASE_SERVER_URL } from "$env/static/public";

export const handle = async ({ event, resolve }) => {
    const pb = new PocketBase(PUBLIC_POCKETBASE_SERVER_URL)
    event.locals.pb = pb;
    const response = await resolve(event);
    return response;
}