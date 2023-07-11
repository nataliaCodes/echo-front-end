import React from "react";

import Video from "./Video";

const VideoList = ({ data, onVideoSelected }) => {

  return (
    <div className="video-list">
      <h5>
        {data.length > 0 && <p>Select video below to start adding your moments</p>}
      </h5>
      <Video data={data} onVideoSelected={onVideoSelected} />
    </div>
  );
};

export default VideoList;