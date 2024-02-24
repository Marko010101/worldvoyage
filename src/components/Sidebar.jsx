import { Outlet } from "react-router-dom";
import AppNav from "./AppNav.jsx";
import Footer from "./Footer.jsx";
import Logo from "./Logo.jsx";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Sidebar;
