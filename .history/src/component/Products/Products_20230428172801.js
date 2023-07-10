import { useState } from "react";
import MoreInfo from "./MoreInfo";
import "./Products.css";
import Popup from "../modal/Popup";

const Products = ({ product }) => {
  const [isPopup, setIsPopup] = useState(false);
  const [popupData, setPopupData] = useState();

  const deletePopuphandler = () => {
    setIsPopup(false);
    setPopupData(null);
  };

  return (
    <div>
      {isPopup && <Popup onConfirm={deletePopuphandler} />}
      <div className="wrap-product">
        <div className="title-product">
          <p>MADE THE HARD WAY</p>
          <h5>TOP TRENDING PRODUCTS</h5>
        </div>
      </div>
      <div className="wrap-product">
        <ul className="product">
          {product.request1.map((pro) => (
            <li key={pro.id} className="box-product">
              <img
                src={pro.img}
                alt="products"
                onClick={() => {
                  if (isPopup) {
                    setIsPopup(false);
                  }
                  setPopupData(pro);
                  console.log(pro);
                }}
              />
              <h4>{pro.name}</h4>
              <p>{pro.price.toLocaleString()} VND</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="wrap-product">
        <ul className="product">
          {product.request2.map((pro) => (
            <li key={pro.id} className="box-product">
              <img src={pro.img} alt="products" />
              <h4>{pro.name}</h4>
              <p>{pro.price.toLocaleString()} VND</p>
            </li>
          ))}
        </ul>
      </div>
      <MoreInfo />
    </div>
  );
};

export default Products;
