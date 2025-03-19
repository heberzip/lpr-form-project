// EXTERNAL MODULES
import { RouterProvider } from "react-router-dom";
// ROUTER
import { CRouter } from "./router/router";

/******************************************************************************/

const App = () => {
  const user = { name: "John Doe", role: "supplier" };

  return <RouterProvider router={CRouter(user)} />;
};

export default App;
