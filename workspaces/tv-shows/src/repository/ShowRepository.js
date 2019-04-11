import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:4000/rest"
});

export default {
  findOne(id) {
    return client.get(`shows/${id}`);
  },
  findAll() {
    return client.get("shows");
  },
  updateIsFavorites(id, isFavorites) {
    return client.post(`shows/${id}/favorites`, { isFavorites: isFavorites });
  }
};
