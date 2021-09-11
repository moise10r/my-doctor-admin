const authKey = "authToken";

const storage = {
  get: (key) => JSON.parse(localStorage.getItem(key)),
  set: (key, value) => JSON.stringify(localStorage.setItem(key, value)),
  remove: (key) => localStorage.removeItem(key),
  getAuthToken: () => JSON.parse(localStorage.getItem(authKey)),
  setAuthToken: () => JSON.stringify(localStorage.setItem(authKey)),
  removeAuthToken: () => localStorage.removeItem(authKey),
};

export default storage;