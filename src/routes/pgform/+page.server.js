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
    console.log("formData2", formData);

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


