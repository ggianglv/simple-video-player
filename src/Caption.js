import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const textToSeconds = (text) => {
  const splited = text.split(':').map((t) => Number(t.replace(',', '.')));

  const [hour, minute, sec] = splited;
  return hour * 60 * 60 + minute * 60 + sec;
};

const Caption = ({ seconds, showCC }) => {
  const [subtitles, setSubtitles] = useState([]);

  useEffect(() => {
    fetch('/sub.srt').then((res) => res.text()).then((data) => {
      const lines = [];
      data.split(/\n{2}/).forEach((line) => {
        const [_, time, text] = line.split('\n');
        if (!time || !text) {
          return;
        }
        const [from, to] = time.split('-->').map((tx) => tx.trim());

        lines.push({
          time: { from: textToSeconds(from), to: textToSeconds(to) },
          text,
        });
      });
      setSubtitles(lines);
    });
  }, []);

  const getCaption = () => {
    const subtitle = subtitles.find((item) => {
      const { from, to } = item.time;

      return seconds > from && seconds < to;
    });

    if (!subtitle) {
      return '';
    }

    return subtitle.text;
  };

  if (!getCaption()) {
    return null;
  }

  return (
    <div className="caption">
      <div className="caption-content">
        <div className="caption-pos">
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: getCaption() }} className="caption-text" />
      </div>
    </div>
  );
};

export default Caption;
