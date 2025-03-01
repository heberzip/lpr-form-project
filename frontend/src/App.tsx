// EXTERNAL MODULES
import { RouterProvider } from "react-router-dom";
// ROUTER
import { CRouter } from "./router/router";

/******************************************************************************/

const App = () => {
  return <RouterProvider router={CRouter} />;
};

export default App;
