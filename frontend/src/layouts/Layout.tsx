// EXTERNAL MODULES
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
// COMPONENTS
import Sidebar from "@components/Sidebar";
import Header from "@components/Header";
// STYLES
import style from "@styles/global.style";
import { useEffect } from "react";

/******************************************************************************/

const Layout = ({ user }: { user: { name: string; role: string } }) => {
  const location = useLocation();
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [user.role, navigate]);

  return (
    <>
      <header className={style.layout.header}>
        <Header />
      </header>

      <div className={style.layout.main}>
        <div className={style.layout.sidebar}>
          <Sidebar user={user} />
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
