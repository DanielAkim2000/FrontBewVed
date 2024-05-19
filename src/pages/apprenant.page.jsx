import React from "react";
import TableApprenant from "../components/tablesapprennant";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ApprenantPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/addApprenant");
  };
  return (
    <div className="rounded p-5 bg-body-secondary justify-content-center d-flex flex-column  mx-5">
      <h1 className="text-center  mb-5">Listes des apprenants</h1>
      <div className="d-flex w-100 justify-content-center">
        <Button
          variant="success"
          onClick={handleClick}
          className="my-3 mx-auto"
        >
          Ajouter un apprenant
        </Button>
      </div>
      <TableApprenant />
    </div>
  );
}

export default ApprenantPage;
