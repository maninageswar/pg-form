import PocketBase from 'pocketbase';

export async function load({ params }) {
    const pb = new PocketBase('http://127.0.0.1:8090');
    await pb.admins.authWithPassword("testpocketbase@gmail.com","pocketbaseYouSavedMyDay");
    try {
        const pgInventories = await pb.collection('pgProperties').getList(1, 50);
        console.log('pgInventories',pgInventories)
        return {
        pgInventories
    };
    } catch (err) {
        console.error(
        "Failed to create record:",
        err.response?.data || err.message
      );
    }
}