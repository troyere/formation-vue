import Axios from "axios/index";

export default Axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    language: "fr-FR",
    api_key: "ddef9beaa684e4c34168397a3261a22d"
  }
});
