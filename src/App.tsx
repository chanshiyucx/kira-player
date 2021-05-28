import React from "react";
import "./App.css";
import "./main.css";
import { Music } from "./types";
import {
  Icons,
  HeartIcon,
  LinkIcon,
  PrevIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
} from "./Icons";

const config: Array<Music> = [
  {
    name: "Mekanın Sahibi",
    artist: "Norm Ender",
    cover:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
    source:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
    url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
    favorited: false,
  },
  {
    name: "Everybody Knows",
    artist: "Leonard Cohen",
    cover:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
    source:
      "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
    url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
    favorited: false,
  },
];

function App() {
  const audio = null;
  const circleLeft = null;
  const barWidth = null;
  const duration = null;
  const currentTime = null;
  const isTimerPlaying = false;
  const currentTrack = {
    artist: 1,
    name: 2,
  };
  const currentTrackIndex = 0;
  const transitionName = null;

  return (
    <div>
      <div className="wrapper" id="app">
        <div className="player">
          <div className="player__top">
            <div className="player-cover">
              <div className="player-cover__item"></div>
            </div>
            <div className="player-controls">
              <div className="player-controls__item -favorite">
                <HeartIcon />
              </div>
              <a href="/" target="_blank" className="player-controls__item">
                <LinkIcon />
              </a>
              <div className="player-controls__item">
                <PrevIcon />
              </div>
              <div className="player-controls__item">
                <NextIcon />
              </div>
              <div className="player-controls__item -xl js-play">
                <svg className="icon">
                  {isTimerPlaying ? <PauseIcon /> : <PlayIcon />}
                </svg>
              </div>
            </div>
          </div>
          <div className="progress">
            <div className="progress__top">
              <div className="album-info" v-if="currentTrack">
                <div className="album-info__name">{currentTrack.artist}</div>
                <div className="album-info__track">{currentTrack.name}</div>
              </div>
              <div className="progress__duration">{duration}</div>
            </div>
            <div className="progress__bar">
              <div className="progress__current"></div>
            </div>
            <div className="progress__time">{currentTime}</div>
          </div>
        </div>
      </div>
      <Icons />
    </div>
  );
}

export default App;
