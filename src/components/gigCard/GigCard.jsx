import { Link } from "react-router-dom";
import makeRequest from "../../axios";
import { useQuery } from "@tanstack/react-query";
import "./gigCard.scss";

const GigCard = ({ card }) => {
  const { isPending, error, data } = useQuery({
    queryKey: [`${card.userId}`],
    queryFn: () =>
      makeRequest.get(`/users/${card.userId}`).then((res) => {
        return res.data;
      }),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: ";

  return (
    <Link to={`/gig/${card._id}`}>
      <div className="gig-card">
        <img src={card.cover} alt={data.username} />
        <div className="info">
          <div className="user">
            <img src={data.img || "/assets/noavatar.jpg"} alt={data.username} />
            <span>{data.username}</span>
          </div>
          <p>{card.desc}</p>
          {!isNaN(Math.round(card.totalStars / card.starNumber)) && (
            <div className="star">
              {Array(Math.round(data.totalStars / data.starNumber))
                .fill()
                .map((item, i) => (
                  <img src="/assets/star.png" alt="" key={i} />
                ))}
              <span>{Math.round(card.totalStars / card.starNumber)}</span>
            </div>
          )}
        </div>
        <div className="details">
          <img src="/assets/heart.png" alt="heart" />
          <div className="price">
            <span>STARTING AT</span>
            <h5>${card.price}</h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
