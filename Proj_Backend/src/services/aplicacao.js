import axios from 'axios';

const application = axios.create({
  baseURL: 'http://localhost:3000', // URL do backend
});

export default application;