import * as axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

export const loadText = () =>
  api.get('/load_text');

export const postText = (text, language) =>
  api.post('/post_text', {
    text: text,
    language: language
  });
