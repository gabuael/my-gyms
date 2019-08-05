import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gympass-test.herokuapp.com',
});

export default api;
