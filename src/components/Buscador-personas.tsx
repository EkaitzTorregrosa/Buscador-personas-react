import "../styles/Buscador-biko.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Tabletop = require("tabletop");
let searchedPersons: any[];

export function BuscadorPersonas() {
  const URLSpreadsheet: string =
    "https://docs.google.com/spreadsheets/d/1xpUgqzcmSTmIVcY5OTvB-FGGuVm9Chc9WSk2ZLmLY1E/edit?usp=sharing";
  const [persons, setPersons] = useState<any[]>([]);
  const [msgError, setMsgError] = useState("");
  const [hasPersons, setHasSearchedPersons] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (!hasPersons) getDataFromSpreadsheet();

    if (searchInput !== "") searchedPersons = searchPersons();
  }, [hasPersons, searchInput]);

  function getDataFromSpreadsheet() {
    Tabletop.init({
      key: URLSpreadsheet,
      callback: (googleData: any) => {
        setPersons(googleData);
      },
      simpleSheet: true,
    });
  }
  function handleSubmit(event: any) {
    event.preventDefault();
    setSearchInput(event.target.elements.buscador.value);
    setHasSearchedPersons(false);
  }
  function searchPersons(): any[] {
    let searchingPersons: any[] = [];

    persons.forEach((person) => {
      if (
        personContains(person, "Nombre") ||
        personContains(person, "Apellidos") ||
        personContains(person, "Equipo") ||
        personContains(person, "Rol") ||
        personContains(person, "Habilidades")
      ) {
        searchingPersons.push(person);
        setMsgError("");
      }
      //setSearchedPersons(searchingPersons);
    });
    if (searchingPersons.length === 0)
      setMsgError("No se han encontrado Bikonianos");

    setHasSearchedPersons(true);
    return searchingPersons;
  }
  function personContains(person: any, property: string) {
    return person[property]
      .toString()
      .toLowerCase()
      .includes(searchInput.toLocaleLowerCase());
  }

  function printPersons(personsToPrint: any[]) {
    return personsToPrint.map((person) => {
      return (
        <div className="col-sm-3">
          <Link
            to={{
              pathname: "/details",
              state: { onePerson: person, allPersons: persons },
            }}
          >
            <div className="card border-0 mt-4 card-flip">
              <div className="card-front">
                <img
                  src={person["ImgUrl"]}
                  className="card-img-top rounded mx-auto"
                  alt="..."
                />
              </div>
              <div className="card-back">
                <div className="card-body text-capitalize text-dark">
                  <h5 className="card-title cardNameSurname">
                    {person["Nombre"].toLowerCase()}
                  </h5>
                  <h5 className="card-text cardNameSurname">
                    {person["Apellidos"].toLowerCase()}
                  </h5>
                  <p className="card-text cardText">
                    {person["Rol"].toLowerCase()}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    });
  }
  return (
    <div className="container mt-5 ">
      <div className="row">
        <div className="col"></div>
        <div className="backGroundImg col" />
      </div>
      <h1 className="title">Busca Bikonianos</h1>
      <p className="subtitle">(lorem ipsum dolor set)</p>
      <div className="row">
        <div className="col-7">
          <p className="normalText">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae
            pretium tellus.{" "}
          </p>
        </div>
        <div className="col"></div>
      </div>
      <div className="row">
        <div className="mt-5 mb-3 col">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-8">
                <div className="input-group mb-3 ">
                  <input
                    name="buscador"
                    type="text"
                    className="form-control rounded-0"
                    placeholder="Nombre Bikoniano"
                  />
                  <button type="submit" className="btn searchBtn rounded-0">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="row">
        {!hasPersons ? printPersons(persons) : printPersons(searchedPersons)}
      </div>
      <p>{msgError}</p>
    </div>
  );
}
