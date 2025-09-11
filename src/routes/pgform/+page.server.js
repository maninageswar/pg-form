import PocketBase from "pocketbase";

export const actions = {
  createInventory: async ({ request }) => {
    const pb = new PocketBase("http://127.0.0.1:8090");
    await pb.admins.authWithPassword("testpocketbase@gmail.com","pocketbaseYouSavedMyDay");

    const formData = await request.formData();
    let amenities = []
    for (const [key, value] of formData.entries()) {
      if (key === 'pgAmenities') {
        amenities.push(value);
      }
    }
    formData.delete('pgAmenities');
    formData.append('pgAmenities', JSON.stringify(amenities));
    const selectedState = JSON.parse(formData.get('pgState'));
    const selectedPgType = JSON.parse(formData.get('pgType'))
    formData.set('pgState', selectedState.value);
    formData.set('pgType', selectedPgType.value);
    console.log("server-formData", formData);

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
};


