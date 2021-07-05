import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.mangadex.org',
  timeout: 30000,
  maxRedirects: 5,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
