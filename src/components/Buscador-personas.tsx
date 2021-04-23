import "../styles/Buscador-biko.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  function searchPersons(event: any) {
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
    return person[property]
      .toString()
      .toLowerCase()
      .includes(event.target.value);
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
                  className="card-img-top rounded mx-auto personImage"
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
        <div className="input-group col-8 mt-5 buscador">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar..."
            onChange={(event) => {
              searchPersons(event);
            }}
          />
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
