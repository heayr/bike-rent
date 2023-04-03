import axios from "axios";

const API_URL = "https://sf-final-project-be.herokuapp.com/api/auth/";

const register = (firstName, lastName, email, password, clientId) => {
  return axios.post(API_URL + "/sign_up", {
    firstName,
    lastName,
    email,
    password,
    clientId,
  });
};

const authService = {
  register,
};

export default authService;
