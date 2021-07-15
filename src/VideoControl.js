import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay, faPause, faClosedCaptioning, faExpand,
} from '@fortawesome/free-solid-svg-icons';

const secondsToTime = (sec) => {
  const h = Math.floor(sec / 3600).toString().padStart(2, '0');
  const m = Math.floor(sec % 3600 / 60).toString().padStart(2, '0');
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  if (h === '00') {
    return `${m}:${s}`;
  }

  return `${h}:${m}:${s}`;
};

const VideoControl = ({
  isPlay,
  duration,
  seconds,
  togglePlay,
  toggleShowCC,
  showCC,
}) => (
  <div className="video-control">
    <div className="left-control">
      <div className="control">
        <FontAwesomeIcon onClick={togglePlay} icon={isPlay ? faPause : faPlay} />
      </div>

      <div className="time-control">
        {secondsToTime(seconds)}
        {' '}
        /
        {secondsToTime(duration)}
      </div>
    </div>

    <div className="right-control">
      <div className={`control ${showCC ? 'active' : ''}`}>
        <FontAwesomeIcon onClick={toggleShowCC} icon={faClosedCaptioning} />
      </div>
      <div className="control">
        <FontAwesomeIcon icon={faExpand} />
      </div>
    </div>
  </div>
);

export default VideoControl;
