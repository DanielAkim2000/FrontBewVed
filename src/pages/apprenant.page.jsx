import React from "react";
import TableApprenant from "../components/tablesapprennant";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ApprenantPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/addApprenant");
  }
  return (
    <div className="rounded p-5 bg-body-secondary  mx-5">
      <h1 className="text-center mb-5">Listes des apprenants</h1>
      <Button variant="success" onClick={handleClick} className="my-3 mx-2">
        Ajouter un apprenant
      </Button>
      <TableApprenant />
    </div>
  );
}

export default ApprenantPage;
