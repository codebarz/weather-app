import axios from 'axios';
import toast from 'react-hot-toast';

const request = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_API,
  //This is so app can be easily run. Credentials would obly be in environemnt variables for prod level apps
  params: { APPID: process.env.REACT_APP_WEATHER_API_KEY || '4c4cadb8c3f521a1f7292e5bb28d5b1f' },
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
