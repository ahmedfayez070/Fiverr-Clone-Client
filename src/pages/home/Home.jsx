import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./home.scss";

import { cards, projects } from "../../data";
import CatCard from "../../components/catCard/CatCard";

import LandingHome from "../../components/landingHome/LandingHome";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Features from "../../components/Features";
import FeaturesDark from "../../components/FeaturesDark";
import ProjectCard from "../../components/projectCard/ProjectCard";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 680 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 680, min: 0 },
    items: 1,
  },
};

const Home = () => {
  return (
    <div className="home">
      <LandingHome />
      <TrustedBy />
      <Carousel
        responsive={responsive}
        infinite={true}
        containerClass="carousel-container"
      >
        {cards.map((card) => {
          return <CatCard card={card} key={card.id} />;
        })}
      </Carousel>
      <Features />
      <FeaturesDark />
      <Carousel
        responsive={responsive}
        infinite={true}
        containerClass="carousel-container"
      >
        {projects.map((project) => {
          return <ProjectCard card={project} key={project.id} />;
        })}
      </Carousel>
    </div>
  );
};

export default Home;
