import { useNavigate } from "react-router-dom";
import "./Related.css";

//Compnent chứa thông tin của sản phẩm cùng chung category trừ sản phẩm đang được hiển thị chính ở DetailPage
const Related = (props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/detail/${props.dataRelated.id.$oid}`);
      }}
    >
      <img
        className="related-img"
        src={props.dataRelated && props.dataRelated.img1}
        alt="dataRelated"
      />
      <h5 className="name-relate">
        {props.dataRelated && props.dataRelated.name}
      </h5>
      <p className="price-relate">
        {props.dataRelated && props.dataRelated.price.toLocaleString()}
        VND
      </p>
    </div>
  );
};

export default Related;
