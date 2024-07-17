import {
  Navigate,
  Route,
  Routes,
  Outlet,
  // useSearchParams,
} from "react-router-dom";
// import { useState, useEffect } from "react";
// import {
//   CookieNames,
//   getCookieItem,
//   setSession,
//   setAccessTokenInSession,
// } from "../utils/cookies";
// import Grid from "@mui/material/Grid";
// import LinearProgress from "@mui/material/LinearProgress";
import UnAuthorised from "../pages/UnAuthorisedPage";
import Header from "../components/Header";
// import client from "../helpers/Api";
// import useAuthRouteCheck from "../hooks/useAuthRouteCheck";
// import { validateJWTURL, refreshTokenURL } from "../helpers/Urls";
import Footer from "../components/Footer";
import Dashboard from "../pages/dashboard/Dashboard";

const PrivateRoute = () => {
  // const [loading, setLoading] = useState(false);
  // const [hasAccess, setHasAccess] = useState(null);
  // const [searchParams, setSearchParams] = useSearchParams();
  // let tokenParam = searchParams.get("tokenParam");
  // let tokenParam = window.tokenParam;

  // const getUserDetails = async (token) => {
  //   setLoading(true);
  //   try {
  //     token = atob(token);
  //     setAccessTokenInSession(token);
  //     const headers = { 'Authorization': `Bearer ${token}` };
  //     let userData =
  //       process.env.REACT_APP_ENV === "mockserver"
  //         ? await client.get(`${validateJWTURL}`)
  //         : await client.get(validateJWTURL);
  //     if (process.env.REACT_APP_ENV !== "mockserver") {
  //       let refrestTokenRes = await client.get(refreshTokenURL);
  //       const sessionData = {
  //         accessToken: refrestTokenRes.accessToken,
  //         refreshToken: refrestTokenRes.refreshToken,
  //         userData: {
  //           userName: `${userData.firstName} ${userData.lastName}`,
  //           accessLevel: `${userData.srlAccessCdValue}`,
  //         },
  //       };
  //       setSession(sessionData); // change this method based on the details returning from API
  //     }
  //     setHasAccess(true);
  //     setLoading(false);
  //   } catch (errorResponse) {
  //     setHasAccess(true);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (tokenParam) {
  //     getUserDetails(tokenParam);
  //   } else {
  //     let storedToken = getCookieItem(CookieNames.ACCESS_TOKEN);
  //     if (storedToken) {
  //       getUserDetails(storedToken);
  //     } else {
  //       setHasAccess(false);
  //     }
  //   }
  // }, []);

//   return loading ? (
//     <>
//       <Grid container spacing={8}>
//         <Grid item xs>
//           <LinearProgress />
//         </Grid>
//       </Grid>
//     </>
//   ) : hasAccess === true ? (
//     <>
//       <Header />
//       <Outlet />
//       <Footer />
//     </>
//   ) : hasAccess === false ? (
//     <Navigate replace to="/unAuthorised" />
//   ) : (
//     <></>
//   );
    return <>
      <Header />
      <Outlet />
      <Footer />
    </>
};

function AppRoutes() {
  // const isAuthRoute = useAuthRouteCheck();
  // const showHeader = !isAuthRoute;

  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          {/* <Route element={<Configurations />} path="/config" /> */}
          <Route element={<Dashboard />} path="/dashboard" />
        </Route>
        <Route element={<UnAuthorised />} path="/unAuthorised" />
        <Route element={<Navigate replace to="/dashboard" />} path="/" />
      </Routes>
    </>
  );
}

export default AppRoutes;
