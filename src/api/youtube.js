import axios from 'axios';
const KEY = 'AIzaSyCyrT0ITFDDF93n5-Bmfvbf8gQQ06QbBOE'

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: 'snippet',
    maxResults: 30,
    key: KEY
  }
})