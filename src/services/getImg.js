import { IMG_URL } from './constList';
import noImg from '../images/no-image.jpg';

const getImg = el => {
  if (el.profile_path) {
    return `${IMG_URL + el.profile_path}`;
  } else if (el.poster_path) {
    return `${IMG_URL + el.poster_path}`;
  }
  return noImg;
};

export default getImg;
