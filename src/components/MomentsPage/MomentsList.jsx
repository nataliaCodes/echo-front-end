import { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import Button from '../shared/Button';

export default function List(props) {

  const { videoInfo, setVideoInfo } = props;
  const moments = videoInfo.moments;

  //state of delete alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertMom, setAlertMom] = useState(null);

  const handleDelete = (momName) => {

    setShowAlert(false);

    //find moment that is being changed and extract its id
    const deleted = moments.filter(moment => moment.label === momName)[0];
    const id = deleted.moment_id;

    //create updated array for back-end
    const newMoments = moments.filter(moment => moment.moment_id !== id);

    setVideoInfo({ ...videoInfo, moments: newMoments });

    //send data to back-end
    return axios.delete('api/moments', { data: { id } })
      .then(response => { })
      .catch(err => { console.log('error:', err); });

  };

  const handleAlert = momName => {
    setAlertMom(momName);
    setShowAlert(true);
  };

  const handlePlay = (start, end) => {
    setVideoInfo({ ...videoInfo, startTime: start, endTime: end });
  };

  //convert seconds to human readable times
  const hrTime = seconds => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };

  //render list of moments dynamically
  const momentsList = moments.sort((a, b) => b.moment_id - a.moment_id).map(moment => {

    const key = moment.moment_id;
    const name = moment.label;
    const start = hrTime(moment.start_time);
    const end = hrTime(moment.end_time);

    return (

      <Table key={key} size="sm">
          <th colSpan="3">
            {name}
          </th>
          <tr>
            <td>{start} - {end}</td>
          <td>
            <Button variant="light" onClick={() => handlePlay(moment.start_time, moment.end_time)}>Play</Button>
          </td>
          <td>
            <Button variant="light" onClick={() => handleAlert(name)}>Delete</Button>
          </td>
        </tr>
      </Table>
    );

  });

  return (
    <>
      <Modal show={showAlert} onHide={() => setShowAlert(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete moment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Moment "{alertMom}"</h4>
          <p>will be removed and action cannot be undone. Proceed?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowAlert(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleDelete(alertMom)}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="moments-list">
        {momentsList}
      </div>
    </>
  );
}