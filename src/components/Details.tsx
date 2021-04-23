import "../styles/Details.css";
import "../styles/Buscador-biko.css";
import "bootstrap/dist/css/bootstrap.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faRocket } from "@fortawesome/free-solid-svg-icons";

export function Details({ location }: any) {
  const PERSON = location.state.persona;
  return (
    <div className="container">
      <div className="row">
        <img src={PERSON["ImgUrl"]} alt="..." className="personImg" />
        <div className="col"></div>
        <div className="col">
          <h1 className="firsName">{PERSON["Nombre"]}</h1>
          <h1 className="firsName font-weight-bold">
            {PERSON["Apellidos"].split(" ")[0]}
          </h1>
          <p className="subtitle">
            ({PERSON["Rol"] !== "" ? PERSON["Rol"] : "sin concretar"})
          </p>
          <p>
            <span className="mr-2">
              <FontAwesomeIcon icon={faRocket} />{" "}
            </span>{" "}
            {PERSON["Equipo"].split(" ")[1]}
            {"  "}
            <span className=" ml-5 mr-2">
              <FontAwesomeIcon icon={faCalendar} />{" "}
            </span>{" "}
            Desde{" "}
            <span className="font-weight-bold">
              {PERSON["Fecha incorporación a Biko"] !== ""
                ? PERSON["Fecha incorporación a Biko"].split("/")[2]
                : "sin concretar"}
            </span>
          </p>
          <p className="normalText">{PERSON["Sobre mí"]}</p>
        </div>
      </div>
    </div>
  );
}
