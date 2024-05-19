import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import Loading from "./loading";

import Pagination from "react-bootstrap/Pagination";
import api from "../api/axios.api";

function MyTable() {
  const [apprenants, setApprenants] = React.useState([]);
  const [reload, setReload] = React.useState(false);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const apprenantsPerPage = 6; //

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

    api
      .get("/apprenant/")
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
      <div className="d-flex flex-wrap justify-content-center">
        {currentApprenants.map((apprenant, index) => {
          return (
            <Card
              key={apprenant.id}
              bg="light"
              text="dark"
              className="m-5 col-12 col-sm-12 col-md-8 col-lg-4 col-xl-3 bond"
            >
              <Card.Header as="h5" className="text-success text-center">
                {apprenant.nom} {apprenant.prenom}
              </Card.Header>
              <Card.Body>
                <Card.Title>Informations:</Card.Title>
                <Card.Text>
                  <ul className="text-primary">
                    <li>
                      <span className="text-dark">Sexe: </span> {apprenant.sexe}
                    </li>
                    <li>
                      <span className="text-dark">Age: </span> {apprenant.age}
                    </li>
                    <li>
                      <span className="text-dark">Promotion: </span>{" "}
                      {apprenant.promotion}
                    </li>
                  </ul>
                </Card.Text>
                <Card.Title>Compétences:</Card.Title>
                <Card.Text>
                      <ul>
                        {apprenant.competences.map((competence) => (
                          <li className="" key={competence.id}>{competence.nom}</li>
                        ))}
                      </ul>

                </Card.Text>
              </Card.Body>
              <Card.Footer className="w-100">
                <div className="d-flex gap-2 justify-content-center w-100">
                  <Button
                    size="sm"
                    onClick={() => {
                      navigate(`/modifApprenant/${apprenant.id}`);
                    }}
                    variant="warning"
                  >
                    Modifier
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      let choice = window.confirm(
                        "Etes-vous sûr de vouloir supprimer ?"
                      );
                      if (choice) {
                        api
                          .delete(
                            `/apprenant/${apprenant.id}`
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
              </Card.Footer>
            </Card>
          );
        })}
      </div>
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
