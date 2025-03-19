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
    <>
      <header className={style.layout.header}>
        <Header />
      </header>

      <div className={style.layout.main}>
        <div className={style.layout.sidebar}>
          <Sidebar userName="John Doe" />
        </div>
        <FormProvider {...methods}>
          <main className={style.layout.main_div}>
            <div className={style.layout.outlet}>
              <AnimatePresence mode="wait">
                <Outlet key={location.pathname} />
              </AnimatePresence>
            </div>
          </main>
        </FormProvider>
      </div>
    </>
  );
};

export default Layout;
