import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CirclesWithBar } from "react-loader-spinner";
import { fetchMusics } from "./features/music/musicSlice";
import musiclist from "./server/musicdata";
import { CONSTANTS } from "./constants/constants";

import Player from "./components/Player/Player";
import Navigation from "./components/Navigation/Navigation";

import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [showLyrics, setShowLyrics] = useState(false);
  const music = useSelector((state) => state.music);
  const activeMusic = music.musicList.find((music) => music.active);

  useEffect(() => {
    dispatch(fetchMusics(musiclist()));
    setTimeout(() => {
      setIsLoading(false);
    }, CONSTANTS.defaultLoadingTime);
  }, [dispatch]);

  if (isLoading) {
    return (
      <CirclesWithBar
        height="100"
        width="100"
        color={CONSTANTS.loaderColor}
        wrapperClass="LoaderContainer"
        visible={true}
        ariaLabel="circles-with-bar-loading"
      />
    );
  }

  return (
    <div className="App">
      <Navigation musicList={music.musicList} />
      <Player
        showLyrics={showLyrics}
        setShowLyrics={setShowLyrics}
        activeMusic={activeMusic}
      />
    </div>
  );
}

export default App;
