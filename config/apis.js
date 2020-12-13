
import config from './appConfig';
import appConfig from './appConfig';

export const getImagesAsync = (page) => {
    return fetch(`${appConfig.baseUrl}${appConfig.photosPath}${appConfig.clientKey}&page=${page}&per_page=12`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
  };