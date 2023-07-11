import { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import Button from '../shared/Button';
import TogglingEditForm from './TogglingEditForm';

export default function List(props) {

  //using app data state to get categories
  const { state, setState } = props;

  //keeping edit form state local to avoid too much rendering
  const [catName, setCatName] = useState("");
  const [editMode, setEditMode] = useState(null);

  //sets edit mode to current form and value to name extracted from state
  const setMode = (i, cat) => {
    setEditMode(i);
    setCatName(cat);
  };

  //state of delete alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertCateg, setAlertCateg] = useState(null);

  const handleSave = (newValue, oldValue) => {

    //shallow copy of state categories
    const categ = [...state.categories];
    const categWithIds = [...state.categWithId];

    //get index of value being changed
    const oldIndex = categ.indexOf(oldValue);

    //change old value at index with new value
    categ[oldIndex] = newValue;

    //set state to new list of categories
    setState({ ...state, categories: categ });

    //extract id of current category to pass to back-end
    let id;
    categWithIds.forEach(item => {

      if (item.name === oldValue) {
        id = item.id;
      }
    })

    //send new name and index to back-end
    return axios.put('api/categories', { newValue, id })
      .then(response => {
        setEditMode(null);
      })
      .catch(err => { console.log('error:', err) })

  };

  const handleDelete = (categName) => {
    setShowAlert(false);

    const categWithIds = [...state.categWithId];

    //extract id of current category to pass to back-end
    //!!on refactor of code, this can be moved into a helper!!
    let id;
    categWithIds.forEach(item => {

      if (item.name === categName) {
        id = item.id;
      }
    })

    //send data to back-end
    return axios.delete('api/categories', { data: { id } })
      .then(response => {
        setState({ ...state, categories: state.categories.filter(categ => !categ.includes(categName)) })
      })
      .catch(err => { console.log('error:', err) })

  };

  const handleAlert = (categName) => {
    setAlertCateg(categName);
    setShowAlert(true);
  };

  const categoriesList = state.categories && state.categories.map((name, i) => {

    return (

      <tr key={i}>
        {/* show category name when edit mode is not active for current element */}
        {editMode !== i && <td><div className="cat-name">{name}</div></td>}
        {/* on edit mode active for current element show edit form */}
        {editMode === i ? (
          <td colSpan="3">
          <TogglingEditForm
            value={catName}
            name="cat-name"
            placeholder="Category name"
            onCancel={() => setEditMode(null)}
            onChange={(e) => setCatName(e.target.value)}
            onSave={(e) => handleSave(catName, name)}
          />
          </td>
        ) :
          // else show the buttons
          (<>
          <td>
            <Button variant="light"  onClick={() => setMode(i, name)}>Edit</Button>
          </td>
          <td>
            <Button variant="light" onClick={() => handleAlert(name)}>Delete</Button>
          </td>  
          </>)
        }
      </tr>
    );

  });

  return (
    <>
      <Modal show={showAlert} onHide={() => setShowAlert(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Deleting category "{alertCateg}" </h5>
          <p>will remove any associated videos and action cannot be undone. Proceed?</p>
          </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowAlert(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleDelete(alertCateg)}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
      <Table className="edit-categ-list" responsive size="sm">
        {categoriesList}
      </Table>
    </>
  );
}