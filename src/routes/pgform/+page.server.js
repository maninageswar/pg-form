import PocketBase from "pocketbase";

export const actions = {
  createInventory: async ({ request }) => {
    const pb = new PocketBase("http://127.0.0.1:8090");
	  await pb.admins.authWithPassword('testpocketbase@gmail.com','pocketbaseYouSavedMyDay')
	// await pb.admins
    const rdata = await request.formData();
    console.log("data", rdata);

    const data = {
      ownerName: rdata.get("ownerName"),
      ownerNunber: rdata.get("ownerNunber"),
      ownerEmail: rdata.get("ownerEmail"),
    };

    const record = await pb.collection("pgInventories").create(data);
  },
};
