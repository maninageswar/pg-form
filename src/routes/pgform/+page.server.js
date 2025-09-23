import PocketBase from "pocketbase";
import { redirect } from '@sveltejs/kit';

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
    const pb = new PocketBase("http://127.0.0.1:8090");
    await pb.admins.authWithPassword("testpocketbase@gmail.com","pocketbaseYouSavedMyDay");

    const formData = await prepareFormData(request);

    try {
      const record = await pb.collection("pgProperties").create(formData);
      console.log("Record created:", record);
    } catch (err) {
      console.error(
        "Failed to create record:",
        err.response?.data || err.message
      );
    }
  },

  updateInventory: async ({ request, url }) => {
    const pb = new PocketBase("http://127.0.0.1:8090");
    await pb.admins.authWithPassword("testpocketbase@gmail.com","pocketbaseYouSavedMyDay");

    const formData = await prepareFormData(request);

    try {
      const record = await pb.collection("pgProperties").update(url.searchParams.get("recordId"), formData);
      console.log("Record updated:", record);
      return record
    } catch (err) {
      console.error(
        "Failed to update record:",
        err.response?.data || err.message
      );
    }
    // TODO:(learn how form submit works) check how to use redirect and also see why redirect is working if we use formaction in update button  but redirect is not working if we use fetch that is called from handleUpdateSubmit in +page.svelte of this folder
    // redirect(303, `/pgProperty/${url.searchParams.get("recordId")}`);
  }
};


