import { useState } from 'react';
import axios from 'axios';

const useApi = (url, method) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const callApi = async (body = {}) => {
    setLoading(true);
    try {
      const response = await axios({
        url,
        method,
        data: body,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData(response.data);
      setError(null);
    } catch (err) {
      if (err.response) {
        setError(err.response.data); // Use the exact error response from the server
      } else if (err.request) {
        setError('Network Error'); // Handle network errors
      } else {
        setError('Unknown Error'); // Fallback for any other errors
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, callApi };
};

export default useApi;
