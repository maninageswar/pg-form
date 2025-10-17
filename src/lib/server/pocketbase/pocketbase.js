import PocketBase from "pocketbase";
import { POCKETBASE_USER_NAME, POCKETBASE_PASSWORD } from "$env/static/private";
import { PUBLIC_POCKETBASE_SERVER_URL } from "$env/static/public";

export function createPocketBaseInstance() {
    return new PocketBase(PUBLIC_POCKETBASE_SERVER_URL)
}

export async function authPocketBaseInstanceWithPassword() {
    const pb = createPocketBaseInstance();
    await pb.admins.authWithPassword(POCKETBASE_USER_NAME,POCKETBASE_PASSWORD);
    return pb;
}