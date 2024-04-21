import { useQuery } from "@tanstack/react-query";
import "./review.scss";
import makeRequest from "../../axios";

const Review = ({ review }) => {
  const { isPending, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      makeRequest.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });

  if (isPending) return "Loading...";

  if (error) return "An Error has occured";

  return (
    <div className="review">
      <div className="user">
        <img
          className="pp"
          src={data.img || "/assets/noavatar.jpg"}
          alt={data.username}
        />
        <div className="info">
          <span>{data.username}</span>
          <div className="country">
            <span>{data.country}</span>
          </div>
        </div>
      </div>
      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src="/assets/star.png" alt="" key={i} />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/assets/like.png" alt="" />
        <span>Yes</span>
        <img src="/assets/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
