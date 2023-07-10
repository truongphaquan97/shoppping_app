import ProductList from "../component/shop/ProductList";
import SideBar from "../component/shop/SideBar";
import "./ShopPage.css";
const ShopPage = () => {
  return (
    <div className="wrap-shop">
      <div>
        <h1>SHOP</h1>
        <p>Shop</p>
      </div>
      <SideBar />
      <ProductList />
    </div>
  );
};
export default ShopPage;
