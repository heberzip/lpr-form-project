import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";

import SectionTransition from "./components/animations/SectionTransition";

import {
  Welcome,
  Company,
  Communication,
  Contact,
  Bank,
  Fleet,
  Extras,
  MeetingPoint,
  NotFound,
} from "./components/sections";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <SectionTransition>
            <Welcome />
          </SectionTransition>
        ),
      },
      {
        path: "/company",
        element: (
          <SectionTransition>
            <Company />
          </SectionTransition>
        ),
      },
      {
        path: "/communication",
        element: (
          <SectionTransition>
            <Communication />
          </SectionTransition>
        ),
      },
      {
        path: "/contact",
        element: (
          <SectionTransition>
            <Contact />
          </SectionTransition>
        ),
      },
      {
        path: "/bank",
        element: (
          <SectionTransition>
            <Bank />
          </SectionTransition>
        ),
      },
      {
        path: "/fleet",
        element: (
          <SectionTransition>
            <Fleet />
          </SectionTransition>
        ),
      },
      {
        path: "/extras",
        element: (
          <SectionTransition>
            <Extras />
          </SectionTransition>
        ),
      },
      {
        path: "/meeting-point",
        element: (
          <SectionTransition>
            <MeetingPoint />
          </SectionTransition>
        ),
      },
    ],
    errorElement: (
      <SectionTransition>
        <NotFound />
      </SectionTransition>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
