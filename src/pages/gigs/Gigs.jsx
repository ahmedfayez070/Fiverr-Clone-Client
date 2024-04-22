import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import makeRequest from "../../axios";
import GigCard from "../../components/gigCard/GigCard";
import "./gigs.scss";

const Gigs = () => {
  const [sort, setSort] = useState("price");
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      makeRequest
        .get(
          `/gigs${search}&min=${
            minRef.current ? minRef.current.value : ""
          }&max=${maxRef.current ? maxRef.current.value : ""}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    refetch();
  }, [sort]);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: ";

  return (
    <div className="gigs">
      <div className="container">
        <p>Liver &gt; GRAPHICS &amp; DESIGN &gt;</p>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Fiverr's AI artists
        </p>
        <div className="menu">
          <div className="filter">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" min={0} />
            <input ref={maxRef} type="number" placeholder="max" min={1} />
            <button onClick={() => refetch()}>Apply</button>
          </div>
          <div className="sort">
            <span>Sort by</span>
            <select
              name="sort"
              id="sort"
              defaultValue={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="price">Most Expensive</option>
              <option value="createdAt">Newest</option>
            </select>
          </div>
        </div>
        <div className="cards">
          {data?.map((gig) => (
            <GigCard card={gig} key={gig._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
