import { Fragment } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

//Layout chứa NavBar, Footer và phần con nằm bên trong
const Layout = (props) => {
  return (
    <Fragment>
      <NavBar />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};
export default Layout;
