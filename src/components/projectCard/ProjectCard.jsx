import { Link } from "react-router-dom";
import "./projectCard.scss";

const ProjectCard = ({ card }) => {
  return (
    <Link
      to="/"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="project-card">
        <img src={card.img} alt={card.title} />
        <div className="details">
          <img src={card.pp} alt={card.username} />
          <div className="text">
            <span className="cat">{card.cat}</span>
            <span className="name">{card.username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
