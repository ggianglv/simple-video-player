import React, {
  useRef, useMemo, useEffect, useState, useCallback,
} from 'react';
import { getImageFromVideo, secondsToTime } from './helpers';

const debounce = (func, delay) => {
  let timeoutId = null;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const THUMBNAIL_WIDTH = 160;

const TimeBar = ({
  seconds, duration, updateCurrentTime, videoRef,
}) => {
  const barRef = useRef(null);
  const isDrag = useRef(false);
  const [thumbnailImg, setThumbnailImg] = useState(null);
  const [thumbnailData, setThumbnailData] = useState(null);

  const getSeconds = (pageX) => {
    const { left, right } = barRef.current.getBoundingClientRect();
    const percent = (pageX - left) / (right - left);

    return percent * duration;
  };

  const onMouseUp = () => {
    isDrag.current = false;
    window.removeEventListener('mouseup', onMouseUp);
  };

  useEffect(() => {
    const onMouseMove = debounce((e) => {
      if (!isDrag.current) {
        return;
      }
      const nextSeconds = getSeconds(e.pageX);
      updateCurrentTime(nextSeconds);
    }, 100);

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isDrag, barRef, duration]);

  const playedStyle = useMemo(() => {
    if (!duration) {
      return { width: 0 };
    }

    return {
      width: ` ${seconds * 100 / duration}%`,
    };
  }, [seconds, duration]);

  const onMouseDown = (e) => {
    isDrag.current = true;
    window.addEventListener('mouseup', onMouseUp);
    updateCurrentTime(getSeconds(e.pageX));
  };

  const showThumbnailImg = useCallback(debounce((time) => {
    getImageFromVideo(videoRef.current, time).then((img) => {
      setThumbnailImg(img);
    });
  }, 100), []);

  const showThumbnail = (e) => {
    setThumbnailData({
      thumbnailX: e.pageX,
      time: getSeconds(e.pageX),
    });
    showThumbnailImg(getSeconds(e.pageX));
  };

  const hideThumbnail = () => {
    setThumbnailData(null);
    setThumbnailImg(null);
  };

  const getThumbnailStyle = () => {
    if (!barRef.current || !thumbnailData) {
      return {};
    }

    const { left, width } = barRef.current.getBoundingClientRect();
    const { thumbnailX } = thumbnailData;

    return {
      left: Math.min(Math.max(thumbnailX - left - THUMBNAIL_WIDTH / 2, 0), width - THUMBNAIL_WIDTH),
    };
  };

  return (
    <div
      ref={barRef}
      onMouseDown={onMouseDown}
      className="time-bar"
      onMouseMove={showThumbnail}
      onMouseLeave={hideThumbnail}
    >
      <div style={playedStyle} className="time-bar-inner" />

      {thumbnailData && (
        <div style={getThumbnailStyle()} className="thumbnail">
          <div className="image">
            {thumbnailImg && <img src={thumbnailImg} alt="thumbnail" />}
          </div>
          <div className="time">{secondsToTime(thumbnailData.time)}</div>
        </div>
      )}
    </div>
  );
};

export default TimeBar;
