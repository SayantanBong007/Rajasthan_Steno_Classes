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
import StenoTests from "../pages/features/steno/StenoTests";
import StenoTest from "../pages/features/steno/Test";

const RouteViews = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  let { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
    if (!user) {
      if (pathname != "/" && pathname != "/login" && pathname != "/register")
        navigate("/");
    } else {
      if (Object.keys(user).length != 0) {
        console.log("user role", user, user.role);
        if (user.role != "admin" && pathname == "/admin") navigate("profile");
        if (pathname == "/" || pathname == "/login" || pathname == "/register")
          navigate("/profile");
      }
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      const { resUser } = await getUserDetails();
      setUser(resUser);
      console.log("htis is user", resUser);
    })();
  }, [pathname]);

  return (
    <Routes>
      {!user && (
        <>
          <Route
            exact
            path="/"
            element={
              <>
                <Navbar isAuth={false} />
                <Home />
                <Footer />
              </>
            }
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </>
      )}
      {user && (
        <>
          <Route
            exact
            path="/typing-tests"
            element={
              <>
                <Navbar iaAuth={true} />
                <TypingTests />
              </>
            }
          />
          <Route
            exact
            path="/typing-tests/hindi"
            element={
              <>
                <Navbar isAuth={true} />
                <HindiTest />
              </>
            }
          />
          <Route
            exact
            path="/typing-tests/:id"
            element={
              <>
                <Navbar isAuth={true} />
                <Test />
              </>
            }
          />
          <Route
            exact
            path="/steno-tests"
            element={
              <>
                <Navbar isAuth={true} />
                <StenoTests />
              </>
            }
          />
          <Route
            exact
            path="/steno-tests/:id"
            element={
              <>
                <Navbar isAuth={true} />
                <StenoTest />
              </>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <>
                <Navbar isAuth={true} />
                <ProfilePage />
              </>
            }
          />
        </>
      )}
      {user && user.role == "admin" && (
        <Route
          exact
          path="/admin"
          element={
            <>
              {" "}
              <Navbar isAuth={true} /> <AdminPage />
            </>
          }
        />
      )}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default RouteViews;
