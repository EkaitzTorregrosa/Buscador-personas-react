import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

export function Details({ location }: any) {
  const PERSON = location.state.persona;
  return (
    <div className="container">
      <h1>{PERSON["Nombre"]}</h1>
      <Link to="/" className="btn btn-primary">
        Volver
      </Link>
    </div>
  );
}
