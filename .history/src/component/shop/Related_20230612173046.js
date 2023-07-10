import "./Related.css";
const Related = (props) => {
  return (
    <div>
      <img
        className="related-img"
        src={props.dataRelated && props.dataRelated.img1}
        alt="dataRelated"
      />
      <h5>{props.dataRelated && props.dataRelated.name}</h5>
      <p>
        {props.dataRelated && props.dataRelated.price.toLocaleString()}
        VND
      </p>
    </div>
  );
};

export default Related;
