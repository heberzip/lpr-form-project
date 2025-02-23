import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

import style from "../styles/global.style";

// import blue_bg from "../assets/images/blue_bg.svg";
// import yellow_bg from "../assets/images/yellow_bg.svg";

const Layout = () => {
  const location = useLocation();

  return (
    <div className={style.layout.container}>
      <header className={style.layout.header}>
        <Header />
      </header>

      <div className={style.layout.main}>
        <aside className={style.layout.sidebar}>
          <Sidebar />
        </aside>

        <main className={style.layout.main_div}>
          <div className={style.layout.outlet}>
            <AnimatePresence mode="wait">
              <Outlet key={location.pathname} />
            </AnimatePresence>
          </div>

          <div className={style.layout.navigation}>
            <Navigation />
          </div>
        </main>
      </div>

      <footer className={style.layout.footer}>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
