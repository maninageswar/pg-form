import { fail, json } from '@sveltejs/kit';
import { authPocketBaseInstanceWithPassword } from '$lib/server/pocketbase/pocketbase.js';

async function prepareFormData(request) {
  const formData = await request.formData();
  let amenities = [];
  for (const [key, value] of formData.entries()) {
    if (key === 'pgAmenities') {
      amenities.push(value);
    }
  }
  formData.delete('pgAmenities');
  formData.append('pgAmenities', JSON.stringify(amenities));
  const selectedState = JSON.parse(formData.get('pgState'));
  const selectedPgType = JSON.parse(formData.get('pgType'));
  formData.set('pgState', selectedState.value);
  formData.set('pgType', selectedPgType.value);
  return formData;
}

export const actions = {
  createInventory: async ({ request }) => {
    const pb = await authPocketBaseInstanceWithPassword();
    const formData = await prepareFormData(request);
    try {
      const record = await pb.collection("pgProperties").create(formData);
      return { propertyCreated : 'your property details have been saved successfully you can veiw it once the verification of the property is done'};
    } catch (error) {
      console.error("Failed to create record:",error.response?.data);
      return fail(400, { errors: error.response?.data });
    }
  },

  updateInventory: async ({ request, url }) => {
    const pb = await authPocketBaseInstanceWithPassword();
    const formData = await prepareFormData(request);
    try {
      const record = await pb.collection("pgProperties").update(url.searchParams.get("recordId"), formData);
      console.log("Record updated:", record);
      return { propertyUpdated : 'your property details have been updated successfully'};
    } catch (error) {
      console.error("Failed to update record:",error.response?.data);
      return fail(400, { errors: error.response?.data });
    }
    // TODO:(learn how form submit works) check how to use redirect and also see why redirect is working if we use formaction in update button  but redirect is not working if we use fetch that is called from handleUpdateSubmit in +page.svelte of this folder
    // redirect(303, `/pgProperty/${url.searchParams.get("recordId")}`);
  }
};


