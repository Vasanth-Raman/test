import React, { useState } from "react";
import styles from "./VideoPlayer.module.css";

const VideoPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const isYouTubeUrl = (url) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const getYouTubeEmbedUrl = (url) => {
    let videoId;

    if (url.includes("youtu.be")) {
      videoId = url.split("/").pop().split("?")[0];
    } else {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get("v");
    }

    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <div className={styles.videoPlayerCard}>
      <div className={styles.videoWrapper} onClick={handlePlayPause}>
        {isYouTubeUrl(src) ? (
          <iframe
            src={getYouTubeEmbedUrl(src)}
            className={styles.video}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video
            src={src}
            className={styles.video}
            controls
            autoPlay={isPlaying}
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
