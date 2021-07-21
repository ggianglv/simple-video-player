export const secondsToTime = (sec) => {
  const h = Math.floor(sec / 3600).toString().padStart(2, '0');
  const m = Math.floor(sec % 3600 / 60).toString().padStart(2, '0');
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  if (h === '00') {
    return `${m}:${s}`;
  }

  return `${h}:${m}:${s}`;
};

export const getImageFromVideo = (captureVideo, time) => new Promise((resolve) => {
  const width = 160;
  const height = 90;
  const video = document.createElement('video');
  video.width = width;
  video.height = height;
  const source = document.createElement('source');
  video.appendChild(source);
  source.src = captureVideo.getElementsByTagName('source')[0].src;
  video.addEventListener('loadeddata', () => {
    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, width, height);
      const dataURL = canvas.toDataURL();

      resolve(dataURL);
    });
    video.currentTime = time;
  });
});
