import React, { useState } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function SearchBar(props) {
  const [state, setState] = useState({
    title: ''
  });

  const onSearchChanged = event => {
    const _title = event.target.value;

    setState({ title: _title });
  };

  const onSubmit = event => {
    event.preventDefault();

    props.onSearch(state.title);
  };

  return (

    <Form onSubmit={onSubmit}>
      <InputGroup onChange={onSearchChanged} className="form-controls" id="video-search">
        <FormControl
          placeholder="Enter Search Keyword"
          aria-label="Search"
        />
        <InputGroup.Append>
          <Button type="submit" value={state.title} variant="outline-dark" >Search</Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>

  );
}

