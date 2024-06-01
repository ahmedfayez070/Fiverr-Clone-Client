import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeRequest from "../../axios";
import "./message.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Message = () => {
  const [message, setMessage] = useState("");

  const { currentUser } = useContext(AuthContext);

  const { id } = useParams();

  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      makeRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: async (inputs) => {
      return await makeRequest.post(`/messages`, inputs);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) {
      mutation.mutate({ conversationId: id, desc: message });
      setMessage("");
    }
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: ";

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> &gt; John Doe &gt;
        </span>
        <div className="all-messages">
          {data.map((message) => (
            <div
              className={
                currentUser._id === message.userId ? "item owner" : "item"
              }
              key={message._id}
            >
              <img src="/assets/noavatar.jpg" alt="" />
              <p>{message.desc}</p>
            </div>
          ))}
        </div>
        <hr />
        <form className="write" onSubmit={handleSendMessage}>
          <textarea
            type="text"
            placeholder="Write a message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
