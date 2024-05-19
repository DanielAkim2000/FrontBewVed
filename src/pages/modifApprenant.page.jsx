import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/loading";
import api from "../api/axios.api";

function ModifApprenant() {
  const navigate = useNavigate();

  const [promotions, setPromotions] = useState([]);
  const [competences, setCompetences] = useState([]);
  const [apprenant, setApprenant] = useState({
    firstname: "",
    lastname: "",
    sexe: "",
    age: "",
    promotion: "",
    competences: [],
  });

  // loading est initialisé à true
  const [loading, setLoading] = useState(true);

  let { id } = useParams();
  useEffect(() => {
    document.title = "Modification d'un apprenant";
    api
      .get(`/apprenant/${id}`)
      .then((response) => {
        console.log(response.data[0]);
        setApprenant({
          firstname: response.data[0].prenom,
          lastname: response.data[0].nom,
          sexe: response.data[0].sexe,
          age: response.data[0].age,
          promotion: response.data[0].promotion,
          competences: response.data[0].competences,
        });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    api
      .get("/promotion/")
      .then((response) => {
        setPromotions(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    api
      .get("/competence/")
      .then((response) => {
        setCompetences(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let choice = window.confirm(
      "Voulez-vous vraiment modifier cet apprenant ?"
    );
    if (choice) {
      console.log("apprenant:", apprenant);
      api
        .put(`/apprenant/${id}/edit/`, apprenant)
        .then((response) => {
          console.log(response.data);
          alert("Apprenant modifié avec succès");
          navigate("/Apprenant");
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="rounded p-5 bg-body-secondary w-75  mx-auto">
      <h3 className="text-center mb-5">
        Modification de l'apprenant {apprenant.lastname} {apprenant.firstname}
      </h3>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="promotion" className="form-label">
            Promotion
          </label>
          <select
            className="form-select"
            id="promotion"
            required
            // value egale a l'id de la promotion de l'apprenant
            value={apprenant.promotion}
            onChange={(e) => {
              setApprenant({ ...apprenant, promotion: e.target.value });
            }}
          >
            {promotions.map((promotion) => (
              <option value={promotion.id} key={promotion.id}>
                {promotion.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom
          </label>
          <input
            type="text"
            className="form-control"
            required
            id="nom"
            value={apprenant.lastname}
            onChange={(e) => {
              setApprenant({ ...apprenant, lastname: e.target.value });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prenom" className="form-label">
            Prénom
          </label>
          <input
            type="text"
            className="form-control"
            required
            id="prenom"
            value={apprenant.firstname}
            onChange={(e) => {
              setApprenant({ ...apprenant, firstname: e.target.value });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sexe" className="form-label">
            Sexe
          </label>
          <select
            className="form-select"
            required
            id="sexe"
            value={apprenant.sexe}
            onChange={(e) => {
              setApprenant({ ...apprenant, sexe: e.target.value });
            }}
          >
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="age"
            value={apprenant.age}
            onChange={(e) => {
              setApprenant({ ...apprenant, age: e.target.value });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="competences" className="form-label">
            Compétences
          </label>
          <select
            multiple
            required
            className="form-select"
            id="competences"
            // selection des competences de l'apprenant
            onChange={(e) => {
              console.log(apprenant);
              setApprenant({
                ...apprenant,
                competences: Array.from(e.target.selectedOptions).map(
                  (option) => ({
                    id: option.value,
                    nom: option.textContent,
                  })
                ),
              });
            }}
          >
            {competences.map((competence) => (
              <option
                // si l'apprenant a la competence, elle est selectionnée
                selected={apprenant.competences?.some(
                  (c) => c.id === competence.id
                )}
                value={competence.id}
                key={competence.id}
              >
                {competence.nom}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Modifier
        </button>
      </form>
    </div>
  );
}

export default ModifApprenant;
