export const baseUrl = "http://localhost:3000";

const toJson = async (res) => {
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json(); // return parsed JSON
};

export const Requests = {
  // returns Promise<Dog[]>
  getAllDogs: async () => {
    const res = await fetch(`${baseUrl}/dogs`);
    return toJson(res);
  },

  // takes Partial<Dog> (NO id) and returns Promise<Dog>
  postDog: async (partialDog) => {
    const res = await fetch(`${baseUrl}/dogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partialDog),
    });
    return toJson(res);
  },

  // takes id (number) and returns Promise<void>
  deleteDog: async (id) => {
    const res = await fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
  },

  // takes partial dog WITH id, returns Promise<Dog>
  updateDog: async (partialDog) => {
    if (partialDog?.id == null) {
      throw new Error("updateDog requires an id");
    }

    const res = await fetch(`${baseUrl}/dogs/${partialDog.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partialDog),
    });

    return toJson(res);
  },

  // playground helper
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
