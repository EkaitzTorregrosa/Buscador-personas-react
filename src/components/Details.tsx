import "../styles/Details.css";
import "../styles/Buscador-biko.css";
import "bootstrap/dist/css/bootstrap.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faRocket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function Details({ location }: any) {
  try {
  } catch (error) {}
  const PERSON = location.state.onePerson;
  const ALLPERSONS: any[] = location.state.allPersons;
  const ABILITIES: any[] = PERSON["Habilidades"].split(", ");
  const [abilityToSearch, setAbilityToSearch] = useState(
    ABILITIES[0].toLowerCase()
  );
  const [isOtherPerson, setIsOtherPerson] = useState(false);
  useEffect(() => {
    if (isOtherPerson) setAbilityToSearch(ABILITIES[0].toLowerCase());
    window.scrollTo(0, 0);
    setIsOtherPerson(false);
  }, [isOtherPerson]);

  function printabilities() {
    return ABILITIES.map((ability: any) => {
      if (abilityToSearch === ability.toLowerCase()) {
        return (
          <div
            className="col roundedCircleAbilitySelected mr-2"
            style={{ background: "e73f39" }}
          >
            {ability}
          </div>
        );
      } else {
        return (
          <div
            className="col roundedCircleAbility mr-2"
            onClick={() => {
              setAbilityToSearch(ability.toLowerCase());
            }}
          >
            {ability}
          </div>
        );
      }
    });
  }
  function printPersonsSameAbilities() {
    return ALLPERSONS.map((person: any) => {
      if (hasSameAbilities(person)) return printPerson(person);
    });
  }
  function hasSameAbilities(person: any) {
    let personabilities: any[] = [];
    person["Habilidades"].split(", ").forEach((ability: any) => {
      personabilities.push(ability.toLowerCase());
    });
    return personabilities.indexOf(abilityToSearch) > -1 && person !== PERSON;
  }

  function printTeamates() {
    return ALLPERSONS.map((person: any) => {
      if (hasSameTeam(person)) return printPerson(person);
    });
  }
  function hasSameTeam(person: any) {
    return (
      person["Equipo"].toLowerCase() === PERSON["Equipo"].toLowerCase() &&
      person !== PERSON
    );
  }
  function printPerson(person: any) {
    return (
      <div className="col-sm-3">
        <Link
          to={{
            pathname: "/details",
            state: { onePerson: person, allPersons: ALLPERSONS },
          }}
          onClick={() => setIsOtherPerson(true)}
        >
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
                <p className="card-text cardText">
                  {person["Rol"].toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
  function printBlog() {
    return (
      <div className="row ml-0">
        <div className="card mr-3" style={{ width: "25rem" }}>
          <img
            src="data:image/jpeg;base64,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"
            className="card-img-top"
            alt="..."
            style={{ height: "10rem" }}
          />
          <div className="card-body">
            <h5 className="card-title blogTitle ">
              ¿Qué podemos aprender de las estrategias digitales de un museo?
            </h5>
            <p className="card-text cardText">
              Aunque parezcan instituciones clásicas y generalmente ancladas en
              el pasado, muchos museos están abrazando el mundo digital de forma
              decidida y audaz, hasta el punto de haber desarrollado iniciativas
              muy exitosas, con alcance masivo e internacional, […]
            </p>
            <p className="blogAuthor text-muted cardText">Por Diego Cenzano</p>
            <p className="col roundedCircle redCircleContent mr-2">
              componetización
            </p>
          </div>
        </div>
        <div className="card" style={{ width: "25rem" }}>
          <img
            src="https://s3-alpha-sig.figma.com/img/5129/a7fa/b2e7d1f8f47c08cd276aa5de676ab521?Expires=1620604800&Signature=L4eK~LDsyEZl9Qjrqw126lXs~x-hY~-tx9eDdzx8oDV2jnAJ7HCe5I2Qyz5qUoJRAjBVlJccU7Zur7yOyEeRuj8R9VK1xxgKyWYktyJOS34uCsB26vXkVxbTOEz~iM86wZkfwZCoFyk1b2ZRZnT7NRJhUHbJG95bXL4wIJtXT0yv3YEZuKnKKS6HF7KxusFpok2lrYNfLOM8ghv-vi8Iiw0dGpGQ6iOwFc3uVnlzp8n0M9ozGTbQuLXuBwf1NJO3mnYqHLfrdOQQzbofytfauJQOytRdZJHL2YBBFsZwt0rq0xr~CorSahzVtrowH7JRkZrUrS~kXHXQoH2AtfKclQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            className="card-img-top"
            alt="..."
            style={{ height: "10rem" }}
          />
          <div className="card-body">
            <h5 className="card-title blogTitle ">
              Cómo trabajamos -desde hace años- en remoto: pistas y herramientas
            </h5>
            <p className="card-text cardText">
              En Biko llevamos ya bastantes años trabajando en remoto. Es más,
              en ocasiones, combinamos el trabajo remoto con el presencial;
              hacemos trabajo 100% presencial o tenemos personas que trabajan
              100 % a distancia. En definitiva: si la experiencia es un grado,
              nosotros tenemos un Doctorado […]
            </p>
            <p className="blogAuthor text-muted cardText">Por Biko</p>
            <div className="row">
              <p className="col-3 roundedCircle redCircleContent mr-2">
                actualidad
              </p>
              <p className="col-3 roundedCircle redCircleContent mr-2">react</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <img src={PERSON["ImgUrl"]} alt="..." className="personImg" />
        <div className="col colImg"></div>
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

          <div className="row">{printabilities()}</div>

          <p className="normalText">{PERSON["Sobre mí"]}</p>
        </div>
      </div>
      <h1
        className="normalText font-weight-bold ml-3"
        style={{ marginTop: "20rem" }}
      >
        Miembros de <span className="text-capitalize">{abilityToSearch}</span>
      </h1>
      <div className="row">{printPersonsSameAbilities()}</div>

      <h1 className="normalText font-weight-bold mt-5">Contamos en el blog</h1>
      <p className="subtitle">(y mucho más que proyectos)</p>
      {printBlog()}
      <h1 className="normalText font-weight-bold mt-5">
        Otra gente de{" "}
        <span className="text-capitalize">
          {PERSON["Equipo"].split(" ")[1].toLowerCase()}
        </span>
      </h1>
      <div className="row mb-5">{printTeamates()}</div>
    </div>
  );
}
