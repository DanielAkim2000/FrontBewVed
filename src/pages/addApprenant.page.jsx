import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.api";

function AddApprenant() {
  const [promotion, setPromotion] = useState([]);
  const [competences, setCompetences] = useState([]);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [apprenant, setApprenant] = useState({
    promotion: "",
    lastname: "",
    firstname: "",
    sexe: "",
    age: "",
    competences: [],
  });

  useEffect(() => {
    document.title = "Ajout d'un apprenant";

    api
      .get("/promotion/")
      .then((response) => {
        setPromotion(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    api
      .get("competence/")
      .then((response) => {
        setCompetences(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(apprenant);
    api
      .post("/apprenant/new/", apprenant)
      .then((response) => {
        console.log(response.data);
        alert("Apprenant ajouté");
        navigate("/Apprenant");
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        alert("Erreur lors de l'ajout de l'apprenant ! Un champs surement manquant");
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="rounded p-5 bg-body-secondary w-75  mx-auto">
      <h1 className="text-center mb-5">Ajout d'un nouvelle apprenant</h1>

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="promotion" className="form-label">
            Promotion
          </label>
          <select
            required
            className="form-select"
            id="promotion"
            onChange={(e) => {
              setApprenant({ ...apprenant, promotion: e.target.value });
            }}
          >
            <option value={""}>Sélectionnez la promotion</option>
            {promotion.map((promotion) => (
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
            required
            type="text"
            className="form-control"
            id="nom"
            onChange={(e) => {
              setApprenant({ ...apprenant, lastname: e.target.value });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prenom" className="form-label">
            Prenom
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="prenom"
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
            required
            className="form-select"
            id="sexe"
            onChange={(e) => {
              setApprenant({ ...apprenant, sexe: e.target.value });
            }}
          >
            <option value={""}>Sélectionnez le sexe</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            required
            type="number"
            className="form-control"
            id="age"
            onChange={(e) => {
              setApprenant({ ...apprenant, age: e.target.value });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="competence" className="form-label">
            Compétences
          </label>
          <select
            required
            multiple
            className="form-select"
            id="competence"
            onChange={(e) => {
              setApprenant({
                ...apprenant,
                competences: Array.from(e.target.selectedOptions).map(
                  (option) => option.value
                ),
              });
            }}
          >
            {competences.map((competence) => (
              <option value={competence.id} key={competence.id}>
                {competence.nom}
              </option>
            ))}
          </select>
        </div>
        <Button
          type="submit"
          variant="primary"
          className="btn btn-primary w-100"
        >
          Ajouter un apprenant
        </Button>
      </form>
    </div>
  );
}

export default AddApprenant;
