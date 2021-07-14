import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const Caption = ({ seconds, showCC }) => {
  const [subtitle, setSubtitle] = useState([]);

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
          time: { from, to },
          text,
        });
      });
      setSubtitle(lines);
    });
  }, []);

  const getCaption = () => {
    console.log(subtitle);
    return 'Caption';
  };

  return (
    <div className="caption">
      <div className="caption-content">
        <div className="caption-pos">
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        <div className="caption-text">
          {getCaption()}
        </div>
      </div>
    </div>
  );
};

export default Caption;
