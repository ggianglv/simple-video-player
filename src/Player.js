import React, { useRef, useState } from 'react';
import Caption from './Caption';
import VideoControl from './VideoControl';
import TimeBar from './TimeBar';

const WIDTH = 600;
const HEIGHT = WIDTH * 9 / 16;

const Player = () => {
  const videoRef = useRef(null);
  const [canPlay, setCanPlay] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const [showCC, setShowCC] = useState(true);

  const onCanPlay = () => {
    setDuration(videoRef.current.duration);
    setCanPlay(true);
  };

  const togglePlay = () => {
    if (!canPlay) {
      return;
    }
    if (isPlay) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlay(!isPlay);
  };

  const toggleShowCC = () => {
    setShowCC(!showCC);
  };

  const onTimeUpdate = () => {
    setSeconds(Math.round(videoRef.current.currentTime));
  };

  const updateCurrentTime = (time) => {
    videoRef.current.currentTime = time;
  };

  return (
    <div className="video-player">
      <div style={{ width: WIDTH, height: HEIGHT }} className="video">
        <video
          onTimeUpdate={onTimeUpdate}
          onCanPlay={onCanPlay}
          ref={videoRef}
          width={WIDTH}
          height={HEIGHT}
        >
          <source src="https://edx-video.net/StanfordOnlineCSX0003-V000700_DTH.mp4" type="video/mp4" />
        </video>
        <Caption showCC={showCC} seconds={seconds} />
      </div>

      <TimeBar seconds={seconds} duration={duration} updateCurrentTime={updateCurrentTime} />

      <VideoControl
        showCC={showCC}
        toggleShowCC={toggleShowCC}
        togglePlay={togglePlay}
        canPlay={canPlay}
        duration={duration}
        isPlay={isPlay}
        seconds={seconds}
      />
    </div>
  );
};

export default Player;
