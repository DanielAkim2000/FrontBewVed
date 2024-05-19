import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/loading";
import api from "../api/axios.api";

function ModifFormateur() {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [formateur, setFormateur] = useState({
    nom: "",
    prenom: "",
  });

  useEffect(() => {
    document.title = `Modification du formateur ${id}`;

    api
      .get(`/formateur/${id}`)
      .then((response) => {
        console.log(response.data);
        setFormateur({
          nom: response.data.nom,
          prenom: response.data.prenom,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formateur);
    let choice = window.confirm("Voulez-vous vraiment modifier ce formateur ?");
    if (choice) {
      api
        .put(`/formateur/${id}/edit/`, formateur)
        .then((response) => {
          console.log(response.data);
          alert("Formateur modifié");
          navigate("/Formateur");
        });
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="rounded p-5 bg-body-secondary w-75  mx-auto">
      <h2 className="text-center w-100 mb-5">
        Modification du formateur {formateur.prenom + " " + formateur.nom}
      </h2>
      <form onSubmit={handleSubmit} className="w-50 m-auto">
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="nom"
            value={formateur.nom}
            onChange={(e) =>
              setFormateur({ ...formateur, nom: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prenom" className="form-label">
            Prénom
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="prenom"
            value={formateur.prenom}
            onChange={(e) =>
              setFormateur({ ...formateur, prenom: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn w-100 btn-primary">
          Modifier
        </button>
      </form>
    </div>
  );
}

export default ModifFormateur;
