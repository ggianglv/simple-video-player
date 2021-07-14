import React, { useRef, useState } from 'react';
import Caption from './Caption';
import VideoControl from './VideoControl';

const WIDTH = 600;
const HEIGHT = WIDTH * 9 / 16;

const Player = () => {
  const videoRef = useRef(null);
  const intervalId = useRef(null);
  const [canPlay, setCanPlay] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [duration, setDuration] = useState(0);

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

  const onTimeUpdate = () => {
    setSeconds(Math.round(videoRef.current.currentTime));
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
        <Caption />
      </div>

      <VideoControl
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
