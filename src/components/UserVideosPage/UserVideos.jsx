import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Button from '../shared/Button';
import Modal from 'react-bootstrap/Modal';

export default function UserVideos(props) {
  const videos = props.state.videos;

  const [showAlert, setShowAlert] = useState(false);
  const [alertVid, setAlertVid] = useState(null);


  const handleAlert = vid => {
    setAlertVid(vid);
    setShowAlert(true);
  };

  const handleDelete = (video) => {

    setShowAlert(false);

    return axios.delete('api/videos', { params: { id: video.id }})
      .then(response => {
        props.setState(prev => ({ ...prev, videos: videos.filter((vid) => vid.id !== video.id) }));
      })
      .catch(err => { console.log('error:', err); });
  };

  const videoList = videos && videos.map((video, index) => {

    const youtubeId = video.link.slice(32, 43);
    const thumbnail = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;

    const videoOnClick = () => {
      props.onVideoSelected(youtubeId);
      props.setState((prev) => ({ ...prev, oldVideo: true, selectedVidId: video.id }));
    };

    return (

      <Card key={index} className='userVideos' style={{ width: "23em" }} onClick={() => videoOnClick()}>
        <Link to="/moments">
          <Card.Header closeButton>
            {video.title}
          </Card.Header>
          <Card.Img variant="bottom" src={thumbnail} alt="thumbnail" />
        </Link>
        <Button onClick={() => handleAlert(video)}>Delete</Button>
      </Card>
    );
  });

  return (

    <div className="UserVideos">
      <div className="content-container">
        <h4>Select video below to start adding your moments</h4>

        <Modal show={showAlert} onHide={() => setShowAlert(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Video</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <h5>Video "{alertVid && alertVid.title}" </h5>
              <p>will be removed and action cannot be undone. Proceed?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => setShowAlert(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleDelete(alertVid)}>
              Proceed
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="user-video-list">
          {videoList}
        </div>
      </div>
    </div>
  );
}