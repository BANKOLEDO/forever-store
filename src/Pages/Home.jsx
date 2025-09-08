import BestSeller from '../Components/BestSeller';
import Hero from '../Components/Hero';
import LatestCollection from '../Components/LatestCollection';
import NewsLetterBox from '../Components/NewsLetterBox';
import OurPolicies from '../Components/OurPolicies';
import Marquee from '../Components/Marquee';

const Home = () => {
  return (
    <div>
      <Hero />
      {/* Marquee Section */}
      <Marquee
        items={[
          "Free delivery on orders above $49",
          "Easy 7-day return & exchange policy",
          "100% Original products guaranteed",
          "New arrivals are here! Check them out"
        ]}
      />

      <LatestCollection />
      <BestSeller />
      <OurPolicies />
      <NewsLetterBox />
    </div>
  );
};

export default Home;
