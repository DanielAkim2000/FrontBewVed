import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddPromotion() {
    const [promotion, setPromotion] = useState({
        nom: "",
    });
    const navigate = useNavigate();
  return (
    <div className="rounded p-5 bg-body-secondary w-75 mx-auto">
        <h3 className="text-center mb-5">Ajout d'une promotion</h3>
        <form className="w-50 mx-auto" onSubmit={(e) => {
            e.preventDefault();
            axios.post("http://localhost:8000/promotion/new", promotion)
            .then((response) => {
                console.log(response.data);
                alert("Promotion ajoutée");
                navigate("/Promotion");
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
        }}>
            <div className="mb-3">
            <label htmlFor="nom" className="form-label">
                Nom
            </label>
            <input
                type="text"
                className="form-control"
                required
                id="nom"
                value={promotion.nom}
                onChange={(e) => {
                setPromotion({ ...promotion, nom: e.target.value });
                }}
            />
            </div>
            <button type="submit" className="btn btn-primary w-100">Ajouter</button>
        </form>
    </div>
  )
}

export default AddPromotion