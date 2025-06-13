/* eslint-disable prettier/prettier */
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

import { HandleDropdownFormat } from '../hooks/useDropDownData';
import api from '../utilities/api';

const GlobalContext = createContext({
  login: async () => {},
  logOut: async () => {},
  isLogged: false,
  setIsLogged: () => {},
  setLoading: () => {},
  user: {
    gender: 0,
    username: '',
    email: '',
    userImage: '',
    id: 0,
  },
  setUser: () => {},
  loading: false,
  checkAuth: () => {},
  getFunction: () => {},
  postFunction: () => {},
  putFunction: () => {},
  deleteFunction: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const username = JSON.parse(await SecureStore.getItemAsync('username')) || '';
      const email = JSON.parse(await SecureStore.getItemAsync('email')) || '';
      const userImage = JSON.parse(await SecureStore.getItemAsync('userImage')) || '';
      const gender = JSON.parse(await SecureStore.getItemAsync('gender')) || '';
      const id = JSON.parse(await SecureStore.getItemAsync('id')) || 0;
      if (username) {
        setIsLogged(true);
        setUser({
          gender,
          username,
          email,
          userImage,
          id,
        });
      } else {
        setIsLogged(false);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsLogged(false);
    } finally {
      setLoading(false);
    }
  };

  const saveTokens = async (accessToken, refreshToken, user) => {
    // console.log('access', accessToken);
    // console.log('refreshToken ', refreshToken);
    // console.log('user ', user);
    console.log(accessToken, user.Username, user.email, user.userImage, user.id);
    try {
      await SecureStore.setItemAsync('accessToken', JSON.stringify(accessToken));
      await SecureStore.setItemAsync('username', JSON.stringify(user.Username));
      await SecureStore.setItemAsync('email', JSON.stringify(user.email));
      await SecureStore.setItemAsync('userImage', JSON.stringify(user.UserImage || ''));
      await SecureStore.setItemAsync('gender', JSON.stringify(user.Gender || ''));
      await SecureStore.setItemAsync('id', JSON.stringify(user.id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password, fcmToken) => {
    try {
      const response = await api.post(`auth/signin`, {
        email,
        password,
        FcmToken: fcmToken || null,
      });

      const { accessToken, refreshToken, user } = response.data;
      console.log(response.data);
      await saveTokens(accessToken, refreshToken, user);

      setUser({
        gender: user?.Gender,
        username: user?.Username,
        email: user?.email,
        userImage: user?.UserImage,
        id: user?.id,
      });

      setIsLogged(true);
      return true;
    } catch (error) {
      console.log('Login error:', error.response.data);
      return Promise.reject(error);
    }
  };

  const getFunction = async (url) => {
    try {
      const response = await api.get(url);
      return response;
    } catch (error) {
      if (error.response?.status === 403 || error.response?.status === 401) {
        await logOut();
      } else {
        return Promise.reject(error);
      }
    }
  };

  const postFunction = async (url, data) => {
    try {
      const response = await api.post(url, data);
      return response;
    } catch (error) {
      if (error.response?.status === 403 || error.response?.status === 401) {
        await logOut();
      } else {
        return Promise.reject(error);
      }
    }
  };

  const putFunction = async (url, data) => {
    try {
      const response = await api.put(url, data);
      return response;
    } catch (error) {
      if (error.response?.status === 403 || error.response?.status === 401) {
        await logOut();
      } else {
        return Promise.reject(error);
      }
    }
  };

  const deleteFunction = async (url) => {
    try {
      const response = await api.delete(url);
      return response;
    } catch (error) {
      if (error.response?.status === 403 || error.response?.status === 401) {
        await logOut();
      } else {
        return Promise.reject(error);
      }
    }
  };

  const logOut = async () => {
    try {
      const response = await api.post('auth/signOut');

      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      await SecureStore.deleteItemAsync('username');
      await SecureStore.deleteItemAsync('userImage');
      await SecureStore.deleteItemAsync('UserTypeID');
      await SecureStore.deleteItemAsync('email');
      setIsLogged(false);
      setUser(null);
      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        await SecureStore.deleteItemAsync('username');
        await SecureStore.deleteItemAsync('userImage');
        await SecureStore.deleteItemAsync('UserTypeID');
        await SecureStore.deleteItemAsync('email');
        setIsLogged(false);
        setUser(null);
        return true;
      }
      return Promise.reject(error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        login,
        logOut,
        isLogged,
        setIsLogged,
        setLoading,
        user,
        setUser,
        loading,
        checkAuth,
        getFunction,
        postFunction,
        putFunction,
        deleteFunction,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
