import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BsChevronCompactUp,
  BsChevronCompactDown,
  BsFillPlayFill,
  BsFillPauseFill,
} from "react-icons/bs";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import moment from "moment";

import { previousMusic, nextMusic } from "../../features/music/musicSlice";
import "./Player.scss";

const defaultValue = 0;
const Player = ({ showLyrics, setShowLyrics, activeMusic }) => {
  const dispatch = useDispatch();
  const audioRef = useRef();
  const progressBarRef = useRef();
  const interval = useRef(null);
  let prevMusicId = useRef(activeMusic?.id);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // If the music changed, reset the states and autoplay the music
  useEffect(() => {
    if (activeMusic?.id !== prevMusicId?.current) {
      setDuration(0);
      setCurrentTime(0);
      // Start playing after everything is loaded
      setTimeout(() => {
        progressBarRef.current.value = 0;
        audioRef.current.play();
        setIsPlaying(true);
      }, 0);
      prevMusicId.current = activeMusic?.id;
    }
  }, [activeMusic, prevMusicId]);

  // Handle the current time and range input on play/pause
  useEffect(() => {
    if (isPlaying) {
      interval.current = setInterval(() => {
        // Transform strings to number
        setCurrentTime((prevValue) => +prevValue + 1);
        progressBarRef.current.value = +progressBarRef.current.value + 1;
      }, 1000);
    } else {
      clearInterval(interval.current);
      interval.current = null;
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isPlaying]);

  // Pause when the music ends
  useEffect(() => {
    if (currentTime >= duration) {
      clearInterval(interval.current);
      interval.current = null;
      setIsPlaying(false);
    }
  }, [currentTime, duration]);

  const handlePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      // If the music ended and play clicked, start the music again.
      if (currentTime && currentTime >= duration) {
        setCurrentTime(0);
        progressBarRef.current.value = 0;
      }
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const onChangeRange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
    setCurrentTime(progressBarRef.current.value);
  };

  const onLoadedMetadata = () => {
    const seconds = Math.floor(audioRef.current.duration);
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  return (
    <div
      className="container"
      style={{
        height: "auto",
      }}
    >
      <div className="chevron" onClick={() => setShowLyrics(!showLyrics)}>
        {showLyrics ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
      </div>
      <div className="content">
        <audio
          src={activeMusic.audio}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
        />
        <div
          className={`
            cover-image-wrapper ${!showLyrics ? "showImage" : "hideImage"}`}
        >
          <img src={activeMusic?.cover} className="cover-image" alt="cover" />
        </div>
        <div className="title-wrapper">
          <span>{activeMusic?.artist}</span>
        </div>
        {!showLyrics && <h3>Player</h3>}
        <div className="range-wraper">
          {moment.utc(1000 * currentTime).format("mm:ss")}
          <input
            type="range"
            defaultValue={defaultValue}
            ref={progressBarRef}
            onChange={onChangeRange}
          />
          {duration && !isNaN(duration)
            ? moment.utc(1000 * duration).format("mm:ss")
            : null}
        </div>
        <div className="control-wrapper">
          <div className="prevNext" onClick={() => dispatch(previousMusic())}>
            <GrFormPrevious />
          </div>
          <div className="play-pause" onClick={handlePlayPause}>
            {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
          </div>
          <div className="prevNext" onClick={() => dispatch(nextMusic())}>
            <GrFormNext />
          </div>
        </div>
        {showLyrics && (
          <div className="lyrics-wrapper">
            <h3>LYRICS</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              fermentum tellus sapien, sit amet ultricies mauris posuere non.
              Donec pharetra quis dui at auctor. Maecenas magna diam, posuere at
              purus pharetra, ultricies tempor sapien. Aenean auctor elit leo,
              vitae sodales est malesuada at.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
