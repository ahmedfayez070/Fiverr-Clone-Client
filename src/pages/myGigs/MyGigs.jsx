import { Link } from "react-router-dom";
import "./myGigs.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeRequest from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const MyGigs = () => {
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      makeRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      return await makeRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: ";

  return (
    <div className="my-gigs">
      <div className="container">
        <div className="title">
          <h1>Gigs</h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button>Add New Gig</button>
            </Link>
          )}
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Orders</th>
            <th>Action</th>
          </tr>
          {data.map((gig) => (
            <tr key={gig._id}>
              <td>
                <img src={gig.cover} alt="" className="img" />
              </td>
              <td>{gig.title}</td>
              <td>{gig.price}</td>
              <td>{gig.sales}</td>
              <td>
                <img
                  src="/assets/delete.png"
                  alt="delete"
                  className="delete"
                  onClick={() => handleDelete(gig._id)}
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default MyGigs;
