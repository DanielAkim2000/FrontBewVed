import React from "react";
import TableFormation from "../components/tables";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function FormationPage() {
  const navigate = useNavigate();

  const handleAddFormation = () => {
    navigate("/addFormation");
  };

  const handleAddGroupe = () => {
    navigate("/addGroupes");
  };

  const handleAddApprenant = () => {
    navigate("/addApprenantInFormation");
  };


  return (
    <div className="rounded p-5 bg-body-secondary  mx-5">
      <h1 className="text-center mb-5">Liste des formations</h1>
      <div className="d-flex flex-wrap justify-content-center w-100">
        <Button
          variant="outline-primary"
          onClick={handleAddFormation}
          className="my-3 mx-2"
        >
          Ajouter une formation
        </Button>
        <Button
          onClick={handleAddGroupe}
          className="my-3 mx-2"
          variant="outline-warning"
        >
          Formez des groupes
        </Button>
        <Button
          className=" my-3 mx-2"
          onClick={handleAddApprenant}
          variant="outline-success"
        >
          Ajouter des apprenants
        </Button>
      </div>
      <TableFormation />
    </div>
  );
}

export default FormationPage;
