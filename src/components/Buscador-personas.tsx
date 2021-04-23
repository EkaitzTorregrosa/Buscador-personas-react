import "../styles/Buscador-biko.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Tabletop = require("tabletop");

export function BuscadorPersonas() {
  const URL: string =
    "https://docs.google.com/spreadsheets/d/1xpUgqzcmSTmIVcY5OTvB-FGGuVm9Chc9WSk2ZLmLY1E/edit?usp=sharing";
  const [persons, setPersons] = useState<any[]>([]);
  const [searchedPersons, setSearchedPersons] = useState<any[]>([]);
  const [hasValue, setHasValue] = useState(false);
  const [msgError, setMsgError] = useState("");

  useEffect(() => {
    if (!hasValue) getDataFromSpreadsheet();
  }, [hasValue]);

  function getDataFromSpreadsheet() {
    Tabletop.init({
      key: URL,
      callback: (googleData: any) => {
        setPersons(googleData);
      },
      simpleSheet: true,
    });
  }
  function handleSubmit(event: any) {
    event.preventDefault();
    searchPersons(event);
  }
  function searchPersons(event: any) {
    event.preventDefault();
    let searchingPersons: any[] = [];

    persons.forEach((person) => {
      if (
        personContains(person, "Nombre", event) ||
        personContains(person, "Apellidos", event) ||
        personContains(person, "Equipo", event) ||
        personContains(person, "Rol", event)
      ) {
        searchingPersons.push(person);
        setHasValue(true);
        setMsgError("");
      }
      setSearchedPersons(searchingPersons);
    });
    if (searchingPersons.length === 0)
      setMsgError("No se han encontrado Bikonianos");
  }
  function personContains(person: any, property: string, event: any) {
    event.preventDefault();
    return person[property]
      .toString()
      .toLowerCase()
      .includes(event.target.elements.buscador.value);
  }

  function printPersons(personsToPrint: any[]) {
    return personsToPrint.map((person) => {
      return (
        <div className="col-sm-3">
          <Link to={{ pathname: "/details", state: { persona: person } }}>
            <div className="card border-light mt-2 card-flip">
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
                  <p className="card-text cardRol">
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
    <div className="container">
      <h1 className="title">Busca Bikonianos</h1>
      <p className="subtitle">(lorem ipsum dolor set)</p>
      <div className="row">
        <div className="mt-5 col">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <input
                  name="buscador"
                  type="text"
                  className="form-control"
                  placeholder="Nombre Bikoniano"
                />
              </div>
              <div className="col">
                <button type="submit" className="btn btn-primary">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <br />
      <div className="row">
        {!hasValue ? printPersons(persons) : printPersons(searchedPersons)}
      </div>
      <p>{msgError}</p>
    </div>
  );
}
