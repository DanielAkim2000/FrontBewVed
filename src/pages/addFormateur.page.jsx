import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function AddFormateur() {
  const [formateur, setFormateur] = useState({
    nom: "",
    prenom: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formateur);
    let choice = window.confirm(
      "Voulez-vous vraiment ajouter ce formateur ?"
    );
    if (choice) {
      axios
        .post(`http://localhost:8000/formateur/new`, formateur)
        .then((response) => {
          console.log(response.data);
          alert("Formateur ajouté");
          navigate("/Formateur");
        });
    }
  };
  return (
    <div className="rounded p-5 bg-body-secondary w-75   mx-auto">
      <h1 className="text-center mb-5">Ajout d'un nouveau formateur</h1>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="nom"
            onChange={(e) => {
              setFormateur({ ...formateur, nom: e.target.value });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prenom" className="form-label">
            Prénom
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="prenom"
            onChange={(e) => {
              setFormateur({ ...formateur, prenom: e.target.value });
            }}
          />
        </div>
        <Button type="submit" className="btn btn-primary w-100">
          Ajouter
        </Button>
      </form>
    </div>
  )
}

export default AddFormateur