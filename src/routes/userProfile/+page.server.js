import { fail } from '@sveltejs/kit';
import { authPocketBaseInstanceWithPassword } from '$lib/server/pocketbase/pocketbase.js';


let userId = null;
export async function load({ params }) {
    const pb = await authPocketBaseInstanceWithPassword();
    try {
        // TODO: if you use 'id="bvdw38g9g44kys6"' then it is giving 500 internal error 
        // which means the user is not there in out database in that case we have redirect to 
        // login page instead of showing 500 internal server error
        const userProfile = await pb.collection('userProfiles').getFirstListItem('id="bvdw38g9g44kys5"');
        userId = userProfile.id;
        console.log('userProfile',userProfile)
        return { userProfile };
    } catch (error) {
        console.error("Failed to retrive user profile:",error.response);
        return fail(400, { errors: error.response?.data });
    }
}

export const actions = {
    updateUserProfile: async ({ request }) => {
		const formData = await request.formData();
        const pb = await authPocketBaseInstanceWithPassword();
        try {
            const userProfile = await pb.collection('userProfiles').update(userId, formData);
            return { userProfile };
        } catch (error) {
            console.error("Failed to update user profile:",error.response);
            return fail(400, { errors: error.response });
        }
	}
};