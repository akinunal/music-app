import React from "react";
import { useDispatch } from "react-redux";
import MusicBox from "../MusicBox/MusicBox";

import { changeMusic } from "../../features/music/musicSlice";
import "./Navigation.scss";

const Navigation = ({ musicList }) => {
  const dispatch = useDispatch();

  const handleChangeMusic = (musicId) => {
    dispatch(changeMusic(musicId));
  };

  return (
    <div className="navigation">
      <h2>Library</h2>
      {musicList?.map((music, index) => (
        <MusicBox key={index} musicData={music} onClick={handleChangeMusic} />
      ))}
    </div>
  );
};

export default Navigation;
