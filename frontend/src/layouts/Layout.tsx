// EXTERNAL MODULES
import { Outlet, useLocation } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
// COMPONENTS
import Sidebar from "@components/Sidebar";
import Header from "@components/Header";
// STYLES
import style from "@styles/global.style";

/******************************************************************************/

const Layout = () => {
  const location = useLocation();
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  return (
    <FormProvider {...methods}>
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
        </main>
      </div>
    </FormProvider>
  );
};

export default Layout;
