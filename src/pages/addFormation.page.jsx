import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
import api from "../api/axios.api";

function AddFormation() {
  const [formateur, setFormateur] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formation, setFormation] = useState({
    formateur: "",
    name: "",
    duree: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formation);
    api
      .post("/formation/new", formation)
      .then((response) => {
        console.log(response.data);
        alert("Formation ajoutée");
        navigate("/Formation");
      });
  };

  useEffect(() => {
    api.get("/formateur").then((response) => {
      setFormateur(response.data);
      console.log(response.data);
      setLoading(false);
    });
    
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="rounded p-5 bg-body-secondary w-75  mx-auto">
      <h1 className="text-center mb-5">Ajout d'une nouvelle formation</h1>

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="formateur" className="form-label">
            Formateur
          </label>
          <select
            className="form-select"
            id="formateur"
            required
            onChange={(e) => {
              setFormation({ ...formation, formateur: e.target.value });
            }}
          >
            <option value={""}>Choisir un formateur</option>
            {formateur.map((formateur) => (
              <option value={formateur.id} key={formateur.id}>
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
          Ajouter
        </Button>
      </form>
    </div>
  );
}

export default AddFormation;
