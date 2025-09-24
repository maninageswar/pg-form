import PocketBase from "pocketbase";

export function createPocketBaseInstance() {
    return new PocketBase("http://127.0.0.1:8090")
}

export async function authPocketBaseInstanceWithPassword() {
    const pb = createPocketBaseInstance();
    await pb.admins.authWithPassword("testpocketbase@gmail.com","pocketbaseYouSavedMyDay");
    return pb;
}