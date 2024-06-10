import {Routes,Route} from "react-router-dom";

import Home from "../pages/main/HomePage";
import AdminPage from "../pages/main/AdminPage";
import Page404 from "../pages/others/Page404";


// Here add the diversion for auth pages and other pages

const RouteViews = () => {

  return (
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/admin" element={<AdminPage/>} />
        <Route path="*" element={<Page404/>} />
      </Routes>
  )
}

export default RouteViews;
