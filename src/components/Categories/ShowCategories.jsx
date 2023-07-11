import CategoriesList from './ShowCategoriesList';

export default function ShowCategories(props) {

  const { state, setState, onVideoSelected, selectedVideoID } = props;

  return (

    <div className="ShowCategories">
      <CategoriesList state={state} setState={setState} onVideoSelected={onVideoSelected} selectedVideoID={selectedVideoID} />
    </div>

  );
};