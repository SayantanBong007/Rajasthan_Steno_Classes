import { Routes, Route } from "react-router-dom";

import Home from "../pages/main/HomePage";
import AdminPage from "../pages/main/AdminPage";
import Page404 from "../pages/others/Page404";
import TypingTests from "../pages/features/typing/TypingTests";
import Footer from "../components/Footer";
import Test from "../pages/features/typing/Test";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

// Here add the diversion for auth pages and other pages

const RouteViews = () => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <>
            <Home />
            <Footer />
          </>
        }
      />
      <Route exact path="/admin" element={<AdminPage />} />
      <Route exact path="/typing-tests" element={<TypingTests />} />
      <Route exact path="/typing-tests/:id" element={<Test />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default RouteViews;
