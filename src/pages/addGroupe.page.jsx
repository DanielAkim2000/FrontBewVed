import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
import api from "../api/axios.api";

function AddGroupe() {
  const [formation, setFormation] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [groupe, setGroupe] = useState({
    nbApprenantsParGroupe: "",
    formation: "",
    critere: "",
  });

  useEffect(() => {
    document.title = "Création de groupes";

    api.get("/formation/").then((response) => {
      setFormation(response.data);
      console.log(response.data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(groupe);
    api
      .post(
        `/formation/${groupe.formation}/addgroup/`,
        groupe
      )
      .then((response) => {
        console.log("Groupe created");
        alert("Groupe créé");
        navigate("/Groupes");
      });
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="rounded p-5 bg-body-secondary w-75 mx-auto">
      <h1 className="text-center mb-5">Création de groupes</h1>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="formation" className="form-label">
            Formation
          </label>
          <select
            required
            className="form-select"
            id="formation"
            onChange={(e) => {
              setGroupe({ ...groupe, formation: e.target.value });
            }}
          >
            <option>Choisir une formation</option>
            {formation.map((formation) => (
              <option value={formation.id} key={formation.id}>
                {formation.nom + " " + formation.formateur}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="formateur" className="form-label">
            Nombre d'apprenants par groupe
          </label>
          <input
            required
            type="number"
            className="form-control"
            id="nbApprenantsParGroupe"
            onChange={(e) => {
              setGroupe({
                ...groupe,
                nbApprenantsParGroupe: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apprenants" className="form-label">
            Critere
          </label>
          <select
            required
            className="form-select"
            id="apprenants"
            onChange={(e) => {
              setGroupe({
                ...groupe,
                critere:
                  e.target.selectedOptions.length === 1
                    ? [e.target.value]
                    : Array.from(e.target.selectedOptions).map(
                        (option) => option.value
                      ),
              });
            }}
            multiple
          >
            <option value="competence">Competences</option>
            <option value="sexe">Sexe</option>
            <option value="age">Age</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success w-100">
          Creer des groupes
        </button>
      </form>
    </div>
  );
}

export default AddGroupe;
