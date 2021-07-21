import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay, faPause, faClosedCaptioning, faExpand,
} from '@fortawesome/free-solid-svg-icons';
import { secondsToTime } from './helpers';

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
