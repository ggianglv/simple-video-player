import React, { useRef, useMemo, useEffect } from 'react';

const debounce = (func, delay) => {
  let timeoutId = null;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const TimeBar = ({ seconds, duration, updateCurrentTime }) => {
  const barRef = useRef(null);
  const isDrag = useRef(false);

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

  return (
    <div
      ref={barRef}
      onMouseDown={onMouseDown}
      className="time-bar"
    >
      <div style={playedStyle} className="time-bar-inner" />
    </div>
  );
};

export default TimeBar;
