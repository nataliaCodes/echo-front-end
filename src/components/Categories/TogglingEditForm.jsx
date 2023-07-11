import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import Button from '../shared/Button';

export default function TogglingEditForm(props) {

  return (

    <InputGroup className="mb-3">
      <FormControl
        aria-describedby="basic-addon2"
        placeholder={props.placeholder}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
      />
      <InputGroup.Append>
        <Button onClick={props.onSave}>Save</Button>
        <Button onClick={props.onCancel}>Cancel</Button>
      </InputGroup.Append>
    </InputGroup>
  );
};