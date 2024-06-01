import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import makeRequest from "../../axios";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./gig.scss";
import Reviews from "../../components/reviews/Reviews";

const responsive = {
  mobile: {
    breakpoint: { max: 5000, min: 0 },
    items: 1,
  },
};

function Gig() {
  const { id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: async () =>
      await makeRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isPending: isPendingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () =>
      await makeRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  if (isPending || isPendingUser)
    return (
      <div className="gig">
        <div className="container">Loading...</div>
      </div>
    );

  if (error || errorUser)
    return (
      <div className="gig">
        <div className="container">An Error has occured</div>
      </div>
    );

  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">Fiverr &gt; {data.cat}</span>
          <h1>{data.title}</h1>
          <div className="user">
            <img
              className="pp"
              src={dataUser.img || "/assets/noavatar.jpg"}
              alt={dataUser.username}
            />
            <span>{dataUser.username}</span>
            {!isNaN(Math.round(data.totalStars / data.starNumber)) && (
              <div className="stars">
                {Array(Math.round(data.totalStars / data.starNumber))
                  .fill()
                  .map((item, i) => (
                    <img src="/assets/star.png" alt="" key={i} />
                  ))}
                <span>{Math.round(data.totalStars / data.starNumber)}</span>
              </div>
            )}
          </div>
          <div className="slider">
            <Carousel
              responsive={responsive}
              infinite={true}
              containerClass="carousel-container"
            >
              {data?.imgs.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Carousel>
          </div>
          <h2>About This Gig</h2>
          <p>{data.desc}</p>
          <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img
                src={dataUser.img || "/assets/noavatar.jpg"}
                alt={dataUser.username}
              />
              <div className="info">
                <span>{dataUser.username}</span>
                {!isNaN(Math.round(data.totalStars / data.starNumber)) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/assets/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{dataUser.country}</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr className="no-mobile" />
              <p>{dataUser.desc}</p>
            </div>
          </div>
          <Reviews gigId={data.id} />
        </div>
        <div className="right">
          <div className="price">
            <h2>{data.shortTitle}</h2>
            <h3>$ {data.price}</h3>
          </div>
          <p>{data.shortDesc}</p>
          <div className="details">
            <div className="item">
              <img src="/assets/clock.png" alt="" />
              <span>{data.deliveryTime} Days Delivery</span>
            </div>
            <div className="item">
              <img src="/assets/recycle.png" alt="" />
              <span>{data.revisionNumber} Revisions</span>
            </div>
          </div>
          <div className="features">
            {data?.features.map((feature) => (
              <div className="item" key={feature}>
                <img src="/assets/greencheck.png" alt="" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <Link to={`/pay/${id}`}>
            <button>Continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Gig;
