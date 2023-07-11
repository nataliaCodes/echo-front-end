import { Link } from "react-router-dom"

import Card from 'react-bootstrap/Card';

function selectVideo(videoIdObj, onVideoSelected) {
  onVideoSelected(videoIdObj.videoId);

}

function constructVideoTitles(videosData, onVideoSelected) {
  // eslint-disable-next-line
  return videosData.map(({ snippet, id }, index) => {
    const thumbnail = `https://img.youtube.com/vi/${id.videoId}/mqdefault.jpg`;
    if (id.videoId) {
      return (
        <Link to="/moments" >
          <Card key={index} className='userVideos' style={{ width: "23em" }} onClick={() => selectVideo(id, onVideoSelected)}>
            <Card.Header closeButton>
              {snippet.title}
            </Card.Header>
            <Card.Img variant="bottom" src={thumbnail} alt="thumbnail" />
          </Card>
        </Link>
      )
    }
  });
}

const Video = ({ data, onVideoSelected }) => {
  return (
    <div id="search" className="search-results">
      {constructVideoTitles(data, onVideoSelected)}
    </div>
  )
};

export default Video;