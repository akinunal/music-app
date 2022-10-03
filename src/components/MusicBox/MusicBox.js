import React from "react";

import "./MusicBox.scss";

const MusicBox = ({ musicData, onClick }) => {
  return (
    <div
      className={`box ${musicData.active ? "active" : ""}`}
      onClick={() => onClick(musicData.id)}
    >
      <div className="image-wrapper">
        <img src={musicData.cover} className="image" alt="cover" />
      </div>
      <div className="music-data-wrapper">
        <span>{musicData.name}</span>
        <span>{musicData.artist}</span>
      </div>
    </div>
  );
};

export default MusicBox;
