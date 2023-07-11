import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import VideoThumbnails from "./VideoThumbnails";

export default function CategoriesList(props) {

  //extract categories list from state
  const { state, setState, onVideoSelected, selectedVideoID } = props;

  //render list of categories with corresponding videos dynamically
  const accordionCards = state.categories && state.categories.map((name, index) => {

    return (

      <Card key={index}>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} variant="link" eventKey={index + 1}>
            {name}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={index + 1}>
          <Card.Body>
            <VideoThumbnails category={name} state={state} setState={setState} onVideoSelected={onVideoSelected} selectedVideoID={selectedVideoID} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>

    );
  });

  //render page content based on categories existence
  return (
    <div className="Accordion">
      <h5>Select category below to see its videos</h5>
      {accordionCards && accordionCards.length > 0 ?
      <Accordion style={{width: "90%", marginLeft: "3em"}}>
        {accordionCards}
      </Accordion>
      :
      <p>No categories found</p>
      }
    </div>
  )
};