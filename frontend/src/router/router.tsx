// EXTERNAL MODULES
import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
// LAYOUTS
import Layout from "@layouts/Layout";
import CLoading from "@customs/CLoading";

// ANIMATIONS
import SectionTransition from "@animations/SectionTransition";

// Import lazy
const Welcome = lazy(() => import("@sections/Welcome"));
const Company = lazy(
  () => import(/* webpackPrefetch: true */ "@sections/Company")
);
const Communication = lazy(() => import("@sections/Communication"));
const Contact = lazy(() => import("@sections/Contact"));
const Bank = lazy(() => import("@sections/Bank"));
const Fleet = lazy(() => import("@sections/Fleet"));
const Extras = lazy(() => import("@sections/Extras"));
const MeetingPoint = lazy(() => import("@sections/MeetingPoint"));
const NotFound = lazy(() => import("@sections/NotFound"));

/******************************************************************************/

export const CRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<CLoading />}>
            <SectionTransition>
              <Welcome />
            </SectionTransition>
          </Suspense>
        ),
      },
      {
        path: "/company",
        element: (
          <Suspense fallback={<CLoading />}>
            <SectionTransition>
              <Company />
            </SectionTransition>
          </Suspense>
        ),
      },
      {
        path: "/communication",
        element: (
          <Suspense fallback={<CLoading />}>
            <SectionTransition>
              <Communication />
            </SectionTransition>
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<CLoading />}>
            <SectionTransition>
              <Contact />
            </SectionTransition>
          </Suspense>
        ),
      },
      {
        path: "/bank",
        element: (
          <Suspense fallback={<CLoading />}>
            <SectionTransition>
              <Bank />
            </SectionTransition>
          </Suspense>
        ),
      },
      {
        path: "/fleet",
        element: (
          <Suspense fallback={<CLoading />}>
            <SectionTransition>
              <Fleet />
            </SectionTransition>
          </Suspense>
        ),
      },
      {
        path: "/extras",
        element: (
          <Suspense fallback={<CLoading />}>
            <SectionTransition>
              <Extras />
            </SectionTransition>
          </Suspense>
        ),
      },
      {
        path: "/meeting-point",
        element: (
          <Suspense fallback={<CLoading />}>
            <SectionTransition>
              <MeetingPoint />
            </SectionTransition>
          </Suspense>
        ),
      },
    ],
    errorElement: (
      <Suspense fallback={<CLoading />}>
        <SectionTransition>
          <NotFound />
        </SectionTransition>
      </Suspense>
    ),
  },
]);
