import PocketBase from 'pocketbase';

export async function load({ params }) {

    const pb = new PocketBase('http://127.0.0.1:8090');
    await pb.admins.authWithPassword("testpocketbase@gmail.com","pocketbaseYouSavedMyDay");
    try {
        const pgProperty = await pb.collection('pgProperties').getFirstListItem(`id="${params.id}"`)
        console.log('pgProperty',pgProperty)
        return {
            pgProperty
    };
    } catch (err) {
        console.error(
        "Failed to create record:",
        err.response?.data || err.message
      );
    }
}


{/* <button class="mt-5 border-[1.5px] border-pg-sky text-pg-sky px-4 py-2 rounded-md w-full">book rooms</button> */}