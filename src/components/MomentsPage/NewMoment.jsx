import { useState, useEffect } from 'react';
import axios from 'axios';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Alert from 'react-bootstrap/Alert';

import Button from '../shared/Button';

export default function Moment(props) {

  const { videoInfo, setVideoInfo, videoDBid, cookies, oldVideo } = props;

  //state for the form toggled by 'Add moment'
  const [showForm, setShowForm] = useState(false);

  //state for the alert confirming creation
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = (newValue, vidId) => {

    setShowForm(false);
    setShowAlert(true);
    // setVideoInfo({...videoInfo, newMoment: ""});

    const userId = cookies.user;
    let start = videoInfo.startTime;
    let end = videoInfo.endTime;


    //send data to back-end
    return axios.post('api/moments', { userId, vidId, newValue, start, end})
      .then(response => {
        videoInfo.moments.push(response.data)
        setVideoInfo({...videoInfo, newMoment: "", moments: videoInfo.moments});
      })
      .catch(err => { console.log('error:', err) })
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, [showAlert]);


  return (
    <div className="new-moment">
      {showAlert && <small>Successfully created!</small>}<br />
      {!oldVideo && cookies.user && <Alert variant='info'>Please save your video before adding moments!</Alert>}
      {!showForm && oldVideo && <Button onClick={() => setShowForm(true)}>Add moment</Button>}
      <br /><br />
      {showForm && <>
        <InputGroup className="mb-3">
          <FormControl
            className="main"
            placeholder="Insert moment name"
            name="new-moment"
            value={videoInfo.newMoment}
            onChange={e => setVideoInfo({ ...videoInfo, newMoment: e.target.value })}
          />
          <FormControl
            placeholder="Start time(seconds)"
            name="start-time"
            value={videoInfo.startTime}
            onChange={e => setVideoInfo({ ...videoInfo, startTime: e.target.value })}
          />
          <FormControl
            placeholder="End time(seconds)"
            name="end-time"
            value={videoInfo.endTime}
            onChange={e => setVideoInfo({ ...videoInfo, endTime: e.target.value })}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={() => handleSave(videoInfo.newMoment, videoDBid)}>Save</Button>
            <Button variant="outline-secondary" onClick={() => setShowForm(false)}>Cancel</Button>
          </InputGroup.Append>
        </InputGroup>
      </>
      }
    </div>
  );
}