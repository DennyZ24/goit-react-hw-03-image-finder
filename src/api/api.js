import axios from 'axios';

const fetchImages = async (searchQuery, page) => {
  const MY_KEY = '22651071-f9099fec57830f45a4a02f8b5';
  const URL = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  
  const response = await axios.get(URL);
  return response.data.hits;
}

export default fetchImages;