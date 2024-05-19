import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/loading";
import api from "../api/axios.api";

function ModifFormation() {
  const [formateur, setFormateur] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formation, setFormation] = useState({
    formateur: {
      id: "",
      nom: "",
      prenom: "",
    },
    name: "",
    duree: "",
  });

  let { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formation);
    let choice = window.confirm(
      "Voulez-vous vraiment modifier cette formation ?"
    );
    if (choice) {
      api
        .put(`/formation/${id}/edit`, formation)
        .then((response) => {
          console.log(response.data);
          alert("Formation modifiée");
          navigate("/Formation");
        });
    }
  };

  useEffect(() => {
    api
      .get("/formateur")
      .then((response) => {
        setFormateur(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
    api
      .get(`/formation/${id}`)
      .then((response) => {
        console.log(response.data[0]);
        setFormation({
          formateur: {
            id: response.data[0].formateur[0].id,
            nom: response.data[0].formateur[0].nom,
            prenom: response.data[0].formateur[0].prenom,
          },
          name: response.data[0].nom,
          duree: response.data[0].duree,
        });
        console.log(formation);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id,formation]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="rounded p-5 bg-body-secondary w-75  mx-auto">
      <h1 className="text-center mb-5">
        Modification de la formation {formation.name}
      </h1>

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="formateur" className="form-label">
            Formateur
          </label>
          <select
            required
            className="form-select"
            id="formateur"
            onChange={(e) => {
              console.dir(formation);
              setFormation({
                ...formation,
                formateur: {
                  id: parseInt(e.target.value),
                  nom: formateur.find(
                    (formateur) => formateur.id === parseInt(e.target.value)
                  ).nom,
                  prenom: formateur.find(
                    (formateur) => formateur.id === parseInt(e.target.value)
                  ).prenom,
                },
              });
            }}
          >
            <option>Choisir un formateur</option>
            {formateur.map((formateur) => (
              <option
                selected={
                  formateur.id === formation.formateur.id ? true : false
                }
                value={formateur.id}
                key={formateur.id}
              >
                {formateur.nom + " " + formateur.prenom}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nom de la formation
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="name"
            value={formation.name}
            onChange={(e) => {
              setFormation({ ...formation, name: e.target.value });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duree" className="form-label">
            Durée
          </label>
          <input
            type="number"
            required
            max={90}
            min={1}
            className="form-control"
            value={formation.duree}
            id="duree"
            onChange={(e) => {
              setFormation({ ...formation, duree: e.target.value });
            }}
          />
        </div>

        <Button
          variant="primary"
          type="submit"
          className="btn btn-primary w-100"
        >
          Modifier
        </Button>
      </form>
    </div>
  );
}

export default ModifFormation;
