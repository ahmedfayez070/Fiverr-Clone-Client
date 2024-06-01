import { Link } from "react-router-dom";
import moment from "moment";
import "./messages.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeRequest from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Messages = () => {
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () =>
      await makeRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      return await makeRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: ";

  return (
    <div className="messages">
      <div className="container">
        <h1>Messages</h1>
        <table>
          <tr>
            <th>{currentUser.isSeller ? "Seller" : "Buyer"} Id</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          {data.map((message) => (
            <tr
              className={
                ((currentUser.isSeller && !message.readBySeller) ||
                  (!currentUser.isSeller && !message.readByBuyer)) &&
                "active"
              }
              key={message.id}
            >
              <td>
                {currentUser.isSeller ? message.sellerId : message.buyerId}
              </td>
              <td>
                <Link to={`/message/${message.id}`}>
                  {message?.lastMessage.substring(0, 120)}...
                </Link>
              </td>
              <td>{moment(data.updatedAt).fromNow()}</td>
              <td>
                {((currentUser.isSeller && !message.readBySeller) ||
                  (!currentUser.isSeller && !message.readByBuyer)) && (
                  <button onClick={() => handleRead(message.id)}>
                    Mark as Read
                  </button>
                )}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Messages;
