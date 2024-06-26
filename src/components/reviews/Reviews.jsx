import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import makeRequest from "../../axios";
import Review from "../review/Review";
import "./reviews.scss";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      makeRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: async (review) => {
      return await makeRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  if (isPending) return "Loading...";

  if (error) return "An Error has occured";

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {data.map((review) => (
        <Review key={review._id} review={review} />
      ))}
      <div className="add">
        <h3>Add a review</h3>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="write your opinion" />
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
