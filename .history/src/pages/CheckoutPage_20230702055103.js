import { Form } from "react-router-dom";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  return (
    <>
      <div className="wrap-checkout">
        <div className="topic-checkout">
          <h1>CHECKOUT</h1>
          <span className="btn-back">
            <button>HOME</button>/<button>CART</button>/
            <button className="btn-active">CHECKOUT</button>
          </span>
        </div>
      </div>
      <div>
        <div>
          <Form>
            <p>FULL NAME:</p>
            <input placeholder="Enter Your Name Here!"></input>
          </Form>
        </div>
      </div>
    </>
  );
};
export default CheckoutPage;
