import { useNavigate } from "react-router-dom";
import "./Banner.css";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div
      className="banner"
      style={{ backgroundImage: "url(./images/banner1.jpg)" }}
    >
      <p>NEW INSPIRATION 2020</p>
      <h2>20% OFF ON NEW</h2>
      <h2>SEASON</h2>
      <button>Browse collections</button>
    </div>
  );
};
export default Banner;
