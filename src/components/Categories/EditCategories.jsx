import { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

import EditDelete from './EditDeleteListCategs';
import TogglingEditForm from './TogglingEditForm';

export default function EditCategories(props) {

  const { state, setState, cookies, showForm, setShowForm } = props;

  // //state for the form toggled by 'Add category'
  // const [showForm, setShowForm] = useState(false);

  //state for the Add category input
  const [newCat, setNewCat] = useState("");

  //state for the alert showing user they created the category
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = (newCateg) => {

    setShowForm(false);
    setShowAlert(true);

    const userId = cookies.user;

    //send data to back-end
    return axios.post('api/categories', { newCateg, userId })
      .then(response => {

        const categ = [...state.categories];
        categ.unshift(newCateg);
        setState(prev => ({...prev, categories: categ}))

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
    <div className="EditCategories">
      {showForm && (
        <TogglingEditForm
          placeholder="Insert category name"
          name="new-category"
          onChange={(e) => setNewCat(e.target.value)}
          onSave={() => handleSave(newCat)}
          onCancel={() => setShowForm(false)}
        />
      )}
      <Alert show={showAlert} variant="success" style={{width: "20em"}}>
        Successfully created!
      </Alert>
      <br /><br />
      <EditDelete state={state} setState={setState} />      
    </div>
  );
}