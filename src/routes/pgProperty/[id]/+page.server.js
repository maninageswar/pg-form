import { authPocketBaseInstanceWithPassword } from '$lib/server/pocketbase/pocketbase.js';

export async function load({ params }) {

    const pb = await authPocketBaseInstanceWithPassword();
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

export const actions = {
    deleteInventory: async ({ url }) => {
        const propertyId = url.searchParams.get("recordId");
        try {
            const pb = await authPocketBaseInstanceWithPassword();
            await pb.collection('pgProperties').delete(propertyId);
            return { propertyDeleted : 'your property has been deleted successfully'};
        } catch (error) {
            console.error("Failed to delete record:",error.response?.data);
            return fail(400, { errors: error.response?.data });
        }
    }
};