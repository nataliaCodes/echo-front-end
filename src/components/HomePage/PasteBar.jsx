import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'

export default function PasteBar(props) {

  const { setSelectedVideoID, setState } = props;

  const [showAlert, setShowAlert] = useState(false);
  const [url, setUrl] = useState('');
  let history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();

    const youtubeId = url.slice(32, 43);
    const youtubeUrl = "https://www.youtube.com/watch?v=";
    const inputUrl = url.slice(0, 32);

    if (youtubeUrl !== inputUrl) {
      setShowAlert(true);
      return;
    };

    setShowAlert(false);
    setSelectedVideoID(youtubeId);
    setState((prev) => ({ ...prev, oldVideo: false }));

    history.push('/moments');
  };

  const onInput = event => {
    const input = event.target.value;

    setUrl(input);
  };

  return (
    <>
      <Alert show={showAlert} key="pasteBarAlert" variant="warning">
        Invalid Url, Please try again.
      </Alert>

      <Form onSubmit={onSubmit}>
        <InputGroup onChange={onInput} className="paste_bar" >
          <FormControl
            placeholder="Paste Video Link"
            aria-label="Video Urls"
          />
          <InputGroup.Append>
            <Button type="submit" value={url} variant="outline-dark" >Submit</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </>
  );
}