import PocketBase from "pocketbase";
import { POCKETBASE_USER_NAME, POCKETBASE_PASSWORD } from "$env/static/private";

export function createPocketBaseInstance() {
    return new PocketBase("http://127.0.0.1:8090")
}

export async function authPocketBaseInstanceWithPassword() {
    const pb = createPocketBaseInstance();
    await pb.admins.authWithPassword(POCKETBASE_USER_NAME,POCKETBASE_PASSWORD);
    return pb;
}