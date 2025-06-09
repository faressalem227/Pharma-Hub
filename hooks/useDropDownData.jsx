/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';

import api from '../utilities/api';

export const HandleDropdownFormat = (data, key, label) => {
  return data.map((item) => {
    return {
      key: item[key],
      value: item[label],
    };
  });
};

export function useDropDown(spName, params = {}, key, value, dependencies = []) {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDropDownData = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/table/filter?sp=${spName}${
          new URLSearchParams(params).toString() ? '&' + new URLSearchParams(params).toString() : ''
        }`
      );
      //(response.data.data, "444444");
      setOriginalData(response.data.data);

      const formattedData = HandleDropdownFormat(response.data.data, key, value);
      setData(formattedData);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching the dropdown options');
    } finally {
      setLoading(false); // Ensure loading is set to false in finally block
    }
  };

  useEffect(() => {
    fetchDropDownData();
  }, [...dependencies, JSON.stringify(params)]); // Include relevant dependencies

  return { data, loading, error, originalData };
}
