import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import Loading from "./loading";

import Pagination from "react-bootstrap/Pagination";
import api from "../api/axios.api";

function MyTable() {
  const [formations, setFormations] = useState([]);
  const navigate = useNavigate();

  const [reload, setReload] = useState(false);

  const [loading, setLoading] = useState(true);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const formationsPerPage = 6; //

  // Index du dernier apprenant de la page
  const indexOfLastFormation = currentPage * formationsPerPage;
  // Index du premier apprenant de la page
  const indexOfFirstFormation = indexOfLastFormation - formationsPerPage;
  // Apprenants de la page actuelle
  const currentFormation = formations.slice(
    indexOfFirstFormation,
    indexOfLastFormation
  );

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    document.title = "Formation";

    api
      .get("/formation/")
      .then((response) => {
        setFormations(response.data);
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
        {currentFormation.map((formation, index) => (
          <Card
            key={formation.id}
            bg="light"
            text="dark"
            className="m-5 col-12 col-sm-12 col-md-8 col-lg-4 col-xl-3 bond"
          >
            <Card.Header as={"h5"} className="text-success text-center">{formation.nom}</Card.Header>
            <Card.Body>
              <Card.Title> Informations: </Card.Title>
              <Card.Text>
                <ul className="text-primary">
                  <li>
                    <span className=" text-dark">Formateur: </span>{" "}
                    {formation.formateur}{" "}
                  </li>
                  <li>
                    <span className=" text-dark">Duree: </span>{" "}
                    {formation.duree} {formation.duree === 1 ? "jour" : "jours"}{" "}
                  </li>
                  <li>
                    <span className=" text-dark">Nombre d'apprenants: </span>{" "}
                    {formation.apprenants?.length}{" "}
                  </li>
                  <li>
                    <span className=" text-dark">Nombre de groupes: </span>{" "}
                    {formation.groupes?.length}{" "}
                  </li>
                </ul>
              </Card.Text>
              <Card.Footer>
                <div className="d-flex gap-2 mx-2 justify-content-center">
                  <Button
                    size="sm"
                    onClick={() => {
                      navigate(`/detailsFormation/${formation.id}`);
                    }}
                    variant="info"
                  >
                    Détails
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      navigate(`/modifFormation/${formation.id}`);
                    }}
                    variant="warning"
                  >
                    Modifier
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => {
                      let choice = window.confirm(
                        "Voulez-vous vraiment supprimer cette formation ?"
                      );
                      if (choice) {
                        api
                          .delete(
                            `/formation/${formation.id}`
                          )
                          .then((response) => {
                            console.log(response.data);
                            alert("Formation supprimée");
                            setReload(!reload);
                          });
                      }
                    }}
                    variant="danger"
                  >
                    Supprimer
                  </Button>
                </div>
              </Card.Footer>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Pagination className="justify-content-center">
        {Array.from(
          { length: Math.ceil(formations.length / formationsPerPage) },
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

function TableFormation() {
  return <MyTable />;
}

export default TableFormation;
