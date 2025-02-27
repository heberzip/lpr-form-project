// EXTERNAL MODULES
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

// COMPONENTS
import App from "./App.tsx";

// STORE
import store from "@store/store";

// STYLES
import styles from "@styles/global.style";
import "./index.css";

/******************************************************************************/

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <div className={styles.global.container}>
        <App />
      </div>
    </Provider>
  </StrictMode>
);
