import { USR_KEY, PER_PAGE, BASE_URL } from './constList/constList';

export const getImagesGallery = async (query, currPage) => {
  const querryUrl = `${BASE_URL}?q=${query}&page=${currPage}&key=${USR_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;
  const response = await fetch(querryUrl, {
    method: 'GET',
    cache: 'no-cache',
  });

  if (response.ok) {
    const dataArr = await response.json();
    return dataArr;
  } else {
    console.log('HTTP ERROR');
  }
};
