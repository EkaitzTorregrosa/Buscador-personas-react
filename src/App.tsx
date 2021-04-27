import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.css";
import logoBiko from "./images/logo-biko.svg";
import { BuscadorPersonas } from "./components/Buscador-personas";
import { Details } from "./components/Details";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <header>
        <a href="/">
          <img
            className="img-fluid m-4"
            src={logoBiko}
            alt="logo biko"
            style={{ width: "120px", height: "43.3px" }}
          />
        </a>
      </header>
      <body>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={BuscadorPersonas} />
            <Route path="/details" component={Details} />
          </Switch>
        </BrowserRouter>
      </body>
    </div>
  );
}

export default App;
