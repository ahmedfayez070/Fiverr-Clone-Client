import { Link } from "react-router-dom";

import "./catCard.scss";

const CatCard = ({ card }) => {
  return (
    <Link
      to="/gigs?cat=art"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="cat-card">
        <img src={card.img} alt={card.title} />
        <span className="desc">{card.desc}</span>
        <span className="title">{card.title}</span>
      </div>
    </Link>
  );
};

export default CatCard;
