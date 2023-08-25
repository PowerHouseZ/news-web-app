import "./NewsElement.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";

const NewsElement = ({ title, description, url, urlToImage, onClick }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const handleLike = (event) => {
    event.stopPropagation();
    setLikes(likes + 1);
  };

  const handleDislike = (event) => {
    event.stopPropagation();
    setDislikes(dislikes + 1);
  };

  const handleElementClick = () => {
    onClick(url);
  };

  const handleShareFacebook = (event) => {
    event.stopPropagation();
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(shareUrl, "_blank");
  };

  const handleTweet = (event) => {
    event.stopPropagation();
    const tweetText = encodeURIComponent(
      `Check out this article: ${title} - ${url}`
    );
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <div className="news-element" onClick={handleElementClick}>
      <img src={urlToImage} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <div>
        <button onClick={handleLike}>
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{likes}</span>
        </button>
        <button onClick={handleDislike}>
          <FontAwesomeIcon icon={faThumbsDown} />
          <span>{dislikes}</span>
        </button>
        <button onClick={handleShareFacebook}>
          <FontAwesomeIcon icon={faFacebook} />
          <span>Share on Facebook</span>
        </button>
        <button onClick={handleTweet}>
          <FontAwesomeIcon icon={faTwitter} />
          <span>Tweet this</span>
        </button>
      </div>
    </div>
  );
};

export default NewsElement;
