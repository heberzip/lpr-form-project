// EXTERNAL MODULES
import { createBrowserRouter } from "react-router-dom";
// LAYOUTS
import Layout from "@layouts/Layout";
// SECTIONS
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
} from "@sections/.";
// ANIMATIONS
import SectionTransition from "@animations/SectionTransition";

/******************************************************************************/

export const CRouter = createBrowserRouter([
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
