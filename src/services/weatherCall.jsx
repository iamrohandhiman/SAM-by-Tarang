import axios from 'axios';
export const getWeather = async (Location) => {

  ;

  const url = 'https://api.opeweathermap.org/data/2.5/weather';
  const params = {
    q: Location,
    APPID: '559c7f80a03be9a68c9acb7e7f826da5',
  };

  try {
    const response = await axios.get(url, { params });
    return response.data; 
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null; 
  }
};
