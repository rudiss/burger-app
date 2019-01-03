import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://bugger-app.firebaseio.com/',
});

export default instance;