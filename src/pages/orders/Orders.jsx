import { Link, useNavigate } from "react-router-dom";
import "./orders.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import makeRequest from "../../axios";

const Orders = () => {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () =>
      await makeRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;
    try {
      const res = await makeRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (error) {
      if (error.response.status === 404) {
        const res = await makeRequest.post(`/conversations`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: ";

  return (
    <div className="orders">
      <div className="container">
        <h1>Orders</h1>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
            <th>Contact</th>
          </tr>
          {data.map((order) => (
            <tr key={order._id}>
              <td>
                <img src={order.img} alt="" className="img" />
              </td>
              <td>{order.title}</td>
              <td>{order.price}</td>
              <td>{currentUser.username}</td>
              <td>
                <img
                  src="/assets/message.png"
                  alt="contact"
                  className="delete"
                  onClick={() => handleContact(order)}
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Orders;
