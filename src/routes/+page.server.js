import { authPocketBaseInstanceWithPassword } from '$lib/server/pocketbase/pocketbase.js';

export async function load({ params }) {
    const pb = await authPocketBaseInstanceWithPassword();
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