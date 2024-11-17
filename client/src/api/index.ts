import { initPushEvent } from '@asaje/sse-push-event-client';
import axios from 'axios';

const appUrl = import.meta.env.VITE_APP_API_URL;

export const api = axios.create({ baseURL: appUrl });
export const AUTH_TOKEN_KEY = '__auth_token__';

// Ajouter un intercepteur pour inclure le token dans chaque requête
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && window.location.pathname !== '/') {
      window.location.replace('/');
    }
    return Promise.reject(error);
  },
);

export function setApiToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
  sessionStorage.setItem(AUTH_TOKEN_KEY, token);
}

function init() {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    setApiToken(token);
  }

  initPushEvent(appUrl + '/events');
}

init();
