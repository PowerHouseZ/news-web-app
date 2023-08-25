import React, { useState, useEffect, useRef } from "react";
import NewsElement from "./NewsElement";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faFacebook, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faSearch, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import ContactPage from "./ContactPage";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const NewsCatalogue = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [listening, setListening] = useState(false);
  const [showContactPage, setShowContactPage] = useState(false);
  const recognitionRef = useRef(null);

  const categories = ["World", "Politics", "Business", "Technology", "Sports"];

  var newsKey = process.env.REACT_APP_NEWS_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching new articles
      setError(null); // Clear any previous errors
      try {
        let query = searchQuery || "OpenAI, ChatGPT, API";
        if (selectedCategory) {
          query += ` ${selectedCategory}`;
        }
    
        const response = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            q: query,
            apiKey: newsKey,
            language: "en",
          },
        });
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching news articles:", error);
        setError("Error fetching news articles. Please try again later.");
        setLoading(false);
      }
    };
    

    fetchData();
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";
    }
  }, []);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.addEventListener("result", (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchInput(transcript);
      });
    }
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchInput;
    setSearchInput("");
    setSearchQuery(query);
  };

  const handleVoiceSearch = () => {
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
      recognitionRef.current.addEventListener("end", () => {
        setListening(false);
        setSearchInput("");
        recognitionRef.current.stop();
      });
      recognitionRef.current.addEventListener("result", (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
      });
    }
  };

  const handleArticleClick = (url) => {
    window.open(url, "_blank", "noopener noreferrer");
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleContactClick = () => {
    setShowContactPage(true);
  };

  const handleBackToNews = () => {
    setShowContactPage(false);
  };

  const filteredArticles = showContactPage ? [] : articles;

  return (
    <div>
      <div style={{ position: "relative" }}>
        <video
          src={process.env.PUBLIC_URL + "/Videos/video-2.mp4"}
          autoPlay
          muted
          loop
          style={{ width: "100%" }}
        ></video>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "25px",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          PICUS AI NEWS NETWORK <br /> <br /> THE WORLDWIDE NEWS APP
        </div>
      </div>

      <header>
        <h1>
          <a href="/" className="home-link">
            PICUS AI NEWS NETWORK{" "}
            <FontAwesomeIcon icon={faGlobe} spin />
          </a>
        </h1>
        <h2>
          <a
            href="https://www.facebook.com/OpenAIResearch"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              className="facebook-icon"
              size="2x"
            />
          </a>
          <a
            href="https://www.linkedin.com/company/openai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="linkedin-icon"
              size="2x"
            />
          </a>
          <a
            href="https://github.com/openai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="github-icon"
              size="2x"
            />
          </a>
        </h2>
        <nav>
          <ul className="menu">
            {categories.map((category) => (
              <li key={category} onClick={() => handleCategoryClick(category)}>
                <span>{category}</span>
              </li>
            ))}
          </ul>
        </nav>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            placeholder="Search news..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <button type="submit" className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button
            type="button"
            className="voice-button"
            onClick={handleVoiceSearch}
            disabled={listening}
          >
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
          {listening && <span className="listening-text">Listening...</span>}
        </form>
      </header>
      <main>
        {loading ? (
          <p className="load1">Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : showContactPage ? (
          <section id="contact">
            <ContactPage onBackToNews={handleBackToNews} />
          </section>
        ) : (
          <section className="news-container">
            {filteredArticles.map((article) => (
              <NewsElement
                key={article.url}
                title={article.title}
                description={article.description}
                url={article.url}
                urlToImage={article.urlToImage}
                onClick={handleArticleClick}
              />
            ))}
          </section>
        )}
      </main>
      <footer>
        <li onClick={handleContactClick} style={{ listStyle: "none" }}>
          <a href="#contact" className="contact-link">
            Contact Us
          </a>
        </li>
        <div className="social-icons">
          <a
            href="https://www.youtube.com/watch?v=o5MutYFWsM8"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faYoutube}
              className="youtube-icon"
              size="3x"
            />
          </a>
          <p>LEARN MORE ABOUT CHATGPT BY VISITING YOUTUBE</p>
        </div>
        <div className="about-section">
          <h3>About PICUS AI NEWS NETWORK</h3>
          <p>
            PICUS AI NEWS NETWORK is a platform that provides up-to-date news
            articles on various topics including world news, politics, business,
            technology, and sports. Our goal is to keep you informed with
            accurate and relevant news from around the globe.
          </p>
          <p>&copy; {new Date().getFullYear()} COPYRIGHT PICUS AI NEWS NETWORK. ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </div>
  );
};

export default NewsCatalogue;
