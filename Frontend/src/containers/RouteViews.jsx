import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Home from "../pages/main/HomePage";
import AdminPage from "../pages/main/AdminPage";
import Page404 from "../pages/others/Page404";
import TypingTests from "../pages/features/typing/TypingTests";
import Footer from "../components/Footer";
import Test from "../pages/features/typing/Test";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import HindiTest from "../pages/features/typing/HindiTest";
import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";
import { getUserDetails } from "../actions/user/userController";
import ProfilePage from "../pages/main/ProfilePage";

const RouteViews = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  let { pathname } = useLocation();

  // useEffect(() => {
  //   console.log(pathname);
  //   if (!user) {
  //     if (pathname != "/" && pathname != "/login" && pathname != "/register")
  //       navigate("/");
  //   } else {
  //     if (pathname == "/" || pathname == "/login" || pathname == "/register")
  //       navigate("/profile");
  //     if (pathname == "/admin" && user.role != "admin") navigate("profile");
  //   }
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     const { resUser } = await getUserDetails();
  //     setUser(resUser);
  //     console.log(resUser);
  //   })();
  // }, []);

  // return (
  //   <Routes>
  //     {!user && (
  //       <>
  //         <Route
  //           exact
  //           path="/"
  //           element={
  //             <>
  //               <Navbar />
  //               <Home />
  //               <Footer />
  //             </>
  //           }
  //         />
  //         <Route exact path="/register" element={<Register />} />
  //         <Route exact path="/login" element={<Login />} />
  //       </>
  //     )}
  //     {user && (
  //       <>
  //         <Route exact path="/typing-tests" element={<TypingTests />} />
  //         <Route exact path="/typing-tests/hindi" element={<HindiTest />} />
  //         <Route exact path="/typing-tests/:id" element={<Test />} />
  //       </>
  //     )}
  //     {user && user.role == "admin" && (
  //       <Route exact path="/admin" element={<AdminPage />} />
  //     )}
  //     <Route path="*" element={<Page404 />} />
  //   </Routes>
  // );

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        }
      />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />
      <Route
        exact
        path="/typing-tests"
        element={
          <>
            <Navbar />
            <TypingTests />
          </>
        }
      />
      <Route
        exact
        path="/typing-tests/hindi"
        element={
          <>
            <Navbar />
            <HindiTest />
          </>
        }
      />
      <Route
        exact
        path="/typing-tests/:id"
        element={
          <>
            <Navbar />
            <Test />
          </>
        }
      />
      <Route exact path="/admin" element={<AdminPage />} />
      <Route
        exact
        path="/profile"
        element={
          <>
            <Navbar />
            <ProfilePage />
          </>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default RouteViews;
