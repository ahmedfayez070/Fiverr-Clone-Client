import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./landingHome.scss";

const LandingHome = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  return (
    <div className="landing">
      <div className="container">
        <div className="content">
          <h1>
            find the perfect <span>freelance</span> services for your business
          </h1>
          <div className="search">
            <div className="search-input">
              <img src="/assets/search.png" alt="" />
              <input
                type="text"
                placeholder="Try 'building mobile app'"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>WordPress</button>
            <button>Logo Design</button>
            <button>AI services</button>
          </div>
        </div>
        <div className="img">
          <img src="/assets/man.png" alt="landing" />
        </div>
      </div>
    </div>
  );
};

export default LandingHome;
