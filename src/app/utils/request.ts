import axios from 'axios';
import toast from 'react-hot-toast';

const request = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_API,
  params: { APPID: process.env.REACT_APP_WEATHER_API_KEY },
});

request.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error?.response?.data?.message, { position: 'top-center' });
    } else {
      toast.error(error?.message, { position: 'top-center' });
    }
  },
);

export default request;
