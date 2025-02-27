// EXTERNAL MODULES
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// COMPONENTS
import Sidebar from "@components/Sidebar";
import Header from "@components/Header";
import Navigation from "@components/Navigation";

// STYLES
import style from "@styles/global.style";

/******************************************************************************/

const Layout = () => {
  const location = useLocation();

  return (
    <>
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
    </>
  );
};

export default Layout;
