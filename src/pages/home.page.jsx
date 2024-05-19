import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [formations, setFormations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Accueil";

    axios
      .get("https://bewved-4efa698bf3e0.herokuapp.com/formation", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setFormations(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div className="rounded p-5 bg-body-secondary  mx-5">
      <h5 className="text-center mb-5">
        Bienvenue sur BewVeD : Découvrez notre nouvelle plateforme innovante
        dédiée à la facilitation de vos sessions de formation grâce à une
        application web intuitive et efficace pour la constitution de
        mini-groupes !"{" "}
      </h5>
      <h6 className="text-center mb-5 mx-5">
        {" "}
        Simplifiez vos processus pédagogiques et favorisez des interactions
        enrichissantes entre les apprenants, tout en promouvant la diversité et
        les échanges intergénérationnels. Rejoignez-nous pour une expérience
        d'apprentissage optimale et dynamique !
      </h6>
      <h2 className="text-center mb-5">Liste des formations</h2>
      <div className="d-flex flex-wrap gap-5 justify-content-center">
        {formations?.map((formation) => (
          <div
            className="rounded bond bg-body-tertiary col-sm-4 col-lg-2 p-3 "
            key={formation.id}
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/detailsFormation/${formation.id}`);
            }}
          >
            <h3 className="text-primary">{formation.nom}</h3>
            <p className="text-success">
              <span className=" text-dark">Durée: </span>
              {formation.duree} {formation.duree === 1 ? "jour" : "jours"}
            </p>
            <p className="text-success">
              <span className="text-decoration-underline text-dark">
                Formateur:
              </span>{" "}
              {formation.formateur}
            </p>
            <p className="text-info">
              <span className=" text-dark">Nombre d'apprenants:</span>{" "}
              {formation.apprenants.length}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
