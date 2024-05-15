import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";

import Pagination from "react-bootstrap/Pagination";

function MyTable() {
  const [apprenants, setApprenants] = React.useState([]);
  const [reload, setReload] = React.useState(false);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const apprenantsPerPage = 5; //

  // Index du dernier apprenant de la page
  const indexOfLastApprenant = currentPage * apprenantsPerPage;
  // Index du premier apprenant de la page
  const indexOfFirstApprenant = indexOfLastApprenant - apprenantsPerPage;
  // Apprenants de la page actuelle
  const currentApprenants = apprenants.slice(
    indexOfFirstApprenant,
    indexOfLastApprenant
  );

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    document.title = "Formation";

    axios
      .get("http://localhost:8000/apprenant")
      .then((response) => {
        setApprenants(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [reload]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Table className="text-center border" hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Sexe</th>
            <th>Age</th>
            <th>Promotion</th>
            <th>Competences</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentApprenants.map((apprenant, index) => (
            <tr key={apprenant.id}>
              <td>{ index +1 }</td>
              <td>{apprenant.nom}</td>
              <td>{apprenant.prenom}</td>
              <td>{apprenant.sexe}</td>
              <td>{apprenant.age}</td>
              <td>{apprenant.promotion}</td>
              <td>
                <div className="gap-2 d-flex justify-content-center">
                  {apprenant.competences.map((competence) => (
                    <span key={competence.id}>{competence.nom}</span>
                  ))}
                </div>
              </td>
              <td>
                <div className="d-flex gap-2 justify-content-center">
                  <Button
                    onClick={() => {
                      navigate(`/modifApprenant/${apprenant.id}`);
                    }}
                    variant="warning"
                  >
                    Modifier
                  </Button>
                  <Button
                    onClick={() => {
                      let choice = window.confirm(
                        "Etes-vous sûr de vouloir supprimer ?"
                      );
                      if (choice) {
                        axios
                          .delete(
                            `http://localhost:8000/apprenant/${apprenant.id}`
                          )
                          .then((response) => {
                            console.log(response);
                            setReload(!reload);
                          })
                          .catch((error) => {
                            console.error("Error fetching data: ", error);
                          });
                      }
                    }}
                    variant="danger"
                  >
                    Supprimer
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-center">
        {Array.from(
          { length: Math.ceil(apprenants.length / apprenantsPerPage) },
          (_, i) => (
            <Pagination.Item 
              key={i + 1}
              onClick={() => paginate(i + 1)}
              active={i + 1 === currentPage}
            >
              {i + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </>
  );
}

function TableApprenant() {
  return <MyTable />;
}

export default TableApprenant;
