import axios from "axios";

const starwars = {
  getPeople: async () => {
    try {
      const response = await axios.get("https://swapi.dev/api/people");
      return response.data;
    } catch (error) {
      return error;
    }
  },
  getfilm: async (index) => {
    try {
      const response = await axios.get("https://swapi.dev/api/films/" + index);

      return response;
    } catch (error) {
      return error;
    }
  },
  getfilms: async () => {
    try {
      const response = await axios.get("https://swapi.dev/api/films");

      return response.data;
    } catch (error) {
      return error;
    }
  },
  getPlanet: async () => {
    try {
      const response = await axios.get("https://swapi.dev/api/planets");
      return response.data;
    } catch (error) {
      return error;
    }
  },
  getPlanets: async (page) => {
    try {
      const response = await axios.get(
        "https://swapi.dev/api/planets?page=" + page
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
  getStarships: async (page) => {
    try {
      const response = await axios.get(
        "https://swapi.dev/api/starships?page=" + page
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
  getStarship: async () => {
    try {
      const response = await axios.get("https://swapi.dev/api/starships");
      return response.data;
    } catch (error) {
      return error;
    }
  },
  getone: async (link) => {
    try {
      const response = await axios.get({ link });
      return response.data;
    } catch (error) {
      return error;
    }
  },
  getPeoples: async (page) => {
    try {
      const response = await axios.get(
        "https://swapi.dev/api/people/?page=" + page
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }
};

export default starwars;
