import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import Loading from "../components/loading";

function ModifPromotion() {
  let { id } = useParams();
  const [promotion, setPromotion] = useState({
    id: "",
    nom: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Modification de la promotion ${promotion.nom}`;

    axios
      .get(`http://localhost:8000/promotion/${id}`)
      .then((response) => {
        console.log(response.data);
        setPromotion({
          id: response.data.id,
          nom: response.data.nom,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let choice = window.confirm(
      "Voulez-vous vraiment modifier cette promotion ?"
    );
    if (choice) {
      axios
        .put(`http://localhost:8000/promotion/${id}/edit`, promotion)
        .then((response) => {
          console.log(response.data);
          alert("Promotion modifiée");
          navigate("/promotion");
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
      <h2 className="text-center mb-5">
        Modification de la promotion {promotion.nom}
      </h2>
      <form className="w-50 m-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="nom"
            value={promotion.nom}
            onChange={(e) => {
              setPromotion({ ...promotion, nom: e.target.value });
            }}
          />
        </div>
        <Button type="submit" variant="primary" className="w-100">
          Modifier
        </Button>
      </form>
    </div>
  );
}

export default ModifPromotion;
