import {BrowserRouter as Router} from "react-router-dom";
import WebFont from "webfontloader";

import RouteViews from "./RouteViews";


const App = () => {

  WebFont.load({
    google:{
      families:["Abel","Roboto", "Snowburst One", "Open Sans"]
    }
  })

  return (
    <Router>
      <RouteViews/>
    </Router>
  )
}

export default App
