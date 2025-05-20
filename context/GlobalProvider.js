/* eslint-disable prettier/prettier */
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

import { HandleDropdownFormat } from '../hooks/useDropDownData';
import api from '../utilities/api';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const username = JSON.parse(await SecureStore.getItemAsync('username')) || '';
      const email = JSON.parse(await SecureStore.getItemAsync('email')) || '';

      if (username) {
        setIsLogged(true);
        setUser({
          username,
          email,
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

    try {
      await SecureStore.setItemAsync('accessToken', JSON.stringify(accessToken));
      await SecureStore.setItemAsync('refreshToken', JSON.stringify(refreshToken));
      await SecureStore.setItemAsync('username', JSON.stringify(user.Username));
      await SecureStore.setItemAsync('email', JSON.stringify(user.email));
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
      });

      // console.log('62 response', response.data);

      const { accessToken, refreshToken, user } = response.data;

      await saveTokens(accessToken, refreshToken, user);

      // console.log('objext', accessToken, refreshToken, user);

      setUser({
        username: user?.Username,
        email: user?.email,
        id: user?.id,
      });

      setIsLogged(true);
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
      const response = await api.get('/auth/signout');
      //(response);

      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      await SecureStore.deleteItemAsync('username');
      await SecureStore.deleteItemAsync('UserTypeID');
      await SecureStore.deleteItemAsync('UserDepartmentID');
      await SecureStore.deleteItemAsync('UserDepartmentName');
      await SecureStore.deleteItemAsync('email');
      setIsLogged(false);
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        await SecureStore.deleteItemAsync('username');
        await SecureStore.deleteItemAsync('UserTypeID');
        await SecureStore.deleteItemAsync('UserDepartmentID');
        await SecureStore.deleteItemAsync('UserDepartmentName');
        await SecureStore.deleteItemAsync('email');
        setIsLogged(false);
        setUser(null);
      }
      return Promise.reject(error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        logOut,
        isLogged,
        setIsLogged,
        login,
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
