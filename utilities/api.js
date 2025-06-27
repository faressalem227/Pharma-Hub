/* eslint-disable prettier/prettier */
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
export const API_BASE_URL = 'http://192.168.1.20:8080/api/';
// export const API_BASE_URL = 'https://pharmahub.duckdns.org/api/api/';
export const transcripeUrl = 'https://pharmahub.duckdns.org/api/api/';
export const streamBaseUrl = 'https://pharmahub.duckdns.org/ai/';
export const WebSocketServer = 'https://pharmahub.duckdns.org/api/';
const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    try {
      let accessToken = await SecureStore.getItemAsync('accessToken');
      console.log('first', accessToken);
      if (accessToken) {
        accessToken = accessToken.replace(/"/g, '');
        console.log('sec', accessToken);
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      //console.log("Error getting access token:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!(await SecureStore.getItemAsync('refreshToken'))) {
      return;
    }

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        //console.log(accessToken);
        // Request a new access token using the refresh token
        const response = await axios.post(`${API_BASE_URL}/auth/token`, {
          refreshToken,
        });
        console.log('hi');
        const { accessToken } = response.data;

        // Save the new access token to SecureStore
        await SecureStore.setItemAsync('accessToken', accessToken);

        // Update the authorization header and retry the original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
