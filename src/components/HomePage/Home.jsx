import SearchBar from '../shared/SearchBar';
import PasteBar from './PasteBar'
import VideoList from './VideoList';

export default function Home(props) {
  const { onSearch, onVideoSelected, data, setSelectedVideoID, setState } = props;

  return (

    <div className="Home">
      <div className="content-container">
        <h4>Ready for replay?</h4>
        <div className="link-input">
          <PasteBar setSelectedVideoID={setSelectedVideoID} setState={setState}/>
          <h5>- OR -</h5>
          <SearchBar onSearch={onSearch} />
        </div>
        <VideoList onVideoSelected={onVideoSelected} data={data} />
      </div>
    </div>

  );
}